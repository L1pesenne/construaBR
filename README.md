# ConstruaBR Distribuidora — redesign corporativo

Site institucional estático em Astro, TypeScript e Tailwind CSS. Homepage, catálogo, páginas institucionais e formulário de orçamento estão implementados, preservando a identidade visual existente. Não há e-commerce, cadastro, checkout, backend ou coleta de dados.

## Catálogo corporativo premium — rodada 2

Vitrine editorial com fotografias grandes, busca por termos, categorias combináveis, contagem de resultados, filtros na URL, estado vazio e limpeza. Fichas comerciais com fontes, especificações confirmadas ou pendência, logística, galeria preparada, relacionados e orçamento com material selecionado. Identidade, logo SVG original, dados e fotos preservados.

Onze referências demonstrativas em desenvolvimento; zero produtos comercialmente aprovados. O build público apresenta catálogo em preparação e não gera páginas de materiais pendentes. Confira [Catálogo](docs/CATALOGO.md) para produtos, fontes e aprovação.

Validação atual: check de 52 arquivos sem diagnósticos, build concluído, 13 testes aprovados; catálogo, 11 detalhes e 11 fotos conferidos por HTTP. Revisão em Brave/Chromium autorizada e concluída: seis páginas em 1440/390/320 px, sem overflow, fotos quebradas ou erros de console. Busca, filtros, menu mobile e orçamento testados no navegador. Capturas em `artifacts/revisao-final/`; reprodução e pendências em [Revisão final](docs/REVISAO_FINAL.md). Sem deploy.
## Redesign corporativo — rodada 1

Homepage reconstruída sobre o projeto existente: hero editorial em 12 colunas, fotografia original sem sobreposição, faixa operacional compacta, materiais com apresentação editorial, logística em contraste, regiões em lista alinhada, CTA comercial e rodapé corporativo. Paleta neutra, SVG oficial intacto e fontes locais existentes. Design system editorial compartilhado com o catálogo e os detalhes; demais páginas internas mantidas.

Produtos na homepage exigem aprovação comercial. Enquanto o catálogo não possui itens confirmados, a página exibe fotografias de referência e consulta de disponibilidade. Catálogo demonstrativo, rotas e formulário permanecem funcionais. WhatsApp oficial: (21) 99547-1761; e-mail: atendimento@construabr.com.

