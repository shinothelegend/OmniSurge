// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../interfaces/IReactive.sol";
import "../interfaces/ISystemContract.sol";

abstract contract AbstractReactive is IReactive {
    uint256 internal constant REACTIVE_IGNORE = 0xa65f96fc951c35eca466231422b7a70c47445526979f5cd1146f3415b3079bce;
    address internal constant SYS_CONTRACT_DEFAULT = 0x0000000000000000000000000000000000fffFfF;

    ISystemContract public service;
    bool public vm;
    address public owner;
    bool public paused;

    event Subscribed(uint256 indexed chainId, address indexed targetContract, uint256 topic0);
    event Unsubscribed(uint256 indexed chainId, address indexed targetContract, uint256 topic0);
    event PausedStateChanged(bool isPaused);

    modifier onlyOwner() {
        require(msg.sender == owner, "OmniSurge: caller is not the owner");
        _;
    }

    modifier vmOnly() {
        require(vm || msg.sender == address(service) || msg.sender == owner, "OmniSurge: ReactVM only");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "OmniSurge: contract is paused");
        _;
    }

    constructor(address _serviceAddress) {
        owner = msg.sender;
        if (_serviceAddress != address(0)) {
            service = ISystemContract(_serviceAddress);
        } else {
            service = ISystemContract(SYS_CONTRACT_DEFAULT);
        }
        // Detect if deployed in ReactVM environment or testing harness
        uint256 size;
        address sAddr = address(service);
        assembly {
            size := extcodesize(sAddr)
        }
        vm = (size == 0); // If system contract doesn't exist locally or caller is vm
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit PausedStateChanged(_paused);
    }

    function setSystemContract(address _serviceAddress) external onlyOwner {
        require(_serviceAddress != address(0), "Invalid address");
        service = ISystemContract(_serviceAddress);
    }
}

