import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;

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
  note?: Maybe<string>;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<AttributeInput[]>;
  /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes. The required attributes are city, province, and country. Full validation of the addresses is still done at complete time. */
  allowPartialAddresses?: boolean;
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
  note?: Maybe<string>;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<AttributeInput[]>;
  /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes. The required attributes are city, province, and country. Full validation of the addresses is still done at complete time. */
  allowPartialAddresses?: boolean;
}
/** Specifies the fields required to complete a checkout with a Shopify vaulted credit card payment. */
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
  test?: boolean;
}
/** Specifies the fields accepted to create or update a mailing address. */
export interface MailingAddressInput {
  address1?: Maybe<string>;

  address2?: Maybe<string>;

  city?: Maybe<string>;

  company?: Maybe<string>;

  country?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  phone?: Maybe<string>;

  province?: Maybe<string>;

  zip?: Maybe<string>;
}
/** Specifies the fields required to complete a checkout with a Shopify vaulted credit card payment. */
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
  test?: boolean;
}
/** Specifies the fields for a monetary value with currency. */
export interface MoneyInput {
  /** Decimal money amount. */
  amount: Decimal;
  /** Currency of the money. */
  currencyCode: CurrencyCode;
}
/** Specifies the fields required to complete a checkout with a tokenized payment. */
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
  test?: boolean;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<string>;
}
/** Specifies the fields required to complete a checkout with a tokenized payment. */
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
  test?: boolean;
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<string>;
}
/** Specifies the fields required to create a checkout. */
export interface CheckoutCreateInput {
  /** The email with which the customer wants to checkout. */
  email?: Maybe<string>;
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems?: Maybe<CheckoutLineItemInput[]>;
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: Maybe<MailingAddressInput>;
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<string>;
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<AttributeInput[]>;
  /** Allows setting partial addresses on a Checkout, skipping the full validation of attributes. The required attributes are city, province, and country. Full validation of addresses is still done at complete time. */
  allowPartialAddresses?: Maybe<boolean>;
  /** The three-letter currency code of one of the shop's enabled presentment currencies. Including this field creates a checkout in the specified currency. By default, new checkouts are created in the shop's primary currency. */
  presentmentCurrencyCode?: Maybe<CurrencyCode>;
}
/** Specifies the input fields to create a line item on a checkout. */
export interface CheckoutLineItemInput {
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: Maybe<AttributeInput[]>;
  /** The quantity of the line item. */
  quantity: number;
  /** The identifier of the product variant for the line item. */
  variantId: string;
}
/** Specifies the input fields to update a line item on the checkout. */
export interface CheckoutLineItemUpdateInput {
  id?: Maybe<string>;
  /** The variant identifier of the line item. */
  variantId?: Maybe<string>;
  /** The quantity of the line item. */
  quantity?: Maybe<number>;
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: Maybe<AttributeInput[]>;
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
  firstName?: Maybe<string>;
  /** The customer’s last name. */
  lastName?: Maybe<string>;
  /** The customer’s email. */
  email: string;
  /** The customer’s phone number. */
  phone?: Maybe<string>;
  /** The login password used by the customer. */
  password: string;
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: Maybe<boolean>;
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
  firstName?: Maybe<string>;
  /** The customer’s last name. */
  lastName?: Maybe<string>;
  /** The customer’s email. */
  email?: Maybe<string>;
  /** The customer’s phone number. */
  phone?: Maybe<string>;
  /** The login password used by the customer. */
  password?: Maybe<string>;
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: Maybe<boolean>;
}
/** The set of valid sort keys for the articles query. */
export enum ArticleSortKeys {
  Title = 'TITLE',
  BlogTitle = 'BLOG_TITLE',
  Author = 'AUTHOR',
  UpdatedAt = 'UPDATED_AT',
  PublishedAt = 'PUBLISHED_AT',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** The part of the image that should remain after cropping. */
export enum CropRegion {
  Center = 'CENTER',
  Top = 'TOP',
  Bottom = 'BOTTOM',
  Left = 'LEFT',
  Right = 'RIGHT'
}
/** List of supported image content types. */
export enum ImageContentType {
  Png = 'PNG',
  Jpg = 'JPG',
  Webp = 'WEBP'
}
/** The set of valid sort keys for the blogs query. */
export enum BlogSortKeys {
  Handle = 'HANDLE',
  Title = 'TITLE',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** The set of valid sort keys for the products query. */
export enum ProductCollectionSortKeys {
  Title = 'TITLE',
  Price = 'PRICE',
  BestSelling = 'BEST_SELLING',
  Created = 'CREATED',
  Id = 'ID',
  Manual = 'MANUAL',
  CollectionDefault = 'COLLECTION_DEFAULT',
  Relevance = 'RELEVANCE'
}
/** Currency codes */
export enum CurrencyCode {
  Usd = 'USD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Cad = 'CAD',
  Afn = 'AFN',
  All = 'ALL',
  Dzd = 'DZD',
  Aoa = 'AOA',
  Ars = 'ARS',
  Amd = 'AMD',
  Awg = 'AWG',
  Aud = 'AUD',
  Bbd = 'BBD',
  Azn = 'AZN',
  Bdt = 'BDT',
  Bsd = 'BSD',
  Bhd = 'BHD',
  Bif = 'BIF',
  Byr = 'BYR',
  Bzd = 'BZD',
  Bmd = 'BMD',
  Btn = 'BTN',
  Bam = 'BAM',
  Brl = 'BRL',
  Bob = 'BOB',
  Bwp = 'BWP',
  Bnd = 'BND',
  Bgn = 'BGN',
  Mmk = 'MMK',
  Khr = 'KHR',
  Cve = 'CVE',
  Kyd = 'KYD',
  Xaf = 'XAF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Kmf = 'KMF',
  Cdf = 'CDF',
  Crc = 'CRC',
  Hrk = 'HRK',
  Czk = 'CZK',
  Dkk = 'DKK',
  Dop = 'DOP',
  Xcd = 'XCD',
  Egp = 'EGP',
  Etb = 'ETB',
  Xpf = 'XPF',
  Fjd = 'FJD',
  Gmd = 'GMD',
  Ghs = 'GHS',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Gel = 'GEL',
  Htg = 'HTG',
  Hnl = 'HNL',
  Hkd = 'HKD',
  Huf = 'HUF',
  Isk = 'ISK',
  Inr = 'INR',
  Idr = 'IDR',
  Ils = 'ILS',
  Iqd = 'IQD',
  Jmd = 'JMD',
  Jpy = 'JPY',
  Jep = 'JEP',
  Jod = 'JOD',
  Kzt = 'KZT',
  Kes = 'KES',
  Kwd = 'KWD',
  Kgs = 'KGS',
  Lak = 'LAK',
  Lvl = 'LVL',
  Lbp = 'LBP',
  Lsl = 'LSL',
  Lrd = 'LRD',
  Ltl = 'LTL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mop = 'MOP',
  Mwk = 'MWK',
  Mvr = 'MVR',
  Mxn = 'MXN',
  Myr = 'MYR',
  Mur = 'MUR',
  Mdl = 'MDL',
  Mad = 'MAD',
  Mnt = 'MNT',
  Mzn = 'MZN',
  Nad = 'NAD',
  Npr = 'NPR',
  Ang = 'ANG',
  Nzd = 'NZD',
  Nio = 'NIO',
  Ngn = 'NGN',
  Nok = 'NOK',
  Omr = 'OMR',
  Pab = 'PAB',
  Pkr = 'PKR',
  Pgk = 'PGK',
  Pyg = 'PYG',
  Pen = 'PEN',
  Php = 'PHP',
  Pln = 'PLN',
  Qar = 'QAR',
  Ron = 'RON',
  Rub = 'RUB',
  Rwf = 'RWF',
  Wst = 'WST',
  Sar = 'SAR',
  Std = 'STD',
  Rsd = 'RSD',
  Scr = 'SCR',
  Sgd = 'SGD',
  Sdg = 'SDG',
  Syp = 'SYP',
  Zar = 'ZAR',
  Krw = 'KRW',
  Ssp = 'SSP',
  Sbd = 'SBD',
  Lkr = 'LKR',
  Srd = 'SRD',
  Szl = 'SZL',
  Sek = 'SEK',
  Chf = 'CHF',
  Twd = 'TWD',
  Thb = 'THB',
  Tzs = 'TZS',
  Ttd = 'TTD',
  Tnd = 'TND',
  Try = 'TRY',
  Tmt = 'TMT',
  Ugx = 'UGX',
  Uah = 'UAH',
  Aed = 'AED',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Vuv = 'VUV',
  Vef = 'VEF',
  Vnd = 'VND',
  Xof = 'XOF',
  Yer = 'YER',
  Zmw = 'ZMW'
}
/** Units of measurement for weight. */
export enum WeightUnit {
  Kilograms = 'KILOGRAMS',
  Grams = 'GRAMS',
  Pounds = 'POUNDS',
  Ounces = 'OUNCES'
}
/** Metafield value types. */
export enum MetafieldValueType {
  String = 'STRING',
  Integer = 'INTEGER',
  JsonString = 'JSON_STRING'
}
/** The set of valid sort keys for the images query. */
export enum ProductImageSortKeys {
  CreatedAt = 'CREATED_AT',
  Position = 'POSITION',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** The set of valid sort keys for the variants query. */
export enum ProductVariantSortKeys {
  Title = 'TITLE',
  Sku = 'SKU',
  Position = 'POSITION',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** The set of valid sort keys for the collections query. */
export enum CollectionSortKeys {
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** ISO 3166-1 alpha-2 country codes with some differences. */
export enum CountryCode {
  Af = 'AF',
  Ax = 'AX',
  Al = 'AL',
  Dz = 'DZ',
  Ad = 'AD',
  Ao = 'AO',
  Ai = 'AI',
  Ag = 'AG',
  Ar = 'AR',
  Am = 'AM',
  Aw = 'AW',
  Au = 'AU',
  At = 'AT',
  Az = 'AZ',
  Bs = 'BS',
  Bh = 'BH',
  Bd = 'BD',
  Bb = 'BB',
  By = 'BY',
  Be = 'BE',
  Bz = 'BZ',
  Bj = 'BJ',
  Bm = 'BM',
  Bt = 'BT',
  Bo = 'BO',
  Bq = 'BQ',
  Ba = 'BA',
  Bw = 'BW',
  Bv = 'BV',
  Br = 'BR',
  Io = 'IO',
  Bn = 'BN',
  Bg = 'BG',
  Bf = 'BF',
  Bi = 'BI',
  Kh = 'KH',
  Ca = 'CA',
  Cv = 'CV',
  Ky = 'KY',
  Cf = 'CF',
  Td = 'TD',
  Cl = 'CL',
  Cn = 'CN',
  Cx = 'CX',
  Cc = 'CC',
  Co = 'CO',
  Km = 'KM',
  Cg = 'CG',
  Cd = 'CD',
  Ck = 'CK',
  Cr = 'CR',
  Hr = 'HR',
  Cu = 'CU',
  Cw = 'CW',
  Cy = 'CY',
  Cz = 'CZ',
  Ci = 'CI',
  Dk = 'DK',
  Dj = 'DJ',
  Dm = 'DM',
  Do = 'DO',
  Ec = 'EC',
  Eg = 'EG',
  Sv = 'SV',
  Gq = 'GQ',
  Er = 'ER',
  Ee = 'EE',
  Et = 'ET',
  Fk = 'FK',
  Fo = 'FO',
  Fj = 'FJ',
  Fi = 'FI',
  Fr = 'FR',
  Gf = 'GF',
  Pf = 'PF',
  Tf = 'TF',
  Ga = 'GA',
  Gm = 'GM',
  Ge = 'GE',
  De = 'DE',
  Gh = 'GH',
  Gi = 'GI',
  Gr = 'GR',
  Gl = 'GL',
  Gd = 'GD',
  Gp = 'GP',
  Gt = 'GT',
  Gg = 'GG',
  Gn = 'GN',
  Gw = 'GW',
  Gy = 'GY',
  Ht = 'HT',
  Hm = 'HM',
  Va = 'VA',
  Hn = 'HN',
  Hk = 'HK',
  Hu = 'HU',
  Is = 'IS',
  In = 'IN',
  Id = 'ID',
  Ir = 'IR',
  Iq = 'IQ',
  Ie = 'IE',
  Im = 'IM',
  Il = 'IL',
  It = 'IT',
  Jm = 'JM',
  Jp = 'JP',
  Je = 'JE',
  Jo = 'JO',
  Kz = 'KZ',
  Ke = 'KE',
  Ki = 'KI',
  Kp = 'KP',
  Xk = 'XK',
  Kw = 'KW',
  Kg = 'KG',
  La = 'LA',
  Lv = 'LV',
  Lb = 'LB',
  Ls = 'LS',
  Lr = 'LR',
  Ly = 'LY',
  Li = 'LI',
  Lt = 'LT',
  Lu = 'LU',
  Mo = 'MO',
  Mk = 'MK',
  Mg = 'MG',
  Mw = 'MW',
  My = 'MY',
  Mv = 'MV',
  Ml = 'ML',
  Mt = 'MT',
  Mq = 'MQ',
  Mr = 'MR',
  Mu = 'MU',
  Yt = 'YT',
  Mx = 'MX',
  Md = 'MD',
  Mc = 'MC',
  Mn = 'MN',
  Me = 'ME',
  Ms = 'MS',
  Ma = 'MA',
  Mz = 'MZ',
  Mm = 'MM',
  Na = 'NA',
  Nr = 'NR',
  Np = 'NP',
  Nl = 'NL',
  An = 'AN',
  Nc = 'NC',
  Nz = 'NZ',
  Ni = 'NI',
  Ne = 'NE',
  Ng = 'NG',
  Nu = 'NU',
  Nf = 'NF',
  No = 'NO',
  Om = 'OM',
  Pk = 'PK',
  Ps = 'PS',
  Pa = 'PA',
  Pg = 'PG',
  Py = 'PY',
  Pe = 'PE',
  Ph = 'PH',
  Pn = 'PN',
  Pl = 'PL',
  Pt = 'PT',
  Qa = 'QA',
  Cm = 'CM',
  Re = 'RE',
  Ro = 'RO',
  Ru = 'RU',
  Rw = 'RW',
  Bl = 'BL',
  Sh = 'SH',
  Kn = 'KN',
  Lc = 'LC',
  Mf = 'MF',
  Pm = 'PM',
  Ws = 'WS',
  Sm = 'SM',
  St = 'ST',
  Sa = 'SA',
  Sn = 'SN',
  Rs = 'RS',
  Sc = 'SC',
  Sl = 'SL',
  Sg = 'SG',
  Sx = 'SX',
  Sk = 'SK',
  Si = 'SI',
  Sb = 'SB',
  So = 'SO',
  Za = 'ZA',
  Gs = 'GS',
  Kr = 'KR',
  Ss = 'SS',
  Es = 'ES',
  Lk = 'LK',
  Vc = 'VC',
  Sd = 'SD',
  Sr = 'SR',
  Sj = 'SJ',
  Sz = 'SZ',
  Se = 'SE',
  Ch = 'CH',
  Sy = 'SY',
  Tw = 'TW',
  Tj = 'TJ',
  Tz = 'TZ',
  Th = 'TH',
  Tl = 'TL',
  Tg = 'TG',
  Tk = 'TK',
  To = 'TO',
  Tt = 'TT',
  Tn = 'TN',
  Tr = 'TR',
  Tm = 'TM',
  Tc = 'TC',
  Tv = 'TV',
  Ug = 'UG',
  Ua = 'UA',
  Ae = 'AE',
  Gb = 'GB',
  Us = 'US',
  Um = 'UM',
  Uy = 'UY',
  Uz = 'UZ',
  Vu = 'VU',
  Ve = 'VE',
  Vn = 'VN',
  Vg = 'VG',
  Wf = 'WF',
  Eh = 'EH',
  Ye = 'YE',
  Zm = 'ZM',
  Zw = 'ZW'
}
/** The method by which the discount's value is allocated onto its entitled lines. */
export enum DiscountApplicationAllocationMethod {
  Across = 'ACROSS',
  Each = 'EACH',
  One = 'ONE'
}
/** Which lines on the order that the discount is allocated over, of the type defined by the Discount Application's target_type. */
export enum DiscountApplicationTargetSelection {
  All = 'ALL',
  Entitled = 'ENTITLED',
  Explicit = 'EXPLICIT'
}
/** The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards. */
export enum DiscountApplicationTargetType {
  LineItem = 'LINE_ITEM',
  ShippingLine = 'SHIPPING_LINE'
}
/** The set of valid sort keys for the orders query. */
export enum OrderSortKeys {
  ProcessedAt = 'PROCESSED_AT',
  TotalPrice = 'TOTAL_PRICE',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** The set of valid sort keys for the pages query. */
export enum PageSortKeys {
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** The set of valid sort keys for the products query. */
export enum ProductSortKeys {
  Title = 'TITLE',
  ProductType = 'PRODUCT_TYPE',
  Vendor = 'VENDOR',
  UpdatedAt = 'UPDATED_AT',
  CreatedAt = 'CREATED_AT',
  BestSelling = 'BEST_SELLING',
  Price = 'PRICE',
  Id = 'ID',
  Relevance = 'RELEVANCE'
}
/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export enum CardBrand {
  Visa = 'VISA',
  Mastercard = 'MASTERCARD',
  Discover = 'DISCOVER',
  AmericanExpress = 'AMERICAN_EXPRESS',
  DinersClub = 'DINERS_CLUB',
  Jcb = 'JCB'
}
/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export enum DigitalWallet {
  ApplePay = 'APPLE_PAY',
  AndroidPay = 'ANDROID_PAY',
  GooglePay = 'GOOGLE_PAY',
  ShopifyPay = 'SHOPIFY_PAY'
}
/** Possible error codes that could be returned by a checkout mutation. */
export enum CheckoutErrorCode {
  Blank = 'BLANK',
  Invalid = 'INVALID',
  TooLong = 'TOO_LONG',
  Present = 'PRESENT',
  LessThan = 'LESS_THAN',
  GreaterThanOrEqualTo = 'GREATER_THAN_OR_EQUAL_TO',
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO',
  AlreadyCompleted = 'ALREADY_COMPLETED',
  Locked = 'LOCKED',
  NotSupported = 'NOT_SUPPORTED',
  BadDomain = 'BAD_DOMAIN',
  InvalidForCountry = 'INVALID_FOR_COUNTRY',
  InvalidForCountryAndProvince = 'INVALID_FOR_COUNTRY_AND_PROVINCE',
  InvalidStateInCountry = 'INVALID_STATE_IN_COUNTRY',
  InvalidProvinceInCountry = 'INVALID_PROVINCE_IN_COUNTRY',
  InvalidRegionInCountry = 'INVALID_REGION_IN_COUNTRY',
  ShippingRateExpired = 'SHIPPING_RATE_EXPIRED',
  GiftCardUnusable = 'GIFT_CARD_UNUSABLE',
  GiftCardDisabled = 'GIFT_CARD_DISABLED',
  GiftCardCodeInvalid = 'GIFT_CARD_CODE_INVALID',
  GiftCardAlreadyApplied = 'GIFT_CARD_ALREADY_APPLIED',
  GiftCardCurrencyMismatch = 'GIFT_CARD_CURRENCY_MISMATCH',
  GiftCardExpired = 'GIFT_CARD_EXPIRED',
  GiftCardDepleted = 'GIFT_CARD_DEPLETED',
  GiftCardNotFound = 'GIFT_CARD_NOT_FOUND',
  CartDoesNotMeetDiscountRequirementsNotice = 'CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE',
  DiscountExpired = 'DISCOUNT_EXPIRED',
  DiscountDisabled = 'DISCOUNT_DISABLED',
  DiscountLimitReached = 'DISCOUNT_LIMIT_REACHED',
  DiscountNotFound = 'DISCOUNT_NOT_FOUND',
  CustomerAlreadyUsedOncePerCustomerDiscountNotice = 'CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE',
  Empty = 'EMPTY',
  NotEnoughInStock = 'NOT_ENOUGH_IN_STOCK',
  MissingPaymentInput = 'MISSING_PAYMENT_INPUT',
  TotalPriceMismatch = 'TOTAL_PRICE_MISMATCH',
  LineItemNotFound = 'LINE_ITEM_NOT_FOUND'
}

export enum TransactionKind {
  Sale = 'SALE',
  Capture = 'CAPTURE',
  Authorization = 'AUTHORIZATION',
  EmvAuthorization = 'EMV_AUTHORIZATION',
  Change = 'CHANGE'
}

export enum TransactionStatus {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  Error = 'ERROR'
}
/** Possible error codes that could be returned by a customer mutation. */
export enum CustomerErrorCode {
  Blank = 'BLANK',
  Invalid = 'INVALID',
  Taken = 'TAKEN',
  TooLong = 'TOO_LONG',
  TooShort = 'TOO_SHORT',
  UnidentifiedCustomer = 'UNIDENTIFIED_CUSTOMER',
  CustomerDisabled = 'CUSTOMER_DISABLED',
  PasswordStartsOrEndsWithWhitespace = 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE',
  ContainsHtmlTags = 'CONTAINS_HTML_TAGS',
  ContainsUrl = 'CONTAINS_URL',
  TokenInvalid = 'TOKEN_INVALID',
  AlreadyEnabled = 'ALREADY_ENABLED',
  NotFound = 'NOT_FOUND'
}

/** An RFC 3986 and RFC 3987 compliant URI string. Example value: `"https://johns-apparel.myshopify.com"`. */
export type Url = any;

/** A string containing HTML code. Example value: `"<p>Grey cotton knit sweater.</p>"`. */
export type Html = any;

/** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
export type DateTime = any;

/** A monetary value string. Example value: `"100.57"`. */
export type Money = any;

/** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example value: `"29.99"`. */
export type Decimal = any;

// ====================================================
// Documents
// ====================================================

export namespace CustomerAccessTokenCreate {
  export type Variables = {
    input: CustomerAccessTokenCreateInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    customerAccessTokenCreate: Maybe<CustomerAccessTokenCreate>;
  };

