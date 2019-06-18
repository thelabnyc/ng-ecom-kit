import {
  filteredSortedProducts
} from "./filterable-grid.selectors";
import { products } from '../products.json';
import { SortBy } from './interfaces';

describe("ProductList Selectors", () => {
  it("Sorts by newest", () => {
    // Note tests like these mutate state and don't work with multiple reselects
    const sorted = filteredSortedProducts(products, SortBy.Newest);
    expect(sorted[0].id).toBe(1);
  });

  it("Sorts low to high", () => {
    const sorted = filteredSortedProducts(products, SortBy["Price: Low to High"]);
    expect(sorted[0].id).toBe(2);
  });
});
