# Assets — continuação da etapa 1, atualizada na etapa 2/5

A etapa anterior registrou suas decisões no README. Este documento consolida a referência necessária para as próximas etapas, sem reinterpretar fotografias como comprovação de estoque.

## Identidade

`imagens/logo_construabr.svg`: logotipo vetorial com preto `#000000` e cinza `#666666`, proporção 718,25 × 107,53. Agora utilizado literalmente em `public/images/brand/construabr.svg`, sem editar curvas, cores ou proporções. No rodapé escuro, uma placa clara permite preservar sua aparência original. Não há manual de marca nem outras cores institucionais comprovadas.

Grafite, branco e cinza fundamentam a interface. Laranja `#D96932`, areia `#F7F4EF` e verde WhatsApp são complementos previstos no briefing, não cores extraídas do logotipo. O favicon CB é uma identificação técnica provisória, não um novo logotipo oficial.

## Fotografias fornecidas

Onze JPGs, todos de textura de materiais, sem foto institucional ou de basculante. A inspeção visual não identificou marca-d'água nas fotografias. Originais preservados na pasta `imagens/`. O envio dos arquivos autoriza sua integração neste projeto local; a titularidade/licença comercial permanece registrada como pendência para publicação.

| Arquivo original | Dimensões | Uso / observação |
| --- | --- | --- |
| areia lavada.jpg | 1570 × 1358 | Hero e exemplo de vitrine; maior fotografia com orientação horizontal disponível |
| Areia de Aterro.jpg | 489 × 277 | Exemplo de vitrine; horizontal, mas insuficiente para hero de alta resolução |
| Pedrisco.jpg | 900 × 1600 | Exemplo de vitrine; textura vertical |
| Areia Fina para Campo de Grama Sintética.jpg | 565 × 519 | Preparada para futura validação do catálogo |
| Areia Lavada Fina Branca.jpg | 807 × 1121 | Preparada para futura validação do catálogo |
| Areia Lavada Fina.jpg | 918 × 954 | Preparada para futura validação do catálogo |
| Areia para Quadra Esportiva.jpg | 1009 × 1217 | Preparada para futura validação do catálogo |
| Areia Relavada amarela.jpg | 899 × 1599 | Variante de cor, não confirma produto separado |
| Areia Relavada Branca.jpg | 899 × 1599 | Preparada para futura validação do catálogo |
| Areia Relavada creme.jpg | 960 × 1280 | Variante de cor, não confirma produto separado |
| Areola.jpg | 590 × 712 | Preparada para futura validação do catálogo |

## PDF

`imagens/Tipos de Areia.pdf`: uma página de texto, revisada também por renderização. Dez entradas de materiais; não tem imagens incorporadas, cores de marca, identificação da empresa, telefone ou prova de estoque. É referência descritiva, não confirmação de catálogo oficial. As descrições demonstrativas foram alinhadas ao documento; não foram inferidas das fotografias. Todas as onze fotos agora integram as referências de desenvolvimento, com seis cards na home e onze na página Produtos.

## Otimização

`npm run assets:optimize` usa Sharp, declarado como dependência de desenvolvimento. Cria cópias WebP com largura de 480 px e variantes maiores limitadas ao original: até 960 px para materiais e 1560 px para a fotografia principal. Nenhuma imagem é ampliada. Mantém proporção; os recortes CSS dos cards e hero incidem apenas sobre texturas, sem elementos informativos importantes.

Qualidade inicial 82, com redução controlada para 76 ou 70 somente quando a cópia ficaria maior que o JPG original. As maiores variantes somam 2.828.226 bytes, contra 3.696.134 bytes dos originais (redução aproximada de 23%). O navegador recebe `srcset` e `sizes`, carregando a variante adequada, não todas de uma vez. Hero prioritário; demais imagens com carregamento lazy. Relatório verificável em `ASSETS_OTIMIZADOS.json` e manifesto tipado em `src/data/assets.generated.ts`.

## Transporte

Sem fotografia real disponível. A seção de logística usa o SVG conceitual original da etapa 1, identificado na legenda, sem sugerir frota própria, quantidade de veículos ou capacidades. A foto de basculante é uma pendência, não requisito para o funcionamento local.
