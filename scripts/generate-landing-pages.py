#!/usr/bin/env python3
"""Genera páginas estáticas de SEO programático para LeadShop.

Crea public/bases-de-datos/<nicho>/<ciudad>/index.html por cada combinación
nicho x ciudad, más un hub en public/bases-de-datos/index.html.

Uso: python scripts/generate-landing-pages.py
"""
import os
import html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "bases-de-datos")
BASE = "https://www.leadshop.site"

# ---------------------------------------------------------------------------
# Datos por nicho (contenido único por rubro)
# ---------------------------------------------------------------------------
NICHES = [
    {
        "slug": "clinicas-odontologicas",
        "name": "Clínicas odontológicas",
        "short": "clínicas dentales",
        "intro": "Los consultorios y clínicas odontológicas reciben cientos de mensajes al mes entre turnos, presupuestos y consultas de obras. Una base verificada de clínicas dentales te permite ofrecer software de gestión, insumos, financiamiento o marketing directamente al dueño o administrador del consultorio, por el canal donde realmente responde.",
        "fields": "nombre del consultorio, especialidad, ciudad, WhatsApp verificado del negocio, sitio web y rating en mapas",
        "use": "software de gestión odontológica, insumos y equipamiento dental, planes de marketing para profesionales de la salud, servicios de packaging",
        "faq": "¿La base incluye solo clínicas activas? Sí: solo negocios con presencia digital real y WhatsApp verificado, sin fichas fantasma ni números dados de baja.",
    },
    {
        "slug": "estudios-juridicos",
        "name": "Estudios jurídicos",
        "short": "estudios jurídicos",
        "intro": "Los estudios jurídicos y firmas de abogados reciben consultas por múltiples canales pero muchos siguen operando con contactos desactualizados. Una base de estudios jurídicos verificados te da acceso directo a socios y gerentes para ofrecer software legal, seguros, servicios contables o consultoría B2B.",
        "fields": "nombre del estudio, área de práctica, ciudad, WhatsApp verificado, sitio web profesional y LinkedIn cuando está disponible",
        "use": "software de gestión legal, seguros para profesionales, servicios contables y tributarios, marketing para despachos",
        "faq": "¿Puedo filtrar por área del derecho? Sí, puedes indicar en tu pedido el área que te interesa (laboral, civil, penal, corporativo) y la ciudad exacta.",
    },
    {
        "slug": "inmobiliarias",
        "name": "Inmobiliarias",
        "short": "inmobiliarias",
        "intro": "Las inmobiliarias y brokers de propiedades son de los negocios que más valoran un contacto directo: cada cliente nuevo representa una comisión relevante. Una base verificada de inmobiliarias en tu zona te permite ofrecer CRM inmobiliario, fotografía profesional, portales premium o servicios de captación.",
        "fields": "nombre de la inmobiliaria, zona de operación, WhatsApp verificado del negocio, sitio web y redes sociales activas",
        "use": "CRM inmobiliario, fotografía y video de propiedades, publicidad en portales, gestión de leads y captación",
        "faq": "¿Incluye agentes independientes o solo inmobiliarias establecidas? Principalmente empresas con local o presencia comercial; puedes pedir foco en una zona específica.",
    },
    {
        "slug": "empresas-saas",
        "name": "Empresas SaaS",
        "short": "empresas de software",
        "intro": "Vender software B2B requiere llegar a empresas que ya tienen presupuesto para herramientas digitales. Una base verificada de empresas de tecnología y SaaS te permite ofrecer integraciones, servicios de implementación, marketing de performance o partnerships con decisores reales.",
        "fields": "nombre de la empresa, rubro tecnológico, ciudad, WhatsApp corporativo, sitio web, LinkedIn y email cuando están disponibles",
        "use": "integraciones y APIs, servicios de implementación, agencias de performance, partnerships y canales de venta",
        "faq": "¿La base incluye emails corporativos? Sí, como canal opcional puedes agregar email, LinkedIn, teléfono e Instagram además de los 2 canales incluidos.",
    },
    {
        "slug": "agencias-marketing",
        "name": "Agencias de marketing",
        "short": "agencias de marketing",
        "intro": "Las agencias de marketing y estudios creativos compiten por clientes nuevos cada mes. Una base verificada de agencias te da acceso a dueños y directores comerciales para ofrecer white-label, herramientas de producción, financiamiento o servicios complementarios que esas agencias revenden a sus clientes.",
        "fields": "nombre de la agencia, especialidad (performance, branding, social), ciudad, WhatsApp verificado, sitio web e Instagram",
        "use": "servicios white-label, herramientas de producción, financiamiento, hiring de talento creativo",
        "faq": "¿Puedo pedir solo agencias de cierto tamaño? Puedes acotar por zona y cantidad; para filtros finos como tamaño de equipo escríbenos y lo validamos contigo.",
    },
    {
        "slug": "ecommerce",
        "name": "E-commerce",
        "short": "tiendas online",
        "intro": "Los e-commerce y tiendas online necesitan constantemente logística, pagos, publicidad y herramientas de conversión. Una base verificada de tiendas online te permite ofrecer esos servicios directamente a dueños que ya venden por internet y entienden el valor de invertir en crecimiento.",
        "fields": "nombre de la tienda, rubro de productos, ciudad, WhatsApp verificado, sitio web, Instagram y TikTok cuando están activos",
        "use": "logística y fulfillment, pasarelas de pago, publicidad performance, email marketing, fotografía de producto",
        "faq": "¿Puedo filtrar por rubro de producto? Sí: moda, tecnología, hogar, belleza, alimentos… indícalo en tu pedido.",
    },
    {
        "slug": "hoteles",
        "name": "Hoteles",
        "short": "hoteles y alojamientos",
        "intro": "Hoteles, hostales y alojamientos dependen de canales directos para llenar habitaciones fuera de temporada. Una base verificada de hoteles te permite ofrecer channel managers, software de reservas, revenue management o servicios de marketing turístico a propietarios y gerentes.",
        "fields": "nombre del hotel, tipo de alojamiento, ciudad, WhatsApp verificado, sitio web de reservas y Booking/Google cuando aplican",
        "use": "channel managers y PMS, software de reservas directas, revenue management, marketing turístico",
        "faq": "¿Incluye alojamientos pequeños o solo hoteles grandes? Ambos: desde hostales hasta hoteles boutique; puedes acotar por ciudad o tipo de alojamiento.",
    },
    {
        "slug": "restaurantes",
        "name": "Restaurantes",
        "short": "restaurantes",
        "intro": "Los restaurantes reciben consultas de menú, reservas y delivery todos los días, pero pocos tienen un sistema para prospectar negocios vecinos. Una base verificada de restaurantes te permite ofrecer insumos, software de comandas, delivery propio o servicios de marketing gastronómico.",
        "fields": "nombre del restaurante, tipo de cocina, ciudad, WhatsApp verificado, sitio web, Instagram y apps de delivery activas",
        "use": "insumos y equipamiento, software de comandas y reservas, delivery propio, marketing gastronómico, franquicias",
        "faq": "¿Puedo pedir franquicias o cadenas específicas? Sí, puedes acotar por tipo de cocina, zona o pedir foco en franquicias.",
    },
    {
        "slug": "clinicas-medicas",
        "name": "Clínicas médicas",
        "short": "clínicas médicas",
        "intro": "Las clínicas médicas y centros de salud manejan agendas, pacientes y proveedores en paralelo. Una base verificada de clínicas te da acceso a directores médicos y administradores para ofrecer software de gestión, equipamiento, insumos o servicios de telemedicina.",
        "fields": "nombre de la clínica, especialidad médica, ciudad, WhatsApp verificado del negocio, sitio web y rating en mapas",
        "use": "software de gestión clínica, equipamiento médico, insumos, telemedicina, marketing para centros de salud",
        "faq": "¿Incluye consultorios médicos individuales? Sí, consultorios y centros médicos; puedes especificar especialidad (pediatría, dermatología, kinesiología…).",
    },
    {
        "slug": "gimnasios",
        "name": "Gimnasios",
        "short": "gimnasios y centros de fitness",
        "intro": "Los gimnasios y centros de fitness viven de membresías y retención, y compiten por cada socio nuevo. Una base verificada de gimnasios te permite ofrecer software de gestión de socios, nutrición, aparatología, publicidad o servicios de recuperación a dueños y gerentes.",
        "fields": "nombre del gimnasio, tipo de centro (crossfit, yoga, musculación), ciudad, WhatsApp verificado, sitio web e Instagram",
        "use": "software de gestión de socios, nutrición deportiva, aparatología, publicidad local, franquicias fitness",
        "faq": "¿Incluye estudios boutique como yoga o pilates? Sí, cualquier centro de fitness con presencia digital; puedes especificar el tipo de entrenamiento.",
    },
]

