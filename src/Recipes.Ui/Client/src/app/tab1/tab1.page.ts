import {Component} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {Observable} from "rxjs";
import {TestModel} from "../../models/test.model";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  test$: Observable<TestModel>;

  constructor(private readonly recipeService: RecipeService) {
    this.test$ = recipeService.get2();
  }
}
