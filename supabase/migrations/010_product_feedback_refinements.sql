-- ============================================================
-- 010 · product_feedback refinements
-- ------------------------------------------------------------
-- Atributos de sabor, experiencia previa más abierta, canales
-- de obtención (incluye muestra gratis) y lugar de la muestra.
-- ============================================================

-- Experiencia previa: ampliar valores
alter table public.product_feedback
  drop constraint if exists product_feedback_fermented_before_check;

alter table public.product_feedback
  add constraint product_feedback_fermented_before_check
  check (
    fermented_before in (
      'si',
      'no',
      'no_conocia',
      'escuchado_no_probado',
      'probado_poco',
      'consumo_habitual'
    )
  );

-- Atributos de sabor
alter table public.product_feedback
  add column if not exists acidity_rating smallint
    check (acidity_rating is null or acidity_rating between 1 and 10);

alter table public.product_feedback
  add column if not exists creaminess_rating smallint
    check (creaminess_rating is null or creaminess_rating between 1 and 10);

alter table public.product_feedback
  add column if not exists sweetness_rating smallint
    check (sweetness_rating is null or sweetness_rating between 1 and 10);

alter table public.product_feedback
  add column if not exists bubbles_rating smallint
    check (bubbles_rating is null or bubbles_rating between 1 and 10);

-- Canales de obtención
alter table public.product_feedback
  drop constraint if exists product_feedback_purchase_method_check;

alter table public.product_feedback
  add constraint product_feedback_purchase_method_check
  check (
    purchase_method in (
      'mercadopago',
      'en_linea',
      'whatsapp',
      'instagram',
      'muestra_gratis',
      'otro'
    )
  );

-- Lugar de la muestra gratis
alter table public.product_feedback
  add column if not exists sample_channel text
    check (
      sample_channel is null
      or sample_channel in ('evento', 'popup', 'mercadito', 'otro')
    );

alter table public.product_feedback
  add column if not exists sample_channel_other text;