# ---------------------------------------------------------------------------
# Datos por ciudad
# ---------------------------------------------------------------------------
CITIES = [
    {"slug": "buenos-aires", "name": "Buenos Aires", "country": "Argentina",
     "note": "el mayor mercado de servicios profesionales de Argentina, con alta densidad de clínicas, estudios y comercios en CABA y GBA."},
    {"slug": "cordoba", "name": "Córdoba", "country": "Argentina",
     "note": "la segunda ciudad del país con un ecosistema de servicios en crecimiento, especialmente en tecnología y salud."},
    {"slug": "rosario", "name": "Rosario", "country": "Argentina",
     "note": "centro industrial y de servicios del litoral argentino, con buena penetración de WhatsApp Business entre pymes."},
    {"slug": "ciudad-de-mexico", "name": "Ciudad de México", "country": "México",
     "note": "el mercado más grande de Latinoamérica: decenas de miles de negocios por rubro y alta adopción de WhatsApp comercial."},
    {"slug": "madrid", "name": "Madrid", "country": "España",
     "note": "capital europea con fuerte presencia de inmobiliarias, agencias y franquicias; el WhatsApp verificado facilita el primer contacto B2B."},
    {"slug": "miami", "name": "Miami", "country": "Estados Unidos",
     "note": "hub de negocios hispanos y profesionales internacionales; mercado premium donde el contacto verificado marca la diferencia."},
    {"slug": "santiago", "name": "Santiago", "country": "Chile",
     "note": "el mercado más digitalizado de la región: alta penetración de internet, e-commerce y WhatsApp Business en pymes."},
    {"slug": "bogota", "name": "Bogotá", "country": "Colombia",
     "note": "capital económica de Colombia con un ecosistema diverso de servicios, salud y comercio en constante digitalización."},
    {"slug": "sao-paulo", "name": "São Paulo", "country": "Brasil",
     "note": "la mayor economía de Latinoamérica y uno de los mercados más grandes del mundo para servicios B2B."},
    {"slug": "lima", "name": "Lima", "country": "Perú",
     "note": "mercado emergente con crecimiento rápido en e-commerce, salud privada y servicios profesionales."},
]

