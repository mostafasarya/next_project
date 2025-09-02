'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CreateStoreForm from './CreateStoreForm';
import StoreCard from './StoreCard';
import './ProfilePage.css';

interface Store {
  id: string;
  name: string;
  storeType: string;
  country: string;
  city: string;
  currency: string;
  category: string;
  description: string;
  url: string;
  status: 'active' | 'inactive';
  logo?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));

    // Load existing stores from localStorage
    const existingStores = localStorage.getItem('stores');
    if (existingStores) {
      setStores(JSON.parse(existingStores));
    }

    // Load profile image from localStorage
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }

    // Load cover image from localStorage
    const savedCoverImage = localStorage.getItem('coverImage');
    if (savedCoverImage) {
      setCoverImage(savedCoverImage);
    }
  }, [router]);

  const handleCreateStore = (storeData: Omit<Store, 'id' | 'url' | 'status'>) => {
    const newStore: Store = {
      ...storeData,
      id: Date.now().toString(),
      url: `https://${storeData.name.toLowerCase().replace(/\s+/g, '')}.9jkl.com`,
      status: 'active'
    };

    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    localStorage.setItem('stores', JSON.stringify(updatedStores));
    setShowCreateForm(false);
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverImage(result);
        localStorage.setItem('coverImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageClick = () => {
    coverFileInputRef.current?.click();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      {/* App Bar */}
      <div className="app-bar">
        <div className="app-bar-content">
          <button className="back-btn" onClick={() => router.push('/')}>
            <span className="back-icon">←</span>
          </button>
          <div className="app-title">
            <img src="/logo.png" alt="Logo" className="app-logo" />
          </div>
          <div className="app-bar-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-menu-btn">👤</button>
          </div>
        </div>
      </div>

      {/* Header with Cover Photo and Profile Picture */}
      <div className="profile-header">
        <div className="cover-photo" style={{ backgroundImage: coverImage ? `url(${coverImage})` : undefined }}>
          <div className="cover-overlay"></div>
          <button className="edit-cover-btn" onClick={handleCoverImageClick}>📷</button>
        </div>
        
        <div className="profile-info">
          <div className="profile-picture">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar">👤</div>
            )}
            <button className="edit-profile-btn" onClick={handleProfileImageClick}>📷</button>
          </div>
          <div className="user-details">
            <h2>{user.name}</h2>
            <button className="menu-btn">⋯</button>
          </div>
        </div>
      </div>

      {/* Create Section */}
      <div className="create-section">
        <h3>Create</h3>
        <div className="create-options">
          <div className="create-card" onClick={() => setShowCreateForm(true)}>
            <div className="card-icon">🛒</div>
            <button className="create-btn">Online Store</button>
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <div className="stores-section">
        <h3>Stores</h3>
        {stores.length > 0 ? (
          <div className="stores-grid">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="no-stores">
            <p>No stores to display</p>
          </div>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleProfileImageUpload}
        style={{ display: 'none' }}
      />
      <input
        ref={coverFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleCoverImageUpload}
        style={{ display: 'none' }}
      />

      {/* Create Store Form Modal */}
      {showCreateForm && (
        <CreateStoreForm 
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateStore}
        />
      )}
    </div>
  );
};

export default ProfilePage;
