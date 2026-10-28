import { DONATE_ACCOUNTS, type DonateAccount } from "@/lib/donate-accounts";
import { createPublicClient } from "@/lib/supabase/public";
import type { SiteRegion } from "@/lib/site";

export type HeroSlot = "home" | "about" | "programs";

export type HeroContent = {
  region: SiteRegion;
  slot: HeroSlot;
  imageUrl: string;
  alt: string;
};

export type SiteEvent = {
  id: string;
  region: SiteRegion;
  title: string;
  summary: string;
  status: "upcoming" | "ongoing" | "past";
  eventDate: string | null;
  imageUrl: string | null;
  sortOrder: number;
  createdAt?: string;
};

const HERO_FALLBACK: Record<`${SiteRegion}-${HeroSlot}`, HeroContent> = {
  "ng-home": {
    region: "ng",
    slot: "home",
    imageUrl: "/images/gallery/idpd-2021-group.jpg",
    alt: "HBF at IDPD 2021 in Warri, with the collaboration banner naming HBF, EGDAI, and CEPEJ",
  },
  "ng-about": {
    region: "ng",
    slot: "about",
    imageUrl: "/images/gallery/idpd-2021-high-table.jpg",
    alt: "HBF leadership at the IDPD 2021 high table in Warri",
  },
  "ng-programs": {
    region: "ng",
    slot: "programs",
    imageUrl: "/images/gallery/idpd-2021-mobility.jpg",
    alt: "Wheelchairs and crutches at the IDPD 2021 gathering in Warri",
  },
  "ca-home": {
    region: "ca",
    slot: "home",
    imageUrl: "/images/ca/neighbourhood.jpg",
    alt: "Representative image for Surrey community work",
  },
  "ca-about": {
    region: "ca",
    slot: "about",
    imageUrl: "/images/ca/neighbourhood.jpg",
    alt: "Representative image for Surrey community work",
  },
  "ca-programs": {
    region: "ca",
    slot: "programs",
    imageUrl: "/images/ca/packing.jpg",
    alt: "Representative image for Surrey programs",
  },
};

export async function getHero(region: SiteRegion, slot: HeroSlot = "home"): Promise<HeroContent> {
  const fallback = HERO_FALLBACK[`${region}-${slot}`];
  const supabase = createPublicClient();
  if (!supabase) return fallback;
  const { data } = await supabase
    .from("heroes")
    .select("region, slot, image_url, alt")
    .eq("region", region)
    .eq("slot", slot)
    .maybeSingle();
  if (!data) return fallback;
  return {
    region,
    slot,
    imageUrl: data.image_url,
    alt: data.alt || fallback.alt,
  };
}

export async function getAllHeroes(): Promise<HeroContent[]> {
  const slots: { region: SiteRegion; slot: HeroSlot }[] = [
    { region: "ng", slot: "home" },
    { region: "ng", slot: "about" },
    { region: "ng", slot: "programs" },
    { region: "ca", slot: "home" },
    { region: "ca", slot: "about" },
    { region: "ca", slot: "programs" },
  ];
  return Promise.all(slots.map((item) => getHero(item.region, item.slot)));
}

export async function getDonateAccount(region: SiteRegion): Promise<DonateAccount> {
  const supabase = createPublicClient();
  if (!supabase) return DONATE_ACCOUNTS[region];
  const { data } = await supabase
    .from("donate_accounts")
    .select("bank_name, account_name, account_number, currency, note")
    .eq("region", region)
    .maybeSingle();
  if (!data) return DONATE_ACCOUNTS[region];
  return {
    bankName: data.bank_name,
    accountName: data.account_name,
    accountNumber: data.account_number,
    currency: data.currency,
    note: data.note ?? "",
  };
}

export type GalleryPhoto = {
  id: string;
  region: SiteRegion;
  imageUrl: string;
  caption: string;
  alt: string;
  sortOrder: number;
};

export async function getGallery(region?: SiteRegion): Promise<GalleryPhoto[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];
  let query = supabase
    .from("gallery")
    .select("id, region, image_url, caption, alt, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (region) query = query.eq("region", region);
  const { data } = await query;
  return (data ?? []).map((row) => ({
    id: row.id,
    region: row.region as SiteRegion,
    imageUrl: row.image_url,
    caption: row.caption ?? "",
    alt: row.alt || row.caption || "Gallery photograph",
    sortOrder: row.sort_order ?? 0,
  }));
}

export async function getEvents(region: SiteRegion): Promise<SiteEvent[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("events")
    .select("id, region, title, summary, status, event_date, image_url, sort_order, created_at")
    .eq("region", region)
    .order("sort_order", { ascending: true })
    .order("event_date", { ascending: true, nullsFirst: false });
  return (data ?? []).map((row) => ({
    id: row.id,
    region: row.region as SiteRegion,
    title: row.title,
    summary: row.summary ?? "",
    status: row.status as SiteEvent["status"],
    eventDate: row.event_date,
    imageUrl: row.image_url,
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at ?? undefined,
  }));
}
