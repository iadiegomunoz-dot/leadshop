export interface GuaranteeCard {
  id: string;
  title: string;
  description: string;
  variant: 'white' | 'ice' | 'blue' | 'lime';
}

export interface CityTarget {
  id: string;
  name: string;
  lat: number;
  lon: number;
  sampleQuery: string;
}

export interface WorkflowStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
  highlights: string[];
  variant: 'white' | 'ice' | 'blue' | 'lime';
}

export interface OutboundChannel {
  id: string;
  name: string;
  defaultIncluded?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: 'starter' | 'growth' | 'custom';
  name: string;
  price: string;
  subtitle: string;
  variant: 'light' | 'ice' | 'blue';
  ctaLabel: string;
  features: string[];
}

export interface SampleLeadRow {
  business: string;
  category: string;
  city: string;
  whatsapp: string;
  website: string;
  rating: string;
}

export const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Canales', href: '#canales' },
  { label: 'Precios', href: '#precios' },
  { label: 'Hablemos', href: '#hablemos' },
];

export const GUARANTEES: GuaranteeCard[] = [
  {
    id: 'replace',
    title: 'Reemplazo de inválidos',
    description: 'Si un contacto no funciona, lo reemplazamos sin costo.',
    variant: 'white',
  },
  {
    id: 'sample',
    title: 'Muestra gratis de 5 clientes',
    description: 'Prueba la calidad con tu rubro y tu zona antes de pagar.',
    variant: 'ice',
  },
  {
    id: 'no-sub',
    title: 'Sin suscripción ni mínimo',
    description: 'Pide desde 10 clientes y paga una sola vez.',
    variant: 'lime',
  },
  {
    id: 'delivery',
    title: 'Entrega hasta 24 horas hábiles',
    description: 'Te avisamos por email apenas esté lista y la descargas desde tu pedido.',
    variant: 'blue',
  },
];

export const COVERAGE_CITIES: CityTarget[] = [
  { id: 'ba', name: 'Buenos Aires', lat: -34.6, lon: -58.38, sampleQuery: 'Clínicas odontológicas en CABA · WhatsApp + Web' },
  { id: 'mia', name: 'Miami', lat: 25.76, lon: -80.19, sampleQuery: 'Estudios de arquitectura en Miami · WhatsApp + Instagram' },
  { id: 'cdmx', name: 'Ciudad de México', lat: 19.43, lon: -99.13, sampleQuery: 'Agencias inmobiliarias en CDMX · WhatsApp + LinkedIn' },
  { id: 'bog', name: 'Bogotá', lat: 4.71, lon: -74.07, sampleQuery: 'Gimnasios y centros wellness en Bogotá · WhatsApp + Web' },
  { id: 'sp', name: 'São Paulo', lat: -23.55, lon: -46.63, sampleQuery: 'Clínicas estéticas en São Paulo · WhatsApp + Instagram' },
  { id: 'ny', name: 'Nueva York', lat: 40.71, lon: -74.0, sampleQuery: 'Estudios contables en Nueva York · Web + LinkedIn' },
  { id: 'mad', name: 'Madrid', lat: 40.41, lon: -3.7, sampleQuery: 'Restaurantes y franquicias en Madrid · WhatsApp + Web' },
  { id: 'lon', name: 'Londres', lat: 51.5, lon: -0.12, sampleQuery: 'Consultoras B2B en Londres · LinkedIn + Email' },
  { id: 'dxb', name: 'Dubái', lat: 25.2, lon: 55.27, sampleQuery: 'Desarrolladoras inmobiliarias en Dubái · WhatsApp + Web' },
  { id: 'syd', name: 'Sídney', lat: -33.86, lon: 151.2, sampleQuery: 'Clínicas veterinarias en Sídney · Web + Teléfono' },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    stepLabel: 'PASO 1 DE 4',
    title: 'Describe a quién quieres llegar',
    description:
      'Escribe como si hablaras con un vendedor: qué vendes, a quién, dónde y por qué canal.',
    highlights: ['Rubro: clínicas', 'Zona: CABA', '300 leads', 'WhatsApp', 'Web', '4+ estrellas'],
    variant: 'white',
  },
  {
    number: '02',
    stepLabel: 'PASO 2 DE 4',
    title: 'Convertimos tu pedido en filtros',
    description:
      'Detectamos rubro, zona, volumen, señales de compra y requisitos de contacto sin gastar una llamada de IA.',
    highlights: ['WhatsApp verificado', 'Sitio web disponible', 'Sin duplicados'],
    variant: 'ice',
  },
  {
    number: '03',
    stepLabel: 'PASO 3 DE 4',
    title: 'Validamos antes de cobrar',
    description:
      'Confirmamos que el universo pueda cumplir los canales obligatorios. Si no alcanza, ajustamos el alcance contigo.',
    highlights: ['Empresa', 'WhatsApp', 'Web', 'CSV', 'XLSX'],
    variant: 'lime',
  },
  {
    number: '04',
    stepLabel: 'PASO 4 DE 4',
    title: 'Recibes una base lista para outbound',
    description:
      'WhatsApp verificado, sin duplicados y con los campos extra que seleccionaste.',
    highlights: ['WhatsApp activo', 'Sin repetidos', 'Listo para CRM'],
    variant: 'blue',
  },
];

