interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'sales' | 'va';
  created_at: string;
}

// Mock admin users storage
let adminUsers: AdminUser[] = [];

export async function loginAdmin(email: string, password: string) {
  try {
    const user = adminUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { 
      user: {
        id: user.id,
        email: user.email,
        userType: user.role,
        fullName: user.full_name
      }, 
      error: null 
    };
  } catch (error) {
    return { user: null, error: 'Invalid credentials' };
  }
}

export async function getAdminUsers() {
  return { users: adminUsers, error: null };
}

export async function createAdminUser(userData: {
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'sales' | 'va';
}) {
  try {
    const newUser: AdminUser = {
      id: Math.random().toString(),
      email: userData.email,
      full_name: userData.full_name,
      role: userData.role,
      created_at: new Date().toISOString()
    };
    adminUsers.push(newUser);
    return { user: newUser, error: null };
  } catch (error) {
    return { user: null, error };
  }
}