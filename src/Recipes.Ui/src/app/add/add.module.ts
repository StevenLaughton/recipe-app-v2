import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AddPage} from "./add.page";
import {AddPageRoutingModule} from "./add-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //RouterModule.forChild([{path: '', component: AddPage}]),
    AddPageRoutingModule,
  ],
  declarations: [AddPage],
})
export class Tab3PageModule {
}
