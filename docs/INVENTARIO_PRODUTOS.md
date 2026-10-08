# Inventário de referências de materiais

Fonte: página única de `imagens/Tipos de Areia.pdf` e nomes dos arquivos recebidos. Não há documento anterior confirmando quais itens são comercializados pela ConstruaBR. Todos dependem de validação por Alessandro.

| Nome no PDF | Referência descritiva do PDF | Imagem correspondente | Situação no site |
| --- | --- | --- | --- |
| Areia de Aterro | Aterros, enchimentos, nivelamentos, drenagem | Areia de Aterro.jpg | Exemplo, somente em desenvolvimento |
| Pedrisco | Aterros e drenagens | Pedrisco.jpg | Exemplo, somente em desenvolvimento |
| Areia Relavada Branca | Dois processos de lavagem; cor branca/cinza claro; concreto e alvenaria | Areia Relavada Branca.jpg | Exemplo, somente em desenvolvimento |
| Areia Relavada | Dois processos de lavagem; cor creme/amarela; diversas aplicações | Areia Relavada creme.jpg; Areia Relavada amarela.jpg | Duas referências fotográficas, somente em desenvolvimento |
| Areia Lavada | Um processo de lavagem; alvenaria e drenagem | areia lavada.jpg | Exemplo, somente em desenvolvimento |
| Areia Lavada Fina Branca | Acabamentos, argamassas, alguns tipos de concreto e paisagismo | Areia Lavada Fina Branca.jpg | Exemplo, somente em desenvolvimento |
| Areia Lavada Fina | Argamassas e acabamentos | Areia Lavada Fina.jpg | Exemplo, somente em desenvolvimento |
| Areia Fina para Campo de Grama Sintética | Aplicação em campo de grama sintética | Areia Fina para Campo de Grama Sintética.jpg | Exemplo, somente em desenvolvimento |
| Areia para Quadra Esportiva | Vôlei, futevôlei e beach tennis | Areia para Quadra Esportiva.jpg | Exemplo, somente em desenvolvimento |
| Areola | Material fino e argiloso para emboço e assentamento de tijolos | Areola.jpg | Exemplo, somente em desenvolvimento |

As descrições acima registram o conteúdo do documento, não constituem recomendação técnica nem especificação comercial validada. Não há granulometria, ficha técnica, unidade de venda, preço ou disponibilidade confirmados.

Após a solicitação de utilizar os arquivos das subpastas, `src/data/products.ts` passou a integrar as onze fotos como referências demonstrativas, todas com `status: 'demo'`. A home mostra seis cards e a página Produtos reúne as onze referências com detalhes navegáveis. As variantes amarela e creme permanecem identificadas como referências de imagem, sem confirmação de produtos comerciais distintos. `import.meta.env.DEV` restringe sua exibição ao servidor de desenvolvimento, com avisos explícitos. Produção exibe um convite para consultar materiais em vez de simular catálogo confirmado.

## Atualização da etapa 3

Dados mantidos em `src/data/catalog.ts`; `products.ts` seleciona as entradas visíveis. Onze referências pendentes, zero produtos confirmados e zero fontes identificadas como catálogo de fornecedor. Publicação exige `approved` + `confirmed`. Pesquisa, filtros combináveis, detalhes e orçamento por material estão implementados. Consulte [Catálogo](CATALOGO.md) para manutenção.
