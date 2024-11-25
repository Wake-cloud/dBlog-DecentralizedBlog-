import React, { useState } from 'react';
import './styles/CreatePost.css';

function CreatePost({ account, dBlog, web3 }) {
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');

  const handleCreatePost = async () => {
    try {
      await dBlog.methods
        .doPost(postContent, postTitle, postDescription, 'Post Image URL')
        .send({ from: account, value: web3.utils.toWei('0.01', 'ether') });
      alert('Post created successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <h3>Create a New Post</h3>
      <input
        type="text"
        placeholder="Post Title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <textarea
        placeholder="Post Content"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <textarea
        placeholder="Post Description"
        value={postDescription}
        onChange={(e) => setPostDescription(e.target.value)}
      />
      <button onClick={handleCreatePost}>Create Post (0.01 ETH fee)</button>
    </div>
  );
}

export default CreatePost;
