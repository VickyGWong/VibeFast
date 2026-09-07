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
  image_url, image_alt, featured, whatsapp_name, sku, temporary_image, sort_order
) values
  ('kefir-natural', 'kefir', 'Kéfir natural', 'natural',
   'Cremoso y vivo. El punto de partida perfecto para conocer nuestros fermentos. Disponible endulzado o sin endulzar.',
   '500 ml', '390 g', 9500, '/images/kefir-natural.jpg',
   'Botella de kéfir natural The Good Co. de 500 ml', true, 'Kéfir natural', 'KEF-NAT-500', true, 1),
  ('kefir-fresa', 'kefir', 'Kéfir de fresa', 'fresa',
   'Fresas reales y fermento vivo. Disponible endulzado o sin endulzar, según tu gusto.',
   '500 ml', '390 g', 10500, '/images/kefir-fresa.jpg',
   'Botella de kéfir de fresa The Good Co. de 500 ml', false, 'Kéfir de fresa', 'KEF-FRE-500', true, 2),
  ('kefir-mango', 'kefir', 'Kéfir de mango', 'mango',
   'Mango maduro y cultivo activo. Elige la versión endulzada o sin endulzar.',
   '500 ml', '390 g', 10500, '/images/kefir-mango.jpg',
   'Botella de kéfir de mango The Good Co. de 500 ml', false, 'Kéfir de mango', 'KEF-MAN-500', true, 3),
  ('kombucha-natural', 'kombucha', 'Kombucha natural', 'natural',
   'Té fermentado burbujeante, equilibrado y refrescante.',
   '750 ml', null, 12000, '/images/kombucha-natural.jpg',
   'Botella de kombucha natural The Good Co. de 750 ml', false, 'Kombucha natural', 'KOM-NAT-750', true, 4),
  ('kombucha-betabel', 'kombucha', 'Kombucha de betabel-arándano', 'betabel-arándano',
   'Betabel y arándano en un té fermentado con notas terrosas, frutales y burbujas vivas.',
   '750 ml', null, 12000, '/images/kombucha-betabel.jpg',
   'Botella de kombucha de betabel-arándano The Good Co. de 750 ml', false, 'Kombucha de betabel-arándano', 'KOM-BET-750', true, 5),
  ('kombucha-mango', 'kombucha', 'Kombucha de mango', 'mango',
   'Mango tropical con el carácter burbujeante de la kombucha.',
   '750 ml', null, 12000, '/images/kombucha-mango.jpg',
   'Botella de kombucha de mango The Good Co. de 750 ml', false, 'Kombucha de mango', 'KOM-MAN-750', true, 6),
  ('kombucha-fresa', 'kombucha', 'Kombucha de fresa', 'fresa',
   'Fresas frescas y fermento vivo en cada sorbo.',
   '750 ml', null, 12000, '/images/kombucha-fresa.jpg',
   'Botella de kombucha de fresa The Good Co. de 750 ml', false, 'Kombucha de fresa', 'KOM-FRE-750', true, 7),
  ('tibicos-natural', 'tibicos', 'Tíbicos naturales', 'natural',
   'Agua de kefir de frutos ligeros, refrescante y probiótica.',
   '750 ml', null, 12000, '/images/tibicos-natural.jpg',
   'Botella de tíbicos naturales The Good Co. de 750 ml', false, 'Tíbicos naturales', 'TIB-NAT-750', true, 8),
  ('tibicos-mango', 'tibicos', 'Tíbicos de mango', 'mango',
   'Mango suave con la ligereza característica de los tíbicos.',
   '750 ml', null, 12000, '/images/tibicos-mango.jpg',
   'Botella de tíbicos de mango The Good Co. de 750 ml', false, 'Tíbicos de mango', 'TIB-MAN-750', true, 9),
  ('tibicos-fresa', 'tibicos', 'Tíbicos de fresa', 'fresa',
   'Fresas vivas en una bebida ligera y burbujeante.',
   '750 ml', null, 12000, '/images/tibicos-fresa.jpg',
   'Botella de tíbicos de fresa The Good Co. de 750 ml', false, 'Tíbicos de fresa', 'TIB-FRE-750', true, 10)
on conflict (id) do nothing;

insert into public.product_variants (id, product_id, label, message_label, sort_order) values
  ('endulzado', 'kefir-natural', 'Endulzado', 'endulzado', 1),
  ('sin-endulzar', 'kefir-natural', 'Sin endulzar', 'sin endulzar', 2),
  ('endulzado', 'kefir-fresa', 'Endulzado', 'endulzado', 1),
  ('sin-endulzar', 'kefir-fresa', 'Sin endulzar', 'sin endulzar', 2),
  ('endulzado', 'kefir-mango', 'Endulzado', 'endulzado', 1),
  ('sin-endulzar', 'kefir-mango', 'Sin endulzar', 'sin endulzar', 2)
on conflict (product_id, id) do nothing;
