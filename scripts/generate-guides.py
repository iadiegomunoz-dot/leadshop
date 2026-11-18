#!/usr/bin/env python3
"""Genera la seccion /guias/ de LeadShop: articulos de consejos B2B.

Uso: python scripts/generate-guides.py
"""
import os
import json
import html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "guias")
BASE = "https://www.leadshop.site"
TODAY = "2026-11-18"

ARTICLES = [
    {
        "slug": "como-conseguir-clientes-nuevos",
        "title": "Cómo conseguir clientes nuevos: guía práctica para pymes y freelancers",
        "desc": "Métodos reales para conseguir clientes nuevos en 2026: prospección directa, referencias, contenido y bases de datos verificadas. Paso a paso sin humo.",
        "h1": "Cómo conseguir clientes nuevos: la guía que sí funciona",
        "intro": "Conseguir clientes nuevos no es cuestión de suerte ni de gastar más en publicidad. Es un sistema: definir a quién le vendes, conseguir su contacto por un canal donde responda, y dar seguimiento hasta el cierre. Esta guía te muestra cómo armar ese sistema paso a paso, desde cero y sin depender de un equipo de ventas.",
        "sections": [
            ("Define tu cliente ideal antes de buscarlo",
             "El error más común es salir a buscar 'cualquiera que pueda pagar'. Antes de prospectar necesitas tres datos: el rubro exacto (no 'negocios', sino 'clínicas odontológicas'), la zona geográfica donde operas bien, y el tamaño o tipo de negocio. Cuanto más específico seas, más barato y rápido es encontrar a esa persona."),
            ("Consigue el contacto por un canal que usen",
             "Tener una lista de empresas no sirve si no puedes escribirles. El canal importa más que la lista: WhatsApp verificado es hoy el canal con más respuesta en Latinoamérica para pymes, seguido del email corporativo. El teléfono fijo y los formularios web convierten muy por debajo. Si tu cliente ideal vive en WhatsApp, empieza por ahí."),
            ("El primer mensaje decide todo",
             "La mayoría de los mensajes de prospección fallan porque hablan del vendedor, no del cliente. Un buen primer mensaje tiene tres partes: por qué escribes a ESA empresa (no a mil), qué problema les resuelves en una frase, y una pregunta fácil de responder. Nada de presentaciones largas ni adjuntos en el primer contacto."),
            ("Da seguimiento sin ser pesado",
             "El 80% de las ventas B2B se cierra después del primer mensaje, no en él. La mayoría de los vendedores desiste tras un intento. Un seguimiento corto a los 3-4 días ('¿te llegó mi mensaje anterior?') recupera ventas que ya estaban casi cerradas."),
            ("Mide y repite lo que funciona",
             "Anota cuántos mensajes envías, cuántos responden y cuántos cierran. Con eso sabes si el problema es el canal, el mensaje o la oferta. Sin números, cada semana empiezas de cero."),
        ],
        "outro": "Si quieres acelerar el primer paso —conseguir los contactos correctos— puedes pedir una <a href=\"/bases-de-datos/\">base de datos verificada por rubro y ciudad</a>: negocios reales con WhatsApp activo, sin tener que investigarlos uno por uno.",
    },
    {
        "slug": "prospectar-por-whatsapp-sin-que-te-bloqueen",
        "title": "Cómo prospectar por WhatsApp B2B sin que te bloqueen (guía 2026)",
        "desc": "WhatsApp es el canal con más respuesta para pymes, pero hacerlo mal te cuesta el número. Técnicas para escribir a desconocidos sin ser marcado como spam.",
        "h1": "Prospectar por WhatsApp sin que te bloqueen",
        "intro": "WhatsApp bloquea cuentas que escriben de forma masiva y repetitiva a desconocidos. No es que el canal no funcione: es que funciona solo si escribes como una persona, no como una máquina de spam. Estas reglas te mantienen fuera de problemas y aumentan tus respuestas.",
        "sections": [
            ("Nunca uses listas masivas automatizadas",
             "Las herramientas que envían el mismo mensaje a cientos de números a la vez son la forma más rápida de perder tu número. WhatsApp las detecta por patrones: mismo texto, mismo intervalo, mismo horario. Si envías 200 mensajes idénticos en una hora, estás bloqueado antes del mediodía."),
            ("Escribe mensajes únicos y cortos",
             "Cada mensaje debería mencionar algo real de esa empresa: su rubro, su zona, algo que viste en su web o Instagram. 'Hola, vi que tienen clínica en [zona]…' funciona; 'Estimado cliente, le escribo para ofrecerle…' no. La personalización no es opcional, es lo que separa un mensaje de WhatsApp de spam."),
            ("Respeta los horarios y el volumen",
             "Escribe en horario laboral del país de tu cliente y mantén un volumen humano: decenas de mensajes personalizados al día, no cientos idénticos. Si un número te bloquea o reporta, deja de escribirle: WhatsApp penaliza los reportes mucho más que los mensajes ignorados."),
            ("Da un motivo para responder",
             "Termina con una pregunta concreta y fácil: '¿Les interesa que les cuente en 2 minutos cómo lo hace [empresa similar]?' Una pregunta de sí/no genera más respuestas que 'quedo atento a sus comentarios'. Y si no responden, un solo seguimiento amable a los 4 días; dos como máximo."),
            ("Ten un número dedicado a ventas",
             "Usa un chip/eSIM o un segundo número para prospección, nunca tu WhatsApp personal. Si algo sale mal, pierdes ese número, no tu vida social. Y configura el perfil de empresa: nombre del negocio, logo y una descripción clara de qué haces."),
        ],
        "outro": "El primer paso siempre es la misma pregunta: ¿a quién le escribo? Si necesitas una <a href=\"/bases-de-datos/\">base de negocios con WhatsApp ya verificado</a>, la tienes lista para empezar hoy.",
    },
    {
        "slug": "como-elegir-base-de-datos-b2b",
        "title": "Cómo elegir una base de datos B2B sin tirar la plata",
        "desc": "Qué verificar antes de comprar una base de datos de clientes: verificación de WhatsApp, frescura de datos, formato y garantía de reemplazo.",
        "h1": "Cómo elegir una base de datos B2B (y no tirar la plata)",
        "intro": "Comprar una base de datos de clientes es como comprar cualquier otro insumo: la calidad varía mucho y el precio no siempre lo dice. Esta checklist te ayuda a distinguir una base útil de una lista de números muertos antes de pagar.",
        "sections": [
            ("Pide una muestra antes de pagar",
             "Cualquier proveedor serio te da 3-5 registros de muestra sin costo. Si no puede mostrarte datos reales, no tiene datos reales. Revisa que los negocios existan: busca uno en Google Maps y verifica que el WhatsApp corresponda."),
            ("Verifica que el WhatsApp esté realmente verificado",
             "La diferencia entre una base útil y una pérdida de tiempo es que el número tenga WhatsApp activo. 'Verificado' debe significar que alguien comprobó que el número tiene la app y responde, no solo que el formato es válido. Pregunta cómo lo verifican."),
            ("Revisa la frescura y el origen de los datos",
             "Una base de 2022 tiene empresas que ya cerraron y números que cambiaron. Pregunta de cuándo son los datos y de dónde salen (mapas, registros públicos, webs). Los datos extraídos de fuentes oficiales y actualizados recientemente valen más."),
            ("Mira qué campos incluye realmente",
             "No todas las bases traen lo mismo. Lo mínimo útil: nombre del negocio, rubro, ciudad, WhatsApp, sitio web. Los extras valiosos: email corporativo, Instagram, LinkedIn, teléfono y rating. Si el precio parece muy bajo, probablemente te están vendiendo solo nombres y teléfonos."),
            ("Exige garantía de reemplazo",
             "Todo proveedor honesto sabe que un porcentaje de contactos dejará de funcionar. Lo que distingue a uno bueno es que te reemplace gratis los que no sirvan. Si no ofrece reemplazo, el riesgo es tuyo."),
        ],
        "outro": "En <a href=\"/\">LeadShop</a> trabajamos justo con esos criterios: muestra gratis de 5 clientes de tu rubro y ciudad, WhatsApp verificado antes de entregar y reemplazo gratis si un contacto no funciona.",
    },
    {
        "slug": "errores-prospeccion-b2b",
        "title": "Por qué nadie te responde: 7 errores de prospección B2B",
        "desc": "Los errores más comunes al prospectar clientes nuevos por WhatsApp o email y cómo corregirlos para empezar a recibir respuestas.",
        "h1": "Por qué nadie te responde: errores de prospección B2B",
        "intro": "Si envías mensajes y nadie contesta, el problema casi nunca es 'el mercado está difícil'. Es casi siempre uno de estos errores, y todos tienen arreglo.",
        "sections": [
            ("Error 1: vender en el primer mensaje",
             "'Hola, somos la mejor agencia de marketing…' Nadie compra en el primer contacto. El primer mensaje no vende: abre una conversación. Tu objetivo es que te respondan, no que te compren en el acto."),
            ("Error 2: escribir a todo el mundo",
             "Un mensaje genérico a 500 empresas convierte peor que un mensaje personal a 50. Es más trabajo, pero es la única forma de que parezca que escribiste a esa empresa y no a una lista."),
            ("Error 3: no dar seguimiento",
             "La mayoría de las respuestas llegan después del segundo o tercer mensaje. Si envías uno y esperas, estás regalando ventas. Un seguimiento corto y amable es profesional, no insistente."),
            ("Error 4: hablar de ti, no de ellos",
             "'Somos líderes en…', 'tenemos 10 años de experiencia…' A tu cliente le da igual. Lo que le importa es qué problema le resuelves a él. Invierte el mensaje: primero su dolor, después tu solución."),
            ("Error 5: no tener un canal de contacto claro",
             "Si tu mensaje no tiene un siguiente paso obvio ('¿te agendo una llamada de 10 minutos?' o '¿te mando un ejemplo?'), la conversación muere ahí. Pide siempre una acción concreta y pequeña."),
            ("Error 6: prospectar en el momento equivocado",
             "Escribir a un restaurante a las 3 de la mañana o un lunes a las 8 am tiene otra tasa de respuesta que escribir en horario laboral. Conoce los horarios de tu rubro."),
            ("Error 7: medir solo respuestas, no cierres",
             "Si mides 'cuántos respondieron' pero no 'cuántos compraron', optimizas la métrica equivocada. Un mensaje que responde mucho pero no vende es un mensaje bonito que no sirve."),
        ],
        "outro": "Si además de corregir el mensaje necesitas mejores contactos, revisa nuestras <a href=\"/bases-de-datos/\">bases verificadas por rubro y ciudad</a>: empiezas con negocios reales y canales activos, no con listas frías.",
    },
    {
        "slug": "email-frio-vs-whatsapp-b2b",
        "title": "Email frío vs WhatsApp: qué canal usar para prospectar B2B",
        "desc": "Comparativa honesta entre email y WhatsApp para prospección B2B en Latinoamérica: tasas de respuesta, riesgos y cuándo usar cada uno.",
        "h1": "Email frío vs WhatsApp para prospectar B2B",
        "intro": "La pregunta de siempre: ¿por dónde escribo primero? La respuesta corta es que depende de tu cliente, tu mercado y lo que vendas. Esta comparativa te ayuda a elegir bien en vez de probar todo a ciegas.",
        "sections": [
            ("WhatsApp: más respuestas, más riesgo",
             "En Latinoamérica, WhatsApp tiene tasas de respuesta muy superiores al email para pymes: la gente revisa WhatsApp decenas de veces al día. El problema es que escribir a desconocidos puede terminar en bloqueo si lo haces mal o en volumen. Funciona mejor para tickets medios y bajos, servicios locales y relaciones que se construyen rápido."),
            ("Email: más escala, menos respuesta",
             "El email permite personalización avanzada, adjuntos, seguimiento automatizado y mejor imagen profesional para empresas grandes. Pero las tasas de apertura y respuesta son bajas (2-5% es normal) y mucha gente ni revisa el correo corporativo. Funciona mejor para empresas medianas/grandes, ventas de ticket alto y cuando necesitas un registro formal."),
            ("El mejor canal es el que tu cliente usa",
             "Un restaurante responde por WhatsApp; un banco o una multinacional espera email formal. Antes de elegir, pregúntate: ¿dónde pasa su día esta persona? Si no sabes, la regla práctica es empezar por WhatsApp para pymes y email para empresas establecidas."),
            ("La estrategia ganadora: ambos, con orden",
             "Los mejores vendedores usan los dos: WhatsApp para el primer contacto informal ('¿te puedo mandar un email con los detalles?') y email para la información formal. O email primero y WhatsApp como seguimiento si no responden. Lo que no funciona es elegir uno y no usar nunca el otro."),
            ("Lo que sí importa más que el canal",
             "Ni WhatsApp ni email salvan un mal mensaje. Un email personalizado y relevante supera a un WhatsApp masivo genérico. El canal multiplica el mensaje, no lo reemplaza: primero asegúrate de que lo que dices le importa a esa persona."),
        ],
        "outro": "Sea cual sea el canal, necesitas contactos correctos. Explora las <a href=\"/bases-de-datos/\">bases por rubro y ciudad</a> o lee la guía de <a href=\"/guias/prospectar-por-whatsapp-sin-que-te-bloqueen\">prospección por WhatsApp</a> para no perder el número.",
    },
    {
        "slug": "como-calificar-leads-antes-de-contactar",
        "title": "Cómo calificar leads antes de contactarlos (y no perder tiempo)",
        "desc": "No todos los contactos valen lo mismo. Aprende a calificar leads B2B por rubro, tamaño y señales de compra antes de escribir el primer mensaje.",
        "h1": "Cómo calificar leads antes de contactarlos",
        "intro": "Tener 500 contactos no sirve si 400 no pueden comprarte. Calificar es filtrar antes de escribir: así dedicas tus mensajes a quienes tienen el problema que resuelves, el presupuesto para pagarlo y la autoridad para decidir.",
        "sections": [
            ("Califica por problema, no por tamaño",
             "Un negocio pequeño que tiene exactamente el problema que resuelves vale más que una empresa grande que no lo tiene. Antes de contactar, pregúntate: ¿esta empresa realmente sufre el problema que yo resuelvo? Si vendes software de gestión para clínicas, una clínica con agenda llena y desordenada es tu lead; una que ya usa software y está contenta, no."),
            ("Señales de que están listos para comprar",
             "Busca señales activas: están contratando, publicaron una vacante relacionada con tu solución, cambiaron de rubro, tienen una web nueva o mala, o su Instagram está abandonado. Una empresa que invierte en mejorar algo relacionado a lo que vendes es más receptiva que una que no muestra señales de cambio."),
            ("El filtro de autoridad",
             "En pymes, el dueño o gerente suele decidir solo. En empresas medianas, necesitas al decisor, no al becario que atiende el WhatsApp. Verifica que el contacto que tienes sea de alguien que pueda decir 'sí' o al menos 'te presento con quien decide'."),
            ("Descarta rápido para prospectar más",
             "Es tentador escribirle a todos 'por si acaso'. No. Cada mensaje a un lead mal calificado es tiempo y reputación perdidos. Si después de revisar la ficha no encaja en tu cliente ideal, sáltalo. Es mejor 50 mensajes bien dirigidos que 500 genéricos."),
            ("Actualiza la calificación después del primer contacto",
             "La calificación no es fija: alguien que dijo 'no me interesa' puede ser 'ahora no' y alguien que no respondió puede necesitar otro canal. Revisa tus leads fríos cada 60-90 días con un ángulo nuevo antes de descartarlos para siempre."),
        ],
        "outro": "Calificar es más fácil cuando la base ya viene limpia: mira las <a href=\"/bases-de-datos/\">bases por rubro y ciudad</a> con WhatsApp verificado y datos frescos.",
    },
]

