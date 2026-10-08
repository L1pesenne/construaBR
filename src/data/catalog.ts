import type { AssetKey } from './assets.generated';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: AssetKey | null;
  alt: string;
  gallery: { image: AssetKey; alt: string; caption: string }[];
  technicalCharacteristics: { label: string; value: string; source: string }[];
  referenceUnit: string | null;
  status: 'demo' | 'approved' | 'draft';
  confirmation: 'confirmed' | 'pending' | 'supplier-reference';
  sourceDocument: { path: string; label: string; page: number; kind: 'client-reference' | 'supplier-catalog' };
  sourceImage: string | null;
}

type ProductInput = Pick<Product, 'slug' | 'name' | 'category' | 'description' | 'image' | 'alt' | 'detailedDescription' | 'sourceImage'> & Partial<Product>;

// Publicação exige status approved E confirmation confirmed.
// Aplicações do PDF são referências pendentes, não características técnicas confirmadas.
const records: ProductInput[] = [
  {
    slug: 'areia-lavada', name: 'Areia Lavada', category: 'Areias', description: 'Areia com um processo de lavagem, descrita no material de referência para serviços de alvenaria.', image: 'areia-lavada', alt: 'Textura de areia lavada em tom claro', status: 'demo',
    detailedDescription: "O documento fornecido descreve a Areia Lavada como um material com um processo de lavagem, utilizado em serviços de alvenaria e em sistemas de drenagem. Essas aplicações são referências documentais e ainda dependem de validação comercial e técnica pela ConstruaBR.",
    sourceImage: "imagens/areia lavada.jpg",
  },
  {
    slug: 'pedrisco', name: 'Pedrisco', category: 'Agregados', description: 'Material descrito no documento fornecido para aterros e drenagens. Consulte a disponibilidade.', image: 'pedrisco', alt: 'Pequenas pedras de pedrisco vistas de perto', status: 'demo',
    detailedDescription: "No inventário e no documento de referência, o Pedrisco é mencionado para aterros e drenagens. O arquivo não informa granulometria ou especificações técnicas confirmadas. A adequação à obra e a disponibilidade precisam ser verificadas com a equipe.",
    sourceImage: "imagens/Pedrisco.jpg",
  },
  {
    slug: 'areia-de-aterro', name: 'Areia de Aterro', category: 'Aterro', description: 'Material descrito para aterros, enchimentos e nivelamentos. Confirme a aplicação com a equipe.', image: 'areia-de-aterro', alt: 'Amostra de areia de aterro em tom terroso', status: 'demo',
    detailedDescription: "O material é descrito no documento de referência para aterros, enchimentos, nivelamentos e drenagem. O nome e a fotografia correspondem aos arquivos fornecidos. A aplicação, o volume e a disponibilidade comercial aguardam confirmação.",
    sourceImage: "imagens/Areia de Aterro.jpg",
  },
  {
    slug: 'areia-lavada-fina', name: 'Areia Lavada Fina', category: 'Areias', description: 'Descrita no PDF fornecido para argamassas e acabamentos em geral.', image: 'areia-lavada-fina', alt: 'Fotografia fornecida de areia lavada fina em tom terroso', status: 'demo',
    detailedDescription: "A Areia Lavada Fina é descrita no documento fornecido para argamassas e acabamentos em geral. Não foram informadas faixas granulométricas, certificações ou uma unidade de referência confirmada.",
    sourceImage: "imagens/Areia Lavada Fina.jpg",
  },
  {
    slug: 'areia-lavada-fina-branca', name: 'Areia Lavada Fina Branca', category: 'Areias', description: 'Referência para acabamentos, argamassas e paisagismo. Confirme as especificações com a equipe.', image: 'areia-lavada-fina-branca', alt: 'Fotografia fornecida de areia lavada fina branca', status: 'demo',
    detailedDescription: "O documento descreve a Areia Lavada Fina Branca para acabamentos, argamassas, alguns tipos de concreto e paisagismo. A cor branca ou cinza claro é uma referência do documento, sem especificação técnica validada pela ConstruaBR.",
    sourceImage: "imagens/Areia Lavada Fina Branca.jpg",
  },
  {
    slug: 'areia-relavada-branca', name: 'Areia Relavada Branca', category: 'Areias', description: 'Descrita no documento como areia com dois processos de lavagem, para concreto e alvenaria.', image: 'areia-relavada-branca', alt: 'Fotografia fornecida de areia relavada branca vista de perto', status: 'demo',
    detailedDescription: "Segundo o documento de referência, a Areia Relavada Branca passa por dois processos de lavagem e é mencionada para concreto e serviços de alvenaria. Essas informações aguardam validação. Não há ficha técnica ou granulometria confirmada.",
    sourceImage: "imagens/Areia Relavada Branca.jpg",
  },
  {
    slug: 'areia-relavada-amarela', name: 'Areia Relavada — referência amarela', category: 'Areias', description: 'Foto identificada como variante amarela. O PDF descreve a areia relavada com dois processos de lavagem.', image: 'areia-relavada-amarela', alt: 'Fotografia fornecida de areia relavada identificada como amarela', status: 'demo',
    detailedDescription: "O PDF descreve a Areia Relavada em tons creme ou amarelo, com dois processos de lavagem. Esta referência utiliza a fotografia identificada como amarela. A nomenclatura e a existência de um produto comercial separado ainda precisam ser confirmadas.",
    sourceImage: "imagens/Areia Relavada amarela.jpg",
  },
  {
    slug: 'areia-relavada-creme', name: 'Areia Relavada — referência creme', category: 'Areias', description: 'Foto identificada como variante creme. A nomenclatura comercial desta referência aguarda confirmação.', image: 'areia-relavada-creme', alt: 'Fotografia fornecida de areia relavada identificada como creme', status: 'demo',
    detailedDescription: "O PDF reúne os tons creme e amarelo na descrição da Areia Relavada. Esta página corresponde à fotografia identificada como creme. A imagem não comprova um produto comercial distinto nem sua disponibilidade.",
    sourceImage: "imagens/Areia Relavada creme.jpg",
  },
  {
    slug: 'areia-grama-sintetica', name: 'Areia Fina para Campo de Grama Sintética', category: 'Esportes', description: 'Referência descrita no PDF para aplicação em campos de grama sintética.', image: 'areia-grama-sintetica', alt: 'Fotografia fornecida da areia fina para campo de grama sintética', status: 'demo',
    detailedDescription: "O documento menciona areia fina para aplicação em campos de grama sintética. A fotografia é a fornecida com esse nome. A especificação exigida pelo projeto deve ser conferida antes de definir o material, pois não há ficha técnica confirmada.",
    sourceImage: "imagens/Areia Fina para Campo de Grama Sintética.jpg",
  },
  {
    slug: 'areia-quadra-esportiva', name: 'Areia para Quadra Esportiva', category: 'Esportes', description: 'Referência descrita para quadras de vôlei, futevôlei e beach tennis. Consulte a adequação ao projeto.', image: 'areia-quadra-esportiva', alt: 'Fotografia fornecida de areia para quadra esportiva', status: 'demo',
    detailedDescription: "A referência documental menciona quadras de vôlei, futevôlei e beach tennis. A fotografia corresponde ao arquivo de areia para quadra esportiva. Requisitos de aplicação, granulometria e disponibilidade precisam ser validados.",
    sourceImage: "imagens/Areia para Quadra Esportiva.jpg",
  },
  {
    slug: 'areola', name: 'Areola', category: 'Alvenaria', description: 'Material descrito no PDF como fino e argiloso, para emboço e assentamento de tijolos.', image: 'areola', alt: 'Fotografia fornecida do material identificado como Areola', status: 'demo',
    detailedDescription: "O documento descreve Areola como um material fino e argiloso, mencionado para emboço e assentamento de tijolos. A nomenclatura foi preservada conforme os arquivos recebidos; suas características técnicas e sua oferta comercial aguardam confirmação.",
    sourceImage: "imagens/Areola.jpg",
  },
];

export const products: Product[] = records.map(record => ({
  id: `material-${record.slug}`,
  gallery: [], // Uma fotografia por referência; não reutilizar fotos de outros materiais.
  technicalCharacteristics: [], // Preencher somente com características aprovadas e fonte.
  referenceUnit: null,
  status: 'demo',
  confirmation: 'pending',
  sourceDocument: { path: 'imagens/Tipos de Areia.pdf', label: 'Tipos de Areia — documento fornecido', page: 1, kind: 'client-reference' },
  ...record,
}));
