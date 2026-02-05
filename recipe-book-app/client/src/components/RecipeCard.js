import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onToggleFavorite, onDelete }) => {
  return (
    <div className="recipe-card">
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.title} className="recipe-card-image" />
      )}
      <div className="recipe-card-content">
        <div className="recipe-card-header">
          <h3 className="recipe-card-title">{recipe.title}</h3>
          <button 
            onClick={() => onToggleFavorite(recipe.id)}
            className="favorite-btn"
          >
            {recipe.is_favorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        {recipe.description && (
          <p className="recipe-card-description">{recipe.description}</p>
        )}
        
        <div className="recipe-card-meta">
          {recipe.category && (
            <span className="recipe-badge">{recipe.category}</span>
          )}
          {recipe.prep_time && (
            <span className="recipe-time">⏱️ {recipe.prep_time} min</span>
          )}
          {recipe.rating > 0 && (
            <span className="recipe-rating">⭐ {recipe.rating}/5</span>
          )}
        </div>

        <div className="recipe-card-actions">
          <Link to={`/recipe/${recipe.id}`} className="btn btn-view">
            View Recipe
          </Link>
          <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-edit">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(recipe.id)}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
