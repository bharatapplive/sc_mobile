const host = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';

export const environment = {
  production: true,
  apiUrl: `http://${host}:3000`,
};
