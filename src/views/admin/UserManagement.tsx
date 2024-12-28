import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { UserTable } from './components/UserTable';
import { UserFilters } from './components/UserFilters';
import { AddUserModal } from '../../components/admin/users/AddUserModal';
import { getAdminUsers, createAdminUser } from '../../services/adminService';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'sales' | 'va';
  created_at: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { users: adminUsers, error } = await getAdminUsers();
    if (error) {
      setError('Failed to load users');
      console.error('Error loading users:', error);
    } else {
      setUsers(adminUsers);
    }
    setLoading(false);
  };

  const handleAddUser = async (userData: {
    email: string;
    password: string;
    fullName: string;
    role: 'admin' | 'sales' | 'va';
  }) => {
    try {
      const { user, error } = await createAdminUser({
        email: userData.email,
        password: userData.password,
        full_name: userData.fullName,
        role: userData.role
      });

      if (error) throw error;
      await loadUsers();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user');
    }
  };

  const filteredUsers = users.filter(user => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (!user.full_name.toLowerCase().includes(searchLower) &&
          !user.email.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    if (roleFilter && user.role !== roleFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <UserFilters
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            onSearchChange={setSearchQuery}
            onRoleChange={setRoleFilter}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            </div>
          ) : (
            <UserTable users={filteredUsers} onRefresh={loadUsers} />
          )}
        </div>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
}