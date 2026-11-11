-- ============================================================
-- 010 · pedidos on-site + bloqueos de disponibilidad
-- ============================================================

create table if not exists public.orders (
  id                 text primary key,
  created_at         timestamptz not null default now(),
  status             text not null,
  fulfillment        text not null check (fulfillment in ('delivery', 'pickup')),
  payment_method     text not null,
  payment_label      text not null,
  customer_name      text not null,
  customer_phone     text not null,
  customer_email     text,
  delivery_address   text,
  delivery_postal_code text,
  delivery_instructions text,
  delivery_distance_km numeric,
  delivery_fee_cents integer not null default 0,
  slot_id            text not null,
  slot_date          date not null,
  slot_start         text not null,
  slot_end           text not null,
  items              jsonb not null default '[]'::jsonb,
  subtotal_cents     integer not null,
  total_cents        integer not null,
  currency           text not null default 'MXN',
  payment_meta       jsonb not null default '{}'::jsonb
);

create index if not exists orders_slot_id_idx on public.orders (slot_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

create table if not exists public.availability_blocks (
  slot_id     text primary key,
  created_at  timestamptz not null default now(),
  note        text
);

alter table public.orders enable row level security;
alter table public.availability_blocks enable row level security;

-- Lectura pública limitada del pedido por id se hará vía service role / API.
-- Por ahora no hay policies anon de lectura/escritura directa (solo server).
