import type { Lang } from './i18n';

export interface TermsSection {
  title: string;
  body: string[];
}

export const TERMS: Record<Lang, { title: string; intro: string; sections: TermsSection[]; contact: string }> = {
  es: {
    title: 'Términos y condiciones',
    intro:
      'Estos términos regulan el uso de los servicios de LeadShop ("LeadShop", "nosotros"). Al solicitar o comprar una base de prospectos y aceptar estos términos, celebras un acuerdo con LeadShop.',
    sections: [
      {
        title: '1. Qué entregamos',
        body: [
          'LeadShop entrega listas de negocios (bases de prospectos) segmentadas por rubro, ciudad y criterios descritos por ti en lenguaje natural. Cada registro puede incluir datos de contacto como WhatsApp, sitio web, red social, email, teléfono o dirección, según los canales seleccionados.',
          'La entrega se realiza en formato de tabla (CSV o XLSX) dentro de un plazo máximo de 24 horas hábiles desde la confirmación del pedido y el pago.',
        ],
      },
      {
        title: '2. Verificación y exactitud de los datos',
        body: [
          'Realizamos un proceso de validación sobre los contactos incluidos en tu base (por ejemplo, verificar que el WhatsApp exista y esté activo). Sin embargo, los datos provienen de fuentes públicas y de terceros, por lo que no podemos garantizar que cada dato sea exacto, actual o que el negocio siga operando al momento de tu contacto.',
          'La verificación reduce el porcentaje de contactos inválidos, pero no elimina la posibilidad de que algunos registros dejen de funcionar con el tiempo.',
        ],
      },
      {
        title: '3. Garantía de reemplazo',
        body: [
          'Si dentro de los 7 días siguientes a la entrega detectas registros con datos inválidos o no verificables, repórtalos por WhatsApp con el detalle del registro y te enviaremos reemplazos equivalentes sin costo adicional, dentro de lo razonablemente posible según disponibilidad.',
          'Esta garantía cubre únicamente la sustitución de registros inválidos. No garantiza ventas, respuestas, citas ni ningún resultado comercial específico.',
        ],
      },
      {
        title: '4. Muestra gratis',
        body: [
          'La muestra de 5 clientes es un extracto con fines ilustrativos. Los datos de la muestra pueden ser distintos a los de tu entrega final y no constituyen compromiso de volumen ni de resultados.',
        ],
      },
      {
        title: '5. Precio y forma de pago',
        body: [
          'Los precios se expresan en dólares estadounidenses (US$) y son de pago único: no existe suscripción ni cobro recurrente. Los precios vigentes se muestran en la sección de precios de este sitio y pueden actualizarse; el precio aplicable es el informado y confirmado al momento de tu pedido.',
          'Cada canal adicional seleccionado suma US$0,10 por cada cliente incluido en tu base. El plan "a medida" se cotiza según volumen y criterios específicos.',
          'El pago se coordina por WhatsApp y se confirma antes de iniciar la preparación de tu base.',
        ],
      },
      {
        title: '6. Reembolsos',
        body: [
          'Una vez entregada y aceptada la base, el servicio se considera prestado y el pago no es reembolsable, salvo que no podamos entregar una base que cumpla los criterios acordados, en cuyo caso te devolvemos el monto pagado o te entregamos una base equivalente.',
          'Si detectamos que no podemos cumplir tu pedido (por ejemplo, criterios imposibles o volumen no disponible), te avisamos antes de cobrar.',
        ],
      },
      {
        title: '7. Uso permitido de los datos',
        body: [
          'Eres responsable del uso que hagas de los datos recibidos. Está prohibido usar las bases para spam masivo, mensajes engañosos, acoso, fraude, o cualquier actividad contraria a la ley o a las políticas de las plataformas (WhatsApp, Meta, Google, etc.). El incumplimiento es responsabilidad exclusiva tuya.',
          'Debes respetar las leyes de protección de datos personales aplicables en tu jurisdicción, incluyendo obtener los consentimientos necesarios cuando corresponda.',
        ],
      },
      {
        title: '8. Privacidad y protección de datos',
        body: [
          'La información que nos entregas (nombre, empresa, contacto, descripción de tu pedido) se usa únicamente para procesar tu solicitud y contactarte por WhatsApp. No vendemos ni compartimos tus datos personales con terceros ajenos a la entrega del servicio.',
          'El tratamiento de tus datos personales se realiza conforme a la Ley N° 19.628 sobre Protección de la Vida Privada y su reforma establecida por la Ley N° 21.719, que crea la Agencia de Protección de Datos Personales, y demás normativa chilena aplicable. Conservamos tus datos solo durante el tiempo necesario para gestionar tu pedido y eventuales garantías.',
          'Puedes solicitar en cualquier momento la rectificación, eliminación u oposición al tratamiento de tus datos escribiéndonos por WhatsApp al +56 9 8235 5145.',
        ],
      },
      {
        title: '9. Sin garantía de resultados',
        body: [
          'LeadShop vende datos de contacto verificados, no resultados comerciales. No garantizamos ventas, tasa de respuesta, citas, ni retorno de inversión. Los resultados dependen de tu oferta, tu mensaje, tu seguimiento y el mercado.',
        ],
      },
      {
        title: '10. Contacto y modificaciones',
        body: [
          'Para consultas sobre estos términos, pedidos o incidencias, escríbenos por WhatsApp al +56 9 8235 5145. Podemos actualizar estos términos; la versión vigente será la publicada en esta página al momento de tu compra.',
        ],
      },
    ],
    contact:
      'Dudas sobre estos términos o tu pedido: escríbenos por WhatsApp al +56 9 8235 5145 (https://wa.me/56982355145).',
  },
  en: {
    title: 'Terms and conditions',
    intro:
      'These terms govern the use of LeadShop services ("LeadShop", "we"). By requesting or purchasing a prospect base and accepting these terms, you enter into an agreement with LeadShop.',
    sections: [
      {
        title: '1. What we deliver',
        body: [
          'LeadShop delivers lists of businesses (prospect bases) segmented by industry, city and criteria you describe in natural language. Each record may include contact data such as WhatsApp, website, social profile, email, phone or address, depending on the channels you select.',
          'Delivery is provided as a table (CSV or XLSX) within a maximum of 24 business hours from order confirmation and payment.',
        ],
      },
      {
        title: '2. Verification and data accuracy',
        body: [
          'We run a validation process on the contacts included in your base (for example, verifying that a WhatsApp number exists and is active). However, data comes from public and third-party sources, so we cannot guarantee that every record is accurate, current, or that the business is still operating when you contact them.',
          'Verification reduces the share of invalid contacts but does not eliminate the possibility that some records stop working over time.',
        ],
      },
      {
        title: '3. Replacement guarantee',
        body: [
          'If within 7 days of delivery you find records with invalid or unverifiable data, report them on WhatsApp with the record details and we will send equivalent replacements at no extra cost, as reasonably possible given availability.',
          'This guarantee covers only the replacement of invalid records. It does not guarantee sales, replies, meetings or any specific commercial outcome.',
        ],
      },
      {
        title: '4. Free sample',
        body: [
          'The 5-client sample is an extract for illustrative purposes. Sample data may differ from your final delivery and does not constitute a commitment of volume or results.',
        ],
      },
      {
        title: '5. Price and payment',
        body: [
          'Prices are expressed in US dollars (US$) and are one-time payments: there is no subscription or recurring charge. Current prices are shown in the pricing section of this site and may be updated; the applicable price is the one quoted and confirmed at the time of your order.',
          'Each additional selected channel adds US$0.10 per client included in your base. The "custom" plan is quoted based on volume and specific criteria.',
          'Payment is arranged via WhatsApp and confirmed before we start preparing your base.',
        ],
      },
      {
        title: '6. Refunds',
        body: [
          'Once the base is delivered and accepted, the service is deemed rendered and payment is non-refundable, unless we cannot deliver a base meeting the agreed criteria, in which case we refund the amount paid or deliver an equivalent base.',
          'If we detect we cannot fulfill your order (for example, impossible criteria or unavailable volume), we let you know before charging.',
        ],
      },
      {
        title: '7. Permitted use of data',
        body: [
          'You are responsible for how you use the delivered data. It is prohibited to use the bases for mass spam, misleading messages, harassment, fraud, or any activity contrary to law or to platform policies (WhatsApp, Meta, Google, etc.). Non-compliance is solely your responsibility.',
          'You must comply with the data protection laws applicable in your jurisdiction, including obtaining any required consents.',
        ],
      },
      {
        title: '8. Privacy and data protection',
        body: [
          'The information you provide (name, company, contact, order description) is used solely to process your request and contact you via WhatsApp. We do not sell or share your personal data with third parties unrelated to delivering the service.',
          'Your personal data is processed in accordance with Chilean data protection law, including Law No. 19.628 on the Protection of Private Life and its amendment under Law No. 21.719, which created the Personal Data Protection Agency, and other applicable Chilean regulations. We keep your data only for as long as needed to handle your order and any guarantees.',
          'You may request at any time the rectification, deletion or objection to the processing of your data by messaging us on WhatsApp at +56 9 8235 5145.',
        ],
      },
      {
        title: '9. No guarantee of results',
        body: [
          'LeadShop sells verified contact data, not commercial results. We do not guarantee sales, response rates, meetings, or return on investment. Results depend on your offer, your message, your follow-up and the market.',
        ],
      },
      {
        title: '10. Contact and changes',
        body: [
          'For questions about these terms, orders or issues, contact us on WhatsApp at +56 9 8235 5145. We may update these terms; the version in force is the one published on this page at the time of your purchase.',
        ],
      },
    ],
    contact:
      'Questions about these terms or your order: message us on WhatsApp at +56 9 8235 5145 (https://wa.me/56982355145).',
  },
};
