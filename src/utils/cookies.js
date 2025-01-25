function getCookieDomain() {
  const host = window.location.hostname;
  return (
    host.match(/^[\d.]+$|/)[0] ||
    (host.match(/[^.]+\.(\w{2,3}\.\w{2}|\w{2,})$/) || [ host ])[0]
  );
}

export function getCookie(cookieName) {
  let match = document.cookie.match(new RegExp('(^|;|;\\s)' + cookieName + '=([^;]+)'));
  return match ? match[2] : '';
}

export function setCookie(name, value, expiresAfterDays, domain) {
  const DAY = (24 * 1000 * 60 * 60);

  document.cookie = [
    name + '=' + value.toString(),
    'domain=' + (domain || getCookieDomain()),
    'path=/',
    expiresAfterDays ? 'max-age=' + (DAY * expiresAfterDays) : ''
  ].join(';');
}

export function removeCookie(cookieName, cookieDomain) {
  setCookie(cookieName, '', -1, cookieDomain);
}
