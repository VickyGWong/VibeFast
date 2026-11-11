-- ============================================================
-- 009 · coming_soon + precio/tamaño por variante
-- ============================================================

alter table public.products
  add column if not exists coming_soon boolean not null default false;

comment on column public.products.coming_soon is 'Producto visible pero no comprable (Próximamente).';

alter table public.product_variants
  add column if not exists price_cents integer,
  add column if not exists size text;

comment on column public.product_variants.price_cents is 'Precio opcional de la variante; si es null usa products.price_cents.';
comment on column public.product_variants.size is 'Presentación opcional de la variante; si es null usa products.size.';
