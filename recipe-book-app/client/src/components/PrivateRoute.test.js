import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute Component', () => {
  test('should render component if user is authenticated', () => {
    const mockComponent = jest.fn(() => <div>Protected Content</div>);
    
    // Mock localStorage
    localStorage.setItem('token', 'fake-token');

    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    localStorage.removeItem('token');
  });

  test('should not render if user is not authenticated', () => {
    localStorage.removeItem('token');
    
    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );

    // Should redirect or not show protected content
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
