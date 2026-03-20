---
layout: page
title: 主页
permalink: /
nav: false
---

<div class="home-hero">
  <div class="home-hero__kicker">Done is Better than Perfect</div>
  <h1 class="home-hero__title">你好，我是 <span class="home-hero__accent">咕噜</span>（Sherry）。</h1>
  <p class="home-hero__subtitle">
    香港科技大学（广州）金融科技学域博士二年级。我会在这里分享有关FINTECH的知识。 
  </p>
  <div class="home-hero__chips">
    <span class="chip">Information Design</span>
    <span class="chip">LLM in Finance</span>
    <span class="chip">Graph Learning in Finance</span>
    <span class="chip">Diffusion in Time-Series</span>
  </div>
  <div class="home-hero__nav">
    <a class="btn btn-sm btn-outline-primary" href="#fin">FIN </a>
    <a class="btn btn-sm btn-outline-primary" href="#tech">Tech </a>
    <a class="btn btn-sm btn-outline-primary" href="#intern">实习</a>
    <a class="btn btn-sm btn-outline-primary" href="#discuss">联系</a>
  </div>
  <div class="home-hero__note">
    羽毛球；猫咪。
  </div>
</div>

<hr class="home-hr" />

<section id="fin" class="home-section home-section--fin">
  <div class="home-section__head">
    <h2>FIN</h2>
    <p class="text-muted mb-0">课程笔记</p>
  </div>
  {% capture fin_md %}{% include content/fintech.md %}{% endcapture %}
  <div class="home-md">{{ fin_md | markdownify }}</div>
</section>

<hr class="home-hr" />

<section id="tech" class="home-section home-section--tech">
  <div class="home-section__head">
    <h2>Tech</h2>
    <p class="text-muted mb-0"></p>
  </div>
  {% capture tech_md %}{% include content/tech.md %}{% endcapture %}
  <div class="home-md">{{ tech_md | markdownify }}</div>
</section>

<hr class="home-hr" />

<section id="intern" class="home-section">
  <div class="home-section__head">
    <h2>LLM × Finance</h2>
    <p class="text-muted mb-0">内容来自 <code>content/interns.md</code>。</p>
  </div>
  {% capture interns_md %}{% include content/interns.md %}{% endcapture %}
  <div class="home-md">{{ interns_md | markdownify }}</div>
</section>

<hr class="home-hr" />

<section id="discuss" class="home-section">
  <div class="home-section__head">
    <h2>讨论</h2>
    <p class="text-muted mb-0"></p>
  </div>
  {% capture disc_md %}{% include content/discussions.md %}{% endcapture %}
  <div class="home-md">{{ disc_md | markdownify }}</div>
</section>

<hr class="home-hr" />

<section id="contact" class="home-section">
  <div class="home-section__head">
    <h2>联系</h2>
    <p class="text-muted mb-0"></p>
  </div>
  <div class="home-contact">
    <a class="btn btn-sm btn-primary" href="https://github.com/gulu-sherry" target="_blank" rel="noreferrer">GitHub</a>
    <a class="btn btn-sm btn-outline-primary" href="{{ '/about/' | relative_url }}">About（学术页）</a>
  </div>
</section>