  export type CustomerAccessTokenCreate = {
    __typename?: 'CustomerAccessTokenCreatePayload';

    userErrors: UserErrors[];

    customerAccessToken: Maybe<CustomerAccessToken>;

    customerUserErrors: CustomerUserErrors[];
  };

  export type UserErrors = {
    __typename?: 'UserError';

    field: Maybe<string[]>;

    message: string;
  };

  export type CustomerAccessToken = {
    __typename?: 'CustomerAccessToken';

    accessToken: string;

    expiresAt: DateTime;
  };

  export type CustomerUserErrors = {
    __typename?: 'CustomerUserError';

    field: Maybe<string[]>;

    message: string;
  };
}

export namespace CheckoutCreate {
  export type Variables = {
    input: CheckoutCreateInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    checkoutCreate: Maybe<CheckoutCreate>;
  };

  export type CheckoutCreate = {
    __typename?: 'CheckoutCreatePayload';

    userErrors: UserErrors[];

    checkout: Maybe<Checkout>;

    checkoutUserErrors: CheckoutUserErrors[];
  };

  export type UserErrors = {
    __typename?: 'UserError';

    field: Maybe<string[]>;

    message: string;
  };

  export type Checkout = {
    __typename?: 'Checkout';

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    lineItems: LineItems;
  };

