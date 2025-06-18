const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  MENU: {
    GET_ALL: `${API_BASE_URL}/menu`,
    CREATE: `${API_BASE_URL}/menu`,
    UPDATE: (id) => `${API_BASE_URL}/menu/${id}`,
    DELETE: (id) => `${API_BASE_URL}/menu/${id}`,
  },
};

export const fetchWithAuth = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}; 