export const TWITTER_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TweetCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "liker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tweetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLikeCount",
        type: "uint256",
      },
    ],
    name: "TweetLiked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "unliker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tweetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLikeCount",
        type: "uint256",
      },
    ],
    name: "TweetUnliked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oldContent",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "updatedContent",
        type: "string",
      },
    ],
    name: "TweetUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_tweet",
        type: "string",
      },
    ],
    name: "createTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTweets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "likes",
            type: "uint256",
          },
        ],
        internalType: "struct Twitter.Tweet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creatorAddress",
        type: "address",
      },
    ],
    name: "getTweetsByAddress",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "likes",
            type: "uint256",
          },
        ],
        internalType: "struct Twitter.Tweet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_author",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tweetId",
        type: "uint256",
      },
    ],
    name: "likeTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tweets",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "likes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_author",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tweetId",
        type: "uint256",
      },
    ],
    name: "unlikeTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_updatedTweet",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_tweetId",
        type: "uint256",
      },
    ],
    name: "updateTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
