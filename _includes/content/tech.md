# Tech: ML / DL / GL / LLM / Agent Notes

建议你把“技术栈”写成可复用的模板：**问题 → 数据 → 方法 → 评估 → 复盘**。

## Machine Learning（课程笔记）

{% assign ml_lee = site.data.ml_lee_course %}
### {{ ml_lee.course_title_zh }} / {{ ml_lee.course_title_en }}

{% for lesson in ml_lee.lessons %}
- L{{ lesson.no }} · [{{ lesson.title_zh }} / {{ lesson.title_en }}]({{ lesson.url | relative_url }})
  - 状态 / Status: {{ lesson.status }}
  - 视频 / Video: [YouTube]({{ lesson.source }})
{% endfor %}

> 维护说明 / Maintenance  
> 以后新增 L2/L3... 时，只需：  
> 1) 新建一节页面（如 `/tech/ml/lee/l2/`）  
> 2) 在 `_data/ml_lee_course.yml` 的 `lessons` 里追加一条记录  
> 目录会自动更新。

## 其他目录（示例）

- ML：特征工程、树模型、校准、稳定性
- DL：训练技巧、过拟合诊断、可解释性
- GL：图构建、GNN、动态图、评估指标
- LLM：prompt、RAG、微调、对齐与评估
- Agent：工具调用、工作流、记忆、可靠性

## 推荐写法（示例条目）

- 主题：RAG 评估
  - 你遇到的问题：检索命中但回答仍不对
  - 你的解决：chunk 策略 + rerank + cite
  - 你的评估：golden set + error taxonomy

