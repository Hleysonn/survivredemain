import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface UserData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  dateNaissance: Date;
  adresse: {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
  };
}

export const authService = {
  async register(userData: UserData) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
      }
      throw error;
    }
  },

  async login(email: string, motDePasse: string) {
    try {
      const response = await axios.post(`${API_URL}/users/connexion`, { email, motDePasse });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
      }
      throw error;
    }
  }
}; 