PRICE_NOTE = "Desde US$20,99 por 25 clientes verificados (≈US$0,84 por cliente), pago único, sin suscripción. Entrega en 24 horas hábiles."

TEMPLATE = """<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content="{desc}" />
<link rel="canonical" href="{canonical}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="LeadShop" />
<meta property="og:locale" content="es_CL" />
<meta property="og:url" content="{canonical}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{desc}" />
<meta property="og:image" content="{BASE}/assets/og-hero.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{desc}" />
<meta name="twitter:image" content="{BASE}/assets/og-hero.png" />
<script type="application/ld+json">
{jsonld}
</script>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: 'Manrope', system-ui, sans-serif; background: #F4F6FA; color: #181D27; line-height: 1.6; }}
  .wrap {{ max-width: 760px; margin: 0 auto; padding: 40px 20px 80px; }}
  .brand {{ display: flex; align-items: center; gap: 10px; margin-bottom: 32px; text-decoration: none; color: #181D27; }}
  .brand b {{ font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }}
  .brand b span {{ color: #2B62F6; }}
  h1 {{ font-size: 30px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 16px; }}
  h2 {{ font-size: 20px; font-weight: 800; margin: 32px 0 10px; letter-spacing: -0.01em; }}
  p {{ font-size: 15.5px; color: #3A4252; margin-bottom: 14px; }}
  .card {{ background: #fff; border-radius: 20px; padding: 28px; box-shadow: 0 4px 24px rgba(24,29,39,0.06); margin-top: 24px; }}
  .price {{ background: #EFF4FA; border-radius: 14px; padding: 16px 18px; font-size: 14.5px; font-weight: 600; color: #2B62F6; margin: 20px 0; }}
  ul {{ padding-left: 20px; font-size: 15px; color: #3A4252; }}
  li {{ margin-bottom: 6px; }}
  .cta {{ display: inline-block; margin-top: 24px; background: #2B62F6; color: #fff; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 999px; text-decoration: none; }}
  .cta:hover {{ background: #1F4FD6; }}
  .crumbs {{ font-size: 12.5px; color: #60697A; margin-bottom: 20px; }}
  .crumbs a {{ color: #2B62F6; text-decoration: none; }}
  footer {{ margin-top: 48px; font-size: 12.5px; color: #60697A; text-align: center; }}
  footer a {{ color: #2B62F6; text-decoration: none; }}
</style>
</head>
<body>
<div class="wrap">
  <a class="brand" href="{BASE}/">
    <svg width="30" height="30" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="16" fill="black"/><rect x="15" y="11" width="34" height="26" rx="10" fill="white"/><path d="M21 35 L13 51 L31 37 Z" fill="white"/><path d="M25 21.5l4.5 4.5L39 19" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <b>Lead<span>Shop</span></b>
  </a>

  <nav class="crumbs"><a href="{BASE}/">Inicio</a> · <a href="{BASE}/bases-de-datos/">Bases de datos</a> · {city_name} · {niche_name}</nav>

  <h1>{h1}</h1>

  <div class="card">
    <p>{intro_city}</p>
    <p>{intro_niche}</p>

    <h2>Qué incluye cada cliente</h2>
    <ul>
      <li>Nombre del negocio y categoría ({niche_short})</li>
      <li>Ciudad y zona dentro de {city_name}</li>
      <li>WhatsApp verificado del negocio</li>
      <li>Sitio web del negocio</li>
      <li>Canales extra opcionales: Instagram, LinkedIn, email, teléfono, rating</li>
    </ul>

    <h2>Campos típicos de la base</h2>
    <p>{fields}</p>

    <h2>Para qué sirve esta base</h2>
    <p>{use}</p>

    <div class="price">{price_note}</div>

    <h2>Preguntas frecuentes</h2>
    <p><strong>¿Cómo pido esta base?</strong> En menos de 2 minutos: eliges el rubro ({niche_name}), la ciudad ({city_name}), los canales y la cantidad en nuestro pedido, y confirmas por WhatsApp. Sin formularios eternos ni suscripción.</p>
    <p><strong>{faq_q}</strong> {faq_a}</p>
    <p><strong>¿Y si un contacto no funciona?</strong> Lo reemplazamos gratis. Garantía de reemplazo en todos los pedidos.</p>

    <a class="cta" href="{BASE}/#precios">Armar mi base de {niche_short} en {city_name}</a>
  </div>

  <footer>
    <a href="{BASE}/bases-de-datos/">Ver todas las bases por rubro y ciudad</a> ·
    <a href="{BASE}/">LeadShop</a> · Pago único · Entrega en 24h hábiles
  </footer>
</div>
</body>
</html>
"""


