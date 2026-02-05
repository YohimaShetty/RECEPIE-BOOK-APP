import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeCard from './RecipeCard';

describe('RecipeCard Component', () => {
  const mockRecipe = {
    id: 1,
    title: 'Pasta Carbonara',
    description: 'Classic Italian pasta',
    ingredients: 'Pasta, eggs, bacon, cheese',
    instructions: 'Mix and cook',
    image: 'pasta.jpg'
  };

  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
  }));

  test('should render recipe card with title', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
  });

  test('should render recipe description', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Classic Italian pasta')).toBeInTheDocument();
  });

  test('should render ingredients section', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText(/Pasta, eggs, bacon, cheese/)).toBeInTheDocument();
  });

  test('should have a link or button to view details', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const detailButton = screen.queryByRole('button', { name: /view|details/i }) 
      || screen.queryByRole('link');
    expect(detailButton).toBeInTheDocument();
  });
});
