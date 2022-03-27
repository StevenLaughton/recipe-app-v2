import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyRecipesPageRoutingModule} from "./my-recipes-routing.module";
import {MyRecipesPage} from "./my-recipes.page";
import {ViewPageModule} from "../view/view.module";
import {ViewPage} from "../view/view.page";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    MyRecipesPageRoutingModule,
    ViewPageModule,
  ],
  declarations: [MyRecipesPage],

})
export class MyRecipesPageModule {
}
