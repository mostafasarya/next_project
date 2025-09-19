'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './StorePermissions.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  status: 'active' | 'pending' | 'inactive';
  permissions: {
    designStore: boolean;
    storeWallet: boolean;
    marketing: boolean;
    paymentMethod: boolean;
    myOrders: boolean;
    inventory: boolean;
    shipping: boolean;
    customers: boolean;
    messages: boolean;
  };
}

interface Permission {
  id: string;
  name: string;
  icon: string;
  color: string;
  key: keyof User['permissions'];
}

const StorePermissionsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') || 'default-store';
  
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'manager' | 'employee'>('employee');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [storeName, setStoreName] = useState('');

  // Translation dictionary
  const translations = {
    'English': {
      'back': 'Back',
      'users': 'Users',
      'add_user': 'Add User',
      'select_user': 'Select a User',
      'select_user_description': 'Choose a user from the list to manage their permissions.',
      'search_email_name': 'Search Email / Name',
      'role': 'Role',
      'cancel': 'Cancel',
      'add_new_user': 'Add New User',
      'save_changes': 'Save Changes',
      'access': 'Access',
      'design_store': 'Design your store',
      'store_wallet': 'Store Wallet',
      'marketing': 'Marketing',
      'payment_method': 'Payment Method',
      'my_orders': 'My orders',
      'inventory': 'Inventory',
      'shipping': 'Shipping',
      'customers': 'Customers',
      'messages': 'Messages',
      'admin': 'Admin',
      'manager': 'Manager',
      'employee': 'Employee',
      'active': 'Active',
      'pending': 'Pending',
      'inactive': 'Inactive',
      'remove_user': 'Remove User',
      'cannot_remove_user': 'Cannot remove user. Please uncheck all permissions first.'
    },
    'العربية': {
      'back': 'رجوع',
      'users': 'المستخدمون',
      'add_user': 'إضافة مستخدم',
      'select_user': 'اختر مستخدماً',
      'select_user_description': 'اختر مستخدماً من القائمة لإدارة صلاحياته.',
      'search_email_name': 'البحث بالبريد الإلكتروني / الاسم',
      'role': 'الدور',
      'cancel': 'إلغاء',
      'add_new_user': 'إضافة مستخدم جديد',
      'save_changes': 'حفظ التغييرات',
      'access': 'الوصول',
      'design_store': 'تصميم متجرك',
      'store_wallet': 'محفظة المتجر',
      'marketing': 'التسويق',
      'payment_method': 'طريقة الدفع',
      'my_orders': 'طلباتي',
      'inventory': 'المخزون',
      'shipping': 'الشحن',
      'customers': 'العملاء',
      'messages': 'الرسائل',
      'admin': 'مدير',
      'manager': 'مدير',
      'employee': 'موظف',
      'active': 'نشط',
      'pending': 'في الانتظار',
      'inactive': 'غير نشط'
    }
  };

  // Language mapping
  const languageMapping: { [key: string]: string } = {
    'English': 'English',
    'العربية': 'Arabic',
    'Español': 'Spanish',
    'Français': 'French',
    'Deutsch': 'German',
    'Português': 'Portuguese',
    'Türkçe': 'Turkish',
    'हिन्दी': 'Hindi',
    'Italiano': 'Italian',
    'Русский': 'Russian',
    '日本語': 'Japanese',
    '中文': 'Chinese',
    '한국어': 'Korean'
  };

  // Translation function
  const t = (key: string) => {
    let currentLangTranslations = translations[currentLanguage as keyof typeof translations];
    
    if (!currentLangTranslations) {
      const mappedLanguage = languageMapping[currentLanguage] || currentLanguage;
      currentLangTranslations = translations[mappedLanguage as keyof typeof translations];
    }
    
    const englishTranslations = translations['English'];
    
    if (currentLangTranslations && currentLangTranslations[key as keyof typeof currentLangTranslations]) {
      return currentLangTranslations[key as keyof typeof currentLangTranslations];
    }
    
    if (englishTranslations && englishTranslations[key as keyof typeof englishTranslations]) {
      return englishTranslations[key as keyof typeof englishTranslations];
    }
    
    return key;
  };

  // Permission definitions
  const permissions: Permission[] = [
    { id: 'design_store', name: t('design_store'), icon: '🎨', color: '#ff4757', key: 'designStore' },
    { id: 'store_wallet', name: t('store_wallet'), icon: '💰', color: '#26de81', key: 'storeWallet' },
    { id: 'marketing', name: t('marketing'), icon: '📢', color: '#ffa502', key: 'marketing' },
    { id: 'payment_method', name: t('payment_method'), icon: '💳', color: '#3742fa', key: 'paymentMethod' },
    { id: 'my_orders', name: t('my_orders'), icon: '📋', color: '#a55eea', key: 'myOrders' },
    { id: 'inventory', name: t('inventory'), icon: '📦', color: '#20bf6b', key: 'inventory' },
    { id: 'shipping', name: t('shipping'), icon: '🚚', color: '#ff6348', key: 'shipping' },
    { id: 'customers', name: t('customers'), icon: '👥', color: '#ffa502', key: 'customers' },
    { id: 'messages', name: t('messages'), icon: '💬', color: '#ff4757', key: 'messages' }
  ];

  // Load saved language and listen for changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('websiteLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Load users from localStorage (store-specific)
  useEffect(() => {
    const savedUsers = localStorage.getItem(`storeUsers_${storeId}`);
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      setUsers(parsedUsers);
      if (parsedUsers.length > 0) {
        setSelectedUser(parsedUsers[0]);
      }
    } else {
      // Default users for demo (store-specific)
      const defaultUsers: User[] = [
        {
          id: '1',
          name: 'Mostafa Sarya',
          email: 'mostafa@gmail.com',
          role: 'admin',
          status: 'pending',
          permissions: {
            designStore: false,
            storeWallet: false,
            marketing: false,
            paymentMethod: false,
            myOrders: false,
            inventory: false,
            shipping: false,
            customers: false,
            messages: false
          }
        }
      ];
      setUsers(defaultUsers);
      setSelectedUser(defaultUsers[0]);
      localStorage.setItem(`storeUsers_${storeId}`, JSON.stringify(defaultUsers));
    }
  }, [storeId]);

  // Load store name
  useEffect(() => {
    const savedStores = localStorage.getItem('stores');
    if (savedStores) {
      const stores = JSON.parse(savedStores);
      const currentStore = stores.find((store: any) => store.id === storeId);
      if (currentStore) {
        setStoreName(currentStore.name);
      }
    }
  }, [storeId]);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handlePermissionToggle = (permissionKey: keyof User['permissions']) => {
    if (!selectedUser) return;

    const updatedUser = {
      ...selectedUser,
      permissions: {
        ...selectedUser.permissions,
        [permissionKey]: !selectedUser.permissions[permissionKey]
      }
    };

    setSelectedUser(updatedUser);
    
    // Update users array
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleSaveChanges = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user =>
      user.id === selectedUser.id ? selectedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem(`storeUsers_${storeId}`, JSON.stringify(updatedUsers));
    
    // Show success message (you can implement a toast notification here)
    alert('Changes saved successfully!');
  };

  const handleAddUser = () => {
    if (!newUserEmail.trim()) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: newUserEmail.split('@')[0], // Use email prefix as name
      email: newUserEmail,
      role: newUserRole,
      status: 'pending',
      permissions: {
        designStore: false,
        storeWallet: false,
        marketing: false,
        paymentMethod: false,
        myOrders: false,
        inventory: false,
        shipping: false,
        customers: false,
        messages: false
      }
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setSelectedUser(newUser);
    localStorage.setItem(`storeUsers_${storeId}`, JSON.stringify(updatedUsers));
    
    setNewUserEmail('');
    setNewUserRole('employee');
    setShowAddUserModal(false);
  };

  const handleRemoveUser = (userId: string) => {
    const userToRemove = users.find(user => user.id === userId);
    if (!userToRemove) return;

    // Check if all permissions are unchecked
    const hasAnyPermissions = Object.values(userToRemove.permissions).some(permission => permission === true);
    
    if (hasAnyPermissions) {
      alert(t('cannot_remove_user'));
      return;
    }

    // Remove user from list
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem(`storeUsers_${storeId}`, JSON.stringify(updatedUsers));
    
    // If the removed user was selected, select the first available user or none
    if (selectedUser?.id === userId) {
      setSelectedUser(updatedUsers.length > 0 ? updatedUsers[0] : null);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#ff4757';
      case 'manager': return '#ffa502';
      case 'employee': return '#26de81';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#26de81';
      case 'pending': return '#ffa502';
      case 'inactive': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="store-permissions-page">
      {/* Header */}
      <div className="permissions-header">
        <button className="back-btn" onClick={() => router.back()}>
          <span className="back-icon">←</span>
        </button>
        <div className="header-title">
          <h1>Store Permissions</h1>
          {storeName && <p className="store-name">{storeName}</p>}
        </div>
        <div className="header-logo">
          <div className="logo-circle">9jkl</div>
        </div>
      </div>

      <div className="permissions-container">
        {/* Left Panel - Users List */}
        <div className="users-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="title-icon">👥</span>
              <h2>{t('users')}</h2>
            </div>
            <button 
              className="add-user-btn"
              onClick={() => setShowAddUserModal(true)}
            >
              <span className="add-icon">+</span>
            </button>
          </div>
          
          <div className="users-list">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                  <div className="user-badges">
                    <span 
                      className="role-badge"
                      style={{ backgroundColor: getRoleColor(user.role) }}
                    >
                      {t(user.role)}
                    </span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    >
                      {user.status === 'pending' && '⏰'} {t(user.status)}
                    </span>
                  </div>
                </div>
                <div className="user-actions">
                  <button 
                    className="remove-user-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveUser(user.id);
                    }}
                    title={t('remove_user')}
                  >
                    🗑️
                  </button>
                  <span className="more-icon">⋮</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Permission Management */}
        <div className="permissions-panel">
          {selectedUser ? (
            <>
              <div className="panel-header">
                <div className="panel-title">
                  <span className="title-icon">👤</span>
                  <h2>{selectedUser.name} {t('access')}</h2>
                </div>
                <button 
                  className="save-btn"
                  onClick={handleSaveChanges}
                >
                  <span className="save-icon">💾</span>
                  {t('save_changes')}
                </button>
              </div>
              
              <div className="user-details">
                <div className="user-email">{selectedUser.email}</div>
              </div>
              
              <div className="permissions-grid">
                {permissions.map((permission) => (
                  <div key={permission.id} className="permission-card">
                    <div className="permission-info">
                      <div 
                        className="permission-icon"
                        style={{ color: permission.color }}
                      >
                        {permission.icon}
                      </div>
                      <span className="permission-name">{permission.name}</span>
                    </div>
                    <div className="permission-toggle">
                      <div className="permission-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedUser.permissions[permission.key]}
                          onChange={() => handlePermissionToggle(permission.key)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">👤</div>
              <h3>{t('select_user')}</h3>
              <p>{t('select_user_description')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-icon">👤+</span>
              <h3>{t('add_new_user')}</h3>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <div className="input-icon">🔍</div>
                <input
                  type="text"
                  placeholder={t('search_email_name')}
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <div className="input-icon">🛡️</div>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as 'admin' | 'manager' | 'employee')}
                >
                  <option value="employee">{t('employee')}</option>
                  <option value="manager">{t('manager')}</option>
                  <option value="admin">{t('admin')}</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                {t('cancel')}
              </button>
              <button 
                className="add-btn"
                onClick={handleAddUser}
              >
                {t('add_user')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="permissions-footer">
        <div className="copyright">2025 - Powersgate</div>
        <div className="settings-icon">⚙️</div>
      </div>
    </div>
  );
};

export default StorePermissionsPage;
