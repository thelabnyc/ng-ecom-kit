/* tslint:disable */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Scalars
// ====================================================

/** An RFC 3986 and RFC 3987 compliant URI string. */
export type Url = any;

/** A string containing HTML code. */
export type Html = any;

/** An ISO-8601 encoded UTC date time string. */
export type DateTime = any;

/** A signed decimal number, which supports arbitrary precision and is serialized as a string. */
export type Decimal = any;

/** A monetary value string. */
export type Money = any;

// ====================================================
// Interfaces
// ====================================================

/** An object with an ID to support global identification. */
export interface Node {
  /** Globally unique identifier. */
  id: string;
}
/** Discount applications capture the intentions of a discount source atthe time of application. */
export interface DiscountApplication {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
}
/** Represents an error in the input of a mutation. */
export interface DisplayableError {
  /** Path to the input field which caused the error. */
  field?: string[] | null;
  /** The error message. */
  message: string;
}

// ====================================================
// Types
// ====================================================

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export interface QueryRoot {
  /** List of the shop's articles. */
  articles: ArticleConnection;
  /** Find a blog by its handle. */
  blogByHandle?: Blog | null;
  /** List of the shop's blogs. */
  blogs: BlogConnection;
  /** Find a collection by its handle. */
  collectionByHandle?: Collection | null;
  /** List of the shop’s collections. */
  collections: CollectionConnection;

  customer?: Customer | null;

  node?: Node | null;

  nodes: (Node | null)[];
  /** Find a page by its handle. */
  pageByHandle?: Page | null;
  /** List of the shop's pages. */
  pages: PageConnection;
  /** Find a product by its handle. */
  productByHandle?: Product | null;
  /** Tags added to products.Additional access scope required: unauthenticated_read_product_tags. */
  productTags: StringConnection;
  /** List of the shop’s product types. */
  productTypes: StringConnection;
  /** List of the shop’s products. */
  products: ProductConnection;

  shop: Shop;
}

export interface ArticleConnection {
  /** A list of edges. */
  edges: ArticleEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface ArticleEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ArticleEdge. */
  node: Article;
}

export interface Article extends Node {
  /** The article's author. */
  author: ArticleAuthor;
  /** The article's author. */
  authorV2?: ArticleAuthor | null;
  /** The blog that the article belongs to. */
  blog: Blog;
  /** List of comments posted on the article. */
  comments: CommentConnection;
  /** Stripped content of the article, single line with HTML tags removed. */
  content: string;
  /** The content of the article, complete with HTML formatting. */
  contentHtml: Html;
  /** Stripped excerpt of the article, single line with HTML tags removed. */
  excerpt?: string | null;
  /** The excerpt of the article, complete with HTML formatting. */
  excerptHtml?: Html | null;
  /** A human-friendly unique string for the Article automatically generated from its title. */
  handle: string;
  /** Globally unique identifier. */
  id: string;
  /** The image associated with the article. */
  image?: Image | null;
  /** The date and time when the article was published. */
  publishedAt: DateTime;
  /** A categorization that a article can be tagged with. */
  tags: string[];
  /** The article’s name. */
  title: string;
  /** The url pointing to the article accessible from the web. */
  url: Url;
}

export interface ArticleAuthor {
  /** The author's bio. */
  bio?: string | null;
  /** The author’s email. */
  email: string;
  /** The author's first name. */
  firstName: string;
  /** The author's last name. */
  lastName: string;
  /** The author's full name. */
  name: string;
}

export interface Blog extends Node {
  /** Find an article by its handle. */
  articleByHandle?: Article | null;
  /** List of the blog's articles. */
  articles: ArticleConnection;
  /** The authors who have contributed to the blog. */
  authors: ArticleAuthor[];
  /** A human-friendly unique string for the Blog automatically generated from its title. */
  handle: string;
  /** Globally unique identifier. */
  id: string;
  /** The blogs’s title. */
  title: string;
  /** The url pointing to the blog accessible from the web. */
  url: Url;
}

export interface CommentConnection {
  /** A list of edges. */
  edges: CommentEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface CommentEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of CommentEdge. */
  node: Comment;
}

export interface Comment extends Node {
  /** The comment’s author. */
  author: CommentAuthor;
  /** Stripped content of the comment, single line with HTML tags removed. */
  content: string;
  /** The content of the comment, complete with HTML formatting. */
  contentHtml: Html;
  /** Globally unique identifier. */
  id: string;
}

export interface CommentAuthor {
  /** The author's email. */
  email: string;
  /** The author’s name. */
  name: string;
}
/** Information about pagination in a connection. */
export interface PageInfo {
  /** Indicates if there are more pages to fetch. */
  hasNextPage: boolean;
  /** Indicates if there are any pages prior to the current page. */
  hasPreviousPage: boolean;
}
/** Represents an image resource. */
export interface Image {
  /** A word or phrase to share the nature or contents of an image. */
  altText?: string | null;
  /** A unique identifier for the image. */
  id?: string | null;
  /** The location of the original image as a URL.If there are any existing transformations in the original source URL, they will remain and not be stripped. */
  originalSrc: Url;
  /** The location of the image as a URL. */
  src: Url;
  /** The location of the transformed image as a URL.All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.Otherwise any transformations which an image type does not support will be ignored. */
  transformedSrc: Url;
}

export interface BlogConnection {
  /** A list of edges. */
  edges: BlogEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface BlogEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of BlogEdge. */
  node: Blog;
}
/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export interface Collection extends Node {
  /** Stripped description of the collection, single line with HTML tags removed. */
  description: string;
  /** The description of the collection, complete with HTML formatting. */
  descriptionHtml: Html;
  /** A human-friendly unique string for the collection automatically generated from its title.Limit of 255 characters. */
  handle: string;
  /** Globally unique identifier. */
  id: string;
  /** Image associated with the collection. */
  image?: Image | null;
  /** List of products in the collection. */
  products: ProductConnection;
  /** The collection’s name. Limit of 255 characters. */
  title: string;
  /** The date and time when the collection was last modified. */
  updatedAt: DateTime;
}

export interface ProductConnection {
  /** A list of edges. */
  edges: ProductEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface ProductEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ProductEdge. */
  node: Product;
}
/** A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export interface Product extends Node {
  /** Indicates if at least one product variant is available for sale. */
  availableForSale: boolean;
  /** List of collections a product belongs to. */
  collections: CollectionConnection;
  /** The date and time when the product was created. */
  createdAt: DateTime;
  /** Stripped description of the product, single line with HTML tags removed. */
  description: string;
  /** The description of the product, complete with HTML formatting. */
  descriptionHtml: Html;
  /** A human-friendly unique string for the Product automatically generated from its title.They are used by the Liquid templating language to refer to objects. */
  handle: string;
  /** Globally unique identifier. */
  id: string;
  /** List of images associated with the product. */
  images: ImageConnection;
  /** The online store URL for the product.A value of `null` indicates that the product is not published to the Online Store sales channel. */
  onlineStoreUrl?: Url | null;
  /** List of custom product options (maximum of 3 per product). */
  options: ProductOption[];
  /** The price range. */
  priceRange: ProductPriceRange;
  /** A categorization that a product can be tagged with, commonly used for filtering and searching. */
  productType: string;
  /** The date and time when the product was published to the channel. */
  publishedAt: DateTime;
  /** A categorization that a product can be tagged with, commonly used for filtering and searching.Additional access scope required for private apps: unauthenticated_read_product_tags. */
  tags: string[];
  /** The product’s title. */
  title: string;
  /** The date and time when the product was last modified. */
  updatedAt: DateTime;
  /** Find a product’s variant based on its selected options.This is useful for converting a user’s selection of product options into a single matching variant.If there is not a variant for the selected options, `null` will be returned. */
  variantBySelectedOptions?: ProductVariant | null;
  /** List of the product’s variants. */
  variants: ProductVariantConnection;
  /** The product’s vendor name. */
  vendor: string;
}

export interface CollectionConnection {
  /** A list of edges. */
  edges: CollectionEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface CollectionEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of CollectionEdge. */
  node: Collection;
}

