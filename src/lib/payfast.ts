import crypto from 'crypto';

export interface PayFastConfig {
  merchantId: string;
  merchantKey: string;
  passphrase: string;
  sandboxMode: boolean;
}

export interface PayFastPaymentData {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first: string;
  name_last: string;
  email_address: string;
  cell_number?: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
  item_description?: string;
  custom_str1?: string;
  custom_str2?: string;
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  email_confirmation: string;
  confirmation_address: string;
}

export class PayFastService {
  private config: PayFastConfig;

  constructor() {
    this.config = {
      merchantId: process.env.PAYFAST_MERCHANT_ID || '',
      merchantKey: process.env.PAYFAST_MERCHANT_KEY || '',
      passphrase: process.env.PAYFAST_PASSPHRASE || '',
      sandboxMode: process.env.PAYFAST_SANDBOX_MODE === 'true',
    };
  }

  /**
   * Generate PayFast signature for payment data
   */
  generateSignature(data: PayFastPaymentData | Record<string, string>): string {
    // Convert PayFastPaymentData to Record<string, string> if needed
    const dataRecord: Record<string, string> = {};
    
    if (data && typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          dataRecord[key] = String(value);
        }
      });
    }

    // Remove empty values and sort by key
    const filteredData = Object.entries(dataRecord)
      .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b));

    // Create query string
    const queryString = filteredData
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Add passphrase
    const stringToSign = queryString + `&passphrase=${this.config.passphrase}`;

    // Generate MD5 hash
    return crypto.createHash('md5').update(stringToSign).digest('hex');
  }

  /**
   * Create payment data for PayFast
   */
  createPaymentData(params: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    amount: number;
    itemName: string;
    itemDescription?: string;
    paymentId: string;
    returnUrl: string;
    cancelUrl: string;
    notifyUrl: string;
    customData?: Record<string, string>;
  }): PayFastPaymentData {
    const baseUrl = this.config.sandboxMode 
      ? 'https://sandbox.payfast.co.za' 
      : 'https://www.payfast.co.za';

    const paymentData: PayFastPaymentData = {
      merchant_id: this.config.merchantId,
      merchant_key: this.config.merchantKey,
      return_url: params.returnUrl,
      cancel_url: params.cancelUrl,
      notify_url: params.notifyUrl,
      name_first: params.firstName,
      name_last: params.lastName,
      email_address: params.email,
      cell_number: params.phone || '',
      m_payment_id: params.paymentId,
      amount: params.amount.toFixed(2),
      item_name: params.itemName,
      item_description: params.itemDescription || '',
      email_confirmation: '1',
      confirmation_address: params.email,
    };

    // Add custom data if provided
    if (params.customData) {
      Object.entries(params.customData).forEach(([key, value], index) => {
        if (index < 5) { // PayFast supports custom_str1 to custom_str5
          paymentData[`custom_str${index + 1}` as keyof PayFastPaymentData] = value;
        }
      });
    }

    return paymentData;
  }

  /**
   * Generate PayFast payment URL
   */
  generatePaymentUrl(paymentData: PayFastPaymentData): string {
    const baseUrl = this.config.sandboxMode 
      ? 'https://sandbox.payfast.co.za/eng/process' 
      : 'https://www.payfast.co.za/eng/process';

    // Generate signature
    const signature = this.generateSignature(paymentData);

    // Create form data
    const formData = new URLSearchParams();
    Object.entries(paymentData).forEach(([key, value]) => {
      if (value !== '') {
        formData.append(key, value);
      }
    });
    formData.append('signature', signature);

    return `${baseUrl}?${formData.toString()}`;
  }

  /**
   * Verify PayFast callback signature
   */
  verifyCallback(data: Record<string, string>): boolean {
    const receivedSignature = data.signature;
    const { signature, ...dataWithoutSignature } = data;
    
    const calculatedSignature = this.generateSignature(dataWithoutSignature);
    
    return receivedSignature === calculatedSignature;
  }

  /**
   * Get PayFast configuration
   */
  getConfig(): PayFastConfig {
    return this.config;
  }

  /**
   * Check if PayFast is properly configured
   */
  isConfigured(): boolean {
    return !!(
      this.config.merchantId &&
      this.config.merchantKey &&
      this.config.passphrase
    );
  }
}

// Export singleton instance
export const payfastService = new PayFastService();
