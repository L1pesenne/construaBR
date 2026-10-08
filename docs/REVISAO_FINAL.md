# Revisão final em navegador — 08/10/2026

O proprietário autorizou o navegador local após a falha de inicialização do navegador do Codex. Foi utilizado Brave (Chromium) headless, com contexto isolado, sem acesso ao perfil pessoal.

## Páginas e responsividade

Homepage, catálogo, detalhe de Areia Lavada, Contato, Sobre e Entregas foram carregados em 1440, 390 e 320 pixels. As 18 combinações responderam corretamente: um H1 por página, fotografias carregadas, nenhuma rolagem horizontal e nenhum erro de JavaScript ou console. Fontes locais carregadas antes das capturas.

As capturas desktop/mobile da homepage, vitrine, detalhe, formulário e páginas institucionais foram inspecionadas. Fotografias proporcionais, legibilidade, espaçamento, alinhamento do grid e adaptação dos títulos foram conferidos. Os detalhes preservam toda a fotografia; a vitrine utiliza recortes proporcionais. O catálogo demonstrativo foi conferido também no celular, com onze referências identificadas como pendentes. Nenhuma correção de layout foi necessária nesta revisão.

## Interações reais

- Menu mobile abre e fecha por Escape, devolvendo o foco ao botão.
- Busca por VOLEI ignora acento/caixa; categorias restringem a pesquisa; filtros combinados e busca sem resultado funcionam.
- Checkbox por teclado, limpeza com retorno do foco e persistência após recarregar a URL foram verificados.
- Produto Pedrisco encaminha ao formulário com material selecionado.
- Obrigatórios apresentam erros acessíveis; preenchimento prepara a revisão; o link usa o contato oficial 5521995471761 e menciona Pedrisco.
- Editar invalida a revisão anterior; limpar remove nome e seleção.
- O build público exibe catálogo em preparação e não apresenta cards demonstrativos.

Os dados de teste foram sintéticos e locais. O botão final do WhatsApp não foi acionado; nenhuma mensagem foi enviada.

## Evidências e reprodução

Capturas completas e primeiras telas: `artifacts/revisao-final/`. Relatório JSON: `artifacts/revisao-final/relatorio.json`. Esses arquivos gerados são ignorados pelo Git. O script de reprodução está versionado em `scripts/visual-review.mjs`.

Executar `npm run build`, manter `npm run dev` ativo em 127.0.0.1:4321 e executar `node scripts/visual-review.mjs`. O script usa Playwright do runtime local do Codex e o Brave instalado. Os caminhos podem ser substituídos por `PLAYWRIGHT_PATH` e `BROWSER_PATH`, sem instalação de dependências na aplicação.

Check: 52 arquivos sem erros, avisos ou sugestões. Build e 13 testes unitários/de produção aprovados na revisão anterior; o novo script executa os testes em navegador e salva as evidências.

## Pendências comerciais

A revisão visual foi concluída. Os onze materiais continuam aguardando aprovação comercial, descrições/especificações/unidades e autorização das fotografias. Endereço/base, domínio e horários não foram confirmados. Não houve deploy.
