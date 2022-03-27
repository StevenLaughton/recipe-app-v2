import {Component, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {RecipeListItem} from "../../models/recipe-list-item";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {filter, tap} from "rxjs/operators";
import {ViewPage} from "../view/view.page";

@UntilDestroy()
@Component({
  selector: 'app-my-recipes',
  templateUrl: 'my-recipes.page.html',
  styleUrls: ['my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {
  list$: Observable<RecipeListItem[]>;

  arr = [...Array(20).keys()];

  constructor(private readonly recipeService: RecipeService,
              private readonly routerOutlet: IonRouterOutlet,
              private readonly modalController: ModalController,
              private readonly router: Router) {
    this.list$ = recipeService.getList();
  }

  ngOnInit(): void {
    this.routerOutlet.activatedRoute.params.pipe(
      untilDestroyed(this),
      filter(params => !!params.id),
      tap(param => this.presentModal()),
    ).subscribe();
  }

  openRecipe(): void {
    this.router.navigate(['./'], {
      relativeTo: this.routerOutlet.activatedRoute,
      queryParams: {params: 1},
      skipLocationChange: true,
    })
  }

  segmentChanged(val: any): void {
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ViewPage,
      swipeToClose: true,
      handle: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    modal.onDidDismiss().then(_ => this.router.navigate(['../'], {
      relativeTo: this.routerOutlet.activatedRoute,
    }))

    return await modal.present();
  }
}
