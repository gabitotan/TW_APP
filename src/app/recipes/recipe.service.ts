import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

//    private recipes: Recipe[] = [
//         new Recipe(
//             'Schnitzel', 
//             'Schnitzel vienez - yummy!', 
//             'https://www.vienna-unwrapped.com/wp-content/uploads/2014/03/wiener_schnitzel_04.jpg',
//             [
//                 new Ingredient('Carne', 1),
//                 new Ingredient('Cartofi prajiti', 20)
//             ]),
//         new Recipe(
//             'Burger Mare', 
//             'Ce altceva mai vrei?', 
//             'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/07/best-black-bean-burgers-2.jpg',
//             [
//                 new Ingredient('Paine', 2),
//                 new Ingredient('Carne', 1),
//                 new Ingredient('Sos', 1),
//                 new Ingredient('Salata', 2)
//             ])
//       ];

    private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngrToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
}