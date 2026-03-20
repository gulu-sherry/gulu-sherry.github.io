

## Machine Learning

{% assign ml_lee = site.data.ml_lee_course %}

{% for lesson in ml_lee.lessons %}
- L{{ lesson.no }} · [{{ lesson.title_zh }} ]({{ lesson.url | relative_url }})
  - Video: [YouTube]({{ lesson.source }})
{% endfor %}



