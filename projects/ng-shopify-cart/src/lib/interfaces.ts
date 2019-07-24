import { MemoizedSelector } from '@ngrx/store';
import { DefaultProjectorFn } from '@ngrx/store/src/selector';

export interface INgShopifyCartConfig {
  refreshCartAction?: string;
  selectUserAccessToken?: MemoizedSelector<
    any,
    string | null,
    DefaultProjectorFn<any>
  >;
}
