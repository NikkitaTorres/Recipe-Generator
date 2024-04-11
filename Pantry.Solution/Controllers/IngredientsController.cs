using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pantry.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;

namespace Pantry.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController : Controller
    {
        private readonly PantryContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public IngredientsController(UserManager<ApplicationUser> userManager, PantryContext db)
        {
            _db = db;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("Ingredients")]
        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var currentUser = await _userManager.FindByIdAsync(userId);
                var userIngredients = await _db.Ingredients
                                              .Where(entry => entry.User.Id == currentUser.Id)
                                              .ToListAsync();
                return Ok(userIngredients);
            }
            else
            {
                var ingredients = await _db.Ingredients.ToListAsync();
                return Ok(ingredients);
            }
        }

        // Use IActionResult for APIs returning data
        [HttpPost("AddIngredient")]
        public async Task<IActionResult> Create([FromBody] Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUser = await _userManager.FindByIdAsync(userId);
            ingredient.User = currentUser;
            _db.Ingredients.Add(ingredient);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Index), new { id = ingredient.IngredientId }, ingredient);
        }

        // Use IActionResult and proper API conventions
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ingredient = await _db.Ingredients.FindAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }
            _db.Ingredients.Remove(ingredient);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}