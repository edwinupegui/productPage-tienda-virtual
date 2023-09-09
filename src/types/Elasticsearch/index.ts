

export type Indices =
  | 'products'


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
  sort: any[];
  must: any[];
  should: any[];
}
