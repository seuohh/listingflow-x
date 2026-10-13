# listingflow-x

Cloudflare Workers(정적 자산) 로 배포되는 정적 사이트입니다.

## 구조

| 경로 | 용도 | 상태 |
|---|---|---|
| `public/index.html` | 메인 페이지 (배포되는 파일) | 랜딩 페이지 작성됨 |
| `src/index.js` | 도메인 리다이렉트 처리 Worker 코드 | 완료 |
| `listingflow-x.txt` | 기획 / 메모 (배포되지 않음) | 비어 있음 |
| `wrangler.jsonc` | Cloudflare Workers 배포 설정 (도메인 포함) | 완료 |
| `package.json` | 로컬 개발 / 배포 스크립트 | 완료 |

## 배포

GitHub `main` 브랜치에 푸시하면 Cloudflare Workers Builds 가 자동으로
`npx wrangler deploy` 를 실행해 `public/` 폴더를 배포합니다.

- Cloudflare 프로젝트: Workers & Pages > listingflow-x
- 대표 주소: https://listingflowx.com

## 공개 / 비공개 전환

현재 사이트는 **비공개** 상태이며, 모든 주소에서 404 ("준비 중입니다.") 를 반환합니다.

비공개 상태에서 실제 배포된 모습을 확인하려면 Cloudflare 미리보기 주소를 사용합니다.
Cloudflare 대시보드 > Workers & Pages > listingflow-x > Deployments 에서 최신 버전의
미리보기 링크(`<버전해시>-listingflow-x.seuohh.workers.dev`)를 열면 사이트가 보입니다.
이 주소는 무작위 해시가 붙어 외부에서 추측할 수 없으며, 검색 엔진 색인도 막혀 있습니다.

공개하려면 `wrangler.jsonc` 의 `vars.SITE_PUBLIC` 을 `"true"` 로 바꾸고 푸시하면 됩니다.
다시 비공개로 돌리려면 `"false"` 로 바꾸고 푸시합니다.

로컬에서 미리 보려면 `npm run dev` 를 실행합니다. 자세한 내용은 "로컬에서 보면서 작업하기" 항목을 참고하세요.

## 도메인

아래 동작은 공개 상태일 때 적용됩니다.

| 도메인 | 동작 |
|---|---|
| listingflowx.com | 대표 주소, 사이트 서빙 |
| www.listingflowx.com | listingflowx.com 으로 301 리다이렉트 |
| listingflow-x.com | listingflowx.com 으로 301 리다이렉트 |
| www.listingflow-x.com | listingflowx.com 으로 301 리다이렉트 |
| listingflow-x.seuohh.workers.dev | listingflowx.com 으로 301 리다이렉트 |

도메인 목록은 `wrangler.jsonc` 의 `routes`, 리다이렉트 규칙은 `src/index.js` 에 있습니다.

## 로컬에서 보면서 작업하기

처음 한 번만 의존성을 설치합니다.

```
npm install
```

개발 서버를 켭니다.

```
npm run dev
```

브라우저에서 http://localhost:8787 을 열면 사이트가 보입니다.
`public/index.html` 을 수정하고 저장하면 새로고침 시 바로 반영됩니다.
`src/index.js` 를 수정해도 자동으로 다시 로드됩니다. 끝낼 때는 터미널에서 Ctrl+C 를 누릅니다.

로컬 서버는 비공개 설정과 무관하게 항상 공개 상태로 동작하므로, 실제 사이트가 비공개여도 로컬에서는 내용을 볼 수 있습니다.

## 추후 작업

1. `listingflow-x.txt` 에 기획 내용과 기능 목록을 정리한다.
2. `npm run dev` 로 로컬에서 확인하며 `public/index.html` 에 실제 페이지 내용을 작성한다.
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
