// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Profile {
    struct UserProfile {
        string displayName;
        string bio;
    }
    mapping(address => UserProfile) public profiles;

    function setProfile(string memory _displayName, string memory _bio) public {
        profiles[msg.sender] = UserProfile(_displayName, _bio);
    }

    function getProfile(
        address _user
    ) public view returns (UserProfile memory) {
        return profiles[_user];
    }
}
