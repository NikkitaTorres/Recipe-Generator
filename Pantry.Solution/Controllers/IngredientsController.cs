using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pantry.Models;
using Microsoft.EntityFrameworkCore;

namespace Pantry.Controllers
{

public class IngredientsController : Controller
{
private readonly PantryContext _db;

        public IngredientsController(PantryContext db)
        {
            _db = db;
        }

        public ActionResult Index()
        {
            List<Ingredient> model = _db.Ingredients
                .Include(i => i.IngredientRecipes)
                .ToList();
            return View(model);
        }

        public ActionResult Create()
        {
            return View(new Ingredient()); // Removed SetIngredient method call
        }

        [HttpPost]
        public ActionResult Create(Ingredient ingredient)
        {
            if (!ModelState.IsValid)
            {
                return View(ingredient); // Removed SetIngredient method call
            }
            _db.Ingredients.Add(ingredient);
            _db.SaveChanges();
            return RedirectToAction("Details", new { id = ingredient.IngredientId });
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

  [HttpPost]
  public ActionResult Delete(int id)
  {
    Ingredient target = _db.Ingredients.Include(i => i.IngredientRecipes).FirstOrDefault(i => i.IngredientId == id);
    if(target.IngredientRecipes.Count == 0)
    {
      _db.Ingredients.Remove(target);
      _db.SaveChanges();
      return RedirectToAction("Index");
    }
    else
    {
      return RedirectToAction("Details", new { id = target.IngredientId});
    }
  }
}
}