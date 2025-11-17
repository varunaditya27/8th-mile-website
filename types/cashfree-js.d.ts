declare module '@cashfreepayments/cashfree-js' {
  export type CashfreeMode = 'sandbox' | 'production';

  export interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal' | HTMLElement;
  }

  export interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<unknown> | void;
  }

  export function load(config: { mode: CashfreeMode }): Promise<CashfreeInstance | null>;
}