def slugify(s: str) -> str:
    return s.lower().replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ñ", "n")


def build_jsonld(canonical, title, desc, city_name, niche_name):
    import json
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": f"Base de datos de {niche_name} en {city_name}",
                "serviceType": "Verified B2B lead database",
                "provider": {"@type": "Organization", "name": "LeadShop", "url": BASE + "/"},
                "areaServed": city_name,
                "description": desc,
                "offers": {
                    "@type": "Offer",
                    "price": "20.99",
                    "priceCurrency": "USD",
                    "description": "Desde 25 clientes verificados",
                },
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/"},
                    {"@type": "ListItem", "position": 2, "name": "Bases de datos", "item": BASE + "/bases-de-datos/"},
                    {"@type": "ListItem", "position": 3, "name": city_name, "item": canonical},
                ],
            },
        ],
    }
    return json.dumps(data, ensure_ascii=False)


def main():
    urls = []
    # Hub page
    hub_path = os.path.join(OUT, "index.html")
    os.makedirs(OUT, exist_ok=True)

    niche_links = "".join(
        f'<li><a href="{BASE}/bases-de-datos/{n["slug"]}/">{html.escape(n["name"])}</a></li>'
        for n in NICHES
    )
    hub_html = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bases de datos B2B verificadas por rubro y ciudad | LeadShop</title>
