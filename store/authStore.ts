import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import API_BASE_URL from '@/config';

interface AuthState {
  user: { name: string; email: string; mobilenumber: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  login: async (userData) => {
    await SecureStore.setItemAsync("accessToken", userData.accessToken);
    await SecureStore.setItemAsync("refreshToken", userData.refreshToken);
    await SecureStore.setItemAsync("userName", userData.name);
    await SecureStore.setItemAsync("userEmail", userData.email);
    await SecureStore.setItemAsync("userMobileNumber", userData.mobilenumber);

    set({
      user: {
        name: userData.name,
        email: userData.email,
        mobilenumber: userData.mobilenumber,
      },
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  refreshAccessToken: async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (!refreshToken) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/user/refresh-token`, { refreshToken });
      const newAccessToken = response.data.accessToken;

      await SecureStore.setItemAsync("accessToken", newAccessToken);
      set({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Error refreshing token", error);
      set({ isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
