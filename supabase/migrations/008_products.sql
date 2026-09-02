-- ============================================================
-- 008 · products, product_variants, leads
-- Catálogo The Good Co. — lectura pública de activos, escritura server-side
-- ============================================================

create table if not exists public.products (
  id              text primary key,
  category        text not null check (category in ('kefir', 'kombucha', 'tibicos')),
  name            text not null,
  flavor          text not null default '',
  description     text not null default '',
  size            text not null,
  weight          text,
  price_cents     integer not null,
  currency        text not null default 'MXN',
  image_url       text not null,
  image_alt       text not null,
  featured        boolean not null default false,
  active          boolean not null default true,
  whatsapp_name   text not null,
  sku             text not null,
  stock           integer,
  seasonal        boolean not null default false,
  temporary_image boolean not null default false,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.products is 'Catálogo de fermentos The Good Co.';

create table if not exists public.product_variants (
  id             text not null,
  product_id     text not null references public.products (id) on delete cascade,
  label          text not null,
  message_label  text not null,
  sort_order     integer not null default 0,
  primary key (product_id, id)
);

comment on table public.product_variants is 'Variantes de producto (ej. endulzado / sin endulzar).';

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  product_id  text references public.products (id) on delete set null,
  variant_id  text,
  source      text not null default 'whatsapp',
  created_at  timestamptz not null default now()
);

comment on table public.leads is 'Registro opcional de clics a WhatsApp.';

create index if not exists products_category_idx on public.products (category);
create index if not exists products_active_sort_idx on public.products (active, sort_order);
create index if not exists product_variants_product_idx on public.product_variants (product_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.leads enable row level security;

drop policy if exists "products_select_active" on public.products;
create policy "products_select_active"
  on public.products for select
  to anon, authenticated
  using (active = true);

drop policy if exists "product_variants_select" on public.product_variants;
create policy "product_variants_select"
  on public.product_variants for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.active = true
    )
  );

drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads for insert
  to anon, authenticated
  with check (true);
