## Financial Risk Management

{% assign frm = site.data.financial_risk_course %}

- 状态：6 个 Topic 已全部发布
  {% for lesson in frm.lessons %}
- T{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
- Source: [Course Material]({{ lesson.source }})
  {% endif %}
  {% endfor %}

## Quantitative Finance

{% assign qf = site.data.quantitative_finance_course %}

- 状态：15 章已全部发布（系列完结）
  {% for lesson in qf.lessons %}
- C{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
- Source: [Course Material]({{ lesson.source }})
  {% endif %}
  {% endfor %}

## Stochastic Control in Finance

{% assign scf = site.data.stochastic_control_finance_course %}

- 状态：按 8 章持续更新，Chapter 1-4 已发布
  {% for lesson in scf.lessons %}
- C{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
- Source: [Course Material]({{ lesson.source }})
  {% endif %}
  {% endfor %}
