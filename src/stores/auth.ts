import { defineStore } from 'pinia';

interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    console.log('État initial du store:', {
      hasToken: !!token,
      hasUser: !!user,
      token: token ? 'présent' : 'absent',
      user: user
    });
    
    return {
      user,
      token,
      isLoggedIn: !!token && !!user
    };
  },

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isAuthenticated: (state) => state.isLoggedIn && !!state.token && !!state.user
  },

  actions: {
    setToken(token: string) {
      console.log('Setting token:', token ? 'présent' : 'absent');
      this.token = token;
      localStorage.setItem('token', token);
    },

    setUser(user: User) {
      console.log('Setting user:', user);
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.isLoggedIn = true;
    },

    login(token: string, user: User) {
      console.log('Login avec:', {
        token: token ? 'présent' : 'absent',
        user
      });
      this.setToken(token);
      this.setUser(user);
    },

    logout() {
      console.log('Logout');
      this.token = null;
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    checkAuth() {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      console.log('CheckAuth:', {
        hasToken: !!token,
        hasUser: !!userStr,
        token: token ? 'présent' : 'absent'
      });
      
      if (token && userStr) {
        this.token = token;
        this.user = JSON.parse(userStr);
        this.isLoggedIn = true;
      } else {
        this.logout();
      }
    }
  }
}); 