  export type LineItems = {
    __typename?: 'CheckoutLineItemConnection';

    edges: Edges[];
  };

  export type Edges = {
    __typename?: 'CheckoutLineItemEdge';

    node: Node;
  };

  export type Node = {
    __typename?: 'CheckoutLineItem';

    id: string;

    title: string;

    quantity: number;

    variant: Maybe<Variant>;
  };

  export type Variant = {
    __typename?: 'ProductVariant';

    id: string;

    product: Product;

    image: Maybe<Image>;

    title: string;

    price: Money;

    compareAtPrice: Maybe<Money>;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: 'Product';

    handle: string;
  };

  export type Image = {
    __typename?: 'Image';

    id: Maybe<string>;

    altText: Maybe<string>;

    originalSrc: Url;

    transformedSrc: Url;
  };

  export type CheckoutUserErrors = {
    __typename?: 'CheckoutUserError';

    field: Maybe<string[]>;

    message: string;
  };
}

export namespace CheckoutLineItemsAdd {
  export type Variables = {
    lineItems: CheckoutLineItemInput[];
    checkoutId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    checkoutLineItemsAdd: Maybe<CheckoutLineItemsAdd>;
  };

  export type CheckoutLineItemsAdd = {
    __typename?: 'CheckoutLineItemsAddPayload';

    checkout: Maybe<Checkout>;
  };

