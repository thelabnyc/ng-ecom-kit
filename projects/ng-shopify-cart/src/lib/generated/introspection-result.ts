export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'HasMetafields',
        possibleTypes: [
          {
            name: 'Article'
          },
          {
            name: 'Blog'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Product'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'Customer'
          },
          {
            name: 'Order'
          },
          {
            name: 'Page'
          },
          {
            name: 'Shop'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'Node',
        possibleTypes: [
          {
            name: 'Article'
          },
          {
            name: 'Metafield'
          },
          {
            name: 'Blog'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Product'
          },
          {
            name: 'ProductOption'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'Location'
          },
          {
            name: 'MailingAddress'
          },
          {
            name: 'Checkout'
          },
          {
            name: 'AppliedGiftCard'
          },
          {
            name: 'CheckoutLineItem'
          },
          {
            name: 'Order'
          },
          {
            name: 'Page'
          },
          {
            name: 'ShopPolicy'
          },
          {
            name: 'MediaImage'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Cart'
          },
          {
            name: 'CartLine'
          },
          {
            name: 'Payment'
          },
          {
            name: 'ExternalVideo'
          },
          {
            name: 'Model3d'
          },
          {
            name: 'Video'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'MetafieldParentResource',
        possibleTypes: [
          {
            name: 'Article'
          },
          {
            name: 'Blog'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Customer'
          },
          {
            name: 'Order'
          },
          {
            name: 'Page'
          },
          {
            name: 'Product'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'Shop'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'OnlineStorePublishable',
        possibleTypes: [
          {
            name: 'Article'
          },
          {
            name: 'Blog'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Product'
          },
          {
            name: 'Page'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'Media',
        possibleTypes: [
          {
            name: 'MediaImage'
          },
          {
            name: 'ExternalVideo'
          },
          {
            name: 'Model3d'
          },
          {
            name: 'Video'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'SellingPlanPriceAdjustmentValue',
        possibleTypes: [
          {
            name: 'SellingPlanFixedAmountPriceAdjustment'
          },
          {
            name: 'SellingPlanFixedPriceAdjustment'
          },
          {
            name: 'SellingPlanPercentagePriceAdjustment'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'DiscountApplication',
        possibleTypes: [
          {
            name: 'AutomaticDiscountApplication'
          },
          {
            name: 'DiscountCodeApplication'
          },
          {
            name: 'ManualDiscountApplication'
          },
          {
            name: 'ScriptDiscountApplication'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'PricingValue',
        possibleTypes: [
          {
            name: 'MoneyV2'
          },
          {
            name: 'PricingPercentageValue'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'MetafieldReference',
        possibleTypes: [
          {
            name: 'MediaImage'
          },
          {
            name: 'Page'
          },
          {
            name: 'Product'
          },
          {
            name: 'ProductVariant'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'CartDiscountAllocation',
        possibleTypes: [
          {
            name: 'CartAutomaticDiscountAllocation'
          },
          {
            name: 'CartCodeDiscountAllocation'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'Merchandise',
        possibleTypes: [
          {
            name: 'ProductVariant'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'DisplayableError',
        possibleTypes: [
          {
            name: 'CartUserError'
          },
          {
            name: 'CheckoutUserError'
          },
          {
            name: 'UserError'
          },
          {
            name: 'CustomerUserError'
          }
        ]
      }
    ]
  }
};

export default result;
