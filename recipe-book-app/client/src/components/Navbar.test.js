import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

test('renders navbar with logo', () => {
  // Mock the context value
  const mockContextValue = {
    user: { username: 'testuser', email: 'test@test.com' },
    logout: jest.fn(),
    loading: false
  };

  render(
    <AuthContext.Provider value={mockContextValue}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </AuthContext.Provider>
  );
  
  expect(screen.getByText(/Recipe Book/i)).toBeInTheDocument();
  expect(screen.getByText(/Hello, testuser!/i)).toBeInTheDocument();
});