  export type Checkout = {
    __typename?: 'Checkout';

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    order: Maybe<Order>;

    lineItems: LineItems;
  };

  export type Order = {
    __typename?: 'Order';

    id: string;

    orderNumber: number;
  };

  export type LineItems = {
    __typename?: 'CheckoutLineItemConnection';

    edges: Edges[];
  };

  export type Edges = {
    __typename?: 'CheckoutLineItemEdge';

    node: Node;
  };

  export type Node = {
    __typename?: 'CheckoutLineItem';

    id: string;

    title: string;

    quantity: number;

    variant: Maybe<Variant>;
  };

  export type Variant = {
    __typename?: 'ProductVariant';

    id: string;

    product: Product;

    image: Maybe<Image>;

    title: string;

    price: Money;

    compareAtPrice: Maybe<Money>;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: 'Product';

    handle: string;
  };

  export type Image = {
    __typename?: 'Image';

    id: Maybe<string>;

    altText: Maybe<string>;

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
    __typename?: 'Mutation';

    checkoutLineItemsReplace: Maybe<CheckoutLineItemsReplace>;
  };

  export type CheckoutLineItemsReplace = {
    __typename?: 'CheckoutLineItemsReplacePayload';

    checkout: Maybe<Checkout>;
  };

  export type Checkout = {
    __typename?: 'Checkout';

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    order: Maybe<Order>;

    lineItems: LineItems;
  };

