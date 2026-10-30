import type { SiteRegion } from "@/lib/site";

export type DonateAccount = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  extraAccountNumber?: string;
  swiftCode?: string;
  sortCode?: string;
  currency: string;
  note: string;
};

export const DONATE_ACCOUNTS: Record<SiteRegion, DonateAccount> = {
  ng: {
    bankName: "Sterling Bank PLC",
    accountName: "Humanitarian Betterment Foundation",
    accountNumber: "0085971142",
    extraAccountNumber: "0085979911",
    swiftCode: "NAMENGLA",
    sortCode: "232240078",
    currency: "NGN",
    note: "Transfer to this Sterling Bank PLC account, then upload your proof of payment so HBF Nigeria can confirm your gift.",
  },
  ca: {
    bankName: "Bank transfer",
    accountName: "Humanitarian Betterment Foundation Canada Society",
    accountNumber: "0000000000",
    extraAccountNumber: "",
    swiftCode: "",
    sortCode: "",
    currency: "CAD",
    note: "Transfer to this account, then upload your proof of payment so HBF Canada Society can confirm your gift.",
  },
};