CSS = """
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Manrope', system-ui, sans-serif; background: #F4F6FA; color: #181D27; line-height: 1.7; -webkit-font-smoothing: antialiased; }
  a { color: #2B62F6; }
  .wrap { max-width: 780px; margin: 0 auto; padding: 0 20px; }

  /* Nav — mismo estilo que la landing */
  nav { position: sticky; top: 0; z-index: 50; background: rgba(244,246,250,.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(24,29,39,.06); }
  nav .wrap { display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .brand b { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #181D27; }
  .brand b span { color: #2B62F6; }
  .nav-cta { display: inline-flex; align-items: center; gap: 8px; background: #181D27; color: #fff; font-size: 13.5px; font-weight: 700; padding: 10px 20px; border-radius: 999px; text-decoration: none; transition: background .15s; }
  .nav-cta:hover { background: #2B62F6; }
  .nav-cta svg { width: 14px; height: 14px; }

  /* Hero del artículo — bloque azul como las secciones de la landing */
  .hero { background: linear-gradient(135deg, #1B3A8F 0%, #2B62F6 60%, #3D74FF 100%); color: #fff; padding: 64px 0 96px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; left: -80px; bottom: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(234,252,102,.14); }
  .hero::after { content: ''; position: absolute; right: -60px; top: -60px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,.08); }
  .hero .wrap { position: relative; }
  .kicker { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.22); color: #EAFC66; font-size: 11.5px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; margin-bottom: 20px; }
  .hero h1 { font-size: 38px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.14; margin-bottom: 16px; max-width: 640px; }
  .hero .lead { font-size: 16.5px; color: rgba(255,255,255,.88); max-width: 600px; line-height: 1.6; }
  .hero .meta { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px 22px; font-size: 12.5px; color: rgba(255,255,255,.75); font-weight: 600; }

  /* Card del artículo */
  .article-card { background: #fff; border-radius: 28px; box-shadow: 0 20px 60px rgba(24,29,39,.09); margin-top: -56px; padding: 44px 48px 48px; position: relative; }

  /* Índice */
  .toc { background: #F4F6FA; border: 1px solid #E8ECF2; border-radius: 18px; padding: 22px 26px; margin-bottom: 34px; }
  .toc h3 { font-size: 11.5px; text-transform: uppercase; letter-spacing: .12em; color: #8A93A5; margin-bottom: 12px; font-weight: 800; }
  .toc ol { list-style: none; padding: 0; columns: 2; column-gap: 32px; }
  .toc li { margin-bottom: 7px; break-inside: avoid; }
  .toc a { font-size: 14px; font-weight: 600; color: #3A4252; text-decoration: none; display: flex; gap: 9px; }
  .toc a::before { content: attr(data-n); color: #2B62F6; font-weight: 800; flex-shrink: 0; }
  .toc a:hover { color: #2B62F6; }

  /* Secciones */
  h2.sec { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin: 42px 0 14px; padding-left: 18px; border-left: 5px solid #EAFC66; line-height: 1.3; scroll-margin-top: 90px; }
  p.body { font-size: 16px; color: #3A4252; margin-bottom: 16px; }
  p.body:first-of-type { font-size: 17.5px; color: #181D27; font-weight: 500; }
  strong { color: #181D27; }

  /* CTA final — panel azul con botón lima, como la landing */
  .cta-panel { margin-top: 48px; background: linear-gradient(120deg, #141F38, #1B3A8F 60%, #2B62F6); border-radius: 24px; padding: 40px 36px; color: #fff; text-align: center; position: relative; overflow: hidden; }
  .cta-panel::before { content: ''; position: absolute; right: -60px; top: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(234,252,102,.15); }
  .cta-panel h3 { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; position: relative; }
  .cta-panel p { color: rgba(255,255,255,.85); font-size: 14.5px; margin-bottom: 26px; max-width: 480px; margin-left: auto; margin-right: auto; position: relative; }
  .cta { display: inline-flex; align-items: center; gap: 10px; background: #EAFC66; color: #181D27; font-weight: 800; font-size: 15px; padding: 15px 32px; border-radius: 999px; text-decoration: none; transition: transform .15s, filter .15s; position: relative; }
  .cta:hover { transform: translateY(-2px); filter: brightness(1.05); }
  .cta svg { width: 16px; height: 16px; }

  /* Guías relacionadas */
  .related { margin-top: 44px; }
  .related h3 { font-size: 11.5px; text-transform: uppercase; letter-spacing: .12em; color: #8A93A5; margin-bottom: 16px; font-weight: 800; }
  .rel-grid { display: grid; gap: 14px; }
  .rel-card { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: #fff; border-radius: 18px; padding: 20px 24px; text-decoration: none; color: #181D27; border: 1px solid #E8ECF2; transition: all .18s; }
  .rel-card:hover { border-color: #2B62F6; box-shadow: 0 10px 30px rgba(43,98,246,.1); transform: translateY(-2px); }
  .rel-card .t { font-weight: 700; font-size: 15px; line-height: 1.35; }
  .rel-card .d { font-size: 12.5px; color: #8A93A5; font-weight: 500; margin-top: 3px; }
  .rel-card .arrow { color: #2B62F6; font-size: 18px; flex-shrink: 0; }

  /* Footer */
  footer { margin-top: 48px; padding: 28px 0 48px; border-top: 1px solid #E8ECF2; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
  footer .fbrand { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; color: #181D27; text-decoration: none; }
  footer .fbrand span { color: #2B62F6; }
  footer .flinks { display: flex; gap: 20px; }
  footer .flinks a { font-size: 13px; font-weight: 600; color: #60697A; text-decoration: none; }
  footer .flinks a:hover { color: #2B62F6; }
  footer .copy { font-size: 12px; color: #9AA3B2; }

  @media (max-width: 640px) {
    .hero { padding: 44px 0 80px; }
    .hero h1 { font-size: 27px; }
    .article-card { padding: 28px 22px 32px; margin-top: -40px; }
    .toc ol { columns: 1; }
    .cta-panel { padding: 32px 22px; }
  }
"""

