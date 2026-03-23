## Machine Learning

{% assign ml_lee = site.data.ml_lee_course %}

{% for lesson in ml_lee.lessons %}

- L{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
- Video: [YouTube]({{ lesson.source }})
  {% endif %}
  {% endfor %}

## Monte Carlo Simulation

{% assign mcs = site.data.monte_carlo_course %}

- 状态：4 个 Topic 已全部发布
  {% for lesson in mcs.lessons %}
- T{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
- Source: [Course Material]({{ lesson.source }})
  {% endif %}
  {% endfor %}

## Decision-making under uncertainty

{% assign dmu = site.data.decision_under_uncertainty_course %}

- 状态：按 12 章持续更新，Chapter 1 已发布
  {% for lesson in dmu.lessons %}
- C{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% endfor %}
