import React, { useState, useEffect } from 'react';
import './styles/UserProfile.css'; // Import the CSS file

function UserProfile({ account, dBlog }) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userAge, setUserAge] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await dBlog.methods.users(account).call();
        setUser(userProfile);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [account, dBlog]);

  const handleUpdateProfile = async () => {
    try {
      await dBlog.methods.createUser(userName, userImage, userAge).send({ from: account });
      alert('Profile updated!');
      const updatedProfile = await dBlog.methods.users(account).call(); // Refresh profile
      setUser(updatedProfile);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-content">
        <h3>User Profile</h3>
        {user ? (
          <>
            <img src={user.image} alt="User" className="profile-image" />
            <p className="profile-info">Name: {user.name}</p>
            <p className="profile-info">Age: {user.age}</p>
          </>
        ) : (
          <p className="profile-info">No profile found, create one below.</p>
        )}

        <h4>Update Profile</h4>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="profile-input"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={userImage}
          onChange={(e) => setUserImage(e.target.value)}
          className="profile-input"
        />
        <input
          type="number"
          placeholder="Age"
          value={userAge}
          onChange={(e) => setUserAge(Number(e.target.value))}
          className="profile-input"
        />
        <button onClick={handleUpdateProfile} className="profile-button">Update Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
