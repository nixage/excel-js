export function parseRoute(routes) {
  const hash = window.location.hash;
  const routesUrl = Object.keys(routes);
  let page = null
  for (const url of routesUrl) {
    if (hash.includes(url)) {
      page = routes[url]
      break
    }
  }

  if (page == null) {
    window.location.href = window.location.origin + '/#dashboard'
    return routes['**']
  }
  return page
}
