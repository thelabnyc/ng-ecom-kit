import {
  filteredSortedProducts
} from "./filterable-grid.selectors";
import { products } from '../products.json';

describe("ProductList Selectors", () => {
  it("Sorts by newest", () => {
    // Note tests like these mutate state and don't work with multiple reselects
    const sorted = filteredSortedProducts(products, 'Newest');
    expect(sorted[0].id).toBe(1);
  });

  it("Sorts low to high", () => {
    const sorted = filteredSortedProducts(products, "Price: Low to High");

    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(3);
    expect(sorted[2].id).toBe(1);
  });

  it("Sorts high to low", () => {
    const sorted = filteredSortedProducts(products, "Price: High to Low");

    expect(sorted[0].id).toBe(1);
    expect(sorted[1].id).toBe(3);
    expect(sorted[2].id).toBe(2);
  });
});
