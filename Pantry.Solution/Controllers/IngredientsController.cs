using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pantry.Models;

namespace Pantry.Controllers;

[Authorize]
public class IngredientsController : Controller
{
  private readonly PantryContext _db;
  private readonly UserManager<ApplicationUser> _userManager;
  public IngredientsController(UserManager<ApplicationUser> userManager, PantryContext db)
  {
    _userManager = userManager;
    _db = db;
  }
  [AllowAnonymous]
  public ActionResult Index()
  {
    List<Ingredient> userIngredients = _db.Ingredients.Where(entry => entry.User.Id == currentUser.Id).ToList();
    if (User.Identity.IsAuthenticated)
    {
      string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      ApplicationUser currentUser = await _userManager.FindByIdAsync(userId);

      return View(new model
      {
        UserIngredients = userIngredients,
      });
    }
    return View(new model);
  }

  public ActionResult Create()
  {
    return View(Ingredient(new Ingredient(), "Create"));
  }

  [HttpPost]
  public async Task<ActionResult> Create(Ingredient ingredient)
  {
    if (!ModelState.IsValid)
    {
      return View(UserIngredient(ingredient, "Create"));
    }
    else
    {
      string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      ApplicationUser currentUser = await _userManager.FindByIdAsync(userId);
      ingredient.User = currentUser;
      _db.Ingredients.Add(ingredient);
      _db.SaveChanges();
      return RedirectToAction("Index");
    }
  }

  //Do we need edit and details?

  // public ActionResult Edit(int id)
  // {
  //   Ingredient target = _db.Ingredients.FirstOrDefault(i => i.IngredientId == id);
  //   return View(SetIngredient(target, "Edit"));
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
  //   .Include(i => i.IngredientIngredients)
  //   .ThenInclude(iR => iR.Ingredient)
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
