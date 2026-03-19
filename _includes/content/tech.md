

## Machine Learning（Lecture Notes）

{% assign ml_lee = site.data.ml_lee_course %}
### {{ ml_lee.course_title_zh }} / {{ ml_lee.course_title_en }}

{% for lesson in ml_lee.lessons %}
- L{{ lesson.no }} · [{{ lesson.title_zh }} / {{ lesson.title_en }}]({{ lesson.url | relative_url }})
  - Video: [YouTube]({{ lesson.source }})
{% endfor %}