BRAND_SVG = '<svg width="30" height="30" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="black"/><rect x="15" y="11" width="34" height="26" rx="10" fill="white"/><path d="M21 35 L13 51 L31 37 Z" fill="white"/><path d="M25 21.5l4.5 4.5L39 19" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'


def page_html(a):
    canonical = f"{BASE}/guias/{a['slug']}/"
    sections_html = ""
    toc_items = []
    for i, (t, p) in enumerate(a["sections"], 1):
        sid = f"s{i}"
        toc_items.append(f'<li><a href="#{sid}" data-n="{i}.">{html.escape(t)}</a></li>')
        sections_html += f'<h2 class="sec" id="{sid}">{i}. {html.escape(t)}</h2><p class="body">{html.escape(p)}</p>'

    related = [x for x in ARTICLES if x["slug"] != a["slug"]][:3]
    rel_html = "".join(
        f'<a class="rel-card" href="{BASE}/guias/{r["slug"]}/"><span><span class="t">{html.escape(r["title"])}</span><span class="d" style="display:block">{html.escape(r["desc"][:80])}…</span></span><span class="arrow">→</span></a>'
        for r in related
    )
    words = len(a["intro"].split()) + sum(len(p.split()) for _, p in a["sections"]) + 120
    read_min = max(3, round(words / 200))

    jsonld = json.dumps({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "headline": a["title"],
                "description": a["desc"],
                "datePublished": TODAY,
                "dateModified": TODAY,
                "inLanguage": "es",
                "author": {"@type": "Organization", "name": "LeadShop", "url": BASE + "/"},
                "publisher": {"@type": "Organization", "name": "LeadShop", "url": BASE + "/", "logo": {"@type": "ImageObject", "url": BASE + "/assets/og-hero.png"}},
                "mainEntityOfPage": canonical,
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/"},
                    {"@type": "ListItem", "position": 2, "name": "Guías", "item": BASE + "/guias/"},
                    {"@type": "ListItem", "position": 3, "name": a["title"], "item": canonical},
                ],
            },
        ],
    }, ensure_ascii=False)

    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{html.escape(a['title'])} | LeadShop</title>
