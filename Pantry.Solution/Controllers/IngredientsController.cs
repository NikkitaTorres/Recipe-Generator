using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pantry.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity; // Add this for UserManager<>
using System.Threading.Tasks; // Add this for Task<>
using System.Security.Claims; // Add this for Claims
using System.Collections.Generic;
using System.Linq;



namespace Pantry.Controllers
{
  
[Authorize]
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
        public async Task<ActionResult> Index()
        {
          if (User.Identity.IsAuthenticated)
          {
            string UserName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
           ApplicationUser currentUser = await _userManager.FindByIdAsync(UserName);
           List<Ingredient> userIngredients = _db.Ingredients.Where(entry => entry.User.UserName == currentUser.UserName).ToList();

          return View(userIngredients);
          }
          else
          {
            return View(_db.Ingredients.ToList());
          }
        }

        public ActionResult Create()
        {
           return View(); // Removed SetIngredient method call
        }

        [HttpPost]
    public async Task<ActionResult> Create(Ingredient ingredient) 
{
    if (!ModelState.IsValid)
    {
        return View(ingredient);
    }
        else
      {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        ApplicationUser currentUser = await _userManager.FindByIdAsync(userId);
        ingredient.User = currentUser;
        _db.Ingredients.Add(ingredient);
        await _db.SaveChangesAsync();  // Use async version of SaveChanges
        return RedirectToAction("Index");
    }
}
  // public ActionResult Edit(int id)
  // {
  //   Ingredient target = _db.Ingredients.FirstOrDefault(i => i.IngredientId == id);
  //   //return View(SetIngredient(target, "Edit"));
  // }
  // [HttpPost]
  // public ActionResult Edit(Ingredient ingredient)
  // {
  //   if (!ModelState.IsValid)
  //   {
  //     return View(SetIngredient(ingredient, "Edit"));
  //   }
  //   _db.Ingredients.Update(ingredient);
  //   _db.SaveChanges();
  //   return RedirectToAction("Details", new { id = ingredient.IngredientId});
  // }

  // public ActionResult Details(int id)
  // {
  //   Ingredient ingredient = _db.Ingredients
  //   .Include(i => i.IngredientRecipes)
  //   .ThenInclude(iR => iR.Recipe)
  //   .FirstOrDefault(i => i.IngredientId == id);
  //   return View(ingredient);
  // }

  public ActionResult Delete(int id)
  {
    Ingredient thisIngredient = _db.Ingredients.FirstOrDefault(Ingredient => Ingredient.IngredientId == id);
    return View(thisIngredient);
  }

  [HttpPost, ActionName("Delete")]
  public ActionResult DeleteConfirmed(int id)
  {
    Ingredient thisIngredient = _db.Ingredients.FirstOrDefault(Ingredient => Ingredient.IngredientId == id);
    _db.Ingredients.Remove(thisIngredient);
    _db.SaveChanges();
    return RedirectToAction("Index");
  }
}
}
