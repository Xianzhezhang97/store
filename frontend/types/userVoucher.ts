export interface BaseVoucher {
  id: string;
  name: string;
  type: 'fixed' | 'percentage' | 'exchange' | 'bundle';
  description: string;
  value: number;
  expiredAt: string;
  redeemedAt?: string;
  available: boolean;
  usedAt?: string;
  status: 'unused' | 'used' | 'expired';
}

export interface FixedVoucher extends BaseVoucher {
  type: 'fixed';
  minimumSpend: number;
}

export interface PercentageVoucher extends BaseVoucher {
  type: 'percentage';
  minimumSpend: number;
  maxDeducer: number;
}

export interface ExchangeVoucher extends BaseVoucher {
  type: 'exchange';
  exchangeItem: string;
}

export interface BundleVoucher extends BaseVoucher {
  type: 'bundle';
  bundleItems: string[];
}

export type Voucher =
  | FixedVoucher
  | PercentageVoucher
  | ExchangeVoucher
  | BundleVoucher;
