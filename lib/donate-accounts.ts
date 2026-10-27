import type { SiteRegion } from "@/lib/site";

/** Placeholder banking details for UI until live accounts are configured. */
export type DonateAccount = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  note: string;
};

export const DONATE_ACCOUNTS: Record<SiteRegion, DonateAccount> = {
  ng: {
    bankName: "Sterling Bank (placeholder)",
    accountName: "Humanitarian Betterment Foundation Nigeria",
    accountNumber: "0000000000",
    currency: "NGN",
    note: "Replace with the official HBF Nigeria Sterling Bank details before going live.",
  },
  ca: {
    bankName: "Canadian bank (placeholder)",
    accountName: "HBF Canada Society",
    accountNumber: "0000000000",
    currency: "CAD",
    note: "Replace with the official HBF Canada Society account before going live.",
  },
};
