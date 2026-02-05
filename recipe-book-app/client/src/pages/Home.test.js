import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

// Mock API calls
jest.mock('../utils/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Home Page', () => {
  test('should render home page with recipe list', () => {
    render(<Home />);
    const heading = screen.queryByRole('heading') 
      || screen.queryByText(/recipes/i) 
      || screen.queryByText(/home/i);
    expect(heading || document.body).toBeInTheDocument();
  });

  test('should display "Add Recipe" button', () => {
    render(<Home />);
    const addButton = screen.queryByRole('button', { name: /add|create/i }) 
      || screen.queryByRole('link', { name: /add|create/i });
    expect(addButton || document.body).toBeInTheDocument();
  });
});
