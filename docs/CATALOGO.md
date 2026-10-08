# Catálogo corporativo premium — atualização atual

A vitrine e os detalhes adotam o design editorial da homepage: fundo branco, grafite, laranja pontual, Barlow Condensed e Public Sans locais, divisórias finas, fotografias retangulares e ações sem cards arredondados ou sombras. Header, rodapé, botões, largura e grid são compartilhados por `corporate-site`; `corporate-home` continua identificando somente a homepage. Páginas institucionais restantes preservadas.

`/produtos/`: introdução PORTFÓLIO DE MATERIAIS, busca, categorias combináveis com checkboxes nativos, contagem acessível, URL persistente, limpeza e estado vazio. Fotos grandes, categoria, título, descrição, status explícito, Ver detalhes e Solicitar orçamento. Duas colunas no desktop e uma no celular, filtros reorganizados no mobile. Sem preços ou carrinho.

Detalhes: retorno ao catálogo, título e categoria, fotografia principal proporcional sem distorção, galeria preparada, descrição, fonte documental, especificações apenas confirmadas, unidade ou pendência, informações a granel/basculantes, prazo/cobertura condicionados e referências relacionadas. Orçamento segue para o formulário com o slug selecionado. WhatsApp oficial central: (21) 99547-1761.

As onze referências abaixo continuam demonstrativas no desenvolvimento; nenhuma está comercialmente aprovada. Produção apresenta **0 materiais publicados**, mensagem de preparação, fotografia documental identificada e consulta à equipe. Nenhuma rota de produto pendente é gerada no build. Dados, originais, SVG oficial e WebPs existentes foram preservados.

## Validação desta atualização

- `npm run check`: 49 arquivos, zero erros, avisos ou sugestões.
- `npm run build`: seis páginas, sem detalhes de produtos não aprovados.
- `npm test`: 13 testes aprovados. Novo teste executa o controlador real em uma superfície DOM mínima: filtros pela URL, união de categorias, pesquisa, ausência de resultados, contagem demonstrativa, limpeza/foco e popstate. Não substitui navegador visual.
- `node --experimental-strip-types scripts/verify-dev-catalog.mjs` com `npm run dev` ativo: catálogo, onze detalhes, onze imagens WebP e contato HTTP 200; links de orçamento identificam cada slug; um H1 por detalhe e design system compartilhado.
- Revisão de código: breakpoints 1199/767/639 px, grids com minmax(0,1fr), imagens proporcionais, títulos com quebra, ações flexíveis, alvos de 44/48 px, estados de foco e redução de movimento.
- A ferramenta de navegador falhou ao iniciar com `windows sandbox failed: helper_unknown_error: setup refresh had errors`. Não há screenshots novos ou confirmação visual em viewport real nesta rodada. Revisão visual desktop/mobile permanece pendente; capturas históricas não representam este redesign.
- Nenhum dado de orçamento foi enviado; nenhum deploy realizado. Commit/push de código autorizados pelo proprietário.

## Documentação anterior e manutenção

# Catálogo — etapa 3

## Fontes e situação atual

O inventário `INVENTARIO_PRODUTOS.md` é a fonte principal. O documento `imagens/Tipos de Areia.pdf`, página 1, e os onze JPGs correspondentes complementam a identificação. O PDF não contém fotografias incorporadas nem comprova disponibilidade comercial; não foi identificado como catálogo de fornecedor.

Onze referências: Areia Lavada, Pedrisco, Areia de Aterro, Areia Lavada Fina, Areia Lavada Fina Branca, Areia Relavada Branca, Areia Relavada (referências amarela e creme), Areia Fina para Campo de Grama Sintética, Areia para Quadra Esportiva e Areola. Todas pendentes. Amarela/creme não são declaradas produtos comerciais distintos.

## Manutenção dos dados

Editar `src/data/catalog.ts`. Cada entrada tem ID, slug, nome, categoria, descrição curta (`description`), descrição detalhada, imagem principal, galeria, características técnicas com fonte, unidade, status, confirmação, fonte documental e imagem original. `src/data/products.ts` aplica a seleção para o ambiente.

