// 대표 주소: listingflowx.com
// 나머지 도메인으로 들어온 요청은 대표 주소로 301 리다이렉트하고,
// 대표 주소 요청은 public/ 의 정적 파일을 그대로 서빙한다.

const CANONICAL_HOST = "listingflowx.com";

const REDIRECT_HOSTS = new Set([
  "www.listingflowx.com",
  "listingflow-x.com",
  "www.listingflow-x.com",
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
