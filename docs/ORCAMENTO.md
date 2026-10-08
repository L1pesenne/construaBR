# Orçamento e páginas institucionais — etapa 4

## Fonte comercial

Briefing original da etapa 1 e registros em `PENDENCIAS_CLIENTE.md` e `PLANO_IMPLEMENTACAO.md`: ConstruaBR Distribuidora, responsável Alessandro, distribuição de materiais a granel no RJ, sem ensacados/fracionados, basculantes dimensionados pelo volume, entrega em 24 horas após aprovação pelo WhatsApp conforme condições operacionais, raio máximo de 120 km. As sete regiões de destaque permanecem condicionadas à cobertura efetiva de cada endereço.

O inventário da etapa 1 e o PDF Tipos de Areia não confirmam catálogo comercial, frota própria, certificações, tempo de atuação ou depoimentos. Nenhum desses fatos foi presumido. Os arquivos recebidos contêm fotos de materiais, sem fotos institucionais ou de transporte. Sobre usa uma foto de material com legenda explícita; Entregas reutiliza a ilustração conceitual já identificada.

## Fluxo

Homepage → Produtos → detalhe → Solicitar orçamento → Contato com material selecionado → preencher dados → Revisar orçamento → Abrir WhatsApp → confirmar envio no próprio WhatsApp.

O formulário também pode ser iniciado diretamente da homepage, navegação, botão flutuante ou Contato. Os CTAs de orçamento sempre levam à página de formulário. Conversa direta (`ContactButton direct`), rodapé e botão flutuante usam o mesmo número central quando disponível.

O número oficial confirmado, (21) 99547-1761, está registrado em `company.whatsapp` como `5521995471761`. O e-mail confirmado, `atendimento@construabr.com`, também está na configuração central e na página Contato. O visitante pode abrir o WhatsApp depois de revisar a mensagem e confirmar seu envio no próprio serviço. O site não registra o envio ou a aprovação do pedido.

## Arquivos e dados

- `src/components/QuoteForm.astro`: campos, pré-seleção por slug, validação, revisão, edição e limpeza.
- `src/lib/quotation.ts`: validação, limites de texto, mensagem organizada e único gerador de URL WhatsApp.
- `src/config/company.ts`: único contato oficial, inicialmente null; endereço, cidade-base, domínio e horário também pendentes.
- `src/components/ContactButton.astro`: CTA de formulário por padrão; conversa direta opcional.
- `src/components/FloatingContact.astro`: contato acessível com indicação de pendência; oculto enquanto há foco no formulário/revisão para evitar sobreposição.
- `src/data/faq.ts` e `src/components/FAQ.astro`: sete perguntas, com dados de prazo/raio vindos da configuração e interação nativa por teclado.
- `src/styles/institutional.css`: formulário, páginas institucionais, FAQ e botão flutuante, mantendo o design system anterior.

Nome, cidade, bairro/referência e material são obrigatórios, incluindo rejeição de texto contendo só espaços. Quantidade, unidade e observações são opcionais. Quantidade/unidade são campos livres de referência; não afirmam unidades comerciais ainda não confirmadas. O visitante pode informar outro material, cuja disponibilidade será verificada pela equipe. Só produtos permitidos para o ambiente são oferecidos no seletor; slugs desconhecidos ou não publicados são ignorados.

Mensagens incluem apenas os opcionais preenchidos e preservam acentos e parágrafos das observações. Conteúdo é exibido via textContent. A edição invalida a mensagem/link anteriores, e Limpar dados limpa campos e revisão. Nenhum dado é colocado na URL local. Não há requisição de formulário, persistência em banco/localStorage/sessionStorage, backend ou analytics. Apenas a abertura voluntária do WhatsApp leva os dados ao serviço externo pela mensagem preparada. O site não confirma envio nem aprovação do pedido.

Sem JavaScript, o formulário fica indisponível com explicação; a conversa direta permanece acessível. E-mail é um link `mailto:`. Endereço e horários são renderizados somente quando configurados. O FAQ funciona sem JavaScript.

## Validação

Check de 44 arquivos sem erros/avisos; build de produção concluído; 12 testes aprovados. Os testes incluem campos obrigatórios, limites, opcionais ausentes, mensagem com caracteres especiais, codificação do link, estado sem telefone e proteção de publicação.

Navegador: fluxo homepage–catálogo–produto–formulário preserva o material; revisão com e sem quantidade; material personalizado; rejeição de espaços; edição invalida revisão; limpeza remove também o campo condicional. Produção não apresenta referências demonstrativas nem pré-seleciona slug não publicado. FAQ por Enter, menu por Escape, navegação institucional e CTAs verificados. Desktop 1440 px, mobile 390/320 px, sem overflow horizontal nas páginas verificadas. Console sem erros/avisos observados.

Capturas em `artifacts/screenshots/contato-etapa-4-desktop.jpg` e `orcamento-etapa-4-mobile.jpg`. Nenhuma mensagem foi enviada. O WhatsApp agora está configurado; o link real usa o telefone fornecido e abre a mensagem para confirmação pelo cliente.

## Próximas confirmações

Catálogo aprovado, fotos autorizadas, dados técnicos/unidades, endereço e cidade da base, domínio e horários. Não há cálculo automático de distância, pagamento, checkout ou cadastro.
