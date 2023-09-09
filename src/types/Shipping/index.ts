export interface ShippingRateRequest {
  destinationCity: string;
  productQuoteShippings: ProductQuoteShipping[];
}

export interface ProductQuoteShipping {
  id: string;
  value: string;
  quantity: number;
  length: string;
  height: string;
  width: string;
  weight: string;
  warehouseCity: string;
  warehouseId: number;
  assumedValue: number;
}

export interface ShippingRateResponse {
  success: boolean;
  message: null;
  error: null;
  result: Result;
}

export interface TransitDaysRange {
  min: number;
  max: number;
}

export interface Result {
  value: number;
  transitDaysRange: TransitDaysRange;
  checkTransport: boolean;
  calculationDetails: ICalculationDetail[];
}

export interface ICalculationDetail {
  warehouseId: number;
  value: number;
  assumedValue: number;
  productsIds: string[];
  carrier: string;
  service: string;
}
