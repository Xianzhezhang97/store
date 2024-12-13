export interface Transaction {
  tid: string;
  deposit: { amount: number } | null;
  withdraw: { amount: number; credit: number; original: number } | null;
  created_at: string;
}
