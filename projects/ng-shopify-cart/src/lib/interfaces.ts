export interface INgShopifyCartConfig {
  refreshCartAction?: string;
  selectUserAccessToken?: (state: any) => string | null;
}
export interface IVariantIdQuantity {
  variantId: number;
  quantity: number;
}

export interface IVariantShopifyIdQuantity {
  variantId: string;
  quantity: number;
}

export interface IDiscount {
  amount: string; // float with 2 digits after decimal (10.00)
  name: string;
  canRemove: boolean; // discount codes can be removed, other discounts can only be replaced with a discount code
}
