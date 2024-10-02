export const authenticateUser = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    return response.ok;
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return false;
  }
};