export interface ImageConnection {
  /** A list of edges. */
  edges: ImageEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface ImageEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ImageEdge. */
  node: Image;
}
/** Custom product property names like "Size", "Color", and "Material".Products are based on permutations of these options.A product may have a maximum of 3 options.255 characters limit each. */
export interface ProductOption extends Node {
  /** Globally unique identifier. */
  id: string;
  /** The product option’s name. */
  name: string;
  /** The corresponding value to the product option name. */
  values: string[];
}
/** The price range of the product. */
export interface ProductPriceRange {
  /** The highest variant's price. */
  maxVariantPrice: MoneyV2;
  /** The lowest variant's price. */
  minVariantPrice: MoneyV2;
}
/** A monetary value with currency.To format currencies, combine this type's amount and currencyCode fields with your client's locale.For example, in JavaScript you could use Intl.NumberFormat:```jsnew Intl.NumberFormat(locale, {style: 'currency',currency: currencyCode}).format(amount);```Other formatting libraries include:* iOS - [NumberFormatter](https://developer.apple.com/documentation/foundation/numberformatter)* Android - [NumberFormat](https://developer.android.com/reference/java/text/NumberFormat.html)* PHP - [NumberFormatter](http://php.net/manual/en/class.numberformatter.php)For a more general solution, the [Unicode CLDR number formatting database] is available with many implementations(such as [TwitterCldr](https://github.com/twitter/twitter-cldr-rb)). */
export interface MoneyV2 {
  /** Decimal money amount. */
  amount: Decimal;
  /** Currency of the money. */
  currencyCode: CurrencyCode;
}
/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export interface ProductVariant extends Node {
  /** Indicates if the product variant is in stock. */
  available?: boolean | null;
  /** Indicates if the product variant is available for sale. */
  availableForSale: boolean;
  /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`. */
  compareAtPrice?: Money | null;
  /** Globally unique identifier. */
  id: string;
  /** Image associated with the product variant. This field falls back to the product image if no image is available. */
  image?: Image | null;
  /** List of prices and compare-at prices in the presentment currencies for this shop. */
  presentmentPrices: ProductVariantPricePairConnection;
  /** The product variant’s price. */
  price: Money;
  /** The product object that the product variant belongs to. */
  product: Product;
  /** List of product options applied to the variant. */
  selectedOptions: SelectedOption[];
  /** The SKU (stock keeping unit) associated with the variant. */
  sku?: string | null;
  /** The product variant’s title. */
  title: string;
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: number | null;
  /** Unit of measurement for weight. */
  weightUnit: WeightUnit;
}

export interface ProductVariantPricePairConnection {
  /** A list of edges. */
  edges: ProductVariantPricePairEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface ProductVariantPricePairEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ProductVariantPricePairEdge. */
  node: ProductVariantPricePair;
}
/** The compare-at price and price of a variant sharing a currency. */
export interface ProductVariantPricePair {
  /** The compare-at price of the variant with associated currency. */
  compareAtPrice?: MoneyV2 | null;
  /** The price of the variant with associated currency. */
  price: MoneyV2;
}
/** Custom properties that a shop owner can use to define product variants.Multiple options can exist. Options are represented as: option1, option2, option3, etc. */
export interface SelectedOption {
  /** The product option’s name. */
  name: string;
  /** The product option’s value. */
  value: string;
}

export interface ProductVariantConnection {
  /** A list of edges. */
  edges: ProductVariantEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface ProductVariantEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ProductVariantEdge. */
  node: ProductVariant;
}
/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export interface Customer {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: boolean;
  /** A list of addresses for the customer. */
  addresses: MailingAddressConnection;
  /** The date and time when the customer was created. */
  createdAt: DateTime;
  /** The customer’s default address. */
  defaultAddress?: MailingAddress | null;
  /** The customer’s name, email or phone number. */
  displayName: string;
  /** The customer’s email address. */
  email?: string | null;
  /** The customer’s first name. */
  firstName?: string | null;
  /** A unique identifier for the customer. */
  id: string;
  /** The customer's most recently updated, incomplete checkout. */
  lastIncompleteCheckout?: Checkout | null;
  /** The customer’s last name. */
  lastName?: string | null;
  /** The orders associated with the customer. */
  orders: OrderConnection;
  /** The customer’s phone number. */
  phone?: string | null;
  /** A list of tags assigned to the customer.Additional access scope required: unauthenticated_read_customer_tags. */
  tags: string[];
  /** The date and time when the customer information was updated. */
  updatedAt: DateTime;
}

export interface MailingAddressConnection {
  /** A list of edges. */
  edges: MailingAddressEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface MailingAddressEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of MailingAddressEdge. */
  node: MailingAddress;
}
/** Represents a mailing address for customers and shipping. */
export interface MailingAddress extends Node {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: string | null;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: string | null;
  /** The name of the city, district, village, or town. */
  city?: string | null;
  /** The name of the customer's company or organization. */
  company?: string | null;
  /** The name of the country. */
  country?: string | null;
  /** The two-letter code for the country of the address.For example, US. */
  countryCode?: string | null;
  /** The two-letter code for the country of the address.For example, US. */
  countryCodeV2?: CountryCode | null;
  /** The first name of the customer. */
  firstName?: string | null;
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: string[];
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: string | null;
  /** Globally unique identifier. */
  id: string;
  /** The last name of the customer. */
  lastName?: string | null;
  /** The latitude coordinate of the customer address. */
  latitude?: number | null;
  /** The longitude coordinate of the customer address. */
  longitude?: number | null;
  /** The full name of the customer, based on firstName and lastName. */
  name?: string | null;
  /** A unique phone number for the customer.Formatted using E.164 standard. For example, _+16135551111_. */
  phone?: string | null;
  /** The region of the address, such as the province, state, or district. */
  province?: string | null;
  /** The two-letter code for the region.For example, ON. */
  provinceCode?: string | null;
  /** The zip or postal code of the address. */
  zip?: string | null;
}
/** A container for all the information required to checkout items and pay. */
export interface Checkout extends Node {
  appliedGiftCards: AppliedGiftCard[];
  /** The available shipping rates for this Checkout.Should only be used when checkout `requiresShipping` is `true` andthe shipping address is valid. */
  availableShippingRates?: AvailableShippingRates | null;
  /** The date and time when the checkout was completed. */
  completedAt?: DateTime | null;
  /** The date and time when the checkout was created. */
  createdAt: DateTime;
  /** The currency code for the Checkout. */
  currencyCode: CurrencyCode;
  /** A list of extra information that is added to the checkout. */
  customAttributes: Attribute[];
  /** The customer associated with the checkout. */
  customer?: Customer | null;
  /** Discounts that have been applied on the checkout. */
  discountApplications: DiscountApplicationConnection;
  /** The email attached to this checkout. */
  email?: string | null;
  /** Globally unique identifier. */
  id: string;
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems: CheckoutLineItemConnection;

  note?: string | null;
  /** The resulting order from a paid checkout. */
  order?: Order | null;
  /** The Order Status Page for this Checkout, null when checkout is not completed. */
  orderStatusUrl?: Url | null;
  /** The amount left to be paid. This is equal to the cost of the line items, taxes and shipping minus discounts and gift cards. */
  paymentDue: Money;
  /** Whether or not the Checkout is ready and can be completed. Checkouts may have asynchronous operations that can take time to finish. If you want to complete a checkout or ensure all the fields are populated and up to date, polling is required until the value is true. */
  ready: boolean;
  /** States whether or not the fulfillment requires shipping. */
  requiresShipping: boolean;
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: MailingAddress | null;
  /** The discounts that have been allocated onto the shipping line by discount applications. */
  shippingDiscountAllocations: DiscountAllocation[];
  /** Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object. */
  shippingLine?: ShippingRate | null;
  /** Price of the checkout before shipping and taxes. */
  subtotalPrice: Money;
  /** Specifies if the Checkout is tax exempt. */
  taxExempt: boolean;
  /** Specifies if taxes are included in the line item and shipping line prices. */
  taxesIncluded: boolean;
  /** The sum of all the prices of all the items in the checkout, taxes and discounts included. */
  totalPrice: Money;
  /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
  totalTax: Money;
  /** The date and time when the checkout was last updated. */
  updatedAt: DateTime;
  /** The url pointing to the checkout accessible from the web. */
  webUrl: Url;
}
/** Details about the gift card used on the checkout. */
export interface AppliedGiftCard extends Node {
  /** The amount that was used taken from the Gift Card by applying it. */
  amountUsed: Money;
  /** The amount left on the Gift Card. */
  balance: Money;
  /** Globally unique identifier. */
  id: string;
  /** The last characters of the Gift Card code */
  lastCharacters: string;
}
/** A collection of available shipping rates for a checkout. */
export interface AvailableShippingRates {
  /** Whether or not the shipping rates are ready.The `shippingRates` field is `null` when this value is `false`.This field should be polled until its value becomes `true`. */
  ready: boolean;
  /** The fetched shipping rates. `null` until the `ready` field is `true`. */
  shippingRates?: ShippingRate[] | null;
}
/** A shipping rate to be applied to a checkout. */
export interface ShippingRate {
  /** Human-readable unique identifier for this shipping rate. */
  handle: string;
  /** Price of this shipping rate. */
  price: Money;
  /** Title of this shipping rate. */
  title: string;
}
/** Represents a generic custom attribute. */
export interface Attribute {
  /** Key or name of the attribute. */
  key: string;
  /** Value of the attribute. */
  value?: string | null;
}

export interface DiscountApplicationConnection {
  /** A list of edges. */
  edges: DiscountApplicationEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface DiscountApplicationEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of DiscountApplicationEdge. */
  node: DiscountApplication;
}
/** The value of the percentage pricing object. */
export interface PricingPercentageValue {
  /** The percentage value of the object. */
  percentage: number;
}

export interface CheckoutLineItemConnection {
  /** A list of edges. */
  edges: CheckoutLineItemEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface CheckoutLineItemEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of CheckoutLineItemEdge. */
  node: CheckoutLineItem;
}
/** A single line item in the checkout, grouped by variant and attributes. */
export interface CheckoutLineItem extends Node {
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes: Attribute[];
  /** The discounts that have been allocated onto the checkout line item by discount applications. */
  discountAllocations: DiscountAllocation[];
  /** Globally unique identifier. */
  id: string;
  /** The quantity of the line item. */
  quantity: number;
  /** Title of the line item. Defaults to the product's title. */
  title: string;
  /** Product variant of the line item. */
  variant?: ProductVariant | null;
}
/** An amount discounting the line that has been allocated by a discount. */
export interface DiscountAllocation {
  /** Amount of discount allocated. */
  allocatedAmount: MoneyV2;
  /** The discount this allocated amount originated from. */
  discountApplication: DiscountApplication;
}
/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export interface Order extends Node {
  /** The code of the currency used for the payment. */
  currencyCode: CurrencyCode;
  /** The locale code in which this specific order happened. */
  customerLocale?: string | null;
  /** The unique URL that the customer can use to access the order. */
  customerUrl?: Url | null;
  /** Discounts that have been applied on the order. */
  discountApplications: DiscountApplicationConnection;
  /** The customer's email address. */
  email?: string | null;
  /** Globally unique identifier. */
  id: string;
  /** List of the order’s line items. */
  lineItems: OrderLineItemConnection;
  /** Unique identifier for the order that appears on the order.For example, _#1000_ or _Store1001. */
  name: string;
  /** A unique numeric identifier for the order for use by shop owner and customer. */
  orderNumber: number;
  /** The customer's phone number. */
  phone?: string | null;
  /** The date and time when the order was imported.This value can be set to dates in the past when importing from other systems.If no value is provided, it will be auto-generated based on current date and time. */
  processedAt: DateTime;
  /** The address to where the order will be shipped. */
  shippingAddress?: MailingAddress | null;
  /** The discounts that have been allocated onto the shipping line by discount applications. */
  shippingDiscountAllocations: DiscountAllocation[];
  /** The unique URL for the order's status page. */
  statusUrl: Url;
  /** Price of the order before shipping and taxes. */
  subtotalPrice?: Money | null;
  /** List of the order’s successful fulfillments. */
  successfulFulfillments?: Fulfillment[] | null;
  /** The sum of all the prices of all the items in the order, taxes and discounts included (must be positive). */
  totalPrice: Money;
  /** The total amount that has been refunded. */
  totalRefunded: Money;
  /** The total cost of shipping. */
  totalShippingPrice: Money;
  /** The total cost of taxes. */
  totalTax?: Money | null;
}

export interface OrderLineItemConnection {
  /** A list of edges. */
  edges: OrderLineItemEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface OrderLineItemEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of OrderLineItemEdge. */
  node: OrderLineItem;
}
/** Represents a single line in an order. There is one line item for each distinct product variant. */
export interface OrderLineItem {
  /** List of custom attributes associated to the line item. */
  customAttributes: Attribute[];
  /** The discounts that have been allocated onto the order line item by discount applications. */
  discountAllocations: DiscountAllocation[];
  /** The number of products variants associated to the line item. */
  quantity: number;
  /** The title of the product combined with title of the variant. */
  title: string;
  /** The product variant object associated to the line item. */
  variant?: ProductVariant | null;
}
/** Represents a single fulfillment in an order. */
export interface Fulfillment {
  /** List of the fulfillment's line items. */
  fulfillmentLineItems: FulfillmentLineItemConnection;
  /** The name of the tracking company. */
  trackingCompany?: string | null;
  /** Tracking information associated with the fulfillment,such as the tracking number and tracking URL. */
  trackingInfo: FulfillmentTrackingInfo[];
}

export interface FulfillmentLineItemConnection {
  /** A list of edges. */
  edges: FulfillmentLineItemEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface FulfillmentLineItemEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of FulfillmentLineItemEdge. */
  node: FulfillmentLineItem;
}
/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export interface FulfillmentLineItem {
  /** The associated order's line item. */
  lineItem: OrderLineItem;
  /** The amount fulfilled in this fulfillment. */
  quantity: number;
}
/** Tracking information associated with the fulfillment. */
export interface FulfillmentTrackingInfo {
  /** The tracking number of the fulfillment. */
  number?: string | null;
  /** The URL to track the fulfillment. */
  url?: Url | null;
}

export interface OrderConnection {
  /** A list of edges. */
  edges: OrderEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface OrderEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of OrderEdge. */
  node: Order;
}
/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export interface Page extends Node {
  /** The description of the page, complete with HTML formatting. */
  body: Html;
  /** Summary of the page body. */
  bodySummary: string;
  /** The timestamp of the page creation. */
  createdAt: DateTime;
  /** A human-friendly unique string for the page automatically generated from its title. */
  handle: string;
  /** Globally unique identifier. */
  id: string;
  /** The title of the page. */
  title: string;
  /** The timestamp of the latest page update. */
  updatedAt: DateTime;
  /** The url pointing to the page accessible from the web. */
  url: Url;
}

export interface PageConnection {
  /** A list of edges. */
  edges: PageEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface PageEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of PageEdge. */
  node: Page;
}

export interface StringConnection {
  /** A list of edges. */
  edges: StringEdge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

export interface StringEdge {
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of StringEdge. */
  node: string;
}
/** Shop represents a collection of the general settings and information about the shop. */
export interface Shop {
  /** List of the shop' articles. */
  articles: ArticleConnection;
  /** List of the shop' blogs. */
  blogs: BlogConnection;
  /** Find a collection by its handle. */
  collectionByHandle?: Collection | null;
  /** List of the shop’s collections. */
  collections: CollectionConnection;
  /** The three-letter code for the currency that the shop accepts. */
  currencyCode: CurrencyCode;
  /** A description of the shop. */
  description?: string | null;
  /** A string representing the way currency is formatted when the currency isn’t specified. */
  moneyFormat: string;
  /** The shop’s name. */
  name: string;
  /** Settings related to payments. */
  paymentSettings: PaymentSettings;
  /** The shop’s primary domain. */
  primaryDomain: Domain;
  /** The shop’s privacy policy. */
  privacyPolicy?: ShopPolicy | null;
  /** Find a product by its handle. */
  productByHandle?: Product | null;
  /** Tags added to products.Additional access scope required: unauthenticated_read_product_tags. */
  productTags: StringConnection;
  /** List of the shop’s product types. */
  productTypes: StringConnection;
  /** List of the shop’s products. */
  products: ProductConnection;
  /** The shop’s refund policy. */
  refundPolicy?: ShopPolicy | null;
  /** Countries that the shop ships to. */
  shipsToCountries: CountryCode[];
  /** The shop’s Shopify Payments account id. */
  shopifyPaymentsAccountId?: string | null;
  /** The shop’s terms of service. */
  termsOfService?: ShopPolicy | null;
}
/** Settings related to payments. */
export interface PaymentSettings {
  /** List of the card brands which the shop accepts. */
  acceptedCardBrands: CardBrand[];
  /** The url pointing to the endpoint to vault credit cards. */
  cardVaultUrl: Url;
  /** The country where the shop is located. */
  countryCode: CountryCode;
  /** The three-letter code for the currency that the shop accepts. */
  currencyCode: CurrencyCode;
  /** The shop’s Shopify Payments account id. */
  shopifyPaymentsAccountId?: string | null;
  /** List of the digital wallets which the shop supports. */
  supportedDigitalWallets: DigitalWallet[];
}
/** Represents a web address. */
export interface Domain {
  /** The host name of the domain (eg: `example.com`). */
  host: string;
  /** Whether SSL is enabled or not. */
  sslEnabled: boolean;
  /** The URL of the domain (eg: `https://example.com`). */
  url: Url;
}
/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export interface ShopPolicy extends Node {
  /** Policy text, maximum size of 64kb. */
  body: string;
  /** Policy’s handle. */
  handle: string;
  /** Globally unique identifier. */
  id: string;
  /** Policy’s title. */
  title: string;
  /** Public URL to the policy. */
  url: Url;
}
/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export interface Mutation {
  /** Updates the attributes of a checkout. */
  checkoutAttributesUpdate?: CheckoutAttributesUpdatePayload | null;
  /** Updates the attributes of a checkout. */
  checkoutAttributesUpdateV2?: CheckoutAttributesUpdateV2Payload | null;

  checkoutCompleteFree?: CheckoutCompleteFreePayload | null;
  /** Completes a checkout using a credit card token from Shopify's Vault. */
  checkoutCompleteWithCreditCard?: CheckoutCompleteWithCreditCardPayload | null;
  /** Completes a checkout using a credit card token from Shopify's Vault. */
  checkoutCompleteWithCreditCardV2?: CheckoutCompleteWithCreditCardV2Payload | null;
  /** Completes a checkout with a tokenized payment. */
  checkoutCompleteWithTokenizedPayment?: CheckoutCompleteWithTokenizedPaymentPayload | null;
  /** Completes a checkout with a tokenized payment. */
  checkoutCompleteWithTokenizedPaymentV2?: CheckoutCompleteWithTokenizedPaymentV2Payload | null;
  /** Creates a new checkout. */
  checkoutCreate?: CheckoutCreatePayload | null;
  /** Associates a customer to the checkout. */
  checkoutCustomerAssociate?: CheckoutCustomerAssociatePayload | null;
  /** Associates a customer to the checkout. */
  checkoutCustomerAssociateV2?: CheckoutCustomerAssociateV2Payload | null;
  /** Disassociates the current checkout customer from the checkout. */
  checkoutCustomerDisassociate?: CheckoutCustomerDisassociatePayload | null;
  /** Disassociates the current checkout customer from the checkout. */
  checkoutCustomerDisassociateV2?: CheckoutCustomerDisassociateV2Payload | null;
  /** Applies a discount to an existing checkout using a discount code. */
  checkoutDiscountCodeApply?: CheckoutDiscountCodeApplyPayload | null;
  /** Applies a discount to an existing checkout using a discount code. */
  checkoutDiscountCodeApplyV2?: CheckoutDiscountCodeApplyV2Payload | null;
  /** Removes the applied discount from an existing checkout. */
  checkoutDiscountCodeRemove?: CheckoutDiscountCodeRemovePayload | null;
  /** Updates the email on an existing checkout. */
  checkoutEmailUpdate?: CheckoutEmailUpdatePayload | null;
  /** Updates the email on an existing checkout. */
  checkoutEmailUpdateV2?: CheckoutEmailUpdateV2Payload | null;
  /** Applies a gift card to an existing checkout using a gift card code. This will replace all currently applied gift cards. */
  checkoutGiftCardApply?: CheckoutGiftCardApplyPayload | null;
  /** Removes an applied gift card from the checkout. */
  checkoutGiftCardRemove?: CheckoutGiftCardRemovePayload | null;
  /** Removes an applied gift card from the checkout. */
  checkoutGiftCardRemoveV2?: CheckoutGiftCardRemoveV2Payload | null;
  /** Appends gift cards to an existing checkout. */
  checkoutGiftCardsAppend?: CheckoutGiftCardsAppendPayload | null;
  /** Adds a list of line items to a checkout. */
  checkoutLineItemsAdd?: CheckoutLineItemsAddPayload | null;
  /** Removes line items from an existing checkout */
  checkoutLineItemsRemove?: CheckoutLineItemsRemovePayload | null;
  /** Sets a list of line items to a checkout. */
  checkoutLineItemsReplace?: CheckoutLineItemsReplacePayload | null;
  /** Updates line items on a checkout. */
  checkoutLineItemsUpdate?: CheckoutLineItemsUpdatePayload | null;
  /** Updates the shipping address of an existing checkout. */
  checkoutShippingAddressUpdate?: CheckoutShippingAddressUpdatePayload | null;
  /** Updates the shipping address of an existing checkout. */
  checkoutShippingAddressUpdateV2?: CheckoutShippingAddressUpdateV2Payload | null;
  /** Updates the shipping lines on an existing checkout. */
  checkoutShippingLineUpdate?: CheckoutShippingLineUpdatePayload | null;
  /** Creates a customer access token.The customer access token is required to modify the customer object in any way. */
  customerAccessTokenCreate?: CustomerAccessTokenCreatePayload | null;
  /** Permanently destroys a customer access token. */
  customerAccessTokenDelete?: CustomerAccessTokenDeletePayload | null;
  /** Renews a customer access token.Access token renewal must happen *before* a token expires.If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`. */
  customerAccessTokenRenew?: CustomerAccessTokenRenewPayload | null;
  /** Activates a customer. */
  customerActivate?: CustomerActivatePayload | null;
  /** Creates a new address for a customer. */
  customerAddressCreate?: CustomerAddressCreatePayload | null;
  /** Permanently deletes the address of an existing customer. */
  customerAddressDelete?: CustomerAddressDeletePayload | null;
  /** Updates the address of an existing customer. */
  customerAddressUpdate?: CustomerAddressUpdatePayload | null;
  /** Creates a new customer. */
  customerCreate?: CustomerCreatePayload | null;
  /** Updates the default address of an existing customer. */
  customerDefaultAddressUpdate?: CustomerDefaultAddressUpdatePayload | null;
  /** Sends a reset password email to the customer, as the first step in the reset password process. */
  customerRecover?: CustomerRecoverPayload | null;
  /** Resets a customer’s password with a token received from `CustomerRecover`. */
  customerReset?: CustomerResetPayload | null;
  /** Resets a customer’s password with the reset password url received from `CustomerRecover`. */
  customerResetByUrl?: CustomerResetByUrlPayload | null;
  /** Updates an existing customer. */
  customerUpdate?: CustomerUpdatePayload | null;
}
/** Return type for `checkoutAttributesUpdate` mutation. */
export interface CheckoutAttributesUpdatePayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Represents an error that happens during execution of a checkout mutation. */
export interface CheckoutUserError extends DisplayableError {
  /** Error code to uniquely identify the error. */
  code?: CheckoutErrorCode | null;
  /** Path to the input field which caused the error. */
  field?: string[] | null;
  /** The error message. */
  message: string;
}
/** Represents an error in the input of a mutation. */
export interface UserError extends DisplayableError {
  /** Path to the input field which caused the error. */
  field?: string[] | null;
  /** The error message. */
  message: string;
}
/** Return type for `checkoutAttributesUpdateV2` mutation. */
export interface CheckoutAttributesUpdateV2Payload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCompleteFree` mutation. */
export interface CheckoutCompleteFreePayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCompleteWithCreditCard` mutation. */
export interface CheckoutCompleteWithCreditCardPayload {
  /** The checkout on which the payment was applied. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** A representation of the attempted payment. */
  payment?: Payment | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** A payment applied to a checkout. */
export interface Payment extends Node {
  /** The amount of the payment. */
  amount: Money;
  /** The billing address for the payment. */
  billingAddress?: MailingAddress | null;
  /** The checkout to which the payment belongs. */
  checkout: Checkout;
  /** The credit card used for the payment in the case of direct payments. */
  creditCard?: CreditCard | null;
  /** An message describing a processing error during asynchronous processing. */
  errorMessage?: string | null;
  /** Globally unique identifier. */
  id: string;
  /** A client-side generated token to identify a payment and perform idempotent operations. */
  idempotencyKey?: string | null;
  /** Whether or not the payment is still processing asynchronously. */
  ready: boolean;
  /** A flag to indicate if the payment is to be done in test mode for gateways that support it. */
  test: boolean;
  /** The actual transaction recorded by Shopify after having processed the payment with the gateway. */
  transaction?: Transaction | null;
}
/** Credit card information used for a payment. */
export interface CreditCard {
  brand?: string | null;

