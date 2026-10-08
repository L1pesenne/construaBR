# Redesign corporativo — primeira rodada

## Diagnóstico e direção

A homepage anterior concentrava texto e foto em um painel escuro arredondado, com legenda sobreposta. A vitrine repetia cards e botões de marketplace, a cobertura usava círculos decorativos e o ritmo acumulava vários blocos de mesma importância. Os textos de destaque não diferenciavam claramente material, pedido e logística.

Nova direção: Industrial Corporate — Editorial & Precision. A homepage utiliza grid de 12 colunas, hero assimétrico de cinco colunas de texto e sete de fotografia, faixas operacionais compactas e seções de função distinta. Header branco, títulos industriais, legenda fora da foto, links discretos e footer claro. Na rodada seguinte, o catálogo e os detalhes adotaram o mesmo sistema sob `.corporate-site`; as demais páginas institucionais mantêm seu design.

## Sistema visual

O SVG original preto/cinza segue intacto. Não há manual oficial de outras cores. A paleta de interface desta rodada é provisória: preto industrial #172126, branco #FFFFFF, cinza claro #F3F3F0, cinza técnico #687178 e laranja #BD632C. O laranja é usado com contenção em divisórias e no esquema de transporte. Botões principais são grafite com texto branco; textos de destaque coloridos usam laranja escurecido para contraste. Nenhuma cor é apresentada como extraída do logo, além do preto/cinza já documentados.

Barlow Condensed para títulos; Public Sans para corpo e informações de apoio. Fontes existentes, locais, sem nova dependência. Títulos e imagens levam a hierarquia; não há sombras decorativas, transparência do header, cards sobrepostos, glow, pill buttons ou animação de entrada. Movimento reduzido permanece respeitado.

## Composição implementada

1. Hero: título direto, descrição de fornecimento/logística, orçamento, link de materiais e foto real de textura a granel.
2. Faixa operacional: fornecimento, transporte, prazo após aprovação e raio máximo, em texto com divisórias.
3. Materiais: composições retangulares com foto, categoria, descrição e links, exclusivamente para produtos confirmados. Como não há produto aprovado, o estado atual mostra uma fotografia de referência e convite para consulta comercial. Referências de desenvolvimento continuam somente no catálogo; a homepage não as oferece como produtos confirmados.
4. Logística: contraste escuro, texto operacional e novo esquema vetorial de basculante. Não existe fotografia da operação nos arquivos recebidos. O desenho é identificado como ilustrativo, sem escala, capacidade ou frota comprovada. Original anterior preservado.
5. Atendimento: regiões em lista com divisórias e raio condicionado à cobertura efetiva. Sem mapa ou cálculo de origem não informada.
6. Chamada comercial: material, quantidade e endereço para preparar orçamento.
7. Footer: marca original, navegação, WhatsApp e e-mail confirmados, regra de fornecimento a granel.

A sequência foi reduzida ao ritmo solicitado. O FAQ continua em Contato, e o processo de atendimento permanece em Sobre e Entregas. Rotas, formulário, pré-seleção de materiais e geração de mensagens WhatsApp estão preservados.

## Fontes

Inventário e análise de assets das etapas anteriores, fotos originais de `imagens/`, SVG oficial, dados comerciais em `company.ts` e documentação de orçamento. O PDF já inventariado não foi reanalisado sem necessidade. Nenhum produto foi aprovado pela simples presença nos arquivos.

Referências conceituais consultadas: [Votorantim Cimentos](https://www.votorantimcimentos.com.br/), [Gerdau](https://www2.gerdau.com/) e [Saint-Gobain Brasil](https://www.saint-gobain.com.br/). A consulta orientou a separação de navegação institucional, produtos e contato e a hierarquia de conteúdos. Não foram copiados layouts, ativos, textos ou marcas dessas empresas.

## Validação e revisão

Check de 49 arquivos sem erros, avisos ou sugestões; build estático e 12 testes aprovados. Contatos oficiais usados em todos os links diretos. Fontes/imagens locais e logo original byte a byte verificados. A prévia local existente respondeu HTTP 200.

Segunda revisão de composição: eliminada a legenda sobreposta do hero, substituído o desenho anterior com sombreamento por um esquema plano, retirada a vitrine demonstrativa da homepage, removido o gráfico circular de cobertura e restringidas cores/botões ao conteúdo comercial. SVG novo renderizado e inspecionado como imagem.

O navegador automatizado do Codex falhou ao iniciar por erro do ambiente. O proprietário autorizou a alternativa local: Brave/Chromium headless. Revisão visual e funcional desktop/mobile concluída, com capturas atuais em `artifacts/revisao-final/`. Confira [Revisão final](REVISAO_FINAL.md) para páginas, viewports e reprodução.

## Repositório

Repositório autorizado: https://github.com/L1pesenne/construaBR.git. O remoto estava vazio. A pasta existente foi inicializada como Git, mantendo seus arquivos, e vinculada a origin/main. A base das etapas anteriores foi registrada antes do redesign. Preferência de commits com prefixo ConstruaBR Distribuidora registrada em AGENTS.md. Publicação do site continua dependente de autorização específica.
