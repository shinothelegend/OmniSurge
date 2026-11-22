// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface ISystemContract {
    enum CallbackVersion { V_1_0 }

    struct CallbackConfiguration_V_1_0 {
        uint256 chainId;
        address recipient;
        uint64 gasLimit;
        bytes payload;
    }

    function subscribe(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256 topic_1,
        uint256 topic_2,
        uint256 topic_3
    ) external;

    function unsubscribe(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256 topic_1,
        uint256 topic_2,
        uint256 topic_3
    ) external;

    function requestCallbackV_1_0(
        CallbackConfiguration_V_1_0 memory config_
    ) external;

    function requestCallback(
        CallbackVersion version_,
        bytes memory config_
    ) external;
}
