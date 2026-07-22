import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email
    }));
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email
    }));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default authService;
