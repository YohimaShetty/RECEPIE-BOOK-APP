import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const response = await api.patch(`/recipes/${id}/favorite`);
      setRecipe({ ...recipe, is_favorite: response.data.is_favorite });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.delete(`/recipes/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="loading">Recipe not found</div>;
  }

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail-card">
        <div className="recipe-header">
          <div>
            <h1>{recipe.title}</h1>
            {recipe.description && <p className="recipe-subtitle">{recipe.description}</p>}
          </div>
          <button onClick={handleToggleFavorite} className="favorite-btn-large">
            {recipe.is_favorite ? '❤️' : '🤍'}
          </button>
        </div>

        {recipe.image_url && (
          <img src={recipe.image_url} alt={recipe.title} className="recipe-detail-image" />
        )}

        <div className="recipe-meta-bar">
          {recipe.category && (
            <span className="meta-item">
              <strong>Category:</strong> {recipe.category}
            </span>
          )}
          {recipe.prep_time && (
            <span className="meta-item">
              <strong>Prep:</strong> {recipe.prep_time} min
            </span>
          )}
          {recipe.cook_time && (
            <span className="meta-item">
              <strong>Cook:</strong> {recipe.cook_time} min
            </span>
          )}
          {recipe.servings && (
            <span className="meta-item">
              <strong>Servings:</strong> {recipe.servings}
            </span>
          )}
          {recipe.rating > 0 && (
            <span className="meta-item">
              <strong>Rating:</strong> {'⭐'.repeat(recipe.rating)}
            </span>
          )}
        </div>

        <div className="recipe-content">
          <div className="ingredients-section">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2>Instructions</h2>
            <p className="instructions-text">{recipe.instructions}</p>
          </div>
        </div>

        <div className="recipe-actions">
          <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-edit-large">
            Edit Recipe
          </Link>
          <button onClick={handleDelete} className="btn btn-delete-large">
            Delete Recipe
          </button>
          <button onClick={() => navigate('/')} className="btn btn-back">
            Back to Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
