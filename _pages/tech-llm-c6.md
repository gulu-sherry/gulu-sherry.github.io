---
layout: page
title: "LLM Chapter 6"
permalink: /tech/llm/c6/
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

{% capture llm_c6 %}{% include content/tech/llm-ch-06.md %}{% endcapture %}
{{ llm_c6 | markdownify }}
