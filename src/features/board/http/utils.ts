export function getCookiesFromHeaders(headers: Headers) {
  const outgoingCookies = new Headers();
  outgoingCookies.set("Content-Type", "application/json");

  const incomingCookies = new Headers(headers)
  const cookies = incomingCookies.get("cookie");

  if (cookies) {
    outgoingCookies.set("cookie", cookies);
  }

  return outgoingCookies;
}
