// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// interface of Profile contract, which will be called from this Twitter contract
interface IProfile {
    struct UserProfile {
        string displayName;
        string bio;
    }

    function getProfile(
        address _user
    ) external view returns (UserProfile memory);
}

contract Twitter {
    IProfile profileContract;
    uint16 constant MAX_TWEET_LENGTH = 280;
    struct Tweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    mapping(address => Tweet[]) public tweets;
    address[] authors;

    event TweetCreated(
        uint256 id,
        address author,
        string content,
        uint256 timestamp
    );
    event TweetUpdated(uint256 id, string oldContent, string updatedContent);
    event TweetLiked(
        address liker,
        address author,
        uint256 tweetId,
        uint256 newLikeCount
    );
    event TweetUnliked(
        address unliker,
        address author,
        uint256 tweetId,
        uint256 newLikeCount
    );

    modifier onlyRegister() {
        IProfile.UserProfile memory userProfileTemp = profileContract
            .getProfile(msg.sender);
        require(
            bytes(userProfileTemp.displayName).length > 0,
            "USER NOT REGISTERED!!"
        );
        _;
    }

    // passing owner to base constructor
    constructor(address _profileContractAddress) {
        profileContract = IProfile(_profileContractAddress); // link Profile contract when this contract is deployed
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        uint256 totalTweets = 0;
        for (uint256 i = 0; i < authors.length; i++) {
            totalTweets += tweets[authors[i]].length;
        }
        Tweet[] memory allTweets = new Tweet[](totalTweets);
        uint256 allTweetsIdx = 0;
        for (uint256 i = 0; i < authors.length; i++) {
            address author = authors[i];
            for (uint256 j = 0; j < tweets[author].length; j++) {
                Tweet memory userTweet = tweets[author][j];
                allTweets[allTweetsIdx] = userTweet;
                allTweetsIdx++;
            }
        }
        return allTweets;
    }

    function getTweetsByAddress(
        address _creatorAddress
    ) public view returns (Tweet[] memory) {
        return tweets[_creatorAddress];
    }

    function createTweet(string memory _tweet) public onlyRegister {
        require(
            bytes(_tweet).length < MAX_TWEET_LENGTH,
            "This tweet is too long!"
        );

        // save the author if the tweet is created for the first time
        if (tweets[msg.sender].length == 0) {
            authors.push(msg.sender);
        }

        Tweet memory newTweet = Tweet({
            id: tweets[msg.sender].length,
            author: msg.sender,
            content: _tweet,
            timestamp: block.timestamp,
            likes: 0
        });
        tweets[msg.sender].push(newTweet);

        emit TweetCreated(
            newTweet.id,
            newTweet.author,
            newTweet.content,
            newTweet.timestamp
        );
    }

    function updateTweet(
        string memory _updatedTweet,
        uint256 _tweetId
    ) public onlyRegister {
        Tweet[] storage userTweets = tweets[msg.sender];
        string memory oldContent = userTweets[_tweetId].content;
        userTweets[_tweetId].content = _updatedTweet;

        emit TweetUpdated(_tweetId, oldContent, userTweets[_tweetId].content);
    }

    function likeTweet(
        address _author,
        uint256 _tweetId
    ) external onlyRegister {
        Tweet[] storage userTweets = tweets[_author];
        // here, the tweet id is always less than the no. of tweets
        require(_tweetId < userTweets.length, "Tweet doesn't exist!");
        require(userTweets[_tweetId].id == _tweetId, "Tweet doesn't exist!");

        userTweets[_tweetId].likes++;

        emit TweetLiked(
            msg.sender,
            _author,
            _tweetId,
            userTweets[_tweetId].likes
        );
    }

    function unlikeTweet(
        address _author,
        uint256 _tweetId
    ) external onlyRegister {
        Tweet[] storage userTweets = tweets[_author];
        // here, the tweet id is always less than the no. of tweets
        require(_tweetId < userTweets.length, "Tweet doesn't exist!");
        require(userTweets[_tweetId].id == _tweetId, "Tweet doesn't exist!");
        require(userTweets[_tweetId].likes > 0, "There are not likes!");

        userTweets[_tweetId].likes--;

        emit TweetUnliked(
            msg.sender,
            _author,
            _tweetId,
            userTweets[_tweetId].likes
        );
    }
}