  export type Order = {
    __typename?: 'Order';

    id: string;

    orderNumber: number;
  };

  export type LineItems = {
    __typename?: 'CheckoutLineItemConnection';

    edges: Edges[];
  };

  export type Edges = {
    __typename?: 'CheckoutLineItemEdge';

    node: Node;
  };

  export type Node = {
    __typename?: 'CheckoutLineItem';

    id: string;

    title: string;

    quantity: number;

    variant: Maybe<Variant>;
  };

  export type Variant = {
    __typename?: 'ProductVariant';

    id: string;

    product: Product;

    image: Maybe<Image>;

    title: string;

    price: Money;

    compareAtPrice: Maybe<Money>;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: 'Product';

    handle: string;
  };

  export type Image = {
    __typename?: 'Image';

    id: Maybe<string>;

    altText: Maybe<string>;

    originalSrc: Url;

    transformedSrc: Url;
  };
}

export namespace GetCheckout {
  export type Variables = {
    input: string;
  };

  export type Query = {
    __typename?: 'Query';

    node: Maybe<Node>;
  };

  export type Node = {
    __typename?: CheckoutInlineFragment['__typename'];

    id: string;
  } & CheckoutInlineFragment;

  export type CheckoutInlineFragment = {
    __typename?: 'Checkout';

    id: string;

    webUrl: Url;

    subtotalPrice: Money;

    order: Maybe<Order>;

    lineItems: LineItems;
  };

