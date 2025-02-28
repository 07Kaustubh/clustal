import { useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';
import useAuthStore from '@/store/authStore';
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(home)');
    } else {
      router.replace('./');
    }
  }, [isAuthenticated]);

  return <Stack />;
}
