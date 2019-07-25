export interface INgShopifyCartConfig {
  refreshCartAction?: string;
  selectUserAccessToken?: (state: any) => string | null;
}
export interface IVariantIdQuantity {
  variantId: string;
  quantity: number;
}