  export type Order = {
    __typename?: 'Order';

    id: string;

    orderNumber: number;
  };

  export type LineItems = {
    __typename?: 'CheckoutLineItemConnection';

    edges: Edges[];
  };

  export type Edges = {
    __typename?: 'CheckoutLineItemEdge';

    node: _Node;
  };

  export type _Node = {
    __typename?: 'CheckoutLineItem';

    id: string;

    title: string;

    quantity: number;

    variant: Maybe<Variant>;
  };

  export type Variant = {
    __typename?: 'ProductVariant';

    id: string;

    product: Product;

    image: Maybe<Image>;

    title: string;

    price: Money;

    compareAtPrice: Maybe<Money>;

    availableForSale: boolean;
  };

  export type Product = {
    __typename?: 'Product';

    handle: string;
  };

  export type Image = {
    __typename?: 'Image';

    id: Maybe<string>;

    altText: Maybe<string>;

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
    __typename?: 'Mutation';

    checkoutCustomerAssociateV2: Maybe<CheckoutCustomerAssociateV2>;
  };

  export type CheckoutCustomerAssociateV2 = {
    __typename?: 'CheckoutCustomerAssociateV2Payload';

    userErrors: UserErrors[];

    checkout: Maybe<Checkout>;

    customer: Maybe<Customer>;
  };

