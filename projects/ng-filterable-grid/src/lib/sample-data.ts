import { IProduct, ProductMeta, IVariant, VariantMeta } from './interfaces';

interface TestProductMeta extends ProductMeta {
  altimage: string | null;
  show_in_grid: boolean;
}

interface TestVariantMeta extends VariantMeta {
  back_ordered: boolean;
  out_of_stock: boolean;
  saleprice: string | null;
  colorswatchimage: string;
  glassesimage: string;
  show_in_grid: boolean;
}

type TestProduct = IProduct<TestProductMeta, IVariant<TestVariantMeta>>;

export const sampleProduct: TestProduct = {
  id: 1,
  title: 'Squeaker',
  handle: 'handle',
  created_at: '2018-12-13T15:50:57Z',
  variant_set: [
    {
      id: 10,
      title: 'Squeaker - Blue Hair',
      price: '199',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '299',
        colorswatchimage: 'test_swatch_6',
        glassesimage: 'https://via.placeholder.com/700x400/d38e89',
        show_in_grid: true
      },
      position: 1
    },
    {
      id: 82,
      title: 'Squeaker - Champagne',
      price: '499',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '99',
        colorswatchimage: 'test_swatch_3',
        glassesimage: 'https://via.placeholder.com/700x400/d38e89',
        show_in_grid: true
      },
      position: 2
    },
    {
      id: 117,
      title: 'Squeaker - Spectra',
      price: '239',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '',
        colorswatchimage: 'https://via.placeholder.com/200x200/d38e89',
        glassesimage: 'https://via.placeholder.com/700x400/d38e89',
        show_in_grid: true
      },
      position: 3
    },
    {
      id: 1230,
      title: 'Squeaker - Blue Water',
      price: '199',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '299',
        colorswatchimage: 'https://via.placeholder.com/200x200/88b670',
        glassesimage: 'https://via.placeholder.com/700x400/88b670',
        show_in_grid: true
      },
      position: 4
    },
    {
      id: 146,
      title: 'Squeaker - Champagne',
      price: '499',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '99',
        colorswatchimage: 'https://via.placeholder.com/200x200/b7b7b7',
        glassesimage: 'https://via.placeholder.com/700x400/b7b7b7',
        show_in_grid: true
      },
      position: 5
    },
    {
      id: 195,
      title: 'Squeaker - Spectra',
      price: '239',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '',
        colorswatchimage: 'https://via.placeholder.com/200x200/b2e5e5',
        glassesimage: 'https://via.placeholder.com/700x400/b2e5e5',
        show_in_grid: true
      },
      position: 6
    },
    {
      id: 235,
      title: 'Squeaker - Spectra',
      price: '239',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '',
        colorswatchimage: 'https://via.placeholder.com/200x200/916759',
        glassesimage: 'https://via.placeholder.com/700x400/916759',
        show_in_grid: true
      },
      position: 7
    }
  ],
  productmeta: {
    product_type_fk: 456,
    productoptionvalue_set: [{ id: 36, value: 36, display_as: '' }],
    altimage: 'Homepage',
    show_in_grid: true
  }
};

export const sampleProduct2: TestProduct = {
  id: 2,
  title: 'Cricket',
  handle: 'handle-cricket',
  created_at: '2019-12-13T15:50:57Z',
  variant_set: [
    {
      id: 150,
      title: 'Cricket - Standard',
      price: '49',
      compare_at_price: null,
      variantmeta: {
        variantoptionvalue_set: [],
        back_ordered: false,
        out_of_stock: false,
        saleprice: '499',
        colorswatchimage: 'test_swatch_6',
        glassesimage: 'https://via.placeholder.com/700x400/d38e89',
        show_in_grid: true
      },
      position: 1
    }
  ],
  productmeta: {
    altimage: '',
    product_type_fk: 1,
    productoptionvalue_set: [],
    show_in_grid: true
  }
};
