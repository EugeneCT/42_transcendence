pragma solidity ^0.8.28;

contract UserWins {
    struct User {
        uint wins;
        bool exists;
    }

    mapping(string => User) private users;
    mapping(uint => uint) dummyData;

    function incrementWinForUser(string calldata username) public {
        if (!users[username].exists) {
            users[username] = User(1, true);
        } else {
            users[username].wins += 1;
        }

        // Dummy loop to consume extra gas
        //for(uint i = 0; i < 100; i++) {
        //    dummyData[i] = i;
        //}
    }

    function getWinsForUser(string calldata username) public view returns (uint) {
        if (users[username].exists) {
            return users[username].wins;
        }
        return 0;
    }
}
