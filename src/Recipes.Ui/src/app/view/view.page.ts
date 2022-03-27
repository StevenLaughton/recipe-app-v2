import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: 'view.page.html',
  styleUrls: ['view.page.scss'],
})
export class ViewPage {
  @Input() recipeId: number;

  constructor(private readonly modalController: ModalController) {
  }

}
