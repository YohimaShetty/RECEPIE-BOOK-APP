import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';

test('login page shows email and password fields', () => {
  // Mock the context value
  const mockContextValue = {
    login: jest.fn(),
    user: null,
    loading: false
  };

  render(
    <AuthContext.Provider value={mockContextValue}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContext.Provider>
  );
  
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});