<meta name="description" content="Bases de clientes verificados por rubro y ciudad: clínicas, inmobiliarias, restaurantes, hoteles y más. WhatsApp verificado, entrega en 24h, desde US$20,99." />
<link rel="canonical" href="{BASE}/bases-de-datos/" />
<meta property="og:title" content="Bases de datos B2B por rubro y ciudad | LeadShop" />
<meta property="og:description" content="Elige tu rubro y ciudad: te entregamos negocios reales con WhatsApp verificado, listos para contactar." />
<meta property="og:type" content="website" />
<meta property="og:url" content="{BASE}/bases-de-datos/" />
<meta property="og:image" content="{BASE}/assets/og-hero.png" />
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: 'Manrope', system-ui, sans-serif; background: #F4F6FA; color: #181D27; line-height: 1.6; }}
  .wrap {{ max-width: 860px; margin: 0 auto; padding: 40px 20px 80px; }}
  h1 {{ font-size: 30px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 12px; }}
  p {{ font-size: 15.5px; color: #3A4252; margin-bottom: 14px; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; margin-top: 24px; }}
  a.card {{ display: block; background: #fff; border-radius: 16px; padding: 18px 20px; text-decoration: none; color: #181D27; font-weight: 700; font-size: 15px; box-shadow: 0 4px 24px rgba(24,29,39,0.06); }}
  a.card:hover {{ border-color: #2B62F6; }}
  a.card small {{ display: block; font-weight: 500; color: #60697A; font-size: 12.5px; margin-top: 4px; }}
  .cta {{ display: inline-block; margin-top: 28px; background: #2B62F6; color: #fff; font-weight: 700; padding: 14px 28px; border-radius: 999px; text-decoration: none; }}
  .brand {{ display: flex; align-items: center; gap: 10px; margin-bottom: 32px; text-decoration: none; color: #181D27; }}
  .brand b {{ font-size: 20px; font-weight: 800; }}
  .brand b span {{ color: #2B62F6; }}
</style>
</head>
<body>
<div class="wrap">
  <a class="brand" href="{BASE}/">
    <svg width="30" height="30" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="black"/><rect x="15" y="11" width="34" height="26" rx="10" fill="white"/><path d="M21 35 L13 51 L31 37 Z" fill="white"/><path d="M25 21.5l4.5 4.5L39 19" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <b>Lead<span>Shop</span></b>
  </a>
  <h1>Bases de datos B2B por rubro y ciudad</h1>
  <p>Elige el rubro de tu cliente ideal: te entregamos una base de negocios reales con WhatsApp verificado y sitio web, lista para escribirles. Pago único, sin suscripción, entrega en 24 horas hábiles.</p>
  <div class="grid">
    {''.join(f'<a class="card" href="{BASE}/bases-de-datos/{n["slug"]}/">{html.escape(n["name"])}<small>{html.escape(n["short"])}</small></a>' for n in NICHES)}
  </div>
  <p style="margin-top:28px"><strong>Ciudades cubiertas:</strong> Buenos Aires, Córdoba, Rosario, Ciudad de México, Madrid, Miami, Santiago, Bogotá, São Paulo y Lima — y más bajo pedido.</p>
  <a class="cta" href="{BASE}/#precios">Armar mi base ahora</a>
</div>
</body>
</html>"""
    with open(hub_path, "w", encoding="utf-8") as f:
        f.write(hub_html)
    urls.append("/bases-de-datos/")

    for niche in NICHES:
        for city in CITIES:
            slug_path = f"{niche['slug']}/{city['slug']}"
            page_dir = os.path.join(OUT, slug_path)
            os.makedirs(page_dir, exist_ok=True)

            canonical = f"{BASE}/bases-de-datos/{slug_path}/"
            title = f"Base de datos de {niche['name']} en {city['name']} — WhatsApp verificado | LeadShop"
            desc = (f"Base de {niche['short']} en {city['name']}, {city['country']}: negocios reales con "
                    f"WhatsApp verificado y sitio web. Entrega en 24h hábiles, pago único desde US$20,99.")
            h1 = f"Base de datos de {niche['name']} en {city['name']}"
            intro_city = f"{city['name']}, {city['country']}, {city['note']}"
            intro_niche = niche["intro"]
            faq_q = "¿Qué hace diferente a esta base?"
            faq_a = niche["faq"]

            jsonld = build_jsonld(canonical, title, desc, city["name"], niche["name"])

            page = TEMPLATE.format(
                title=html.escape(title),
                desc=html.escape(desc),
                canonical=canonical,
                BASE=BASE,
                jsonld=jsonld,
                h1=html.escape(h1),
                intro_city=html.escape(intro_city),
                intro_niche=html.escape(intro_niche),
                niche_short=html.escape(niche["short"]),
                city_name=html.escape(city["name"]),
                niche_name=html.escape(niche["name"]),
                fields=html.escape(niche["fields"]),
                use=html.escape(niche["use"]),
                price_note=PRICE_NOTE,
                faq_q=html.escape(faq_q),
                faq_a=html.escape(faq_a),
            )

            with open(os.path.join(page_dir, "index.html"), "w", encoding="utf-8") as f:
                f.write(page)
            urls.append(f"/bases-de-datos/{slug_path}/")

    # Sitemap
    today = "2026-11-18"
    url_entries = "\n".join(
        f"""  <url>
    <loc>{BASE}{u}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{"0.9" if u.count('/') > 2 else "0.8"}</priority>
  </url>"""
        for u in urls
    )
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{BASE}/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
{url_entries}
</urlset>
"""
    with open(os.path.join(ROOT, "public", "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap)

    print(f"OK: {len(urls)} paginas generadas + sitemap.xml")


if __name__ == "__main__":
    main()