export const OUTBOUND_CHANNELS: OutboundChannel[] = [
  { id: 'whatsapp', name: 'WhatsApp', defaultIncluded: true },
  { id: 'website', name: 'Sitio web', defaultIncluded: true },
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'email', name: 'Email' },
  { id: 'phone', name: 'Teléfono' },
  { id: 'address', name: 'Dirección' },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Esencial',
    price: 'US$5,99',
    subtitle: '10 clientes · WhatsApp y sitio web',
    variant: 'light',
    ctaLabel: 'Armar mi base',
    features: [
      '10 clientes verificados',
      'WhatsApp y sitio web incluidos',
      'Reemplazo de inválidos',
      'Entrega en CSV / XLSX',
    ],
  },
  {
    id: 'growth',
    name: 'Crecimiento',
    price: 'US$10,99',
    subtitle: '50 clientes · WhatsApp y sitio web',
    variant: 'ice',
    ctaLabel: 'Armar mi base',
    features: [
      '50 clientes verificados',
      'WhatsApp y sitio web incluidos',
      'Reemplazo de inválidos',
      'Entrega prioritaria',
    ],
  },
  {
    id: 'custom',
    name: 'A medida',
    price: '~US$100',
    subtitle: 'Volumen y canales según tu operación',
    variant: 'blue',
    ctaLabel: 'Cotizar mi volumen',
    features: [
      'Volumen a medida',
      'Canales extra: Instagram, LinkedIn, Email…',
      'Entregas recurrentes',
      'Sin duplicados entre entregas',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué trae cada cliente?',
    answer:
      'Cada cliente incluye nombre del negocio, categoría, ciudad y los 2 canales incluidos por defecto (WhatsApp verificado y sitio web, o los 2 que elijas), además de cualquier campo extra que agregues como Instagram, LinkedIn, email, teléfono o dirección.',
  },
  {
    id: 'faq-2',
    question: '¿Qué pasa si no hay suficientes contactos?',
    answer:
      'Validamos el universo disponible antes de cobrarte. Si en tu zona o rubro hay menos negocios que cumplen los canales obligatorios, ajustamos el alcance o ampliamos el radio junto contigo antes de procesar el pedido.',
  },
  {
    id: 'faq-3',
    question: '¿Cómo funciona el pedido con texto?',
    answer:
      'Escribes tu pedido en lenguaje natural, por ejemplo: "Vendo software para clínicas en Buenos Aires con WhatsApp y web". Nuestro sistema lo traduce automáticamente en filtros de rubro, geografía, canales y volumen.',
  },
  {
    id: 'faq-4',
    question: '¿Puedo recibir clientes todos los meses?',
    answer:
      'Sí. En entregas recurrentes (Enterprise) configuramos frecuencia semanal o mensual con exclusión automática de negocios ya entregados para evitar duplicados entre campañas.',
  },
  {
    id: 'faq-5',
    question: '¿Quién creó LeadShop?',
    answer:
      'LeadShop es un producto desarrollado por Z Aplicaciones enfocado en brindar bases B2B verificadas, accionables y sin suscripciones forzadas para equipos comerciales y agencias.',
  },
  {
    id: 'faq-6',
    question: '¿Puedo usar LeadShop desde Claude o ChatGPT?',
    answer:
      'Sí. Puedes conectar tu cuenta vía MCP o API REST para consultar disponibilidad de cobertura, armar pedidos por texto y descargar tus bases directamente desde tu flujo con asistentes o CRM.',
  },
];

export const SAMPLE_PREVIEW_ROWS: SampleLeadRow[] = [
  {
    business: 'Clínica Dental Belgrano',
    category: 'Clínica odontológica',
    city: 'CABA, Buenos Aires',
    whatsapp: '+54 9 11 4822-1940 (Verificado)',
    website: 'clinicabelgrano.com.ar',
    rating: '4.8 ★',
  },
  {
    business: 'Centro Médico Palermo Salud',
    category: 'Clínica médica',
    city: 'CABA, Buenos Aires',
    whatsapp: '+54 9 11 5310-8821 (Verificado)',
    website: 'palermosalud.com.ar',
    rating: '4.7 ★',
  },
  {
    business: 'Instituto Estético Recoleta',
    category: 'Estética y salud',
    city: 'CABA, Buenos Aires',
    whatsapp: '+54 9 11 6094-3312 (Verificado)',
    website: 'esteticarecoleta.com.ar',
    rating: '4.9 ★',
  },
  {
    business: 'Odontología Integral Caballito',
    category: 'Clínica odontológica',
    city: 'CABA, Buenos Aires',
    whatsapp: '+54 9 11 4412-7750 (Verificado)',
    website: 'odontocaballito.com.ar',
    rating: '4.6 ★',
  },
  {
    business: 'Consultorios Médicos Núñez',
    category: 'Centro médico',
    city: 'CABA, Buenos Aires',
    whatsapp: '+54 9 11 5987-1024 (Verificado)',
    website: 'medicosnunez.com.ar',
    rating: '4.8 ★',
  },
];

export const CONTACT_CHANNELS = [
  {
    label: 'WhatsApp · Respuesta directa del equipo',
    value: '+54 9 11 5809-2000',
    href: 'https://wa.me/5491158092000',
    icon: 'whatsapp',
  },
  {
    label: 'Llamada · Hablemos directo',
    value: '+1 650 797 0332',
    href: 'tel:+16507970332',
    icon: 'phone',
  },
  {
    label: 'Instagram · Síguenos',
    value: '@leadshop',
    href: 'https://instagram.com/leadshop',
    icon: 'instagram',
  },
  {
    label: 'LinkedIn · Síguenos',
    value: 'Z Aplicaciones',
    href: '#hablemos',
    icon: 'linkedin',
  },
  {
    label: 'Email · Te respondemos en el día',
    value: 'infozaplicaciones@gmail.com',
    href: 'mailto:infozaplicaciones@gmail.com',
    icon: 'email',
  },
];
