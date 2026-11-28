# Infografía A4 — Probióticos, kéfir y kombucha

Pieza vertical imprimible tamaño **A4** (210 × 297 mm) con el estilo de The Good Co.

## Archivos

| Archivo | Uso |
|---|---|
| `probioticos-kefir-kombucha-a4.png` | Imagen lista para imprimir / compartir (~2382×3369 px) |
| `probioticos-kefir-kombucha-a4.pdf` | PDF de 1 página A4 |
| `probioticos-a4.html` | Fuente editable (HTML + CSS de marca) |

## Vista previa local

Con `yarn dev` abierto:

- Diseño: http://localhost:3000/infografia/probioticos-a4.html
- Export limpio (sin margen gris): http://localhost:3000/infografia/probioticos-a4.html?export=1

## Regenerar PNG / PDF

```bash
# PDF
/opt/google/chrome/chrome --headless=new --no-sandbox --disable-gpu \
  --user-data-dir=/tmp/tgc-infografia --remote-debugging-port=0 \
  --no-pdf-header-footer \
  --print-to-pdf=web/public/infografia/probioticos-kefir-kombucha-a4.pdf \
  "http://127.0.0.1:3000/infografia/probioticos-a4.html?export=1"

# PNG (~3× A4 a 96 dpi)
/opt/google/chrome/chrome --headless=new --no-sandbox --disable-gpu \
  --user-data-dir=/tmp/tgc-infografia-shot --remote-debugging-port=0 \
  --hide-scrollbars --window-size=794,1123 --force-device-scale-factor=3 \
  --virtual-time-budget=10000 \
  --screenshot=web/public/infografia/probioticos-kefir-kombucha-a4.png \
  "http://127.0.0.1:3000/infografia/probioticos-a4.html?export=1"
```

Info educativa con citas ISAPP / Stanford / King’s College. No sustituye consejo médico.
