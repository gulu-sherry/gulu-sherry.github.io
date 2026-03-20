---
layout: page
title: 主页
permalink: /
nav: false
---

<div class="lanyon-home">
  <aside class="lanyon-sidebar-card">
    <div class="lanyon-sidebar-card__kicker">Learn by doing</div>
    <h1 class="lanyon-sidebar-card__title">咕噜（Sherry）</h1>
    <p class="lanyon-sidebar-card__text">
      香港科技大学（广州）金融科技学域博士二年级，持续公开记录 FIN / Tech 学习、实验与项目。
    </p>
    <nav class="lanyon-sidebar-card__nav">
      <a href="#intro">首页</a>
      <a href="#fin">FIN</a>
      <a href="#tech">Tech</a>
      <a href="#intern">实习</a>
      <a href="#discuss">讨论</a>
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
      <div class="lanyon-hero__eyebrow">Learn in public · 每一步都算数</div>
      <h2 class="lanyon-hero__title">你好，我是咕噜（Sherry）。</h2>
      <p class="lanyon-hero__lead">
        这个网站用来公开记录学习与实验，帮助我对抗焦虑和脆弱，也希望能帮到一些人。
      </p>
      <p class="lanyon-hero__note">爱好羽毛球；有两只猫：咕噜、金猫猫。</p>
    </section>

    <section id="fin" class="home-section home-section--fin lanyon-section">
      <div class="home-section__head">
        <h2>FIN（学术）</h2>
        <p class="text-muted mb-0">课程 / 讲义 / 推导 / 阅读清单。内容来自 <code>content/fintech.md</code>。</p>
      </div>
      {% capture fin_md %}{% include content/fintech.md %}{% endcapture %}
      <div class="home-md">{{ fin_md | markdownify }}</div>
    </section>

    <section id="tech" class="home-section home-section--tech lanyon-section">
      <div class="home-section__head">
        <h2>Tech（作品集）</h2>
        <p class="text-muted mb-0">把能力变成可点开的证据：Problem / Data / Method / Eval / Reproduce。内容来自 <code>content/tech.md</code>。</p>
      </div>
      {% capture tech_md %}{% include content/tech.md %}{% endcapture %}
      <div class="home-md">{{ tech_md | markdownify }}</div>
    </section>

    <section id="intern" class="home-section lanyon-section">
      <div class="home-section__head">
        <h2>我在找实习（LLM × Finance）</h2>
        <p class="text-muted mb-0">内容来自 <code>content/interns.md</code>。</p>
      </div>
      {% capture interns_md %}{% include content/interns.md %}{% endcapture %}
      <div class="home-md">{{ interns_md | markdownify }}</div>
    </section>

    <section id="discuss" class="home-section lanyon-section">
      <div class="home-section__head">
        <h2>讨论</h2>
        <p class="text-muted mb-0">公开提出问题，比“发结论”更容易遇见同路人。内容来自 <code>content/discussions.md</code>。</p>
      </div>
      {% capture disc_md %}{% include content/discussions.md %}{% endcapture %}
      <div class="home-md">{{ disc_md | markdownify }}</div>
    </section>

    <section id="contact" class="home-section lanyon-section">
      <div class="home-section__head">
        <h2>联系</h2>
        <p class="text-muted mb-0">建议把最重要的链接固定在这里。</p>
      </div>
      <div class="home-contact">
        <a class="btn btn-sm btn-primary" href="https://github.com/gulu-sherry" target="_blank" rel="noreferrer">GitHub</a>
        <a class="btn btn-sm btn-outline-primary" href="{{ '/about/' | relative_url }}">About（学术页）</a>
      </div>
    </section>
  </div>
</div>

