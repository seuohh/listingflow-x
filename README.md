# listingflow-x

Cloudflare Workers(정적 자산) 로 배포되는 정적 사이트입니다.

## 구조

| 경로 | 용도 | 상태 |
|---|---|---|
| `public/index.html` | 메인 페이지 (배포되는 파일) | 비어 있음 |
| `src/index.js` | 도메인 리다이렉트 처리 Worker 코드 | 완료 |
| `listingflow-x.txt` | 기획 / 메모 (배포되지 않음) | 비어 있음 |
| `wrangler.jsonc` | Cloudflare Workers 배포 설정 (도메인 포함) | 완료 |

## 배포

GitHub `main` 브랜치에 푸시하면 Cloudflare Workers Builds 가 자동으로
`npx wrangler deploy` 를 실행해 `public/` 폴더를 배포합니다.

- Cloudflare 프로젝트: Workers & Pages > listingflow-x
- 대표 주소: https://listingflowx.com

## 도메인

| 도메인 | 동작 |
|---|---|
| listingflowx.com | 대표 주소, 사이트 서빙 |
| www.listingflowx.com | listingflowx.com 으로 301 리다이렉트 |
| listingflow-x.com | listingflowx.com 으로 301 리다이렉트 |
| www.listingflow-x.com | listingflowx.com 으로 301 리다이렉트 |
| listingflow-x.seuohh.workers.dev | listingflowx.com 으로 301 리다이렉트 |

도메인 목록은 `wrangler.jsonc` 의 `routes`, 리다이렉트 규칙은 `src/index.js` 에 있습니다.

## 추후 작업

1. `listingflow-x.txt` 에 기획 내용과 기능 목록을 정리한다.
2. `public/index.html` 에 실제 페이지 내용을 작성한다.
3. 필요하면 `public/` 안에 CSS, JS 파일을 추가한다.

## 작업 반영 방법

```
git add -A
git commit -m "변경 내용 요약"
git push
```

푸시하면 Cloudflare 에서 자동 배포됩니다.

## 저장소

https://github.com/seuohh/listingflow-x
