import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { selectGridProducts } from './grid.selectors';

@Component({
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  constructor(private store: Store<State>) {}
  products$ = this.store.pipe(select(selectGridProducts));
}
