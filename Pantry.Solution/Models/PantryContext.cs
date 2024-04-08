using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Pantry.Models;

public class PantryContext : IdentityDbContext<ApplicationUser>
{
  public DbSet<Recipe> Recipes { get; set; }
  public DbSet<Ingredient> Ingredients { get; set; }
  public DbSet<IngredientRecipe> IngredientRecipes { get; set; }
  public PantryContext(DbContextOptions options) : base(options) { }
}