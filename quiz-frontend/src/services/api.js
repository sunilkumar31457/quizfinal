import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:8081/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Get leaderboard
 * @param {number} limit - Number of top entries to fetch
 * @returns {Promise<array>} Leaderboard entries
 */
export const getLeaderboard = (limit = 10) => {
  return api.get(`/quizzes/leaderboard?limit=${limit}`);
};

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH APIs
// ============================================

/**
 * Register a new user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{token: string, email: string, userId: number}>}
 */
export const register = async (email, password) => {
  const response = await api.post('/auth/register', { 
    email, 
    password 
  });
  
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

/**
 * Login existing user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{token: string, email: string, userId: number}>}
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { 
    email, 
    password 
  });
  
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

/**
 * Logout user (clear token)
 */
export const logout = () => {
  localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Get current user token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// ============================================
// QUIZ APIs
// ============================================

/**
 * Create a new quiz
 * @param {object} quizData - {title: string, description: string, questions: array}
 * @returns {Promise<object>} Created quiz with ID
 */
export const createQuiz = (quizData) => {
  return api.post('/quizzes', quizData);
};

/**
 * Get all quizzes
 * @returns {Promise<array>} Array of all quizzes
 */
export const getAllQuizzes = () => {
  return api.get('/quizzes');
};

/**
 * Get a specific quiz by ID
 * @param {number} id - Quiz ID
 * @returns {Promise<object>} Quiz details with questions
 */
export const getQuizById = (id) => {
  return api.get(`/quizzes/${id}`);
};

/**
 * Submit quiz answers
 * @param {number} id - Quiz ID
 * @param {object} answers - {answers: {questionId: choiceIndex}}
 * @returns {Promise<object>} Result with score and percentage
 */
export const submitQuiz = (id, answers) => {
  return api.post(`/quizzes/${id}/submit`, { answers });
};

// Export axios instance for custom requests if needed
export default api;
