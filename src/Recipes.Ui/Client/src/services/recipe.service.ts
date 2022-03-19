import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ApplicationInsightsService} from "./application-insights.service";
import {catchError} from "rxjs/operators";
import {TestModel} from "../models/test.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  controller: string = 'Recipes';

  constructor(private readonly httpService: HttpClient,
              private readonly applicationInsightsService: ApplicationInsightsService) {
  }

  public get2(): Observable<TestModel> {
    return this.httpService.get<TestModel>(`${this.controller}/GetRecipe2`).pipe(
      catchError((err) => {
        console.log(err)
        this.applicationInsightsService.logException(err)
        return of({response: '2'})
      })
    );
  }
}
