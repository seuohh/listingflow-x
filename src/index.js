// 대표 주소: listingflowx.com
//
// 비공개 상태 (SITE_PUBLIC 이 "true" 가 아닐 때)
//   - Cloudflare 미리보기 주소(<버전해시>-listingflow-x.seuohh.workers.dev)에서만 사이트를 보여준다.
//     이 주소는 무작위 해시가 붙어 외부에서 추측할 수 없고, Cloudflare 대시보드의
//     Deployments 화면에서 버전별로 확인할 수 있다.
//   - 그 외 모든 주소(대표 도메인, 보조 도메인, 기본 workers.dev)는 404 "준비 중입니다." 를 돌려준다.
//
// 공개 상태 (SITE_PUBLIC 이 "true")
//   - 대표 주소가 아닌 호스트는 301 로 대표 주소로 보내고,
//   - 대표 주소 요청은 public/ 의 정적 파일을 서빙한다.

const CANONICAL_HOST = "listingflowx.com";

const REDIRECT_HOSTS = new Set([
  "www.listingflowx.com",
  "listingflow-x.com",
  "www.listingflow-x.com",
]);

// 기본 workers.dev 주소와 프리뷰 주소(*-listingflow-x.seuohh.workers.dev)
function shouldRedirect(hostname) {
  return REDIRECT_HOSTS.has(hostname) || hostname.endsWith(".workers.dev");
}

// 프리뷰 주소만 참: "abcd1234-listingflow-x.seuohh.workers.dev"
function isPreviewHost(hostname) {
  return hostname.endsWith("-listingflow-x.seuohh.workers.dev");
}

function privateResponse() {
  return new Response("준비 중입니다.", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "no-store",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (env.SITE_PUBLIC !== "true") {
      if (isPreviewHost(url.hostname)) {
        const res = await env.ASSETS.fetch(request);
        const headers = new Headers(res.headers);
        headers.set("x-robots-tag", "noindex, nofollow");
        return new Response(res.body, { status: res.status, headers });
      }
      return privateResponse();
    }

    if (shouldRedirect(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
