pragma solidity ^0.8.28;

contract UserWins {
    struct User {
        uint wins;
        bool exists;
    }

    mapping(string => User) private users;
    string[] private usernames;

    function incrementWinForUser(string calldata username) public {
        if (!users[username].exists) {
            users[username] = User(1, true);
            usernames.push(username);

        } else {
            users[username].wins += 1;
        }

    }

    function getWinsForUser(string calldata username) public view returns (uint) {
        if (users[username].exists) {
            return users[username].wins;
        }
        return 0;
    }

       // New function to get total usernames count
    function getUsernamesCount() public view returns (uint) {
        return usernames.length;
    }

    // New function to get username at an index
    function getUsernameAt(uint index) public view returns (string memory) {
        require(index < usernames.length, "Index out of bounds");
        return usernames[index];
    }
}
