// Forward UTM parameters to outbound links
function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
    if (params.has(param)) {
      utmParams.set(param, params.get(param));
    }
  });
  return utmParams.toString();
}

function appendUtmToUrl(url, utmString) {
  if (!utmString) return url;
  const separator = url.includes('?') ? '&' : '?';
  return url + separator + utmString;
}

document.addEventListener('DOMContentLoaded', function () {
  const utmString = getUtmParams();
  console.log('UTM String to append:', utmString);

  document.querySelectorAll('a[data-track-utm]').forEach(link => {
    console.log('Processing link:', link.href);
    const newUrl = appendUtmToUrl(link.href, utmString);
    link.setAttribute('href', newUrl);
  });
});