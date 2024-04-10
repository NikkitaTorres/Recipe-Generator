using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Pantry.Models
{
    public class PantryContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<IngredientRecipe> IngredientRecipes { get; set; }

        public PantryContext(DbContextOptions<PantryContext> options) : base(options)
        {
        }
    }
}