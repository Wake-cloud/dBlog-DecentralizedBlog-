import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

// Import components
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

// Import contract ABI and address
import dBlogABI from './data/dBlogABI.json';

const dBlogAddress = "0xa1B12b1644038d0f3b8A06283B112946B8A5D9cF";

function App() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [dBlog, setDBlog] = useState(null);

  useEffect(() => {
    async function init() {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3Instance = new Web3(provider);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccount(accounts[0]);
        setWeb3(web3Instance);

        const dBlogInstance = new web3Instance.eth.Contract(dBlogABI, dBlogAddress);
        setDBlog(dBlogInstance);
      }
    }
    init();
  }, []);

 
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/profile" element={<UserProfile account={account} dBlog={dBlog} />} />
          <Route path="/create-post" element={<CreatePost account={account} dBlog={dBlog} web3={web3} />} />
          <Route path="/posts" element={<PostList account={account} dBlog={dBlog} />} />
          <Route path="/" element={<h2>Welcome to the Decentralized Blog</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
