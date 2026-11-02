# CLAUDE.md

Landing page pessoal em https://lucas.lemosp.com. É uma SPA em React + Vite, hospedada na AWS (stack CloudFormation `lucas-lemosp-site`, em us-east-1). O repositório é `lukelemosp/lucas.lemosp.com`.

## Deploy de mudanças no site: sempre pela pipeline

Toda mudança no site passa pela pipeline do GitHub Actions (`.github/workflows/deploy.yml`): conteúdo, código, estilos e arquivos em `public/`.

1. Edite o código. O conteúdo fica centralizado em `src/content/site.ts`.
2. Valide localmente com `npm run build`. Para mudança visual, confira também com `npm run preview`.
3. Faça commit e push na `main`. Se a mudança for grande ou arriscada, abra um PR: o build roda no PR e o deploy só acontece depois do merge.
4. Acompanhe com `gh run watch`.
5. Confirme no ar: `curl` na URL e nas rotas afetadas.

**Não publique por fora da pipeline.** Isso quer dizer não usar `npm run deploy`, `scripts/deploy.ps1`, `scripts/deploy.sh` nem `aws s3 sync/cp` diretamente. A exceção é quando o usuário pedir explicitamente, por exemplo com o GitHub Actions fora do ar.

## Mudanças de infraestrutura (`infra/site.yml`)

A pipeline **não** aplica infraestrutura. Para alterar a infra:

1. Edite `infra/site.yml`.
2. Valide com `aws cloudformation validate-template`.
3. Peça ao usuário um `aws login --profile admin --region us-east-1`.
4. Rode `scripts/infra.ps1` com `AWS_PROFILE=admin`.
5. Verifique o drift e confira se a assinatura do plano flat-rate continua `ACTIVE`.
6. Rode `aws logout --profile admin`.
7. Faça commit do template pela pipeline normal.

O perfil padrão do AWS CLI local é o usuário IAM `site-deploy`, que tem permissão mínima.

**Restrições do plano Free do CloudFront** (manter sempre):
- `PriceClass_All`;
- WAF associado à distribuição;
- no máximo 5 regras de WAF;
- sem rule groups;
- sem CAPTCHA, que só existe a partir do plano Pro.

**OIDC do GitHub:** o repositório usa o formato *immutable subject*. Por isso, o parâmetro `GitHubRepo` tem o formato `owner@ownerId/repo@repoId`, e o job de deploy não pode usar `environment:`, porque isso mudaria o `sub`.

## Convenções

- **Idioma:** textos do site e comunicação em pt-BR.
- **Visual:** corporativo e profissional, com laranja como cor de destaque e um toque geek discreto. Siga os tokens em `src/styles/app.css`.
- **Pasta `design/`:** é local e fica no `.gitignore`. Nunca versione essa pasta: ela contém dados extraídos do LinkedIn.
