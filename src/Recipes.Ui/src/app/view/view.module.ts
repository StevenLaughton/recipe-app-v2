import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewPage} from "./view.page";
import {ViewPageRoutingModule} from "./view-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ViewPageRoutingModule,
  ],
  declarations: [ViewPage],
  entryComponents: [ViewPage]
})
export class ViewPageModule {
}
