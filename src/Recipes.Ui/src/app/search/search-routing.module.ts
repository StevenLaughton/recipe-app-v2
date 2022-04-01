import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPage} from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage,
    data: {recipe: null}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {
}
