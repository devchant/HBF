import type { SiteRegion } from "@/lib/site";

export type DonateAccount = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  note: string;
};

export const DONATE_ACCOUNTS: Record<SiteRegion, DonateAccount> = {
  ng: {
    bankName: "Sterling Bank",
    accountName: "Humanitarian Betterment Foundation",
    accountNumber: "0000000000",
    currency: "NGN",
    note: "Transfer to this Sterling Bank account, then upload your proof of payment so HBF Nigeria can confirm your gift.",
  },
  ca: {
    bankName: "Bank transfer",
    accountName: "Humanitarian Betterment Foundation Canada Society",
    accountNumber: "0000000000",
    currency: "CAD",
    note: "Transfer to this account, then upload your proof of payment so HBF Canada Society can confirm your gift.",
  },
};
