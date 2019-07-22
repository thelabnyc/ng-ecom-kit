import { IProduct } from './interfaces';

function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

export const filteredProducts = (
  products: IProduct[],
  selectedFilters: {
    id: number;
    isVariant: boolean;
  }[],
  filterMenuItems
) => {
  products = products.filter(product => product.variant_set);
  // Seperate and flatten selected filters into product and variant lists
  const selectedProductFilters = selectedFilters
    .filter(filter => filter.isVariant === false)
    .map(filter => filter.id);
  const selectedVariantFilters = selectedFilters
    .filter(filter => filter.isVariant === true)
    .map(filter => filter.id);

  // Get list of attributes that have at least 1 option filtered
  const activeMenuAttributes = filterMenuItems.filter(menuItem => {
    if (menuItem.filterProductAttribute) {
      if (
        menuItem.options.find(option =>
          selectedProductFilters.includes(option.id)
        )
      ) {
        return true;
      }
    } else {
      if (
        menuItem.options.find(option => {
          return selectedVariantFilters.includes(option.id);
        })
      ) {
        return true;
      }
    }
  });

  // Construct an array of product arrays for each menu attribute.
  // This will result in products that would filter match for each menu attribute
  const productsPerMenuAttribute: IProduct[][] = [];
  activeMenuAttributes.forEach(menuAttribute => {
    // For each menu attribute, determine which products would be allowed.
    // Each attribute is AND'ed together later on. Each product must match each filter
    const filteredProducts = products.filter(product => {
      // Just flattening this data
      const productValues = product.productmeta.productoptionvalue_set.map(
        value => value.value
      );
      const variantValues: number[] = flatten(
        product.variant_set.map(variant =>
          variant.variantoptionvalue_set.map(value => value.value)
        )
      );
      if (menuAttribute.filterProductAttribute) {
        // List of option ids for this menu item (attribute)
        const attributeOptions = menuAttribute.filterProductAttribute.producttypeoption_set.map(
          option => option.id
        );
        // Make a list of the options that the user selected just for this one menu item (attribute)
        const selectedAttributeOptions = attributeOptions.filter(
          attributeOption => {
            return selectedProductFilters.includes(attributeOption);
          }
        );
        // Now find the products that match this menu attribute option selections
        if (
          productValues.find(
            productValue =>
              selectedAttributeOptions.includes(productValue) === true
          )
        ) {
          return true;
        }
      } else if (menuAttribute.filterVariantAttribute) {
        // Do the same thing but for variant level attributes
        const attributeOptions = menuAttribute.filterVariantAttribute.producttypevariantoption_set.map(
          option => option.id
        );
        const selectedAttributeOptions = attributeOptions.filter(
          attributeOption => {
            return selectedVariantFilters.includes(attributeOption);
          }
        );
        if (
          variantValues.find(
            variantValue =>
              selectedAttributeOptions.includes(variantValue) === true
          )
        ) {
          return true;
        }
      }
    });
    productsPerMenuAttribute.push(filteredProducts);
  });
  // AND all the attribute matching products together
  // ie the product must exist in each and every product list of each menu attribute.
  // If product A is in menu attribute list 1 but not 2 - it doesn't match!
  return products.filter(product => {
    let include = true;
    productsPerMenuAttribute.forEach(matchedProducts => {
      if (
        !matchedProducts
          .map(matchedProduct => matchedProduct.id)
          .includes(product.id)
      ) {
        include = false;
      }
    });
    return include;
  });
};

export const filterProductsCount = (products: IProduct[]) => products.length;

export const filteredSortedProducts = (products: IProduct[], sortBy) => {
  if (sortBy === 'Newest') {
    return products.sort((productA, productB) => {
      return (
        new Date(productB.created_at).getTime() -
        new Date(productA.created_at).getTime()
      );
    });
  } else if (sortBy === 'Price: High to Low') {
      return products.sort((productA, productB) => {
        if (productB.variant_set.length && productA.variant_set.length) {
          const productAReduced = productA.variant_set.reduce(
            (acc, product) => parseInt(product.price, 10) > acc ? acc = parseInt(product.price, 10) : acc, 0);
          const productBReduced = productB.variant_set.reduce(
            (acc, product) => parseInt(product.price, 10) > acc ? acc = parseInt(product.price, 10) : acc, 0);

          return productBReduced - productAReduced;
        }
      });
  } else if (sortBy === 'Price: Low to High') {
    return products.sort((productA, productB) => {
      if (productB.variant_set.length && productA.variant_set.length) {
        const productAReduced = productA.variant_set.reduce(
          (acc, product) => acc ?
            (parseInt(product.price, 10) < acc ? acc = parseInt(product.price, 10) : acc)
            : parseInt(product.price, 10), 0);
        const productBReduced = productB.variant_set.reduce(
          (acc, product) => acc ?
            (parseInt(product.price, 10) < acc ? acc = parseInt(product.price, 10) : acc)
            : parseInt(product.price, 10), 0);

        return productAReduced - productBReduced;
      }
    });
  }
  return products;
};