<meta name="description" content="{html.escape(a['desc'])}" />
<link rel="canonical" href="{canonical}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="LeadShop" />
<meta property="og:locale" content="es_CL" />
<meta property="og:url" content="{canonical}" />
<meta property="og:title" content="{html.escape(a['title'])}" />
<meta property="og:description" content="{html.escape(a['desc'])}" />
<meta property="og:image" content="{BASE}/assets/og-hero.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{html.escape(a['title'])}" />
<meta name="twitter:description" content="{html.escape(a['desc'])}" />
<meta name="twitter:image" content="{BASE}/assets/og-hero.png" />
<script type="application/ld+json">{jsonld}</script>
<style>{CSS}</style>
</head>
<body>

<nav><div class="wrap">
  <a class="brand" href="{BASE}/">{BRAND_SVG}<b>Lead<span>Shop</span></b></a>
  <a class="nav-cta" href="{BASE}/#precios">Ver planes {ARROW}</a>
</div></nav>

<div class="hero">
  <div class="wrap">
    <span class="kicker">Guía · Ventas B2B</span>
    <h1>{html.escape(a['h1'])}</h1>
    <p class="lead">{html.escape(a['desc'])}</p>
    <div class="meta"><span>18 nov 2026</span><span>~{read_min} min de lectura</span><span>LeadShop</span></div>
  </div>
