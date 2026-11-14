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
        uint256 swapTopic0 = 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67;
        bytes memory data = abi.encode(amount0In, amount1In, amount0Out, amount1Out);

        IReactive.LogRecord memory log = IReactive.LogRecord({
            chain_id: chainId,
            _contract: originPool,
            topic_0: swapTopic0,
            topic_1: 0,
            topic_2: 0,
            topic_3: 0,
            data: data,
            block_number: blockNumber,
            op_code: 0
        });

        IReactive(reactiveContract).react(log);
    }
}

