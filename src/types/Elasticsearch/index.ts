import {
  QueryDslQueryContainer,
  SortCombinations,
} from '@elastic/elasticsearch/api/types';

export type Indices =
  | 'categories'
  | 'categoriesfilters'
  | 'products'
  | 'productsstore'
  | 'serviceluegopago'
  | 'productBySlug';

export type Templates =
  | 'products_bar'
  | 'services_bar'
  | 'stores_bar'
  | 'store_by_id'
  | 'bestSeller'
  | 'bestSellerElectronic'
  | 'bestSellePersonalCare'
  | 'product_list_onsale_home'
  | 'categories_home'
  | 'categories_list'
  | 'stores_list'
  | 'digitalCodes'
  | 'virtualVideo'
  | 'virtualAudio'
  | 'softwareLicenses';

export type AggregationsFlters =
  | 'brand'
  | 'categories'
  | 'price'
  | 'price_range';

export interface Aggregation {
  key: string | number;
  from?: number;
  to?: number;
  doc_count: number;
}

export interface BaseQueryArgs {
  from: number;
  size: number;
  sort: SortCombinations[];
  must: QueryDslQueryContainer[];
  should: QueryDslQueryContainer[];
}
