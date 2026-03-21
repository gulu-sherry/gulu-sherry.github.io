
## Machine Learning

{% assign ml_lee = site.data.ml_lee_course %}

{% for lesson in ml_lee.lessons %}
- L{{ lesson.no }} · [{{ lesson.title_zh }} ]({{ lesson.url | relative_url }})
  - Video: [YouTube]({{ lesson.source }})
{% endfor %}

## Monte Carlo Simulation

{% assign mcs = site.data.monte_carlo_course %}

- 系列入口：[{{ mcs.course_title_zh }}]({{ mcs.series_url | relative_url }})
- 状态：系列已建立，第一讲已发布，后续可继续增量更新

{% for lesson in mcs.lessons %}
- L{{ lesson.no }} - [{{ lesson.title_zh }}]({{ lesson.url | relative_url }})
  {% if lesson.source and lesson.source != "" %}
  - Source: [Course Material]({{ lesson.source }})
  {% endif %}
{% endfor %}
