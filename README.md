# ⚡ Web Vitals Lab

> Interactive lab demonstrating Core Web Vitals anti-patterns and fixes across 8 real-world performance scenarios, with a live metrics overlay.

🌐 **Live Site:** https://rsujathanr.github.io/web-vitals-lab/

---

## What is this?

Each scenario has two pages:
- 🔴 **bad.html** — deliberately broken with real-world anti-patterns
- 🟢 **good.html** — fixed with production-grade optimizations

Every page shows a live floating metrics panel (bottom-right) powered by [`web-vitals`](https://github.com/GoogleChrome/web-vitals), reporting all 6 metrics in real time.

---

## Scenarios

| # | Scenario | Anti-Patterns Demonstrated | Metrics |
|---|----------|---------------------------|---------|
| 1 | 🖼️ [Images](scenarios/images/) | CSS background hero, missing dimensions, no lazy load | LCP, CLS, TBT |
| 2 | ⚙️ [JavaScript](scenarios/javascript/) | Render-blocking scripts, 2s sync tasks, no debounce | INP, TBT, FCP |
| 3 | 🎨 [CSS](scenarios/css/) | Blocking stylesheets, `left` animation, `transition:all` | FCP, LCP, TBT |
| 4 | 🔤 [Fonts](scenarios/fonts/) | All 9 weights, `display=block` FOIT, no preconnect | CLS, FCP, LCP |
| 5 | 📐 [Layout Stability](scenarios/layout-stability/) | Images without dimensions, late ad slots, shifting banners | CLS |
| 6 | 🌐 [Network](scenarios/network/) | No preconnect, dns-prefetch, or prefetch hints | TTFB, LCP, FCP |
| 7 | 💾 [Caching](scenarios/caching/) | `no-store` headers, no content hashing, no service worker | TTFB, LCP |
| 8 | 🔌 [Third-Party](scenarios/third-party/) | Sync analytics, eager YouTube iframe, eager chat SDK | TBT, FCP, INP, LCP |

---

## Metric Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | ≤ 4s | > 4s |
| INP | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| FCP | ≤ 1.8s | ≤ 3s | > 3s |
| TTFB | ≤ 800ms | ≤ 1.8s | > 1.8s |
| TBT | ≤ 200ms | ≤ 600ms | > 600ms |

---

## How to Measure

**Live overlay** — every page has a draggable metrics panel. Interact with the page to trigger INP, scroll to finalize LCP and CLS.

**Lighthouse** — DevTools → Lighthouse tab → Performance → Analyze page load. Compare bad vs good scores side by side.

**PageSpeed Insights** — paste any scenario URL at [pagespeed.web.dev](https://pagespeed.web.dev).

**DevTools Performance tab** — record a page load and inspect Long Tasks (red bars) to see TBT contributors.

---

## Stack

- Pure HTML / CSS / JS — no framework, no build step
- [`web-vitals`](https://github.com/GoogleChrome/web-vitals) v4 via unpkg CDN
- Hosted on GitHub Pages
- Images from [picsum.photos](https://picsum.photos)

---

## Resources

- [web.dev/metrics](https://web.dev/explore/metrics)
- [Chrome UX Report](https://developer.chrome.com/docs/crux)
- [Lighthouse docs](https://developer.chrome.com/docs/lighthouse/overview/)
- [web-vitals.js](https://github.com/GoogleChrome/web-vitals)
