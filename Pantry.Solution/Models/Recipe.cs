using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Pantry.Models;

public class Recipe
{
  public int RecipeId { get; set; }
  [Required]
  public string Title { get; set; }
  public List<IngredientRecipe> IngredientRecipes { get; }
  public ApplicationUser User { get; set; }
}