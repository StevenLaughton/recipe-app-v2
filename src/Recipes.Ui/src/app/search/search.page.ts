import {Component, OnInit} from '@angular/core';
import {IonRouterOutlet} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {tap} from "rxjs/operators";
import {of} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private readonly routerOutlet: IonRouterOutlet,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.pipe(untilDestroyed(this), tap(a => console.log(a))).subscribe();
  }

  append(): void {
    this.route['data']['recipe'] = of(1)
  }
}