  expiryMonth?: number | null;

  expiryYear?: number | null;

  firstDigits?: string | null;

  firstName?: string | null;

  lastDigits?: string | null;

  lastName?: string | null;
  /** Masked credit card number with only the last 4 digits displayed */
  maskedNumber?: string | null;
}
/** An object representing exchange of money for a product or service. */
export interface Transaction {
  /** The amount of money that the transaction was for. */
  amount: Money;
  /** The kind of the transaction. */
  kind: TransactionKind;
  /** The status of the transaction */
  status: TransactionStatus;
  /** Whether the transaction was done in test mode or not */
  test: boolean;
}
/** Return type for `checkoutCompleteWithCreditCardV2` mutation. */
export interface CheckoutCompleteWithCreditCardV2Payload {
  /** The checkout on which the payment was applied. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** A representation of the attempted payment. */
  payment?: Payment | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCompleteWithTokenizedPayment` mutation. */
export interface CheckoutCompleteWithTokenizedPaymentPayload {
  /** The checkout on which the payment was applied. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** A representation of the attempted payment. */
  payment?: Payment | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCompleteWithTokenizedPaymentV2` mutation. */
export interface CheckoutCompleteWithTokenizedPaymentV2Payload {
  /** The checkout on which the payment was applied. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** A representation of the attempted payment. */
  payment?: Payment | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCreate` mutation. */
export interface CheckoutCreatePayload {
  /** The new checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCustomerAssociate` mutation. */
export interface CheckoutCustomerAssociatePayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** The associated customer object. */
  customer?: Customer | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCustomerAssociateV2` mutation. */
export interface CheckoutCustomerAssociateV2Payload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** The associated customer object. */
  customer?: Customer | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCustomerDisassociate` mutation. */
export interface CheckoutCustomerDisassociatePayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutCustomerDisassociateV2` mutation. */
export interface CheckoutCustomerDisassociateV2Payload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutDiscountCodeApply` mutation. */
export interface CheckoutDiscountCodeApplyPayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutDiscountCodeApplyV2` mutation. */
export interface CheckoutDiscountCodeApplyV2Payload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutDiscountCodeRemove` mutation. */
export interface CheckoutDiscountCodeRemovePayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutEmailUpdate` mutation. */
export interface CheckoutEmailUpdatePayload {
  /** The checkout object with the updated email. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutEmailUpdateV2` mutation. */
export interface CheckoutEmailUpdateV2Payload {
  /** The checkout object with the updated email. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutGiftCardApply` mutation. */
export interface CheckoutGiftCardApplyPayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutGiftCardRemove` mutation. */
export interface CheckoutGiftCardRemovePayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutGiftCardRemoveV2` mutation. */
export interface CheckoutGiftCardRemoveV2Payload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutGiftCardsAppend` mutation. */
export interface CheckoutGiftCardsAppendPayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutLineItemsAdd` mutation. */
export interface CheckoutLineItemsAddPayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutLineItemsRemove` mutation. */
export interface CheckoutLineItemsRemovePayload {
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutLineItemsReplace` mutation. */
export interface CheckoutLineItemsReplacePayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: CheckoutUserError[];
}
/** Return type for `checkoutLineItemsUpdate` mutation. */
export interface CheckoutLineItemsUpdatePayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutShippingAddressUpdate` mutation. */
export interface CheckoutShippingAddressUpdatePayload {
  /** The updated checkout object. */
  checkout: Checkout;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutShippingAddressUpdateV2` mutation. */
export interface CheckoutShippingAddressUpdateV2Payload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `checkoutShippingLineUpdate` mutation. */
export interface CheckoutShippingLineUpdatePayload {
  /** The updated checkout object. */
  checkout?: Checkout | null;
  /** List of errors that occurred executing the mutation. */
  checkoutUserErrors: CheckoutUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerAccessTokenCreate` mutation. */
export interface CustomerAccessTokenCreatePayload {
  /** The newly created customer access token object. */
  customerAccessToken?: CustomerAccessToken | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export interface CustomerAccessToken {
  /** The customer’s access token. */
  accessToken: string;
  /** The date and time when the customer access token expires. */
  expiresAt: DateTime;
}
/** Represents an error that happens during execution of a customer mutation. */
export interface CustomerUserError extends DisplayableError {
  /** Error code to uniquely identify the error. */
  code?: CustomerErrorCode | null;
  /** Path to the input field which caused the error. */
  field?: string[] | null;
  /** The error message. */
  message: string;
}
/** Return type for `customerAccessTokenDelete` mutation. */
export interface CustomerAccessTokenDeletePayload {
  /** The destroyed access token. */
  deletedAccessToken?: string | null;
  /** ID of the destroyed customer access token. */
  deletedCustomerAccessTokenId?: string | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerAccessTokenRenew` mutation. */
export interface CustomerAccessTokenRenewPayload {
  /** The renewed customer access token object. */
  customerAccessToken?: CustomerAccessToken | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerActivate` mutation. */
export interface CustomerActivatePayload {
  /** The customer object. */
  customer?: Customer | null;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: CustomerAccessToken | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerAddressCreate` mutation. */
export interface CustomerAddressCreatePayload {
  /** The new customer address object. */
  customerAddress?: MailingAddress | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerAddressDelete` mutation. */
export interface CustomerAddressDeletePayload {
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** ID of the deleted customer address. */
  deletedCustomerAddressId?: string | null;
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerAddressUpdate` mutation. */
export interface CustomerAddressUpdatePayload {
  /** The customer’s updated mailing address. */
  customerAddress?: MailingAddress | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerCreate` mutation. */
export interface CustomerCreatePayload {
  /** The created customer object. */
  customer?: Customer | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerDefaultAddressUpdate` mutation. */
export interface CustomerDefaultAddressUpdatePayload {
  /** The updated customer object. */
  customer?: Customer | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerRecover` mutation. */
export interface CustomerRecoverPayload {
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerReset` mutation. */
export interface CustomerResetPayload {
  /** The customer object which was reset. */
  customer?: Customer | null;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: CustomerAccessToken | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerResetByUrl` mutation. */
export interface CustomerResetByUrlPayload {
  /** The customer object which was reset. */
  customer?: Customer | null;
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: CustomerAccessToken | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Return type for `customerUpdate` mutation. */
export interface CustomerUpdatePayload {
  /** The updated customer object. */
  customer?: Customer | null;
  /** The newly created customer access token. If the customer's password is updated, all previous access tokens(including the one used to perform this mutation) become invalid, and a new token is generated. */
  customerAccessToken?: CustomerAccessToken | null;
  /** List of errors that occurred executing the mutation. */
  customerUserErrors: CustomerUserError[];
  /** List of errors that occurred executing the mutation. */
  userErrors: UserError[];
}
/** Discount code applications capture the intentions of a discount code atthe time that it is applied. */
export interface DiscountCodeApplication extends DiscountApplication {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Specifies whether the discount code was applied successfully. */
  applicable: boolean;
  /** The string identifying the discount code that was used at the time of application. */
  code: string;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
}
/** Manual discount applications capture the intentions of a discount that was manually created. */
export interface ManualDiscountApplication extends DiscountApplication {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The description of the application. */
  description?: string | null;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: string;
  /** The value of the discount application. */
  value: PricingValue;
}
/** Script discount applications capture the intentions of a discount thatwas created by a Shopify Script. */
export interface ScriptDiscountApplication extends DiscountApplication {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** The description of the application as defined by the Script. */
  description: string;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The value of the discount application. */
  value: PricingValue;
}
/** Automatic discount applications capture the intentions of a discount that was automatically applied. */
export interface AutomaticDiscountApplication extends DiscountApplication {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: DiscountApplicationAllocationMethod;
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: DiscountApplicationTargetSelection;
  /** The type of line that the discount is applicable towards. */
  targetType: DiscountApplicationTargetType;
  /** The title of the application. */
  title: string;
  /** The value of the discount application. */
  value: PricingValue;
}

// ====================================================
// InputTypes
// ====================================================

/** Specifies the input fields required for a selected option. */
export interface SelectedOptionInput {
  /** The product option’s name. */
  name: string;
  /** The product option’s value. */
  value: string;
}
/** Specifies the fields required to update a checkout's attributes. */
export interface CheckoutAttributesUpdateInput {
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: string | null;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: AttributeInput[] | null;
  /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes.The required attributes are city, province, and country.Full validation of the addresses is still done at complete time. */
  allowPartialAddresses?: boolean | null;
}
/** Specifies the input fields required for an attribute. */
export interface AttributeInput {
  /** Key or name of the attribute. */
  key: string;
  /** Value of the attribute. */
  value: string;
}
/** Specifies the fields required to update a checkout's attributes. */
export interface CheckoutAttributesUpdateV2Input {
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: string | null;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: AttributeInput[] | null;
  /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes.The required attributes are city, province, and country.Full validation of the addresses is still done at complete time. */
  allowPartialAddresses?: boolean | null;
}
/** Specifies the fields required to complete a checkout witha Shopify vaulted credit card payment. */
export interface CreditCardPaymentInput {
  /** The amount of the payment. */
  amount: Money;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: string;
  /** The billing address for the payment. */
  billingAddress: MailingAddressInput;
  /** The ID returned by Shopify's Card Vault. */
  vaultId: string;
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: boolean | null;
}
/** Specifies the fields accepted to create or update a mailing address. */
export interface MailingAddressInput {
  address1?: string | null;

  address2?: string | null;

  city?: string | null;

  company?: string | null;

  country?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  phone?: string | null;

  province?: string | null;

  zip?: string | null;
}
/** Specifies the fields required to complete a checkout witha Shopify vaulted credit card payment. */
export interface CreditCardPaymentInputV2 {
  /** The amount and currency of the payment. */
  paymentAmount: MoneyInput;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: string;
  /** The billing address for the payment. */
  billingAddress: MailingAddressInput;
  /** The ID returned by Shopify's Card Vault. */
  vaultId: string;
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: boolean | null;
}
/** Specifies the fields for a monetary value with currency. */
export interface MoneyInput {
  /** Decimal money amount. */
  amount: Decimal;
  /** Currency of the money. */
  currencyCode: CurrencyCode;
}
/** Specifies the fields required to complete a checkout witha tokenized payment. */
export interface TokenizedPaymentInput {
  /** The amount of the payment. */
  amount: Money;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: string;
  /** The billing address for the payment. */
  billingAddress: MailingAddressInput;
  /** The type of payment token. */
  type: string;
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: string;
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: boolean | null;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: string | null;
}
/** Specifies the fields required to complete a checkout witha tokenized payment. */
export interface TokenizedPaymentInputV2 {
  /** The amount and currency of the payment. */
  paymentAmount: MoneyInput;
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. */
  idempotencyKey: string;
  /** The billing address for the payment. */
  billingAddress: MailingAddressInput;
  /** The type of payment token. */
  type: string;
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: string;
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: boolean | null;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: string | null;
}
/** Specifies the fields required to create a checkout. */
export interface CheckoutCreateInput {
  /** The email with which the customer wants to checkout. */
  email?: string | null;
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems?: CheckoutLineItemInput[] | null;
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: MailingAddressInput | null;
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: string | null;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: AttributeInput[] | null;
  /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes.The required attributes are city, province, and country.Full validation of addresses is still done at complete time. */
  allowPartialAddresses?: boolean | null;
}
/** Specifies the input fields to create a line item on a checkout. */
export interface CheckoutLineItemInput {
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: AttributeInput[] | null;
  /** The quantity of the line item. */
  quantity: number;
  /** The identifier of the product variant for the line item. */
  variantId: string;
}
/** Specifies the input fields to update a line item on the checkout. */
export interface CheckoutLineItemUpdateInput {
  id?: string | null;
  /** The variant identifier of the line item. */
  variantId?: string | null;
  /** The quantity of the line item. */
  quantity?: number | null;
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: AttributeInput[] | null;
}
/** Specifies the input fields required to create a customer access token. */
export interface CustomerAccessTokenCreateInput {
  /** The email associated to the customer. */
  email: string;
  /** The login password to be used by the customer. */
  password: string;
}
/** Specifies the input fields required to activate a customer. */
export interface CustomerActivateInput {
  /** The activation token required to activate the customer. */
  activationToken: string;
  /** New password that will be set during activation. */
  password: string;
}
/** Specifies the fields required to create a new Customer. */
export interface CustomerCreateInput {
  /** The customer’s first name. */
  firstName?: string | null;
  /** The customer’s last name. */
  lastName?: string | null;
  /** The customer’s email. */
  email: string;
  /** The customer’s phone number. */
  phone?: string | null;
  /** The login password used by the customer. */
  password: string;
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: boolean | null;
}
/** Specifies the fields required to reset a Customer’s password. */
export interface CustomerResetInput {
  /** The reset token required to reset the customer’s password. */
  resetToken: string;
  /** New password that will be set as part of the reset password process. */
  password: string;
}
/** Specifies the fields required to update the Customer information. */
export interface CustomerUpdateInput {
  /** The customer’s first name. */
  firstName?: string | null;
  /** The customer’s last name. */
  lastName?: string | null;
  /** The customer’s email. */
  email?: string | null;
  /** The customer’s phone number. */
  phone?: string | null;
  /** The login password used by the customer. */
  password?: string | null;
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: boolean | null;
}

// ====================================================
// Arguments
// ====================================================

export interface ArticlesQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ArticleSortKeys | null;
  /** Supported filter parameters:- `author`- `blog_title`- `created_at`- `tag`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface BlogByHandleQueryRootArgs {
  /** The handle of the blog. */
  handle: string;
}
export interface BlogsQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: BlogSortKeys | null;
  /** Supported filter parameters:- `created_at`- `handle`- `title`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface CollectionByHandleQueryRootArgs {
  /** The handle of the collection. */
  handle: string;
}
export interface CollectionsQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: CollectionSortKeys | null;
  /** Supported filter parameters:- `collection_type`- `title`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface CustomerQueryRootArgs {
  /** The customer access token */
  customerAccessToken: string;
}
export interface NodeQueryRootArgs {
  /** The ID of the Node to return. */
  id: string;
}
export interface NodesQueryRootArgs {
  /** The IDs of the Nodes to return. */
  ids: string[];
}
export interface PageByHandleQueryRootArgs {
  /** The handle of the page. */
  handle: string;
}
export interface PagesQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: PageSortKeys | null;
  /** Supported filter parameters:- `created_at`- `handle`- `title`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface ProductByHandleQueryRootArgs {
  /** The handle of the product. */
  handle: string;
}
export interface ProductTagsQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first: number;
}
export interface ProductTypesQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first: number;
}
export interface ProductsQueryRootArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ProductSortKeys | null;
  /** Supported filter parameters:- `available_for_sale`- `created_at`- `product_type`- `tag`- `title`- `updated_at`- `variants.price`- `vendor`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface CommentsArticleArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface ContentArticleArgs {
  /** Truncates string after the given length. */
  truncateAt?: number | null;
}
export interface ExcerptArticleArgs {
  /** Truncates string after the given length. */
  truncateAt?: number | null;
}
export interface ImageArticleArgs {
  /** Image width in pixels between 1 and 2048. This argument is deprecated: Use `maxWidth` on `Image.transformedSrc` instead. */
  maxWidth?: number | null;
  /** Image height in pixels between 1 and 2048. This argument is deprecated: Use `maxHeight` on `Image.transformedSrc` instead. */
  maxHeight?: number | null;
  /** Crops the image according to the specified region. This argument is deprecated: Use `crop` on `Image.transformedSrc` instead. */
  crop?: CropRegion | null;
  /** Image size multiplier for high-resolution retina displays. Must be between 1 and 3. This argument is deprecated: Use `scale` on `Image.transformedSrc` instead. */
  scale?: number | null;
}
export interface ArticleByHandleBlogArgs {
  /** The handle of the article. */
  handle: string;
}
export interface ArticlesBlogArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ArticleSortKeys | null;
  /** Supported filter parameters:- `author`- `blog_title`- `created_at`- `tag`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface ContentCommentArgs {
  /** Truncates string after the given length. */
  truncateAt?: number | null;
}
export interface TransformedSrcImageArgs {
  /** Image width in pixels between 1 and 5760. */
  maxWidth?: number | null;
  /** Image height in pixels between 1 and 5760. */
  maxHeight?: number | null;
  /** Crops the image according to the specified region. */
  crop?: CropRegion | null;
  /** Image size multiplier for high-resolution retina displays. Must be between 1 and 3. */
  scale?: number | null;
  /** Best effort conversion of image into content type (SVG -> PNG, Anything -> JGP, Anything -> WEBP are supported). */
  preferredContentType?: ImageContentType | null;
}
export interface DescriptionCollectionArgs {
  /** Truncates string after the given length. */
  truncateAt?: number | null;
}
export interface ImageCollectionArgs {
  /** Image width in pixels between 1 and 2048. This argument is deprecated: Use `maxWidth` on `Image.transformedSrc` instead. */
  maxWidth?: number | null;
  /** Image height in pixels between 1 and 2048. This argument is deprecated: Use `maxHeight` on `Image.transformedSrc` instead. */
  maxHeight?: number | null;
  /** Crops the image according to the specified region. This argument is deprecated: Use `crop` on `Image.transformedSrc` instead. */
  crop?: CropRegion | null;
  /** Image size multiplier for high-resolution retina displays. Must be between 1 and 3. This argument is deprecated: Use `scale` on `Image.transformedSrc` instead. */
  scale?: number | null;
}
export interface ProductsCollectionArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ProductCollectionSortKeys | null;
}
export interface CollectionsProductArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface DescriptionProductArgs {
  /** Truncates string after the given length. */
  truncateAt?: number | null;
}
export interface ImagesProductArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ProductImageSortKeys | null;
  /** Image width in pixels between 1 and 2048. This argument is deprecated: Use `maxWidth` on `Image.transformedSrc` instead. */
  maxWidth?: number | null;
  /** Image height in pixels between 1 and 2048. This argument is deprecated: Use `maxHeight` on `Image.transformedSrc` instead. */
  maxHeight?: number | null;
  /** Crops the image according to the specified region. This argument is deprecated: Use `crop` on `Image.transformedSrc` instead. */
  crop?: CropRegion | null;
  /** Image size multiplier for high-resolution retina displays. Must be between 1 and 3. This argument is deprecated: Use `scale` on `Image.transformedSrc` instead. */
  scale?: number | null;
}
export interface OptionsProductArgs {
  /** Truncate the array result to this size. */
  first?: number | null;
}
export interface VariantBySelectedOptionsProductArgs {
  selectedOptions: SelectedOptionInput[];
}
export interface VariantsProductArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ProductVariantSortKeys | null;
}
export interface ImageProductVariantArgs {
  /** Image width in pixels between 1 and 2048. This argument is deprecated: Use `maxWidth` on `Image.transformedSrc` instead. */
  maxWidth?: number | null;
  /** Image height in pixels between 1 and 2048. This argument is deprecated: Use `maxHeight` on `Image.transformedSrc` instead. */
  maxHeight?: number | null;
  /** Crops the image according to the specified region. This argument is deprecated: Use `crop` on `Image.transformedSrc` instead. */
  crop?: CropRegion | null;
  /** Image size multiplier for high-resolution retina displays. Must be between 1 and 3. This argument is deprecated: Use `scale` on `Image.transformedSrc` instead. */
  scale?: number | null;
}
export interface PresentmentPricesProductVariantArgs {
  /** The presentment currencies prices should return in. */
  presentmentCurrencies?: CurrencyCode[] | null;
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface AddressesCustomerArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface OrdersCustomerArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: OrderSortKeys | null;
  /** Supported filter parameters:- `processed_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface FormattedMailingAddressArgs {
  /** Whether to include the customer's name in the formatted address. */
  withName?: boolean | null;
  /** Whether to include the customer's company in the formatted address. */
  withCompany?: boolean | null;
}
export interface DiscountApplicationsCheckoutArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface LineItemsCheckoutArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface DiscountApplicationsOrderArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface LineItemsOrderArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface SuccessfulFulfillmentsOrderArgs {
  /** Truncate the array result to this size. */
  first?: number | null;
}
export interface FulfillmentLineItemsFulfillmentArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
}
export interface TrackingInfoFulfillmentArgs {
  /** Truncate the array result to this size. */
  first?: number | null;
}
export interface ArticlesShopArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ArticleSortKeys | null;
  /** Supported filter parameters:- `author`- `blog_title`- `created_at`- `tag`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface BlogsShopArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: BlogSortKeys | null;
  /** Supported filter parameters:- `created_at`- `handle`- `title`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface CollectionByHandleShopArgs {
  /** The handle of the collection. */
  handle: string;
}
export interface CollectionsShopArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: CollectionSortKeys | null;
  /** Supported filter parameters:- `collection_type`- `title`- `updated_at`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface ProductByHandleShopArgs {
  /** The handle of the product. */
  handle: string;
}
export interface ProductTagsShopArgs {
  /** Returns up to the first `n` elements from the list. */
  first: number;
}
export interface ProductTypesShopArgs {
  /** Returns up to the first `n` elements from the list. */
  first: number;
}
export interface ProductsShopArgs {
  /** Returns up to the first `n` elements from the list. */
  first?: number | null;
  /** Returns the elements that come after the specified cursor. */
  after?: string | null;
  /** Returns up to the last `n` elements from the list. */
  last?: number | null;
  /** Returns the elements that come before the specified cursor. */
  before?: string | null;
  /** Reverse the order of the underlying list. */
  reverse?: boolean | null;
  /** Sort the underlying list by the given key. */
  sortKey?: ProductSortKeys | null;
  /** Supported filter parameters:- `available_for_sale`- `created_at`- `product_type`- `tag`- `title`- `updated_at`- `variants.price`- `vendor`See the detailed [search syntax](https://help.shopify.com/api/getting-started/search-syntax). */
  query?: string | null;
}
export interface CheckoutAttributesUpdateMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;

