# ⚡ Web Vitals Lab

> Interactive lab demonstrating Core Web Vitals anti-patterns and fixes across 8 real-world performance scenarios, with live metrics overlay.

🌐 **Live Site:** https://rsujathanr.github.io/web-vitals-lab/

---

## Scenarios

| # | Scenario | Metrics Impacted |
|---|----------|-----------------|
| 1 | 🖼️ Images | LCP, CLS, TBT |
| 2 | ⚙️ JavaScript | INP, TBT, FCP |
| 3 | 🎨 CSS | FCP, LCP, TBT |
| 4 | 🔤 Fonts | CLS, FCP, LCP |
| 5 | 📐 Layout Stability | CLS |
| 6 | 🌐 Network & Resource Hints | TTFB, LCP, FCP |
| 7 | 💾 Caching | TTFB, LCP |
| 8 | 🔌 Third-Party Scripts | TBT, FCP, INP, LCP |

Each scenario has a `bad.html` (anti-patterns with live proof) and `good.html` (production-grade fixes).

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

## Lighthouse Scores

### Images
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-images-score --> | <!-- good-images-score --> |
| LCP | <!-- bad-images-lcp --> | <!-- good-images-lcp --> |
| CLS | <!-- bad-images-cls --> | <!-- good-images-cls --> |
| Screenshot | ![Bad](docs/screenshots/images-bad.png) | ![Good](docs/screenshots/images-good.png) |

### JavaScript
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-js-score --> | <!-- good-js-score --> |
| TBT | <!-- bad-js-tbt --> | <!-- good-js-tbt --> |
| INP | <!-- bad-js-inp --> | <!-- good-js-inp --> |
| Screenshot | ![Bad](docs/screenshots/javascript-bad.png) | ![Good](docs/screenshots/javascript-good.png) |

### CSS
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-css-score --> | <!-- good-css-score --> |
| FCP | <!-- bad-css-fcp --> | <!-- good-css-fcp --> |
| Screenshot | ![Bad](docs/screenshots/css-bad.png) | ![Good](docs/screenshots/css-good.png) |

### Fonts
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-fonts-score --> | <!-- good-fonts-score --> |
| CLS | <!-- bad-fonts-cls --> | <!-- good-fonts-cls --> |
| Screenshot | ![Bad](docs/screenshots/fonts-bad.png) | ![Good](docs/screenshots/fonts-good.png) |

### Layout Stability
| | Bad | Good |
|--|-----|------|
| CLS | <!-- bad-layout-cls --> | <!-- good-layout-cls --> |
| Screenshot | ![Bad](docs/screenshots/layout-stability-bad.png) | ![Good](docs/screenshots/layout-stability-good.png) |

### Network
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-network-score --> | <!-- good-network-score --> |
| TTFB | <!-- bad-network-ttfb --> | <!-- good-network-ttfb --> |
| Screenshot | ![Bad](docs/screenshots/network-bad.png) | ![Good](docs/screenshots/network-good.png) |

### Caching
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-caching-score --> | <!-- good-caching-score --> |
| Screenshot | ![Bad](docs/screenshots/caching-bad.png) | ![Good](docs/screenshots/caching-good.png) |

### Third-Party Scripts
| | Bad | Good |
|--|-----|------|
| Performance | <!-- bad-third-party-score --> | <!-- good-third-party-score --> |
| TBT | <!-- bad-third-party-tbt --> | <!-- good-third-party-tbt --> |
| Screenshot | ![Bad](docs/screenshots/third-party-bad.png) | ![Good](docs/screenshots/third-party-good.png) |

---

## How to Measure

**Live overlay** — every scenario page has a floating metrics panel (bottom-right) powered by [`web-vitals`](https://github.com/GoogleChrome/web-vitals). Interact with the page to trigger INP, scroll to finalize LCP and CLS.

**Lighthouse** — open Chrome DevTools → Lighthouse tab → Performance → Analyze page load. Compare bad vs good scores.

**PageSpeed Insights** — paste any scenario URL at [pagespeed.web.dev](https://pagespeed.web.dev).

**DevTools Performance tab** — record a page load and inspect Long Tasks (red bars) to see TBT contributors.

---

## Stack

- Pure HTML / CSS / JS — no framework, no build step
- [`web-vitals`](https://github.com/GoogleChrome/web-vitals) v4 via CDN
- Hosted on GitHub Pages
- Images from [picsum.photos](https://picsum.photos)

---

## Resources

- [web.dev/metrics](https://web.dev/explore/metrics)
- [Chrome UX Report](https://developer.chrome.com/docs/crux)
- [Lighthouse docs](https://developer.chrome.com/docs/lighthouse/overview/)
- [web-vitals.js](https://github.com/GoogleChrome/web-vitals)
