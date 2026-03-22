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

- 状态：按 15 章持续更新，Chapter 1 与 Chapter 2 已发布
  {% for lesson in qf.lessons %}
- C{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
  - Source: [Course Material]({{ lesson.source }})
    {% endif %}
    {% endfor %}