</div>

<div class="wrap">
  <div class="article-card">
    <div class="toc">
      <h3>En esta guía</h3>
      <ol>{''.join(toc_items)}</ol>
    </div>
    <p class="body">{html.escape(a['intro'])}</p>
    {sections_html}
    <div class="cta-panel">
      <h3>¿Listo para conseguir esos clientes?</h3>
      <p>Arma tu base de negocios verificados por rubro y ciudad en menos de 2 minutos. Pago único, sin suscripción.</p>
      <a class="cta" href="{BASE}/#precios">Ver planes y precios {ARROW}</a>
    </div>
  </div>

  <div class="related">
    <h3>Guías relacionadas</h3>
    <div class="rel-grid">{rel_html}</div>
  </div>

  <footer>
    <a class="fbrand" href="{BASE}/">{BRAND_SVG}<span style="font-size:15px"><b style="color:#2B62F6">Lead</b>Shop</span></a>
    <div class="flinks">
      <a href="{BASE}/guias/">Todas las guías</a>
      <a href="{BASE}/bases-de-datos/">Bases por rubro y ciudad</a>
      <a href="{BASE}/">Inicio</a>
    </div>
    <span class="copy">© 2026 LeadShop</span>
  </footer>
</div>
</body>
</html>
"""


def hub_html():
    cards = "".join(
        f'<a class="rel-card" href="{BASE}/guias/{a["slug"]}/" style="flex-direction:column;align-items:flex-start;gap:6px">'
        f'<span class="t" style="font-size:16px">{html.escape(a["title"])}</span>'
        f'<span class="d">{html.escape(a["desc"])}</span></a>'
        for a in ARTICLES
    )
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Guías para conseguir clientes B2B | LeadShop</title>
<meta name="description" content="Guías prácticas para conseguir clientes nuevos: prospección por WhatsApp, elegir bases de datos B2B, calificar leads y más. Sin humo, paso a paso." />
<link rel="canonical" href="{BASE}/guias/" />
<meta property="og:title" content="Guías para conseguir clientes B2B | LeadShop" />
<meta property="og:description" content="Consejos reales para prospectar clientes nuevos: WhatsApp, email, bases de datos y calificación de leads." />
<meta property="og:type" content="website" />
<meta property="og:url" content="{BASE}/guias/" />
<meta property="og:image" content="{BASE}/assets/og-hero.png" />
<style>{CSS}
  .hero {{ padding: 72px 0 120px; }}
  .hero h1 {{ font-size: 44px; max-width: 700px; }}
  .rel-grid {{ margin-top: 0; }}
</style>
<script type="application/ld+json">{json.dumps({"@context":"https://schema.org","@type":"CollectionPage","name":"Guías para conseguir clientes B2B","url":BASE+"/guias/","isPartOf":{"@type":"WebSite","name":"LeadShop","url":BASE+"/"}}, ensure_ascii=False)}</script>
</head>
<body>

<nav><div class="wrap">
  <a class="brand" href="{BASE}/">{BRAND_SVG}<b>Lead<span>Shop</span></b></a>
  <a class="nav-cta" href="{BASE}/#precios">Ver planes {ARROW}</a>
</div></nav>

<div class="hero">
  <div class="wrap">
    <span class="kicker">Centro de recursos</span>
    <h1>Guías para conseguir clientes</h1>
    <p class="lead">Consejos prácticos, sin humo, para prospectar clientes nuevos por WhatsApp, email y bases de datos verificadas. Cada guía termina con el paso siguiente: armar tu propia base.</p>
    <div class="meta"><span>{len(ARTICLES)} guías</span><span>Lecturas de ~5 min</span><span>LeadShop</span></div>
  </div>
</div>

<div class="wrap">
  <div class="article-card" style="margin-top:-56px">
    <div class="rel-grid">{cards}</div>
    <div class="cta-panel">
      <h3>¿Prefieres ir directo al grano?</h3>
      <p>Elige tu rubro y ciudad y recibe una base de negocios verificados con WhatsApp activo.</p>
      <a class="cta" href="{BASE}/#precios">Ver planes y precios {ARROW}</a>
    </div>
  </div>

  <footer>
    <a class="fbrand" href="{BASE}/">{BRAND_SVG}<span style="font-size:15px"><b style="color:#2B62F6">Lead</b>Shop</span></a>
    <div class="flinks">
      <a href="{BASE}/guias/">Todas las guías</a>
      <a href="{BASE}/bases-de-datos/">Bases por rubro y ciudad</a>
      <a href="{BASE}/">Inicio</a>
    </div>
    <span class="copy">© 2026 LeadShop</span>
  </footer>
</div>
</body>
</html>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    urls = []
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(hub_html())
    urls.append("/guias/")
    for a in ARTICLES:
        d = os.path.join(OUT, a["slug"])
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
            f.write(page_html(a))
        urls.append(f"/guias/{a['slug']}/")

    # Merge into existing sitemap
    sm_path = os.path.join(ROOT, "public", "sitemap.xml")
    sm = open(sm_path, encoding="utf-8").read()
    existing = set()
    import re
    for m in re.finditer(r"<loc>https://www\.leadshop\.site(/[^<]*)</loc>", sm):
        existing.add(m.group(1))
    new_entries = "\n".join(
        f"""  <url>
    <loc>{BASE}{u}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>"""
        for u in urls if u not in existing
    )
    sm = sm.replace("</urlset>", new_entries + "\n</urlset>")
    with open(sm_path, "w", encoding="utf-8") as f:
        f.write(sm)

    print(f"OK: {len(urls)} paginas de guias + sitemap actualizado")


if __name__ == "__main__":
    main()
