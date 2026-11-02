# lucas.lemosp.com

Landing page pessoal de **Lucas Lemos Pinheiro**, arquiteto de soluções. É uma SPA em React com transições suaves, inspirada nas Apple Human Interface Guidelines, e fica hospedada na AWS por um custo próximo de zero.

🔗 **https://lucas.lemosp.com**

## Stack

- **Front-end:** [Vite](https://vitejs.dev), [React 18](https://react.dev), TypeScript, [React Router](https://reactrouter.com) e [Framer Motion](https://www.framer.com/motion/)
- **Infra:** AWS CloudFormation ([`infra/site.yml`](infra/site.yml))
- **CI/CD:** GitHub Actions, autenticado na AWS por OIDC, sem chaves guardadas

## Rodando localmente

```bash
npm ci
npm run dev       # http://localhost:5173
npm run build     # gera dist/
npm run preview   # serve o build
```

## Editando o conteúdo

Todo o conteúdo do site fica em **[`src/content/site.ts`](src/content/site.ts)**:

- perfil;
- redes sociais;
- trajetória;
- certificações;
- formação;
- apps e suas políticas de privacidade.

O menu lateral em árvore é montado a partir desses dados. Para adicionar uma rede social ou um app, basta incluir um item na lista correspondente. Os textos das políticas aceitam `**negrito**` e `[links](https://...)`.

## Infraestrutura

```
                 ┌──────────────── CloudFront (plano flat-rate Free) ────────────────┐
Route 53  ──►    │  WAF (rate limit por IP) ─► cache ─► Origin Access Control         │ ──►  S3 (privado)
lucas.lemosp.com │  TLS (ACM) · HTTP/3 · security headers · fallback SPA → index.html│
                 └────────────────────────────────────────────────────────────────────┘
```

- **S3:** bucket privado, acessível somente pelo CloudFront via OAC.
- **CloudFront:** está no [plano flat-rate Free](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html). Não há cobrança por excedente, e o WAF já vem incluído.
- **WAF:** bloqueia por alguns minutos o IP que passar de `RateLimitPer5Min` requisições em 5 minutos.
- **Rotas do React Router:** os erros 403 e 404 respondem com o `index.html`, para que o roteamento funcione no cliente.
- **GitHub Actions:** assume uma role IAM por OIDC. A role aceita apenas a branch `main` deste repositório e só pode publicar arquivos no bucket e invalidar o cache.

Para criar ou atualizar a stack, é preciso ter credenciais de administrador. A stack deve ficar em us-east-1, por causa do certificado do CloudFront.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/infra.ps1
```

## Deploy

Cada push na `main` dispara o [workflow](.github/workflows/deploy.yml):

1. **build:** roda `npm ci` e `npm run build`. Também roda em pull requests, mas sem fazer deploy.
2. **deploy:** assume a role via OIDC e executa [`scripts/deploy.sh`](scripts/deploy.sh). O script:
   - publica os arquivos com hash com cache imutável de 1 ano;
   - publica o `index.html` com `no-cache`;
   - invalida o cache do CloudFront.

O deploy manual a partir do Windows também funciona: `npm run deploy`.

## Licença

O **código** está sob a licença [MIT](LICENSE).

**Textos, fotos e identidade visual pessoal não estão cobertos pela licença.** Isso inclui o conteúdo de `src/content/` e o arquivo `public/avatar.jpg`. Se for reaproveitar o projeto, troque pelo seu próprio conteúdo.
