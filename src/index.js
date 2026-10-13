// 대표 주소: listingflowx.com
// - SITE_PUBLIC 이 "true" 가 아니면 모든 요청에 404 를 돌려 사이트를 비공개로 유지한다.
// - 공개 상태에서는 대표 주소가 아닌 호스트를 301 로 대표 주소로 보내고,
//   대표 주소 요청은 public/ 의 정적 파일을 서빙한다.

const CANONICAL_HOST = "listingflowx.com";

const REDIRECT_HOSTS = new Set([
  "www.listingflowx.com",
  "listingflow-x.com",
  "www.listingflow-x.com",
]);

// listingflow-x.seuohh.workers.dev 와 프리뷰 주소(*-listingflow-x.seuohh.workers.dev)도 리다이렉트
function shouldRedirect(hostname) {
  return REDIRECT_HOSTS.has(hostname) || hostname.endsWith(".workers.dev");
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
    if (env.SITE_PUBLIC !== "true") {
      return privateResponse();
    }

    const url = new URL(request.url);

    if (shouldRedirect(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
