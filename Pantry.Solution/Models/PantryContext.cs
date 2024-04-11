using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Pantry.Models
{
    public class PantryContext : IdentityDbContext<IdentityUser>
    {
      
        public DbSet<Ingredient> Ingredients { get; set; }
       

        public PantryContext(DbContextOptions<PantryContext> options) : base(options)
        {
        }
    }
}