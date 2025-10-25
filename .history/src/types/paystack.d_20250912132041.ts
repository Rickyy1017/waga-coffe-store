declare module 'paystack-js' {
  interface PaystackConfig {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    onSuccess: (transaction: any) => void;
    onCancel: () => void;
    onError?: (error: any) => void;
  }

  class PaystackPop {
    constructor(config: PaystackConfig);
    openIframe(): void;
  }

  export default PaystackPop;
}
