export const EMAIL_VARIABLES = {
  donor: ['donor_name', 'donor_email', 'donor_phone'],
  donation: ['amount', 'currency', 'cause_name', 'transaction_id', 'donation_date'],
  receipt: ['receipt_url', 'receipt_number', 'tax_deductible'],
  org: ['org_name', 'org_email', 'org_phone', 'org_address']
} as const;

export const replaceVariables = (template: string, data: Record<string, string>): string => {
  return Object.entries(data).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }, template);
};
