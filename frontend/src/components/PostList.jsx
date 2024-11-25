import React, { useState, useEffect } from 'react';
import './styles/PostList.css'; // Import the styles

function PostList({ account, dBlog }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await dBlog.methods.getAllPosts(account).call();
        setPosts(allPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [account, dBlog]);

  const handleLikePost = async (postId) => {
    try {
      await dBlog.methods.likePost(postId).send({ from: account });
      alert('Post liked!');
      // Refresh posts to update likes
      const updatedPosts = await dBlog.methods.getAllPosts(account).call();
      setPosts(updatedPosts);
    } catch (err) {
      console.error(err);
      alert('Failed to like post');
    }
  };

  return (
    <div className="post-list-container">
      <h3>All Posts</h3>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h4>{post.title}</h4>
              <p>{post.text}</p>
              <p>Likes: {post.likes}</p>
              <button onClick={() => handleLikePost(post.id)}>Like</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
}

export default PostList;
