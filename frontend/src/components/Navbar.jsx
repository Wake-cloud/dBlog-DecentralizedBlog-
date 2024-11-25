import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import { useState } from 'react';

function Navbar({ setAccount }) {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
  
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
          setAccount(accounts[0]); // Pass the connected account to the parent App
        } catch (err) {
          console.error('Error connecting to wallet:', err);
          alert('Failed to connect wallet. Please try again.');
        }
      } else {
        alert('MetaMask is not installed. Please install MetaMask to continue.');
      }
    };

  return (
    <nav className="alien-navbar">
      <ul className="alien-navbar-list">
        <li className="alien-navbar-item">
          <Link to="/profile" className="alien-navbar-link">User Profile</Link>
        </li>
        <li className="alien-navbar-item">
          <Link to="/create-post" className="alien-navbar-link">Create Post</Link>
        </li>
        <li className="alien-navbar-item">
          <Link to="/posts" className="alien-navbar-link">View Posts</Link>
        </li>
      </ul>
      
      <div className="navbar-wallet">
        {walletConnected ? (
          <span className="wallet-address">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        ) : (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
