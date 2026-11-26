-- ============================================================
-- 009 · product_feedback
-- ------------------------------------------------------------
-- Retroalimentación de producto (sabor, presentación, compra
-- y entrega). Insert público desde /retroalimentacion; lectura
-- solo vía service_role (sin policy de SELECT).
-- ============================================================

create table if not exists public.product_feedback (
  id                uuid primary key default gen_random_uuid(),
  product_id        text not null,
  product_name      text not null,
  taste_rating      smallint not null check (taste_rating between 1 and 5),
  taste_comment     text,
  presentation_rating smallint not null check (presentation_rating between 1 and 5),
  presentation_comment text,
  purchase_method   text not null check (
    purchase_method in ('mercadopago', 'whatsapp', 'otro')
  ),
  delivery_rating   smallint check (delivery_rating between 1 and 5),
  delivery_comment  text,
  name              text,
  contact           text,
  extra_comment     text,
  source            text default 'retroalimentacion',
  created_at        timestamptz not null default now()
);

comment on table public.product_feedback is
  'Opiniones de clientes sobre sabor, presentación, compra y entrega.';

create index if not exists product_feedback_created_at_idx
  on public.product_feedback (created_at desc);

create index if not exists product_feedback_product_id_idx
  on public.product_feedback (product_id);

alter table public.product_feedback enable row level security;

drop policy if exists "product_feedback_insert_public" on public.product_feedback;
create policy "product_feedback_insert_public"
  on public.product_feedback for insert
  to anon, authenticated
  with check (true);
