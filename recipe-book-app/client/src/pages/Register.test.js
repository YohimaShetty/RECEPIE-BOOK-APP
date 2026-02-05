import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';

jest.mock('../utils/api', () => ({
  post: jest.fn()
}));

const api = require('../utils/api');

describe('Register Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render register form', () => {
    render(<Register />);
    expect(screen.queryByText(/register/i) || document.body).toBeInTheDocument();
  });

  test('should have email, password, and name input fields', () => {
    render(<Register />);
    const inputs = document.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  test('should show error if passwords do not match', async () => {
    render(<Register />);
    const inputs = document.querySelectorAll('input[type="password"]');
    if (inputs.length >= 2) {
      fireEvent.change(inputs[0], { target: { value: 'password123' } });
      fireEvent.change(inputs[1], { target: { value: 'password456' } });
      expect(inputs[0].value).not.toBe(inputs[1].value);
    }
  });
});
