# Publicar no GitHub Pages

O projeto está preparado para https://l1pesenne.github.io/construaBR/.
Enviar commits não publica o site: a publicação é manual e deve ser iniciada pelo responsável.

## Primeira publicação

1. Abra https://github.com/L1pesenne/construaBR/settings/pages.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Abra **Actions → Publicar no GitHub Pages → Run workflow**.
4. Escolha a branch **main** e confirme **Run workflow**.
5. Aguarde os jobs **build** e **deploy** ficarem verdes. O endereço publicado aparece no ambiente **github-pages**.

O workflow instala com npm ci, verifica TypeScript/Astro, gera o site e executa os testes antes de publicar. Apenas dist/ é enviado ao Pages. Não é necessário enviar node_modules/, dist/ nem usar a pasta docs/ como fonte de publicação.

## Atualizações

Envie suas alterações à main, confira **Actions → Validar projeto** e execute novamente **Publicar no GitHub Pages** quando desejar publicar a nova versão. Pull requests e pushes apenas validam; não fazem deploy automático.

## Executar e conferir localmente

Use Node.js 24 (arquivo .nvmrc):

```sh
npm ci
npm run validate
npm run preview
```

Abra http://127.0.0.1:4321/construaBR/ (ou a porta indicada no terminal). Para desenvolvimento, use npm run dev com o mesmo caminho.

## Regras preservadas

- Originais em imagens/ permanecem intactos e versionados.
- Produtos só aparecem no build com status approved e confirmation confirmed simultaneamente. O catálogo atual permanece em preparação; exemplos são exibidos apenas em desenvolvimento.
- O domínio comercial continua pendente. O site mantém noindex até a revisão da configuração institucional e de SEO.
- O caminho /construaBR/ respeita as letras maiúsculas do nome do repositório. Se mudar o nome do repositório ou usar domínio próprio, ajuste site e base em astro.config.mjs e a base esperada nos testes de produção.

Se a publicação falhar, confira primeiro se Source está em GitHub Actions, se o Pages está disponível no plano/visibilidade do repositório e se a execução foi feita na main. O workflow usa o GITHUB_TOKEN do próprio GitHub; nenhum token pessoal deve ser colocado no código.

Documentação oficial: [Astro no GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) e [workflows do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
