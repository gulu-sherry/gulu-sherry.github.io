---
layout: page
title: "Stochastic Control in Finance Chapter 1"
permalink: /fin/scf/c1/
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

{% capture scf_c1 %}{% include content/fin/scf-ch-01.md %}{% endcapture %}
{{ scf_c1 | markdownify }}
