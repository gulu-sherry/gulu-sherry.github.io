---
layout: page
title: 主页
permalink: /
nav: false
---

<div class="lanyon-home">
  <aside class="lanyon-sidebar-card">
    <div class="lanyon-sidebar-card__kicker">Done is Better than Perfect</div>
    <h1 class="lanyon-sidebar-card__title">咕噜</h1>
    <p class="lanyon-sidebar-card__text">
      PhD candidate, FINTECH Thrust, HKUST(GZ).
    </p>
    <nav class="lanyon-sidebar-card__nav">
      <a href="#intro">首页</a>
      <a href="#fin">FIN</a>
      <a href="#tech">Tech</a>
      <a href="#intern">实习</a>
      <a href="#contact">联系</a>
    </nav>
    <div class="lanyon-sidebar-card__meta">
      <div>Information Design</div>
      <div>LLM Agent in Finance</div>
      <div>Graph Learning in Finance</div>
      <div>Diffusion in Time-Series</div>
    </div>
  </aside>

  <div class="lanyon-content">
    <section id="intro" class="lanyon-hero">
      <div class="lanyon-hero__eyebrow"></div>
      <h2 class="lanyon-hero__title">Hi，我是咕噜</h2>
      <p class="lanyon-hero__lead">

      </p>
      <p class="lanyon-hero__note"></p>
    </section>

    <section id="fin" class="home-section home-section--fin lanyon-section">
      <div class="home-section__head">
        <h2>FIN</h2>
        <p class="text-muted mb-0"></p>
      </div>
      {% capture fin_md %}{% include content/fintech.md %}{% endcapture %}
      <div class="home-md">{{ fin_md | markdownify }}</div>
    </section>

    <section id="tech" class="home-section home-section--tech lanyon-section">
      <div class="home-section__head">
        <h2>Tech</h2>
        <p class="text-muted mb-0"></p>
      </div>
      {% capture tech_md %}{% include content/tech.md %}{% endcapture %}
      <div class="home-md">{{ tech_md | markdownify }}</div>
    </section>

    <section id="intern" class="home-section lanyon-section">
      <div class="home-section__head">
        <h2>LLM × Finance</h2>
        <p class="text-muted mb-0"></p>
      </div>
      {% capture interns_md %}{% include content/interns.md %}{% endcapture %}
      <div class="home-md">{{ interns_md | markdownify }}</div>
    </section>


    <section id="contact" class="home-section lanyon-section">
      <div class="home-section__head">
        <h2>联系</h2>
        <p class="text-muted mb-0"></p>
      </div>
      <div class="home-contact">
        <a class="btn btn-sm btn-primary" href="https://github.com/gulu-sherry" target="_blank" rel="noreferrer">GitHub</a>
        <a class="btn btn-sm btn-outline-primary" href="{{ '/about/' | relative_url }}">About（学术页）</a>
      </div>
    </section>
  </div>
</div>

