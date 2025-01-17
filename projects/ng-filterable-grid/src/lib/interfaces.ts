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

export type SortBy = 'Newest' | 'Price: Low to High' | 'Price: High to Low';

export interface VariantMeta {
  variantoptionvalue_set: IVariantOptionValue[];
}

export interface IVariant<Meta extends VariantMeta = VariantMeta> {
  id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  variantmeta: Meta;
  position: number;
}

export interface ProductMeta {
  product_type_fk: number;
  productoptionvalue_set: IProductOptionValue[];
  [key: string]: any;
}

export interface IProduct<
  Meta extends ProductMeta = ProductMeta,
  Variant = IVariant
> {
  id: number;
  title: string;
  handle: string;
  created_at: string;
  variant_set: Variant[];
  productmeta: Meta;
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
