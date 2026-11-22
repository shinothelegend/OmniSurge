// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../interfaces/ISystemContract.sol";
import "../interfaces/IReactive.sol";

/**
 * @title MockReactiveSystem
 * @notice Simulates the Reactive Network system contract and ReactVM dispatch for testing
 */
contract MockReactiveSystem is ISystemContract {
    struct Subscription {
        uint256 chainId;
        address targetContract;
        uint256 topic0;
        bool active;
    }

    Subscription[] public subscriptions;
    address public owner;

    event Subscribed(uint256 indexed chain_id, address indexed _contract, uint256 topic_0);
    event Unsubscribed(uint256 indexed chain_id, address indexed _contract, uint256 topic_0);

    constructor() {
        owner = msg.sender;
    }

    function subscribe(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256,
        uint256,
        uint256
    ) external override {
        subscriptions.push(Subscription({
            chainId: chain_id,
            targetContract: _contract,
            topic0: topic_0,
            active: true
        }));
        emit Subscribed(chain_id, _contract, topic_0);
    }

    function unsubscribe(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256,
        uint256,
        uint256
    ) external override {
        for (uint256 i = 0; i < subscriptions.length; i++) {
            if (
                subscriptions[i].chainId == chain_id &&
                subscriptions[i].targetContract == _contract &&
                subscriptions[i].topic0 == topic_0
            ) {
                subscriptions[i].active = false;
                emit Unsubscribed(chain_id, _contract, topic_0);
                break;
            }
        }
    }

    event CallbackRequested(
        uint256 indexed chainId,
        address indexed recipient,
        uint64 gasLimit,
        bytes payload
    );

    /**
     * @notice Mimics the Omni system contract's callback request.
     * @dev Replaces the first 32-byte word of the payload with msg.sender,
     *      matching the real network's sender-authentication injection.
     */
    function requestCallbackV_1_0(
        CallbackConfiguration_V_1_0 memory config_
    ) external override {
        bytes memory payload = config_.payload;
        assembly {
            mstore(add(payload, 36), caller())
        }
        emit CallbackRequested(
            config_.chainId,
            config_.recipient,
            config_.gasLimit,
            payload
        );
    }

    function requestCallback(
        CallbackVersion,
        bytes memory
    ) external pure override {
        revert("MockReactiveSystem: requestCallback not implemented");
    }

    /**
     * @notice Simulates the ReactVM receiving an origin log and passing it into react()
     */
    function simulateReactVMDispatch(
        address reactiveContract,
        uint256 chainId,
        address originPool,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        uint256 blockNumber
    ) external {
        uint256 swapTopic0 = 0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822;
        bytes memory data = abi.encode(amount0In, amount1In, amount0Out, amount1Out);

        IReactive.LogRecord memory log = IReactive.LogRecord({
            chainId: chainId,
            contractAddress: originPool,
            topic0: swapTopic0,
            topic1: 0,
            topic2: 0,
            topic3: 0,
            data: data,
            blockNumber: blockNumber,
            opCode: 0,
            blockHash: 0,
            txHash: 0,
            logIndex: 0
        });

        IReactive(reactiveContract).react(log);
    }
}

