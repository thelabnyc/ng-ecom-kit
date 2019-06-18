/** A selected option for a variant. This variant has red frames. */
interface IVariantOptionValue {
  id: number;
  value: number;
  display_as: string;
}

/** A selected option for a product. This product is good for round faces. */
interface IProductOptionValue {
  id: number;
  value: number;
  display_as: string;
}

export enum SortBy {
  'Newest',
  'Price: Low to High',
  'Price: High to Low'
}

export interface IVariant {
  id: number;
  title: string;
  price: any;
  variantmeta: {
    saleprice: any | null;
    back_ordered: boolean;
    out_of_stock: boolean;
    colorswatchimage: string | null;
    glassesimage: string | null;
    show_in_grid: boolean;
  } | null;
  position: number;
  variantoptionvalue_set: IVariantOptionValue[];
}

export interface IProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  created_at: string;
  variant_set: IVariant[];
  productmeta: {
    product_type_fk: number | null;
    altimage: string;
    productoptionvalue_set: IProductOptionValue[];
    show_in_grid: boolean;
  };
}

export interface IProductTypeVariantOption {
  id: number;
  name: string;
  color: string | null;
  icon: string | null;
  comparison_image: string | null;
  brand_image_1: string | null;
  brand_image_2: string | null;
  brand_image_3: string | null;
  brand_image_4: string | null;
}

export interface IVariantAttribute {
  id: number;
  name: string;
  producttypevariantoption_set: IProductTypeVariantOption[];
}

export interface IProductTypeOption {
  id: number;
  name: string;
  icon: string | null;
}

export interface IAttribute {
  id: number;
  name: string;
  producttypeoption_set: IProductTypeOption[];
}

export interface IProductType {
  id: number;
  name: string;
  variant_attributes: IVariantAttribute[];
  attributes: IAttribute[];
}
