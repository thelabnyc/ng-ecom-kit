import {
  selectFilterMenuItems,
  selectFilteredSortedProducts
} from "./product-list.selectors";
import { createProductListState } from "./test-data";
import { createCMSState } from "../../cms/test-data";
import * as products from "../../cms/test-json/products.json";
import { SortBy } from "./product-list.interfaces";
import { reducer } from "../../cms/products/products.reducer";
import { SetProducts } from "../../cms/products/products.actions";

describe("ProductList Selectors", () => {
  let data: any;
  const setProductsAction = new SetProducts(
    products.map(product => {
      return {
        ...product,
        created_at: new Date(product.created_at)
      };
    })
  );

  beforeEach(() => {
    data = {
      product: {
        productList: createProductListState()
      },
      cms: createCMSState()
    };
  });

  it("selects filter menu items", () => {
    const menuItems = selectFilterMenuItems(data);
    expect(menuItems[0].filterVariantAttribute).toBeTruthy();
  });

  it("Sorts by newest", () => {
    // Note tests like these mutate state and don't work with multiple reselects
    data.cms.products = reducer(data.cms.products, setProductsAction);
    data.product.productList.sortBy = SortBy.Newest;
    const sorted = selectFilteredSortedProducts(data);
    expect(sorted[0].id).toBe(1);
  });

  it("Sorts low to high", () => {
    data.cms.products = reducer(data.cms.products, setProductsAction);
    data.product.productList.sortBy = SortBy["Price: Low to High"];
    const sorted = selectFilteredSortedProducts(data);
    expect(sorted[0].id).toBe(2);
  });
});
