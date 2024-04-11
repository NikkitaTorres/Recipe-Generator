import React, { useState } from 'react';
import OpenAi from './OpenAi';

const Pantry = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");

  const addIngredientToPantry = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  // const AddIngredientForm = ({  addIngredient }) => {
  //   const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (ingredientName.trim() !== '') {
  //     addIngredient(ingredientName.trim());
  //     setIngredientName('');
  //   }
  // }
  // }

  const AddIngredientForm = ({ addIngredient }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      if (inputValue.trim() !== '') {
        addIngredient(inputValue.trim());
        setInputValue('');
      }
    };


  
  return (
      <div>
        <h2>Add Ingredients to your pantry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter Ingredient name'
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            />
          <button type='submit'>Add</button>
        </form>
      </div>
  )

  const removeIngredientFromPantry = (index) => {
    const newIngredients = [...selectedIngredients];
    newIngredients.splice(index, 1);
    setSelectedIngredients(newIngredients);
  };

  return (
    <div>
      <h2>My Pantry</h2>
      <ul>
        {selectedIngredients.map((ingredient, index) => {
          <li key={index}>
            {ingredient}
            <button onClick={() => removeIngredientFromPantry(index)}>Remove</button>
          </li>

        })}
      </ul>
      <AddIngredientForm addIngredient={addIngredientToPantry} />
      <OpenAi selectedIngredients={selectedIngredients} />
    </div>

    )

}
}


export default Pantry;