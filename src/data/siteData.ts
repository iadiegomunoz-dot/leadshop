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
  icon: string;
  defaultIncluded?: boolean;
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
    title: 'Garantía de reemplazo',
    description: 'Si un contacto no funciona, lo cambiamos gratis. Sin reclamos eternos ni letras chicas.',
    variant: 'white',
  },
  {
    id: 'sample',
    title: 'Muestra gratis: 5 clientes',
    description: 'Prueba la calidad con tu rubro y tu zona antes de pagar. Riesgo cero.',
    variant: 'ice',
  },
  {
    id: 'no-sub',
    title: 'Pago único, sin suscripción',
    description: 'Pides, recibes y listo. Cero cobros mensuales y cero mínimos.',
    variant: 'lime',
  },
  {
    id: 'delivery',
    title: 'Entrega en 24h hábiles',
    description: 'Tu base lista al siguiente día hábil. Te avisamos por email apenas esté.',
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
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', defaultIncluded: true },
  { id: 'website', name: 'Sitio web', icon: 'website', defaultIncluded: true },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
  { id: 'email', name: 'Email', icon: 'email' },
  { id: 'phone', name: 'Teléfono', icon: 'phone' },
  { id: 'address', name: 'Dirección', icon: 'address' },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Esencial',
    price: 'US$20,99',
    subtitle: '25 clientes · WhatsApp y sitio web',
    variant: 'light',
    ctaLabel: 'Armar mi base',
    features: [
      '25 clientes verificados',
      '≈ US$0,84 por cliente',
      'WhatsApp y sitio web incluidos',
      'Reemplazo gratis si no sirve',
      'Entrega en CSV / XLSX',
    ],
  },
  {
    id: 'growth',
    name: 'Crecimiento',
    price: 'US$69,99',
    subtitle: '100 clientes · WhatsApp y sitio web',
    variant: 'ice',
    ctaLabel: 'Armar mi base',
    features: [
      '100 clientes verificados',
      '≈ US$0,70 por cliente',
      'WhatsApp y sitio web incluidos',
      'Reemplazo gratis si no sirve',
      'Entrega prioritaria',
    ],
  },
  {
    id: 'custom',
    name: 'A medida',
    price: 'Cotiza tu base',
    subtitle: 'Volumen y canales según tu operación',
    variant: 'blue',
    ctaLabel: 'Armar mi base de datos',
    features: [
      'Volumen a medida',
      'Canales extra: Instagram, LinkedIn, Email…',
      'Entregas recurrentes',
      'Sin duplicados entre entregas',
    ],
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
