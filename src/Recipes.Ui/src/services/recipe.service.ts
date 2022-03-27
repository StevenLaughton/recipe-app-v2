import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {RecipeListItem} from "../models/recipe-list-item";
import {Recipe} from "../models/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService {

  constructor(private readonly httpService: HttpClient) {
    super({controller: 'Recipes'});
  }

  public getList(): Observable<RecipeListItem[]> {
    return this.httpService.get<RecipeListItem[]>(this.url('GetList'));
  }

  public get({recipeId}: RecipeListItem): Observable<Recipe> {
    return this.httpService.get(this.url(`Get/${recipeId}`))
  }
}
