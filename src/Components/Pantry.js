import React, { useState } from 'react';
import OpenAi from './OpenAi';
// Import authentication library if needed

const Pantry = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');

  const addIngredientToPantry = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const removeIngredientFromPantry = (index) => {
    const newIngredients = [...selectedIngredients];
    newIngredients.splice(index, 1);
    setSelectedIngredients(newIngredients);
  };

  const AddIngredientForm = ({ addIngredient }) => {
    const handleSubmit = (event) => {
      event.preventDefault();
      if (ingredientName.trim() !== '') {
        addIngredient(ingredientName.trim());
        setIngredientName('');
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Ingredient name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    );
  };

  return (
    <div>
      <h2>Add Ingredients to your pantry</h2>
      <AddIngredientForm addIngredient={addIngredientToPantry} />

      <h2>My Pantry</h2>
      <ul>
        {selectedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => removeIngredientFromPantry(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Include OpenAI component here */}
      <OpenAi selectedIngredients={selectedIngredients} />
    </div>
  );
};

export default Pantry;