- [Decisões de design e validação](docs/REDESIGN.md).
- Repositório: [L1pesenne/construaBR](https://github.com/L1pesenne/construaBR).
- Check de 49 arquivos sem diagnósticos; build e 12 testes aprovados.
- A falha inicial do navegador do Codex foi contornada com Brave/Chromium headless autorizado. Revisão visual da homepage e capturas atuais concluídas; confira [Revisão final](docs/REVISAO_FINAL.md).
- As capturas das etapas anteriores abaixo representam os layouts anteriores.

## Implementação da etapa 4

Formulário responsivo com nome, cidade, bairro/referência, material, quantidade/unidade e observações. Campos obrigatórios têm validação e indicação acessível de erros. Os CTAs de orçamento levam ao formulário; o material da página de produto vem selecionado. O visitante revisa a mensagem e, quando o número oficial estiver configurado, abre o WhatsApp em nova aba para confirmar o envio.

O formulário não usa backend, banco de dados, localStorage ou sessionStorage. Os dados são mantidos apenas nos campos e na revisão da página; editar invalida a revisão anterior e Limpar dados remove os valores. WhatsApp oficial (21) 99547-1761 e e-mail atendimento@construabr.com estão configurados. A revisão gera o link para o telefone confirmado; o visitante confirma o envio no WhatsApp. Em produção, referências não aprovadas não aparecem no seletor; o visitante pode informar um material para consulta de disponibilidade.

Sobre e Entregas foram concluídas com as informações do briefing da etapa 1. Contato reúne formulário, atendimento e cobertura. FAQ de sete perguntas usa details/summary nativos na homepage e em Contato. Botão flutuante acessível em todas as páginas; fica oculto durante o foco no formulário/revisão para não cobrir o preenchimento. Não foram inventadas fotos da frota, instalações, anos de experiência ou dados comerciais.

- [Orçamento e fluxo comercial](docs/ORCAMENTO.md).
- Check: 44 arquivos, zero erros/avisos/sugestões.
- Build: seis páginas de produção, sem publicação de produtos pendentes.
- Testes: 12 aprovados; obrigatórios, opcionais, mensagem/codificação, limites, publicação, rotas, recursos locais, SVG e imagens.
- Navegador: homepage → catálogo → produto → formulário com material selecionado; validação vazia e espaços; material personalizado; campos opcionais; revisão, edição e limpeza; formulário na produção sem produtos demonstrativos.
- Desktop 1440 px; mobile 390/320 px. Sem overflow horizontal nas páginas verificadas. FAQ operado por Enter; menu por Escape com retorno de foco. Sobre/Entregas e seus CTAs navegáveis. Console sem erros/avisos observados.
- Evidências: artifacts/screenshots/contato-etapa-4-desktop.jpg e orcamento-etapa-4-mobile.jpg. Dados utilizados no teste são fictícios e não foram enviados.
- Links de WhatsApp utilizam o número oficial confirmado. A geração do link e da mensagem foi testada sem enviar mensagens. Não houve publicação do site.

## Histórico da implementação da etapa 3

Catálogo com pesquisa sem distinção de acentos/maiúsculas, múltiplas categorias combináveis, URLs de filtros persistentes, estado vazio e limpeza com retorno do foco. Cards e detalhes seguem o design existente, com imagens responsivas, orçamento por material, fontes, pendências técnicas, fornecimento a granel e produtos relacionados. Galeria e placeholder local estão preparados; não foram inventadas fotos adicionais ou especificações.

Dados centralizados em src/data/catalog.ts. Há onze referências pendentes, nenhuma confirmação comercial e nenhum catálogo identificado como fornecedor. A produção exclui todas as referências atuais. O contato local preserva o material; WhatsApp continua null.

- Documentação: [Catálogo e manutenção](docs/CATALOGO.md).
- Validação: check de 39 arquivos sem erros/avisos; build concluído; nove testes aprovados.
- Navegador: busca, combinação/limpeza de filtros, recarga da URL e teclado; desktop 1440 px e mobile 390/320 px sem overflow horizontal nas páginas verificadas.
- Onze detalhes e suas imagens locais responderam HTTP 200 no desenvolvimento. Orçamento individual chegou ao contato com o material selecionado e aviso de número pendente. Console sem erros/avisos observados.
- Capturas: artifacts/screenshots/catalogo-etapa-3-desktop.jpg e produto-etapa-3-mobile.jpg.
- Galerias múltiplas não foram exercitadas com conteúdo real: nenhuma referência tem fotografias adicionais confirmadas.

## Histórico da implementação da etapa 2

Continuação do projeto existente: logotipo original em header/footer, navegação com Início, hero com foto real de areia a granel, seção exclusiva de logística e CTAs conforme o novo briefing. Home formada por sete seções: hero, diferenciais, vitrine, processo, logística, cobertura e chamada final.

As fotos e o PDF fornecidos foram usados como referências. O PDF descreve materiais, mas não confirma o catálogo comercial nem contém imagens incorporadas. Todas as onze fotografias de materiais agora têm cards e páginas de detalhe demonstrativos, com descrições baseadas no documento e nos nomes dos arquivos. A home apresenta seis referências, e Produtos mostra todas as onze no desenvolvimento. As variantes amarela e creme da areia relavada estão identificadas como referências fotográficas, sem afirmar que sejam produtos comerciais distintos. O WhatsApp permanece pendente; os CTAs levam ao aviso local de contato até o preenchimento do número.

Documentação de continuidade:

- [Análise dos assets](docs/ANALISE_ASSETS.md).
- [Inventário das referências de produtos](docs/INVENTARIO_PRODUTOS.md).
- [Pendências do cliente](docs/PENDENCIAS_CLIENTE.md).
- [Implementação e continuidade](docs/PLANO_IMPLEMENTACAO.md).
- [Relatório das imagens otimizadas](docs/ASSETS_OTIMIZADOS.json).

Esses documentos consolidam o README anterior e a verificação complementar desta etapa; não representam documentos de catálogo aprovados pelo cliente.

## Executar localmente

Requisito: Node.js 22.12 ou superior (validado com Node 24).

```sh
npm ci
npm run dev
```

Abra o endereço indicado pelo Astro, normalmente http://127.0.0.1:4321. Dependências e fontes são locais após a instalação. O site não solicita imagens, fontes, mapas ou APIs externas em tempo de navegação.

```sh
npm run check
npm run build
npm test
npm run preview
```

Os testes verificam a saída de produção, portanto exigem um build anterior. `dist/` contém os arquivos para uma futura hospedagem estática. O servidor local precisa estar ativo; não abra o HTML diretamente por `file://`. Nenhuma publicação ou push foi realizado.

Em ambientes Windows restritos que bloqueiem a pasta de configuração global do Astro, desative a telemetria apenas no terminal atual antes dos comandos: `$env:ASTRO_TELEMETRY_DISABLED='1'` (PowerShell). Foi a opção utilizada nesta validação.

## Validação da etapa 2

- `npm run check`: 33 arquivos verificados, zero erros, avisos ou sugestões.
- `npm run build`: seis páginas estáticas geradas com sucesso.
- `npm test`: quatro testes aprovados. Além das proteções anteriores, os testes verificam todas as variantes `srcset`, o logo original byte a byte, o formato WebP, as proporções preservadas e a ausência de ampliação artificial.
- Navegador: desktop a 1440 px; celular a 390 px e 320 px, sem rolagem horizontal nas páginas verificadas. Menu abre/fecha por Escape com retorno de foco; navegação Início/Produtos marca somente a página atual.
- Consulta de região chega ao aviso de contato pendente; catálogo e detalhes dos exemplos abrem no desenvolvimento, com fotografia carregada.
- Nenhum erro ou aviso de console observado nos fluxos testados.
- Fotografia do hero selecionada pelo navegador via `srcset`; versões maiores das onze fotografias ficam aproximadamente 23% menores que os JPGs recebidos.
- Evidência visual desktop salva em `artifacts/screenshots/home-etapa-2-desktop.jpg`.
- Nenhum deploy ou push remoto realizado. O servidor de teste usa a porta disponível indicada pelo Astro; execute `npm run dev` para voltar a abrir o projeto localmente.

## Histórico de validação da etapa 1

- `npm run check`: 26 arquivos verificados, zero erros, avisos ou sugestões.
- `npm run build`: seis páginas estáticas geradas com sucesso.
- `npm test`: três testes aprovados; rotas e recursos locais válidos, exemplos excluídos da produção.
- Navegador: inspeção visual desktop (1440 px), layout mobile (390 px), menu abre/fecha com Escape e devolve o foco; sem rolagem horizontal nas páginas verificadas.
- Navegação real: CTA de orçamento chega ao aviso de contato pendente; catálogo e detalhe do material abrem no desenvolvimento.
- Console: nenhum erro ou aviso observado durante as verificações. Página inicial respondeu HTTP 200.
- Instalação: auditoria do npm reportou zero vulnerabilidades. Não foi realizada auditoria completa de acessibilidade nem teste em todos os navegadores.

## Estrutura

- `src/components/`: cabeçalho, rodapé, logotipo original, ícones, botões, seções da home e cards; `SectionTitle`, `DeliveryHighlights`, `LocalImage` e `Logistics` acrescentados na etapa 2.
- `src/layouts/BaseLayout.astro`: estrutura HTML, fontes, metadados e navegação global.
- `src/pages/`: início, produtos, detalhes dinâmicos, sobre, entregas, contato e 404.
- `src/data/`: navegação, regiões e dados tipados de materiais.
- `src/config/company.ts`: dados comerciais centralizados e geração dos links WhatsApp.
- `src/styles/global.css`: Tailwind e estilos globais/responsividade; `home.css`: acabamento do hero fotográfico e logística.
- `public/images/brand/`, `materials/` e `illustrations/`: identidade original, fotos WebP e ilustração conceitual. As cópias legadas da etapa 1 permanecem preservadas, mas não são referenciadas pela interface atual.
- `src/data/assets.generated.ts`: manifesto tipado das variantes responsivas, gerado pela rotina de otimização.
- `scripts/`: inspeção e otimização reproduzível dos assets.
- `imagens/`: arquivos originais recebidos, preservados.
- `tests/production.test.mjs`: verificações de rotas, referências locais, semântica básica e bloqueio dos exemplos em produção.

## Decisões de design

O logo original usa preto e cinza `#666666`; seus arquivos e cores foram preservados. A interface usa grafite `#1F2529` e tons neutros como base. Laranja `#D96932`, branco `#FFFFFF`, areia `#F7F4EF` e verde `#25D366` são os complementos definidos no briefing, sem tratá-los como cores extraídas do logo. O laranja mais escuro `#B64C1F` é utilizado em textos sobre fundo claro para contraste. Os botões laranja e verde usam texto grafite.

Títulos em Barlow Condensed e corpo em Public Sans, distribuídos localmente pelos pacotes Fontsource, que incluem suas licenças. O hero combina tipografia forte sobre grafite e a fotografia real de maior resolução com orientação horizontal recebida. A fotografia de aterro é mais panorâmica, mas tem apenas 489 px de largura e por isso não foi ampliada no hero. A seção de logística usa uma ilustração SVG original de basculante; ela é conceitual e não representa uma frota comprovada. O gráfico de cobertura é um diagrama de raio, não um mapa geográfico.

`Logo.astro` utiliza o SVG enviado, copiado literalmente para `public/images/brand/construabr.svg`. No rodapé escuro, o logo aparece sobre uma placa clara, sem filtros ou inversão de cores. Fotografias são cópias dos arquivos fornecidos pelo usuário, sem download externo; a titularidade/permissão de uso comercial permanece registrada para confirmação antes da publicação.

As onze fotos foram convertidas em WebP mantendo proporção e resolução máxima do original. As maiores variantes ficam aproximadamente 23% menores, e o navegador seleciona variantes menores via `srcset`/`sizes`. Hero com prioridade alta; demais imagens com lazy loading. Para regenerar, execute `npm run assets:optimize`; para gerar uma prancha de inspeção local em `artifacts/assets/`, execute `npm run assets:inspect`.

O layout inclui menu mobile com estado ARIA, fechamento por Escape/clique externo e retorno de foco ao acionar Escape. Sem JavaScript, os links de navegação continuam visíveis. Há link para pular ao conteúdo, foco visível, imagens descritas, dimensões explícitas e respeito a `prefers-reduced-motion`.

## Conteúdo comercial e segurança da publicação

Preencher `src/config/company.ts` com os dados confirmados por Alessandro:

- `whatsapp`: DDI 55 + DDD + telefone, somente dígitos.
- `address`, `baseCity`, `domain`, `businessHours`, `socialLinks`.
- Prazo e raio já configurados em 24 horas e 120 km.

Os campos desconhecidos são `null` (redes sociais: lista vazia). Nenhum endereço, CNPJ, telefone, preço, estoque, horário ou histórico da empresa foi inventado. Sem número válido, os CTAs levam a `/contato/#atendimento`, onde a indisponibilidade do canal é explicitada. Os CTAs de orçamento abrem o formulário; botões de conversa direta e a ação final da revisão usam o gerador central de links `wa.me` com mensagem codificada.

**Produtos:** todas as entradas atuais de `src/data/catalog.ts` possuem `status: 'demo'`. Elas só aparecem com `npm run dev` e apresentam aviso visível. `npm run build` e `npm run preview` ocultam esses cards e não geram suas páginas de detalhe. A vitrine de produção apresenta um convite para consultar o catálogo em preparação. Publicação exige simultaneamente `status: approved` e `confirmation: confirmed`, após revisão de descrições, fotos e fontes. Consulte docs/CATALOGO.md.

**Regiões:** Baixada Fluminense, Região Metropolitana do Rio de Janeiro, Niterói, São Gonçalo, Angra dos Reis, Volta Redonda e Barra Mansa aparecem como referências condicionadas ao raio de 120 km da base e às condições operacionais. Não há garantia de atendimento integral desses municípios. Sem cidade/endereço da base, não há cálculo de distância nem mapa que sugira cobertura confirmada.

**Entregas:** prazo condicionado à aprovação pelo WhatsApp e às condições operacionais. Transporte exclusivamente por basculantes, dimensionados conforme volume. Vendas exclusivamente a granel, sem ensacados ou fracionados.

**SEO:** título e descrição por página, idioma, Open Graph, favicon e canonical somente se houver domínio configurado. Enquanto não houver domínio, todas as páginas usam `noindex, nofollow`. As rotas internas ainda em preparação usam `noindex` independentemente do domínio. Na conclusão dessas páginas, revisar a indexação. Não há dados estruturados de produto, avaliações ou organização com informações inventadas.

## Próxima etapa

1. Confirmar catálogo, descrições, especificações, aplicações e imagens autorizadas.
2. Revisar e aprovar o catálogo e seus detalhes já implementados.
3. Preencher WhatsApp e informações comerciais confirmadas.
4. Complementar as páginas institucionais concluídas com dados confirmados da base e fotografias autorizadas.
5. Antes de publicar: revisar conteúdos, SEO, licenças das imagens e indexação; solicitar autorização de publicação.

Referências técnicas consultadas: [estilos e Tailwind no Astro](https://docs.astro.build/en/guides/styling/) e [rotas estáticas](https://docs.astro.build/en/guides/routing/).
