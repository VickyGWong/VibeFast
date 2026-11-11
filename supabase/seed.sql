-- ============================================================
-- seed.sql · datos de desarrollo local
-- ============================================================

insert into public.waitlist (email, source)
values
  ('demo1@vibefast.dev', 'seed'),
  ('demo2@vibefast.dev', 'seed')
on conflict (email) do nothing;

-- Catálogo The Good Co.
insert into public.products (
  id, category, name, flavor, description, size, weight, price_cents,
  image_url, image_alt, featured, whatsapp_name, sku, temporary_image, coming_soon, sort_order
) values
  ('kefir-natural', 'kefir', 'Kéfir natural', 'natural',
   'Cremoso y vivo. El punto de partida perfecto para conocer nuestros fermentos. Disponible endulzado o sin endulzar.',
   '500 ml', '390 g', 9500, '/images/kefir-natural.jpg',
   'Frasco de kéfir natural The Good Co. junto a kombucha artesanal', true, 'Kéfir natural', 'KEF-NAT-500', false, false, 1),
  ('kefir-fresa', 'kefir', 'Kéfir de fresa', 'fresa',
   'Fresas orgánicas y fermento vivo. Disponible endulzado o sin endulzar, según tu gusto.',
   '500 ml', '390 g', 10500, '/images/kefir-fresa.jpg',
   'Kéfir de fresa The Good Co. cremoso con fresas frescas', false, 'Kéfir de fresa', 'KEF-FRE-500', false, false, 2),
  ('kefir-mango', 'kefir', 'Kéfir de mango', 'mango',
   'Mango orgánico y cultivo activo. Elige la versión endulzada o sin endulzar.',
   '500 ml', '390 g', 10500, '/images/kefir-mango.jpg',
   'Kéfir de mango The Good Co. cremoso con cubos de mango', false, 'Kéfir de mango', 'KEF-MAN-500', false, false, 3),
  ('kombucha-natural', 'kombucha', 'Kombucha natural', 'natural',
   'Té fermentado burbujeante, equilibrado y refrescante.',
   '1 L', null, 13000, '/images/kombucha-natural.jpg',
   'Botella de kombucha natural The Good Co. con sticker de mascota', false, 'Kombucha natural', 'KOM-NAT-1L', false, false, 4),
  ('kombucha-betabel', 'kombucha', 'Kombucha de betabel-arándano', 'betabel-arándano',
   'Betabel y arándano orgánicos en un té fermentado con notas terrosas, frutales y burbujas vivas.',
   '1 L', null, 13000, '/images/kombucha-betabel.jpg',
   'Botella de kombucha de betabel-arándano The Good Co.', false, 'Kombucha de betabel-arándano', 'KOM-BET-1L', true, true, 5),
  ('kombucha-mango', 'kombucha', 'Kombucha de mango', 'mango',
   'Mango orgánico con el carácter burbujeante de la kombucha.',
   '1 L', null, 13000, '/images/kombucha-mango.jpg',
   'Botella de kombucha de mango The Good Co.', false, 'Kombucha de mango', 'KOM-MAN-1L', true, false, 6),
  ('kombucha-fresa', 'kombucha', 'Kombucha de fresa', 'fresa',
   'Fresas orgánicas y fermento vivo en cada sorbo.',
   '1 L', null, 13000, '/images/kombucha-fresa.jpg',
   'Botella de kombucha de fresa The Good Co.', false, 'Kombucha de fresa', 'KOM-FRE-1L', true, false, 7),
  ('tibicos-natural', 'tibicos', 'Tíbicos naturales', 'natural',
   'Agua de kefir de frutos orgánicos, ligera, refrescante y probiótica.',
   '750 ml', null, 12000, '/images/tibicos-natural.jpg',
   'Botella de tíbicos naturales The Good Co. de 750 ml', false, 'Tíbicos naturales', 'TIB-NAT-750', true, true, 8),
  ('tibicos-mango', 'tibicos', 'Tíbicos de mango', 'mango',
   'Mango orgánico con la ligereza característica de los tíbicos.',
   '750 ml', null, 12000, '/images/tibicos-mango.jpg',
   'Botella de tíbicos de mango The Good Co. de 750 ml', false, 'Tíbicos de mango', 'TIB-MAN-750', true, true, 9),
  ('tibicos-fresa', 'tibicos', 'Tíbicos de fresa', 'fresa',
   'Fresas orgánicas en una bebida ligera y burbujeante.',
   '750 ml', null, 12000, '/images/tibicos-fresa.jpg',
   'Botella de tíbicos de fresa The Good Co. de 750 ml', false, 'Tíbicos de fresa', 'TIB-FRE-750', true, true, 10)
on conflict (id) do update set
  size = excluded.size,
  price_cents = excluded.price_cents,
  sku = excluded.sku,
  temporary_image = excluded.temporary_image,
  coming_soon = excluded.coming_soon,
  sort_order = excluded.sort_order,
  image_alt = excluded.image_alt,
  description = excluded.description;

insert into public.product_variants (id, product_id, label, message_label, price_cents, size, sort_order) values
  ('endulzado', 'kefir-natural', 'Endulzado', 'endulzado', null, null, 1),
  ('sin-endulzar', 'kefir-natural', 'Sin endulzar', 'sin endulzar', null, null, 2),
  ('endulzado', 'kefir-fresa', 'Endulzado', 'endulzado', null, null, 1),
  ('sin-endulzar', 'kefir-fresa', 'Sin endulzar', 'sin endulzar', null, null, 2),
  ('endulzado', 'kefir-mango', 'Endulzado', 'endulzado', null, null, 1),
  ('sin-endulzar', 'kefir-mango', 'Sin endulzar', 'sin endulzar', null, null, 2),
  ('1l', 'kombucha-natural', '1 L', '1 L', 13000, '1 L', 1),
  ('500ml', 'kombucha-natural', '500 ml', '500 ml', 7000, '500 ml', 2),
  ('1l', 'kombucha-betabel', '1 L', '1 L', 13000, '1 L', 1),
  ('500ml', 'kombucha-betabel', '500 ml', '500 ml', 7000, '500 ml', 2),
  ('1l', 'kombucha-mango', '1 L', '1 L', 13000, '1 L', 1),
  ('500ml', 'kombucha-mango', '500 ml', '500 ml', 7000, '500 ml', 2),
  ('1l', 'kombucha-fresa', '1 L', '1 L', 13000, '1 L', 1),
  ('500ml', 'kombucha-fresa', '500 ml', '500 ml', 7000, '500 ml', 2)
on conflict (product_id, id) do update set
  label = excluded.label,
  message_label = excluded.message_label,
  price_cents = excluded.price_cents,
  size = excluded.size,
  sort_order = excluded.sort_order;