  export type UserErrors = {
    __typename?: 'UserError';

    field: Maybe<string[]>;

    message: string;
  };

  export type Checkout = {
    __typename?: 'Checkout';

    id: string;
  };

  export type Customer = {
    __typename?: 'Customer';

    id: string;
  };
}

export namespace CheckoutDiscountCodeApplyV2 {
  export type Variables = {
    discountCode: string;
    checkoutId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    checkoutDiscountCodeApplyV2: Maybe<CheckoutDiscountCodeApplyV2>;
  };

  export type CheckoutDiscountCodeApplyV2 = {
    __typename?: 'CheckoutDiscountCodeApplyV2Payload';

    userErrors: UserErrors[];

    checkout: Maybe<Checkout>;
  };

  export type UserErrors = {
    __typename?: 'UserError';

    field: Maybe<string[]>;

    message: string;
  };

  export type Checkout = {
    __typename?: 'Checkout';

    id: string;
  };
}

export namespace CheckoutDiscountCodeRemove {
  export type Variables = {
    checkoutId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    checkoutDiscountCodeRemove: Maybe<CheckoutDiscountCodeRemove>;
  };

  export type CheckoutDiscountCodeRemove = {
    __typename?: 'CheckoutDiscountCodeRemovePayload';

    userErrors: UserErrors[];

    checkout: Maybe<Checkout>;
  };