  input: CheckoutAttributesUpdateInput;
}
export interface CheckoutAttributesUpdateV2MutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The checkout attributes to update. */
  input: CheckoutAttributesUpdateV2Input;
}
export interface CheckoutCompleteFreeMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutCompleteWithCreditCardMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The credit card info to apply as a payment. */
  payment: CreditCardPaymentInput;
}
export interface CheckoutCompleteWithCreditCardV2MutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The credit card info to apply as a payment. */
  payment: CreditCardPaymentInputV2;
}
export interface CheckoutCompleteWithTokenizedPaymentMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The info to apply as a tokenized payment. */
  payment: TokenizedPaymentInput;
}
export interface CheckoutCompleteWithTokenizedPaymentV2MutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The info to apply as a tokenized payment. */
  payment: TokenizedPaymentInputV2;
}
export interface CheckoutCreateMutationArgs {
  input: CheckoutCreateInput;
}
export interface CheckoutCustomerAssociateMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The customer access token of the customer to associate. */
  customerAccessToken: string;
}
export interface CheckoutCustomerAssociateV2MutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The customer access token of the customer to associate. */
  customerAccessToken: string;
}
export interface CheckoutCustomerDisassociateMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutCustomerDisassociateV2MutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutDiscountCodeApplyMutationArgs {
  /** The discount code to apply to the checkout. */
  discountCode: string;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutDiscountCodeApplyV2MutationArgs {
  /** The discount code to apply to the checkout. */
  discountCode: string;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutDiscountCodeRemoveMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutEmailUpdateMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The email to update the checkout with. */
  email: string;
}
export interface CheckoutEmailUpdateV2MutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** The email to update the checkout with. */
  email: string;
}
export interface CheckoutGiftCardApplyMutationArgs {
  /** The code of the gift card to apply on the checkout. */
  giftCardCode: string;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutGiftCardRemoveMutationArgs {
  /** The ID of the Applied Gift Card to remove from the Checkout. */
  appliedGiftCardId: string;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutGiftCardRemoveV2MutationArgs {
  /** The ID of the Applied Gift Card to remove from the Checkout. */
  appliedGiftCardId: string;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutGiftCardsAppendMutationArgs {
  /** A list of gift card codes to append to the checkout. */
  giftCardCodes: string[];
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutLineItemsAddMutationArgs {
  /** A list of line item objects to add to the checkout. */
  lineItems: CheckoutLineItemInput[];
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutLineItemsRemoveMutationArgs {
  /** the checkout on which to remove line items */
  checkoutId: string;
  /** line item ids to remove */
  lineItemIds: string[];
}
export interface CheckoutLineItemsReplaceMutationArgs {
  /** A list of line item objects to set on the checkout. */
  lineItems: CheckoutLineItemInput[];
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutLineItemsUpdateMutationArgs {
  /** the checkout on which to update line items. */
  checkoutId: string;
  /** line items to update. */
  lineItems: CheckoutLineItemUpdateInput[];
}
export interface CheckoutShippingAddressUpdateMutationArgs {
  /** The shipping address to where the line items will be shipped. */
  shippingAddress: MailingAddressInput;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutShippingAddressUpdateV2MutationArgs {
  /** The shipping address to where the line items will be shipped. */
  shippingAddress: MailingAddressInput;
  /** The ID of the checkout. */
  checkoutId: string;
}
export interface CheckoutShippingLineUpdateMutationArgs {
  /** The ID of the checkout. */
  checkoutId: string;
  /** A concatenation of a Checkout’s shipping provider, price, and title, enabling the customer to select the availableShippingRates. */
  shippingRateHandle: string;
}
export interface CustomerAccessTokenCreateMutationArgs {
  input: CustomerAccessTokenCreateInput;
}
export interface CustomerAccessTokenDeleteMutationArgs {
  /** The access token used to identify the customer. */
  customerAccessToken: string;
}
export interface CustomerAccessTokenRenewMutationArgs {
  /** The access token used to identify the customer. */
  customerAccessToken: string;
}
export interface CustomerActivateMutationArgs {
  /** Specifies the customer to activate. */
  id: string;

  input: CustomerActivateInput;
}
export interface CustomerAddressCreateMutationArgs {
  /** The access token used to identify the customer. */
  customerAccessToken: string;
  /** The customer mailing address to create. */
  address: MailingAddressInput;
}
export interface CustomerAddressDeleteMutationArgs {
  /** Specifies the address to delete. */
  id: string;
  /** The access token used to identify the customer. */
  customerAccessToken: string;
}
export interface CustomerAddressUpdateMutationArgs {
  /** The access token used to identify the customer. */
  customerAccessToken: string;
  /** Specifies the customer address to update. */
  id: string;
  /** The customer’s mailing address. */
  address: MailingAddressInput;
}
export interface CustomerCreateMutationArgs {
  input: CustomerCreateInput;
}
export interface CustomerDefaultAddressUpdateMutationArgs {
  /** The access token used to identify the customer. */
  customerAccessToken: string;
  /** ID of the address to set as the new default for the customer. */
  addressId: string;
}
export interface CustomerRecoverMutationArgs {
  /** The email address of the customer to recover. */
  email: string;
}
export interface CustomerResetMutationArgs {
  /** Specifies the customer to reset. */
  id: string;

  input: CustomerResetInput;
}
export interface CustomerResetByUrlMutationArgs {
  /** The customer's reset password url. */
  resetUrl: Url;
  /** New password that will be set as part of the reset password process. */
  password: string;
}
export interface CustomerUpdateMutationArgs {
  /** The access token used to identify the customer. */
  customerAccessToken: string;
  /** The customer object input. */
  customer: CustomerUpdateInput;
}

// ====================================================
// Enums
// ====================================================

/** The set of valid sort keys for the articles query. */
export enum ArticleSortKeys {
  TITLE = "TITLE",
  BLOG_TITLE = "BLOG_TITLE",
  AUTHOR = "AUTHOR",
  UPDATED_AT = "UPDATED_AT",
  PUBLISHED_AT = "PUBLISHED_AT",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** The part of the image that should remain after cropping. */
export enum CropRegion {
  CENTER = "CENTER",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}
/** List of supported image content types. */
export enum ImageContentType {
  PNG = "PNG",
  JPG = "JPG",
  WEBP = "WEBP"
}
/** The set of valid sort keys for the blogs query. */
export enum BlogSortKeys {
  HANDLE = "HANDLE",
  TITLE = "TITLE",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** The set of valid sort keys for the products query. */
export enum ProductCollectionSortKeys {
  TITLE = "TITLE",
  PRICE = "PRICE",
  BEST_SELLING = "BEST_SELLING",
  CREATED = "CREATED",
  ID = "ID",
  MANUAL = "MANUAL",
  COLLECTION_DEFAULT = "COLLECTION_DEFAULT",
  RELEVANCE = "RELEVANCE"
}
/** The set of valid sort keys for the images query. */
export enum ProductImageSortKeys {
  CREATED_AT = "CREATED_AT",
  POSITION = "POSITION",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** Currency codes */
export enum CurrencyCode {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  CAD = "CAD",
  AFN = "AFN",
  ALL = "ALL",
  DZD = "DZD",
  AOA = "AOA",
  ARS = "ARS",
  AMD = "AMD",
  AWG = "AWG",
  AUD = "AUD",
  BBD = "BBD",
  AZN = "AZN",
  BDT = "BDT",
  BSD = "BSD",
  BHD = "BHD",
  BIF = "BIF",
  BYR = "BYR",
  BZD = "BZD",
  BTN = "BTN",
  BAM = "BAM",
  BRL = "BRL",
  BOB = "BOB",
  BWP = "BWP",
  BND = "BND",
  BGN = "BGN",
  MMK = "MMK",
  KHR = "KHR",
  CVE = "CVE",
  KYD = "KYD",
  XAF = "XAF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  KMF = "KMF",
  CDF = "CDF",
  CRC = "CRC",
  HRK = "HRK",
  CZK = "CZK",
  DKK = "DKK",
  DOP = "DOP",
  XCD = "XCD",
  EGP = "EGP",
  ETB = "ETB",
  XPF = "XPF",
  FJD = "FJD",
  GMD = "GMD",
  GHS = "GHS",
  GTQ = "GTQ",
  GYD = "GYD",
  GEL = "GEL",
  HTG = "HTG",
  HNL = "HNL",
  HKD = "HKD",
  HUF = "HUF",
  ISK = "ISK",
  INR = "INR",
  IDR = "IDR",
  ILS = "ILS",
  IQD = "IQD",
  JMD = "JMD",
  JPY = "JPY",
  JEP = "JEP",
  JOD = "JOD",
  KZT = "KZT",
  KES = "KES",
  KWD = "KWD",
  KGS = "KGS",
  LAK = "LAK",
  LVL = "LVL",
  LBP = "LBP",
  LSL = "LSL",
  LRD = "LRD",
  LTL = "LTL",
  MGA = "MGA",
  MKD = "MKD",
  MOP = "MOP",
  MWK = "MWK",
  MVR = "MVR",
  MXN = "MXN",
  MYR = "MYR",
  MUR = "MUR",
  MDL = "MDL",
  MAD = "MAD",
  MNT = "MNT",
  MZN = "MZN",
  NAD = "NAD",
  NPR = "NPR",
  ANG = "ANG",
  NZD = "NZD",
  NIO = "NIO",
  NGN = "NGN",
  NOK = "NOK",
  OMR = "OMR",
  PKR = "PKR",
  PGK = "PGK",
  PYG = "PYG",
  PEN = "PEN",
  PHP = "PHP",
  PLN = "PLN",
  QAR = "QAR",
  RON = "RON",
  RUB = "RUB",
  RWF = "RWF",
  WST = "WST",
  SAR = "SAR",
  STD = "STD",
  RSD = "RSD",
  SCR = "SCR",
  SGD = "SGD",
  SDG = "SDG",
  SYP = "SYP",
  ZAR = "ZAR",
  KRW = "KRW",
  SSP = "SSP",
  SBD = "SBD",
  LKR = "LKR",
  SRD = "SRD",
  SZL = "SZL",
  SEK = "SEK",
  CHF = "CHF",
  TWD = "TWD",
  THB = "THB",
  TZS = "TZS",
  TTD = "TTD",
  TND = "TND",
  TRY = "TRY",
  TMT = "TMT",
  UGX = "UGX",
  UAH = "UAH",
  AED = "AED",
  UYU = "UYU",
  UZS = "UZS",
  VUV = "VUV",
  VEF = "VEF",
  VND = "VND",
  XOF = "XOF",
  YER = "YER",
  ZMW = "ZMW"
}
/** Units of measurement for weight. */
export enum WeightUnit {
  KILOGRAMS = "KILOGRAMS",
  GRAMS = "GRAMS",
  POUNDS = "POUNDS",
  OUNCES = "OUNCES"
}
/** The set of valid sort keys for the variants query. */
export enum ProductVariantSortKeys {
  TITLE = "TITLE",
  SKU = "SKU",
  POSITION = "POSITION",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** The set of valid sort keys for the collections query. */
export enum CollectionSortKeys {
  TITLE = "TITLE",
  UPDATED_AT = "UPDATED_AT",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** ISO 3166-1 alpha-2 country codes with some differences. */
export enum CountryCode {
  AF = "AF",
  AX = "AX",
  AL = "AL",
  DZ = "DZ",
  AD = "AD",
  AO = "AO",
  AI = "AI",
  AG = "AG",
  AR = "AR",
  AM = "AM",
  AW = "AW",
  AU = "AU",
  AT = "AT",
  AZ = "AZ",
  BS = "BS",
  BH = "BH",
  BD = "BD",
  BB = "BB",
  BY = "BY",
  BE = "BE",
  BZ = "BZ",
  BJ = "BJ",
  BM = "BM",
  BT = "BT",
  BO = "BO",
  BQ = "BQ",
  BA = "BA",
  BW = "BW",
  BV = "BV",
  BR = "BR",
  IO = "IO",
  BN = "BN",
  BG = "BG",
  BF = "BF",
  BI = "BI",
  KH = "KH",
  CA = "CA",
  CV = "CV",
  KY = "KY",
  CF = "CF",
  TD = "TD",
  CL = "CL",
  CN = "CN",
  CX = "CX",
  CC = "CC",
  CO = "CO",
  KM = "KM",
  CG = "CG",
  CD = "CD",
  CK = "CK",
  CR = "CR",
  HR = "HR",
  CU = "CU",
  CW = "CW",
  CY = "CY",
  CZ = "CZ",
  CI = "CI",
  DK = "DK",
  DJ = "DJ",
  DM = "DM",
  DO = "DO",
  EC = "EC",
  EG = "EG",
  SV = "SV",
  GQ = "GQ",
  ER = "ER",
  EE = "EE",
  ET = "ET",
  FK = "FK",
  FO = "FO",
  FJ = "FJ",
  FI = "FI",
  FR = "FR",
  GF = "GF",
  PF = "PF",
  TF = "TF",
  GA = "GA",
  GM = "GM",
  GE = "GE",
  DE = "DE",
  GH = "GH",
  GI = "GI",
  GR = "GR",
  GL = "GL",
  GD = "GD",
  GP = "GP",
  GT = "GT",
  GG = "GG",
  GN = "GN",
  GW = "GW",
  GY = "GY",
  HT = "HT",
  HM = "HM",
  VA = "VA",
  HN = "HN",
  HK = "HK",
  HU = "HU",
  IS = "IS",
  IN = "IN",
  ID = "ID",
  IR = "IR",
  IQ = "IQ",
  IE = "IE",
  IM = "IM",
  IL = "IL",
  IT = "IT",
  JM = "JM",
  JP = "JP",
  JE = "JE",
  JO = "JO",
  KZ = "KZ",
  KE = "KE",
  KI = "KI",
  KP = "KP",
  XK = "XK",
  KW = "KW",
  KG = "KG",
  LA = "LA",
  LV = "LV",
  LB = "LB",
  LS = "LS",
  LR = "LR",
  LY = "LY",
  LI = "LI",
  LT = "LT",
  LU = "LU",
  MO = "MO",
  MK = "MK",
  MG = "MG",
  MW = "MW",
  MY = "MY",
  MV = "MV",
  ML = "ML",
  MT = "MT",
  MQ = "MQ",
  MR = "MR",
  MU = "MU",
  YT = "YT",
  MX = "MX",
  MD = "MD",
  MC = "MC",
  MN = "MN",
  ME = "ME",
  MS = "MS",
  MA = "MA",
  MZ = "MZ",
  MM = "MM",
  NA = "NA",
  NR = "NR",
  NP = "NP",
  NL = "NL",
  AN = "AN",
  NC = "NC",
  NZ = "NZ",
  NI = "NI",
  NE = "NE",
  NG = "NG",
  NU = "NU",
  NF = "NF",
  NO = "NO",
  OM = "OM",
  PK = "PK",
  PS = "PS",
  PA = "PA",
  PG = "PG",
  PY = "PY",
  PE = "PE",
  PH = "PH",
  PN = "PN",
  PL = "PL",
  PT = "PT",
  QA = "QA",
  CM = "CM",
  RE = "RE",
  RO = "RO",
  RU = "RU",
  RW = "RW",
  BL = "BL",
  SH = "SH",
  KN = "KN",
  LC = "LC",
  MF = "MF",
  PM = "PM",
  WS = "WS",
  SM = "SM",
  ST = "ST",
  SA = "SA",
  SN = "SN",
  RS = "RS",
  SC = "SC",
  SL = "SL",
  SG = "SG",
  SX = "SX",
  SK = "SK",
  SI = "SI",
  SB = "SB",
  SO = "SO",
  ZA = "ZA",
  GS = "GS",
  KR = "KR",
  SS = "SS",
  ES = "ES",
  LK = "LK",
  VC = "VC",
  SD = "SD",
  SR = "SR",
  SJ = "SJ",
  SZ = "SZ",
  SE = "SE",
  CH = "CH",
  SY = "SY",
  TW = "TW",
  TJ = "TJ",
  TZ = "TZ",
  TH = "TH",
  TL = "TL",
  TG = "TG",
  TK = "TK",
  TO = "TO",
  TT = "TT",
  TN = "TN",
  TR = "TR",
  TM = "TM",
  TC = "TC",
  TV = "TV",
  UG = "UG",
  UA = "UA",
  AE = "AE",
  GB = "GB",
  US = "US",
  UM = "UM",
  UY = "UY",
  UZ = "UZ",
  VU = "VU",
  VE = "VE",
  VN = "VN",
  VG = "VG",
  WF = "WF",
  EH = "EH",
  YE = "YE",
  ZM = "ZM",
  ZW = "ZW"
}
/** The method by which the discount's value is allocated onto its entitled lines. */
export enum DiscountApplicationAllocationMethod {
  ACROSS = "ACROSS",
  EACH = "EACH",
  ONE = "ONE"
}
/** Which lines on the order that the discount is allocated over, of the typedefined by the Discount Application's target_type. */
export enum DiscountApplicationTargetSelection {
  ALL = "ALL",
  ENTITLED = "ENTITLED",
  EXPLICIT = "EXPLICIT"
}
/** The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards. */
export enum DiscountApplicationTargetType {
  LINE_ITEM = "LINE_ITEM",
  SHIPPING_LINE = "SHIPPING_LINE"
}
/** The set of valid sort keys for the orders query. */
export enum OrderSortKeys {
  PROCESSED_AT = "PROCESSED_AT",
  TOTAL_PRICE = "TOTAL_PRICE",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** The set of valid sort keys for the pages query. */
export enum PageSortKeys {
  TITLE = "TITLE",
  UPDATED_AT = "UPDATED_AT",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** The set of valid sort keys for the products query. */
export enum ProductSortKeys {
  TITLE = "TITLE",
  PRODUCT_TYPE = "PRODUCT_TYPE",
  VENDOR = "VENDOR",
  UPDATED_AT = "UPDATED_AT",
  CREATED_AT = "CREATED_AT",
  BEST_SELLING = "BEST_SELLING",
  PRICE = "PRICE",
  ID = "ID",
  RELEVANCE = "RELEVANCE"
}
/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export enum CardBrand {
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
  DISCOVER = "DISCOVER",
  AMERICAN_EXPRESS = "AMERICAN_EXPRESS",
  DINERS_CLUB = "DINERS_CLUB",
  JCB = "JCB"
}
/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export enum DigitalWallet {
  APPLE_PAY = "APPLE_PAY",
  ANDROID_PAY = "ANDROID_PAY",
  GOOGLE_PAY = "GOOGLE_PAY",
  SHOPIFY_PAY = "SHOPIFY_PAY"
}
/** Possible error codes that could be returned by a checkout mutation. */
export enum CheckoutErrorCode {
  BLANK = "BLANK",
  INVALID = "INVALID",
  TOO_LONG = "TOO_LONG",
  PRESENT = "PRESENT",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
  LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
  ALREADY_COMPLETED = "ALREADY_COMPLETED",
  LOCKED = "LOCKED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  INVALID_FOR_COUNTRY_AND_PROVINCE = "INVALID_FOR_COUNTRY_AND_PROVINCE",
  INVALID_STATE_IN_COUNTRY = "INVALID_STATE_IN_COUNTRY",
  INVALID_PROVINCE_IN_COUNTRY = "INVALID_PROVINCE_IN_COUNTRY",
  INVALID_REGION_IN_COUNTRY = "INVALID_REGION_IN_COUNTRY",
  SHIPPING_RATE_EXPIRED = "SHIPPING_RATE_EXPIRED",
  GIFT_CARD_UNUSABLE = "GIFT_CARD_UNUSABLE",
  GIFT_CARD_DISABLED = "GIFT_CARD_DISABLED",
  GIFT_CARD_CODE_INVALID = "GIFT_CARD_CODE_INVALID",
  GIFT_CARD_ALREADY_APPLIED = "GIFT_CARD_ALREADY_APPLIED",
  GIFT_CARD_CURRENCY_MISMATCH = "GIFT_CARD_CURRENCY_MISMATCH",
  GIFT_CARD_EXPIRED = "GIFT_CARD_EXPIRED",
  GIFT_CARD_NOT_FOUND = "GIFT_CARD_NOT_FOUND",
  CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE = "CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE",
  DISCOUNT_EXPIRED = "DISCOUNT_EXPIRED",
  DISCOUNT_DISABLED = "DISCOUNT_DISABLED",
  DISCOUNT_LIMIT_REACHED = "DISCOUNT_LIMIT_REACHED",
  DISCOUNT_NOT_FOUND = "DISCOUNT_NOT_FOUND",
  CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE = "CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE",
  EMPTY = "EMPTY",
  NOT_ENOUGH_IN_STOCK = "NOT_ENOUGH_IN_STOCK",
  MISSING_PAYMENT_INPUT = "MISSING_PAYMENT_INPUT",
  LINE_ITEM_NOT_FOUND = "LINE_ITEM_NOT_FOUND"
}

export enum TransactionKind {
  SALE = "SALE",
  CAPTURE = "CAPTURE",
  AUTHORIZATION = "AUTHORIZATION",
  EMV_AUTHORIZATION = "EMV_AUTHORIZATION",
  CHANGE = "CHANGE"
}

export enum TransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  ERROR = "ERROR"
}
/** Possible error codes that could be returned by a customer mutation. */
export enum CustomerErrorCode {
  BLANK = "BLANK",
  INVALID = "INVALID",
  TAKEN = "TAKEN",
  TOO_LONG = "TOO_LONG",
  TOO_SHORT = "TOO_SHORT",
  UNIDENTIFIED_CUSTOMER = "UNIDENTIFIED_CUSTOMER",
  CUSTOMER_DISABLED = "CUSTOMER_DISABLED",
  PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE = "PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE",
  CONTAINS_HTML_TAGS = "CONTAINS_HTML_TAGS",
  CONTAINS_URL = "CONTAINS_URL",
  TOKEN_INVALID = "TOKEN_INVALID",
  ALREADY_ENABLED = "ALREADY_ENABLED",
  NOT_FOUND = "NOT_FOUND"
}

// ====================================================
// Unions
// ====================================================

/** The value of the pricing object. */
export type PricingValue = PricingPercentageValue | MoneyV2;

// ====================================================
// END: Typescript template
// ====================================================

// ====================================================
// Documents
// ====================================================

export namespace Shop {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    shop: Shop;
  };

  export type Shop = {
    __typename?: "Shop";

    name: string;
  };
}

export namespace CustomerAccessTokenCreate {
  export type Variables = {
    input: CustomerAccessTokenCreateInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    customerAccessTokenCreate?: CustomerAccessTokenCreate | null;
  };

  export type CustomerAccessTokenCreate = {
    __typename?: "CustomerAccessTokenCreatePayload";

    userErrors: UserErrors[];

    customerAccessToken?: CustomerAccessToken | null;

    customerUserErrors: CustomerUserErrors[];
  };

  export type UserErrors = {
    __typename?: "UserError";

    field?: string[] | null;

    message: string;
  };

  export type CustomerAccessToken = {
    __typename?: "CustomerAccessToken";

    accessToken: string;

    expiresAt: DateTime;
  };

  export type CustomerUserErrors = {
    __typename?: "CustomerUserError";

    field?: string[] | null;

    message: string;
  };
}

export namespace CustomerCreate {
  export type Variables = {
    input: CustomerCreateInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    customerCreate?: CustomerCreate | null;
  };

  export type CustomerCreate = {
    __typename?: "CustomerCreatePayload";

    customer?: Customer | null;

    customerUserErrors: CustomerUserErrors[];
  };

  export type Customer = {
    __typename?: "Customer";

    id: string;

    firstName?: string | null;

    lastName?: string | null;

    email?: string | null;

    acceptsMarketing: boolean;
  };

  export type CustomerUserErrors = {
    __typename?: "CustomerUserError";

    code?: CustomerErrorCode | null;

    field?: string[] | null;

    message: string;
  };
}

export namespace CustomerRecover {
  export type Variables = {
    email: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    customerRecover?: CustomerRecover | null;
  };

  export type CustomerRecover = {
    __typename?: "CustomerRecoverPayload";

    userErrors: UserErrors[];
  };

  export type UserErrors = {
    __typename?: "UserError";

    field?: string[] | null;

    message: string;
  };
}

export namespace CustomerReset {
  export type Variables = {
    id: string;
    input: CustomerResetInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    customerReset?: CustomerReset | null;
  };

  export type CustomerReset = {
    __typename?: "CustomerResetPayload";

    userErrors: UserErrors[];

    customer?: Customer | null;
  };

  export type UserErrors = {
    __typename?: "UserError";

    field?: string[] | null;

    message: string;
  };

  export type Customer = {
    __typename?: "Customer";

    id: string;
  };
}

export namespace CheckoutCreate {
  export type Variables = {
    input: CheckoutCreateInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    checkoutCreate?: CheckoutCreate | null;
  };

  export type CheckoutCreate = {
    __typename?: "CheckoutCreatePayload";

    userErrors: UserErrors[];

    checkout?: Checkout | null;

    checkoutUserErrors: CheckoutUserErrors[];
  };

  export type UserErrors = {
    __typename?: "UserError";

    field?: string[] | null;

    message: string;
  };

  export type Checkout = {
    __typename?: "Checkout";

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    lineItems: LineItems;
  };

  export type LineItems = {
    __typename?: "CheckoutLineItemConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "CheckoutLineItemEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "CheckoutLineItem";

    id: string;

    title: string;

    quantity: number;

    variant?: Variant | null;
  };

  export type Variant = {
    __typename?: "ProductVariant";

    id: string;

    product: Product;

    image?: Image | null;

    title: string;

    price: Money;

    compareAtPrice?: Money | null;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: "Product";

    handle: string;
  };

  export type Image = {
    __typename?: "Image";

    id?: string | null;

    altText?: string | null;

    originalSrc: Url;

    transformedSrc: Url;
  };

  export type CheckoutUserErrors = {
    __typename?: "CheckoutUserError";

    field?: string[] | null;

    message: string;
  };
}

export namespace CheckoutLineItemsAdd {
  export type Variables = {
    lineItems: CheckoutLineItemInput[];
    checkoutId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    checkoutLineItemsAdd?: CheckoutLineItemsAdd | null;
  };

  export type CheckoutLineItemsAdd = {
    __typename?: "CheckoutLineItemsAddPayload";

    checkout?: Checkout | null;
  };

  export type Checkout = {
    __typename?: "Checkout";

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    order?: Order | null;

    lineItems: LineItems;
  };

  export type Order = {
    __typename?: "Order";

    id: string;

    orderNumber: number;
  };

  export type LineItems = {
    __typename?: "CheckoutLineItemConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "CheckoutLineItemEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "CheckoutLineItem";

    id: string;

    title: string;

    quantity: number;

    variant?: Variant | null;
  };

  export type Variant = {
    __typename?: "ProductVariant";

    id: string;

    product: Product;

    image?: Image | null;

    title: string;

    price: Money;

    compareAtPrice?: Money | null;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: "Product";

    handle: string;
  };

  export type Image = {
    __typename?: "Image";

    id?: string | null;

    altText?: string | null;

    originalSrc: Url;

    transformedSrc: Url;
  };
}

export namespace CheckoutLineItemsReplace {
  export type Variables = {
    lineItems: CheckoutLineItemInput[];
    checkoutId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    checkoutLineItemsReplace?: CheckoutLineItemsReplace | null;
  };

  export type CheckoutLineItemsReplace = {
    __typename?: "CheckoutLineItemsReplacePayload";

    checkout?: Checkout | null;
  };

  export type Checkout = {
    __typename?: "Checkout";

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    order?: Order | null;

    lineItems: LineItems;
  };

  export type Order = {
    __typename?: "Order";

    id: string;

    orderNumber: number;
  };

  export type LineItems = {
    __typename?: "CheckoutLineItemConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "CheckoutLineItemEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "CheckoutLineItem";

    id: string;

    title: string;

    quantity: number;

    variant?: Variant | null;
  };

  export type Variant = {
    __typename?: "ProductVariant";

    id: string;

    product: Product;

    image?: Image | null;

    title: string;

    price: Money;

    compareAtPrice?: Money | null;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: "Product";

    handle: string;
  };

  export type Image = {
    __typename?: "Image";

    id?: string | null;

    altText?: string | null;

    originalSrc: Url;

    transformedSrc: Url;
  };
}

export namespace GetCheckout {
  export type Variables = {
    input: string;
  };

  export type Query = {
    __typename?: "Query";

    node?: Node | null;
  };

  export type Node = {
    __typename?: CheckoutInlineFragment["__typename"];

    id: string;
  } & (CheckoutInlineFragment);

  export type CheckoutInlineFragment = {
    __typename?: "Checkout";

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    order?: Order | null;

    lineItems: LineItems;
  };

  export type Order = {
    __typename?: "Order";

    id: string;

    orderNumber: number;
  };

  export type LineItems = {
    __typename?: "CheckoutLineItemConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "CheckoutLineItemEdge";

    node: _Node;
  };

  export type _Node = {
    __typename?: "CheckoutLineItem";

    id: string;

    title: string;

    quantity: number;

    variant?: Variant | null;
  };

  export type Variant = {
    __typename?: "ProductVariant";

    id: string;

    product: Product;

    image?: Image | null;

    title: string;

    price: Money;

    compareAtPrice?: Money | null;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: "Product";

    handle: string;
  };

  export type Image = {
    __typename?: "Image";

    id?: string | null;

    altText?: string | null;

    originalSrc: Url;

    transformedSrc: Url;
  };
}

export namespace CheckoutCustomerAssociateV2 {
  export type Variables = {
    checkoutId: string;
    customerAccessToken: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    checkoutCustomerAssociateV2?: CheckoutCustomerAssociateV2 | null;
  };

  export type CheckoutCustomerAssociateV2 = {
    __typename?: "CheckoutCustomerAssociateV2Payload";

    userErrors: UserErrors[];

    checkout?: Checkout | null;

    customer?: Customer | null;
  };

  export type UserErrors = {
    __typename?: "UserError";

    field?: string[] | null;

    message: string;
  };

  export type Checkout = {
    __typename?: "Checkout";

    id: string;
  };

  export type Customer = {
    __typename?: "Customer";

    id: string;
  };
}

export namespace CheckoutDiscountCodeApplyV2 {
  export type Variables = {
    discountCode: string;
    checkoutId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    checkoutDiscountCodeApplyV2?: CheckoutDiscountCodeApplyV2 | null;
  };

  export type CheckoutDiscountCodeApplyV2 = {
    __typename?: "CheckoutDiscountCodeApplyV2Payload";

    userErrors: UserErrors[];

    checkout?: Checkout | null;
  };

  export type UserErrors = {
    __typename?: "UserError";

    field?: string[] | null;

    message: string;
  };

  export type Checkout = {
    __typename?: "Checkout";

    id: string;
  };
}

export namespace GetProducts {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    shop: Shop;
  };

  export type Shop = {
    __typename?: "Shop";

    products: Products;
  };

  export type Products = {
    __typename?: "ProductConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "ProductEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "Product";

    id: string;

    title: string;

    handle: string;

    description: string;

    priceRange: PriceRange;

    variants: Variants;
  };

  export type PriceRange = {
    __typename?: "ProductPriceRange";

    maxVariantPrice: MaxVariantPrice;
  };

  export type MaxVariantPrice = {
    __typename?: "MoneyV2";

    amount: Decimal;
  };

  export type Variants = {
    __typename?: "ProductVariantConnection";

    edges: _Edges[];
  };

  export type _Edges = {
    __typename?: "ProductVariantEdge";

    node: _Node;
  };

  export type _Node = {
    __typename?: "ProductVariant";

    id: string;

    title: string;

    price: Money;

    sku?: string | null;
  };
}

export namespace GetProduct {
  export type Variables = {
    input: string;
  };

  export type Query = {
    __typename?: "Query";

    shop: Shop;
  };

  export type Shop = {
    __typename?: "Shop";

    productByHandle?: ProductByHandle | null;
  };

  export type ProductByHandle = {
    __typename?: "Product";

    id: string;

    title: string;

    handle: string;

    priceRange: PriceRange;

    variants: Variants;
  };

  export type PriceRange = {
    __typename?: "ProductPriceRange";

    maxVariantPrice: MaxVariantPrice;
  };

  export type MaxVariantPrice = {
    __typename?: "MoneyV2";

    amount: Decimal;
  };

  export type Variants = {
    __typename?: "ProductVariantConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "ProductVariantEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "ProductVariant";

    id: string;

    title: string;

    price: Money;
  };
}

export namespace GetCustomer {
  export type Variables = {
    input: string;
  };

  export type Query = {
    __typename?: "Query";

    customer?: Customer | null;
  };

  export type Customer = {
    __typename?: "Customer";

    firstName?: string | null;

    lastName?: string | null;

    email?: string | null;

    id: string;

    orders: Orders;
  };

  export type Orders = {
    __typename?: "OrderConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "OrderEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "Order";

    orderNumber: number;

    processedAt: DateTime;

    shippingAddress?: ShippingAddress | null;

    successfulFulfillments?: SuccessfulFulfillments[] | null;

    totalPrice: Money;

    subtotalPrice?: Money | null;

    totalShippingPrice: Money;

    lineItems: LineItems;
  };

  export type ShippingAddress = {
    __typename?: "MailingAddress";

    formatted: string[];
  };

  export type SuccessfulFulfillments = {
    __typename?: "Fulfillment";

    trackingInfo: TrackingInfo[];
  };

  export type TrackingInfo = {
    __typename?: "FulfillmentTrackingInfo";

    number?: string | null;

    url?: Url | null;
  };

  export type LineItems = {
    __typename?: "OrderLineItemConnection";

    edges: _Edges[];
  };

  export type _Edges = {
    __typename?: "OrderLineItemEdge";

    node: _Node;
  };

  export type _Node = {
    __typename?: "OrderLineItem";

    quantity: number;

    title: string;

    variant?: Variant | null;
  };

  export type Variant = {
    __typename?: "ProductVariant";

    id: string;

    image?: Image | null;

    sku?: string | null;

    title: string;

    price: Money;

    compareAtPrice?: Money | null;

    availableForSale: boolean;

    product: Product;
  };

  export type Image = {
    __typename?: "Image";

    originalSrc: Url;

    altText?: string | null;

    id?: string | null;

    transformedSrc: Url;
  };

  export type Product = {
    __typename?: "Product";

    handle: string;
  };
}

export namespace GetCustomerOrders {
  export type Variables = {
    input: string;
  };

  export type Query = {
    __typename?: "Query";

    customer?: Customer | null;
  };

  export type Customer = {
    __typename?: "Customer";

    firstName?: string | null;

    id: string;

    orders: Orders;
  };

  export type Orders = {
    __typename?: "OrderConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "OrderEdge";

    node: Node;
  };

  export type Node = {
    __typename?: "Order";

    id: string;

    orderNumber: number;

    processedAt: DateTime;

    successfulFulfillments?: SuccessfulFulfillments[] | null;

    totalPrice: Money;
  };

  export type SuccessfulFulfillments = {
    __typename?: "Fulfillment";

    trackingCompany?: string | null;
  };
}

export namespace GetOrder {
  export type Variables = {
    input: string;
  };

  export type Query = {
    __typename?: "Query";

    node?: Node | null;
  };

  export type Node = OrderInlineFragment;

  export type OrderInlineFragment = {
    __typename?: "Order";

    orderNumber: number;

    processedAt: DateTime;

    shippingAddress?: ShippingAddress | null;

    successfulFulfillments?: SuccessfulFulfillments[] | null;

    totalPrice: Money;

    subtotalPrice?: Money | null;

    totalShippingPrice: Money;

    lineItems: LineItems;
  };

  export type ShippingAddress = {
    __typename?: "MailingAddress";

    formatted: string[];

    firstName?: string | null;

    lastName?: string | null;
  };

  export type SuccessfulFulfillments = {
    __typename?: "Fulfillment";

    trackingInfo: TrackingInfo[];
  };

  export type TrackingInfo = {
    __typename?: "FulfillmentTrackingInfo";

    number?: string | null;

    url?: Url | null;
  };

  export type LineItems = {
    __typename?: "OrderLineItemConnection";

    edges: Edges[];
  };

  export type Edges = {
    __typename?: "OrderLineItemEdge";

    node: _Node;
  };

  export type _Node = {
    __typename?: "OrderLineItem";

    quantity: number;

    title: string;

    variant?: Variant | null;
  };

  export type Variant = {
    __typename?: "ProductVariant";

    id: string;

    image?: Image | null;

    sku?: string | null;

    title: string;

    price: Money;

    compareAtPrice?: Money | null;

    availableForSale: boolean;

    product: Product;
  };

  export type Image = {
    __typename?: "Image";

    originalSrc: Url;

    altText?: string | null;

    id?: string | null;

    transformedSrc: Url;
  };

  export type Product = {
    __typename?: "Product";

    handle: string;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class ShopGQL extends Apollo.Query<Shop.Query, Shop.Variables> {
  document: any = gql`
    query Shop {
      shop {
        name
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CustomerAccessTokenCreateGQL extends Apollo.Mutation<
  CustomerAccessTokenCreate.Mutation,
  CustomerAccessTokenCreate.Variables
> {
  document: any = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        userErrors {
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CustomerCreateGQL extends Apollo.Mutation<
  CustomerCreate.Mutation,
  CustomerCreate.Variables
> {
  document: any = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
          acceptsMarketing
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CustomerRecoverGQL extends Apollo.Mutation<
  CustomerRecover.Mutation,
  CustomerRecover.Variables
> {
  document: any = gql`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        userErrors {
          field
          message
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CustomerResetGQL extends Apollo.Mutation<
  CustomerReset.Mutation,
  CustomerReset.Variables
> {
  document: any = gql`
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
      customerReset(id: $id, input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CheckoutCreateGQL extends Apollo.Mutation<
  CheckoutCreate.Mutation,
  CheckoutCreate.Variables
> {
  document: any = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        userErrors {
          field
          message
        }
        checkout {
          id
          webUrl
          subtotalPrice
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  product {
                    handle
                  }
                  image {
                    id
                    altText
                    originalSrc
                    transformedSrc
                  }
                  title
                  price
                  compareAtPrice
                  availableForSale
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CheckoutLineItemsAddGQL extends Apollo.Mutation<
  CheckoutLineItemsAdd.Mutation,
  CheckoutLineItemsAdd.Variables
> {
  document: any = gql`
    mutation checkoutLineItemsAdd(
      $lineItems: [CheckoutLineItemInput!]!
      $checkoutId: ID!
    ) {
      checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
        checkout {
          id
          webUrl
          subtotalPrice
          order {
            id
            orderNumber
          }
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  product {
                    handle
                  }
                  image {
                    id
                    altText
                    originalSrc
                    transformedSrc
                  }
                  title
                  price
                  compareAtPrice
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CheckoutLineItemsReplaceGQL extends Apollo.Mutation<
  CheckoutLineItemsReplace.Mutation,
  CheckoutLineItemsReplace.Variables
> {
  document: any = gql`
    mutation checkoutLineItemsReplace(
      $lineItems: [CheckoutLineItemInput!]!
      $checkoutId: ID!
    ) {
      checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
        checkout {
          id
          webUrl
          subtotalPrice
          order {
            id
            orderNumber
          }
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  product {
                    handle
                  }
                  image {
                    id
                    altText
                    originalSrc
                    transformedSrc
                  }
                  title
                  price
                  compareAtPrice
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetCheckoutGQL extends Apollo.Query<
  GetCheckout.Query,
  GetCheckout.Variables
> {
  document: any = gql`
    query getCheckout($input: ID!) {
      node(id: $input) {
        id
        ... on Checkout {
          id
          webUrl
          subtotalPrice
          order {
            id
            orderNumber
          }
          lineItems(first: 100) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  product {
                    handle
                  }
                  image {
                    id
                    altText
                    originalSrc
                    transformedSrc
                  }
                  title
                  price
                  compareAtPrice
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CheckoutCustomerAssociateV2GQL extends Apollo.Mutation<
  CheckoutCustomerAssociateV2.Mutation,
  CheckoutCustomerAssociateV2.Variables
> {
  document: any = gql`
    mutation checkoutCustomerAssociateV2(
      $checkoutId: ID!
      $customerAccessToken: String!
    ) {
      checkoutCustomerAssociateV2(
        checkoutId: $checkoutId
        customerAccessToken: $customerAccessToken
      ) {
        userErrors {
          field
          message
        }
        checkout {
          id
        }
        customer {
          id
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class CheckoutDiscountCodeApplyV2GQL extends Apollo.Mutation<
  CheckoutDiscountCodeApplyV2.Mutation,
  CheckoutDiscountCodeApplyV2.Variables
> {
  document: any = gql`
    mutation checkoutDiscountCodeApplyV2(
      $discountCode: String!
      $checkoutId: ID!
    ) {
      checkoutDiscountCodeApplyV2(
        discountCode: $discountCode
        checkoutId: $checkoutId
      ) {
        userErrors {
          field
          message
        }
        checkout {
          id
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetProductsGQL extends Apollo.Query<
  GetProducts.Query,
  GetProducts.Variables
> {
  document: any = gql`
    query getProducts {
      shop {
        products(first: 100) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    price
                    sku
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetProductGQL extends Apollo.Query<
  GetProduct.Query,
  GetProduct.Variables
> {
  document: any = gql`
    query getProduct($input: String!) {
      shop {
        productByHandle(handle: $input) {
          id
          title
          handle
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetCustomerGQL extends Apollo.Query<
  GetCustomer.Query,
  GetCustomer.Variables
> {
  document: any = gql`
    query getCustomer($input: String!) {
      customer(customerAccessToken: $input) {
        firstName
        lastName
        email
        id
        orders(first: 100) {
          edges {
            node {
              orderNumber
              processedAt
              shippingAddress {
                formatted
              }
              successfulFulfillments(first: 100) {
                trackingInfo {
                  number
                  url
                }
              }
              totalPrice
              subtotalPrice
              totalShippingPrice
              lineItems(first: 100) {
                edges {
                  node {
                    quantity
                    title
                    variant {
                      id
                      image {
                        originalSrc
                        altText
                        id
                        transformedSrc
                      }
                      sku
                      title
                      price
                      compareAtPrice
                      availableForSale
                      product {
                        handle
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetCustomerOrdersGQL extends Apollo.Query<
  GetCustomerOrders.Query,
  GetCustomerOrders.Variables
> {
  document: any = gql`
    query getCustomerOrders($input: String!) {
      customer(customerAccessToken: $input) {
        firstName
        id
        orders(first: 100) {
          edges {
            node {
              id
              orderNumber
              processedAt
              successfulFulfillments(first: 1) {
                trackingCompany
              }
              totalPrice
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class GetOrderGQL extends Apollo.Query<
  GetOrder.Query,
  GetOrder.Variables
> {
  document: any = gql`
    query getOrder($input: ID!) {
      node(id: $input) {
        ... on Order {
          orderNumber
          processedAt
          shippingAddress {
            formatted
            firstName
            lastName
          }
          successfulFulfillments(first: 100) {
            trackingInfo {
              number
              url
            }
          }
          totalPrice
          subtotalPrice
          totalShippingPrice
          lineItems(first: 100) {
            edges {
              node {
                quantity
                title
                variant {
                  id
                  image {
                    originalSrc
                    altText
                    id
                    transformedSrc
                  }
                  sku
                  title
                  price
                  compareAtPrice
                  availableForSale
                  product {
                    handle
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
