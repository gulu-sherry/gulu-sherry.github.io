---
layout: page
title: "Decision-making under uncertainty Chapter 3"
permalink: /tech/dmu/c3/
nav: false
_styles: |
  .mermaid {
    overflow-x: auto;
  }
  .mermaid svg {
    max-width: 100%;
    height: auto;
  }
  .post article h2 {
    font-size: 1.45rem;
  }
  .post article h3 {
    font-size: 1.2rem;
  }
mermaid:
  enabled: true
  zoomable: true
---

{% capture dmu_c3 %}{% include content/tech/dmu-ch-03.md %}{% endcapture %}
{{ dmu_c3 | markdownify }}
