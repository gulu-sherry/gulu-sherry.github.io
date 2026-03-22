
## Financial Risk Management

{% assign frm = site.data.financial_risk_course %}

- 状态：按 6 个 Topic 持续更新，Topic 1 至 Topic 3 已发布
{% for lesson in frm.lessons %}
- T{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
  - Source: [Course Material]({{ lesson.source }})
  {% endif %}
{% endfor %}
