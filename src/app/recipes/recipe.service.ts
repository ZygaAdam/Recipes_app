import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

  private  recipes: Recipe[] = [
        new Recipe('A Burger', 'This is simply a test',
         'https://sallysbakingaddiction.com/wp-content/uploads/2018/07/best-black-bean-burgers-2.jpg', [
           new Ingredient('meat', 1),
           new Ingredient('french fries', 111)
         ]),
        new Recipe('Another Test Recipe', 
        'This is simply another test', 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgkGFpR0hrbR9iCg3EmkSKhtBK90bpJiBXA6TXwiRkWFFCOX38Q', [
          new Ingredient('meat', 1),
          new Ingredient('cheese', 12)
        ])
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipes(){
        return this.recipes.slice()
    }

    getRecipe(index: number){
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.slService.addIngrediets(ingredients);
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe:Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }

}