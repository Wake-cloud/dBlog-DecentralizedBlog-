// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract dBlog {
    uint256 private userIdCounter;
    uint256 private postIdCounter;
    uint256 private forumIdCounter;

    constructor() {
        userIdCounter = 1;
        postIdCounter = 1;
        forumIdCounter = 1;
    }

    struct User {
        string name;
        string image;
        uint256 age;
        uint256 id;
    }

    struct Post {
        string text;
        string title;
        string description;
        string image;
        uint256 timestamp;
        uint256 id;
        uint256 likes;
    }

    struct Forum {
        string title;
        string text;
        string description;
        string image;
        uint256 timestamp;
        uint256 id;
        string question;
        string answer;
        string comment;
        uint256 likes;
    }

    mapping(address => User) public users;
    mapping(address => Post[]) public posts;
    mapping(address => Forum[]) public forums;

    // Create a new user
    function createUser(
        string memory _name,
        string memory _image,
        uint256 _age
    ) public {
        User storage user = users[msg.sender];
        user.name = _name;
        user.image = _image;
        user.age = _age;
        user.id = userIdCounter;
        userIdCounter++;
    }

    // Create a new post
    function doPost(
        string memory _text,
        string memory _title,
        string memory _description,
        string memory _image
    ) public {
        Post memory newPost = Post({
            text: _text,
            title: _title,
            description: _description,
            image: _image,
            timestamp: block.timestamp,
            id: postIdCounter,
            likes: 0
        });

        posts[msg.sender].push(newPost);
        postIdCounter++;
    }

    // Like a post
    function likePost(address _user, uint256 _postIndex) public {
        require(_postIndex < posts[_user].length, "Post does not exist.");
        posts[_user][_postIndex].likes++;
    }

    // Create a new forum post
    function postOnForum(
        string memory _title,
        string memory _text,
        string memory _description,
        string memory _image,
        string memory _question
    ) public {
        Forum memory newForum = Forum({
            title: _title,
            text: _text,
            description: _description,
            image: _image,
            timestamp: block.timestamp,
            id: forumIdCounter,
            question: _question,
            answer: "",
            comment: "",
            likes: 0
        });

        forums[msg.sender].push(newForum);
        forumIdCounter++;
    }

    // Like a forum post
    function likeForum(address _user, uint256 _forumIndex) public {
        require(
            _forumIndex < forums[_user].length,
            "Forum post does not exist."
        );
        forums[_user][_forumIndex].likes++;
    }

    // Answer a forum post
    function answerForum(
        address _user,
        uint256 _forumIndex,
        string memory _answer
    ) public {
        require(
            _forumIndex < forums[_user].length,
            "Forum post does not exist."
        );
        forums[_user][_forumIndex].answer = _answer;
    }

    // Comment on a forum post
    function commentForum(
        address _user,
        uint256 _forumIndex,
        string memory _comment
    ) public {
        require(
            _forumIndex < forums[_user].length,
            "Forum post does not exist."
        );
        forums[_user][_forumIndex].comment = _comment;
    }

    // Ask a question in a forum
    function questionForum(
        address _user,
        uint256 _forumIndex,
        string memory _question
    ) public {
        require(
            _forumIndex < forums[_user].length,
            "Forum post does not exist."
        );
        forums[_user][_forumIndex].question = _question;
    }

    // Write a new post (similar to doPost)
    function writePost(
        string memory _text,
        string memory _title,
        string memory _description,
        string memory _image
    ) public {
        doPost(_text, _title, _description, _image);
    }

    // Delete a post (only the creator can delete)
    function deletePost(uint256 _postIndex) public {
        require(_postIndex < posts[msg.sender].length, "Post does not exist.");
        delete posts[msg.sender][_postIndex];
        posts[msg.sender].pop(); // Remove the last element after deletion
    }

    // Update a post (only the creator can update)
    function updatePost(
        uint256 _postIndex,
        string memory _newText,
        string memory _newTitle,
        string memory _newDescription,
        string memory _newImage
    ) public {
        require(_postIndex < posts[msg.sender].length, "Post does not exist.");
        Post storage post = posts[msg.sender][_postIndex];
        post.text = _newText;
        post.title = _newTitle;
        post.description = _newDescription;
        post.image = _newImage;
    }

    // Get all posts of a user
    function getAllPosts(address _user) public view returns (Post[] memory) {
        return posts[_user];
    }

    // Get all forums of a user
    function getAllForums(address _user) public view returns (Forum[] memory) {
        return forums[_user];
    }
}