  export type UserErrors = {
    __typename?: 'UserError';

    field: Maybe<string[]>;

    message: string;
  };

  export type Checkout = {
    __typename?: 'Checkout';

    id: string;
  };
}

export const CustomerAccessTokenCreateDocument = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
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

@Injectable({
  providedIn: 'root'
})
export class CustomerAccessTokenCreateGQL extends Apollo.Mutation<
  CustomerAccessTokenCreateMutation,
  CustomerAccessTokenCreateMutationVariables
> {
  document = CustomerAccessTokenCreateDocument;
}
export const CheckoutCreateDocument = gql`
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

@Injectable({
  providedIn: 'root'
})
export class CheckoutCreateGQL extends Apollo.Mutation<
  CheckoutCreateMutation,
  CheckoutCreateMutationVariables
> {
  document = CheckoutCreateDocument;
}
export const CheckoutLineItemsAddDocument = gql`
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

@Injectable({
  providedIn: 'root'
})
export class CheckoutLineItemsAddGQL extends Apollo.Mutation<
  CheckoutLineItemsAddMutation,
  CheckoutLineItemsAddMutationVariables
> {
  document = CheckoutLineItemsAddDocument;
}
export const CheckoutLineItemsReplaceDocument = gql`
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

@Injectable({
  providedIn: 'root'
})
export class CheckoutLineItemsReplaceGQL extends Apollo.Mutation<
  CheckoutLineItemsReplaceMutation,
  CheckoutLineItemsReplaceMutationVariables
> {
  document = CheckoutLineItemsReplaceDocument;
}
export const GetCheckoutDocument = gql`
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

@Injectable({
  providedIn: 'root'
})
export class GetCheckoutGQL extends Apollo.Query<
  GetCheckoutQuery,
  GetCheckoutQueryVariables
> {
  document = GetCheckoutDocument;
}
export const CheckoutCustomerAssociateV2Document = gql`
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

@Injectable({
  providedIn: 'root'
})
export class CheckoutCustomerAssociateV2GQL extends Apollo.Mutation<
  CheckoutCustomerAssociateV2Mutation,
  CheckoutCustomerAssociateV2MutationVariables
> {
  document = CheckoutCustomerAssociateV2Document;
}
export const CheckoutDiscountCodeApplyV2Document = gql`
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

@Injectable({
  providedIn: 'root'
})
export class CheckoutDiscountCodeApplyV2GQL extends Apollo.Mutation<
  CheckoutDiscountCodeApplyV2Mutation,
  CheckoutDiscountCodeApplyV2MutationVariables
> {
  document = CheckoutDiscountCodeApplyV2Document;
}
export const CheckoutDiscountCodeRemoveDocument = gql`
  mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
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

@Injectable({
  providedIn: 'root'
})
export class CheckoutDiscountCodeRemoveGQL extends Apollo.Mutation<
  CheckoutDiscountCodeRemoveMutation,
  CheckoutDiscountCodeRemoveMutationVariables
> {
  document = CheckoutDiscountCodeRemoveDocument;
}
