// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

abstract contract AbstractCallback {
    address public owner;
    address public callbackRelayer;
    address public authorizedReactiveContract;
    bool public paused;

    // Mutex for reentrancy prevention
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    // Replay attack prevention: mapping of processed message hashes
    mapping(bytes32 => bool) public executedHashes;

    event CallbackRelayerUpdated(address indexed oldRelayer, address indexed newRelayer);
    event AuthorizedReactiveContractUpdated(address indexed oldReactive, address indexed newReactive);
    event PausedStateUpdated(bool indexed isPaused);

    modifier onlyOwner() {
        require(msg.sender == owner, "OmniSurgeCallback: not owner");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == callbackRelayer || msg.sender == owner,
            "OmniSurgeCallback: unauthorized caller"
        );
        _;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "OmniSurgeCallback: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }

    modifier whenNotPaused() {
        require(!paused, "OmniSurgeCallback: contract paused");
        _;
    }

    constructor(address _callbackRelayer, address _authorizedReactiveContract) {
        owner = msg.sender;
        callbackRelayer = _callbackRelayer != address(0) ? _callbackRelayer : msg.sender;
        authorizedReactiveContract = _authorizedReactiveContract;
        _status = _NOT_ENTERED;
    }

    function setCallbackRelayer(address _newRelayer) external onlyOwner {
        require(_newRelayer != address(0), "OmniSurgeCallback: zero address");
        emit CallbackRelayerUpdated(callbackRelayer, _newRelayer);
        callbackRelayer = _newRelayer;
    }

    function setAuthorizedReactiveContract(address _newReactive) external onlyOwner {
        require(_newReactive != address(0), "OmniSurgeCallback: zero address");
        emit AuthorizedReactiveContractUpdated(authorizedReactiveContract, _newReactive);
        authorizedReactiveContract = _newReactive;
    }

    function setPaused(bool _isPaused) external onlyOwner {
        paused = _isPaused;
        emit PausedStateUpdated(_isPaused);
    }
}

