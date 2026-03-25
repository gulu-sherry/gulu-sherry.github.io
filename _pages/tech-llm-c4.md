---
layout: page
title: "LLM Chapter 4"
permalink: /tech/llm/c4/
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

{% capture llm_c4 %}{% include content/tech/llm-ch-04.md %}{% endcapture %}
{{ llm_c4 | markdownify }}
