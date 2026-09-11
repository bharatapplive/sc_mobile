import { jwtDecode } from 'jwt-decode';

export function isTokenValid(): boolean {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Agar expiry field hai aur abhi time valid hai
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    }
  } catch (e) {
    console.error('Invalid token', e);
  }

  // Token expired or corrupted -> clear it
  localStorage.removeItem('accessToken');
  return false;
}