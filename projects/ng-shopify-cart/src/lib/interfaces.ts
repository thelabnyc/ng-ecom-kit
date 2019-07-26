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
