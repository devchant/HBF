-- Reference schema. Applied to the live project via migration donations_cms_and_site_media.

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  region text not null check (region in ('ng', 'ca')),
  anonymous boolean not null default false,
  donor_name text,
  email text,
  amount numeric(14, 2) not null check (amount > 0),
  currency text not null,
  proof_path text not null,
  proof_mime text not null,
  created_at timestamptz not null default now()
);

alter table public.donations enable row level security;

create table if not exists public.heroes (
  region text primary key check (region in ('ng', 'ca')),
  image_url text not null,
  alt text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.donate_accounts (
  region text primary key check (region in ('ng', 'ca')),
  bank_name text not null,
  account_name text not null,
  account_number text not null,
  currency text not null,
  note text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  region text not null check (region in ('ng', 'ca')),
  title text not null,
  summary text not null default '',
  status text not null check (status in ('upcoming', 'ongoing', 'past')),
  event_date date,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.heroes enable row level security;
alter table public.donate_accounts enable row level security;
alter table public.events enable row level security;
