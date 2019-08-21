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
        name: 'Node',
        possibleTypes: [
          {
            name: 'Article'
          },
          {
            name: 'Blog'
          },
          {
            name: 'Comment'
          },
          {
            name: 'Collection'
          },
          {
            name: 'Product'
          },
          {
            name: 'Metafield'
          },
          {
            name: 'ProductVariant'
          },
          {
            name: 'ProductOption'
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
            name: 'Payment'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'HasMetafields',
        possibleTypes: [
          {
            name: 'Product'
          },
          {
            name: 'ProductVariant'
          }
        ]
      },
      {
        kind: 'UNION',
        name: 'MetafieldParentResource',
        possibleTypes: [
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
            name: 'PricingPercentageValue'
          },
          {
            name: 'MoneyV2'
          }
        ]
      },
      {
        kind: 'INTERFACE',
        name: 'DisplayableError',
        possibleTypes: [
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
