import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ApplicationInsightsService} from "./application-insights.service";
import {catchError} from "rxjs/operators";
import {TestModel} from "../models/test.model";
import {environment} from "../environments/environment";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService {

  constructor(private readonly httpService: HttpClient) {
    super({controller: 'Recipes'});
  }

  public get2(): Observable<TestModel> {
    return this.httpService.get<TestModel>(this.Url('GetRecipe2'));
  }
}