- `confirmation: confirmed`: confirmação comercial pela ConstruaBR.
- `confirmation: supplier-reference`: item apenas mencionado por fornecedor.
- `confirmation: pending`: validação ainda ausente.
- `status: demo`: exemplo visivelmente identificado, somente em desenvolvimento.
- `status: draft`: oculto em ambos os ambientes.
- Publicação exige **approved e confirmed simultaneamente**. Aprovar só um campo não publica.

Antes da aprovação, revisar nomes, descrições, disponibilidade e autorização/correspondência das fotografias. Reescrever os textos documentais pendentes como conteúdo comercial aprovado. Preencher `technicalCharacteristics` apenas com informação comprovada e fonte; `referenceUnit` permanece null quando desconhecida. Arrays vazios não geram especificações fictícias. Produtos de fornecedor permanecem referências, mesmo com status approved.

Originais em `imagens/` permanecem intactos. Variantes WebP e manifesto ficam em `public/images/materials/` e `src/data/assets.generated.ts`. Executar `npm run assets:optimize` para regenerar. Nunca substituir um produto por foto de outro material. Usar `image: null` para o placeholder padronizado local. Adicionar à galeria somente fotos verificadas do mesmo material; atualmente todas estão vazias.

## Interface e orçamento

`/produtos/` oferece pesquisa por nome/aplicação, categorias combináveis, resultados anunciados, limpeza e estado vazio. Termos da busca combinam por interseção; categorias por união. A busca ignora acentos, caixa e espaços redundantes. URL usa `q` e parâmetros `categoria` repetidos; recarga mantém filtros. Sem JavaScript, todos os materiais permitidos continuam navegáveis.

`/produtos/[slug]/` apresenta fotografia proporcional, descrição/fonte, características confirmadas ou pendência explícita, unidade, logística a granel/basculantes e relacionados da mesma categoria. Galerias adicionais usam botões com estado acessível. Componentes reutilizam cores, fontes e SVG original da homepage.

`src/config/company.ts` centraliza WhatsApp. Número válido precisa conter DDI 55, DDD e telefone, somente dígitos. A mensagem identifica o nome exato do material. Sem número válido, o botão encaminha a `/contato/?material=slug#atendimento`, mantendo a seleção e exibindo indisponibilidade do canal. Slugs desconhecidos não são reproduzidos como material. Não há envio de formulário ou contato fictício.

## Validação histórica — layout anterior

`npm run check`, `npm run build`, `npm test`: 39 arquivos sem diagnósticos, build concluído e nove testes aprovados. Testes cobrem busca, filtros, proteção de publicação, orçamento codificado, IDs/rotas/fontes, recursos locais, SVG original e imagens WebP proporcionais. Build atual gera seis páginas institucionais, sem os onze detalhes pendentes.

No desenvolvimento, onze rotas e imagens responderam HTTP 200. Navegador conferiu buscas com acentos/termos combinados, múltiplas categorias, nenhum resultado, limpeza, persistência por URL, checkbox via teclado e orçamento com material selecionado. Desktop 1440 px e mobile 390/320 px; sem rolagem horizontal nas páginas verificadas, sem erros/avisos de console observados. Capturas em `artifacts/screenshots/`. Não houve deploy.

Galeria múltipla está preparada, mas não foi validada com conteúdo real por ausência de imagens adicionais confirmadas. Na época dessa validação, o WhatsApp ainda dependia do número oficial; geração da mensagem foi testada sem enviar mensagens.

## Aprovações necessárias

Catálogo efetivamente comercializado; nomenclatura/variantes; descrições/aplicações; fotos e direitos de uso; especificações, granulometria e unidade/volume. WhatsApp e e-mail já foram confirmados pelo cliente. Endereço/base, domínio e horários continuam pendentes na configuração institucional.

## Integração com orçamento — etapa 4

Todos os CTAs de produto agora levam ao formulário em `/contato/?material=slug#atendimento`, com o material selecionado. O visitante preenche seus dados, revisa a mensagem e abre o WhatsApp quando o número central está configurado. A seleção respeita as mesmas regras de publicação. Sem número, a mensagem permanece na revisão local e o impedimento é informado. Consulte [Orçamento](ORCAMENTO.md).
