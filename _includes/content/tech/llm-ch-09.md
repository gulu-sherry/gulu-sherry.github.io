# LLM（Chapter 9）

> 主题：LlamaGuard 安全防护与检索增强生成（Retrieval Augmented Generation, RAG）

## 一句话理解

这节课把“安全性”和“知识准确性”放到同一个系统视角里：前半讲如何防越狱攻击（Jailbreak），后半讲如何用 RAG 把模型回答建立在可检索证据上。

---

## 本讲核心问题

- 面对白盒/黑盒 Jailbreak，LLM 系统该如何分层防护？
- LlamaGuard 为什么要同时检查输入（prompt）和输出（response）？
- RAG 的核心流程是什么，和“纯参数记忆”有何区别？
- 检索质量如何影响最终回答质量，应该如何评估？

---

## 1. Jailbreak 攻击面：不只是“危险提问”

课程把攻击大致分为：

- 白盒攻击（White-box）：利用模型参数/梯度信息定向优化攻击提示
- 黑盒攻击（Black-box）：仅凭接口交互迭代构造绕过策略

典型黑盒路径包括：场景嵌套、上下文注入、代码注入、重写/加密 prompt、低资源语言迁移、变异选择算法等。

一句话理解：攻击者优化的是“绕过对齐机制的提示分布”。

---

## 2. LlamaGuard：输入输出双向安全分类器

LlamaGuard 的定位是“对话安全裁判器”：

- 对用户输入做风险分类
- 对模型输出再次审查
- 给出 `safe/unsafe` 与违规类别标签（taxonomy）

课件强调其评估常用 AUPRC（Area Under Precision-Recall Curve），尤其适合不均衡安全数据。

AUPRC 本质是对 PR 曲线面积积分：

<div class="card card-body bg-light my-3 text-center">
  $$
  \mathrm{AUPRC}=\int_{0}^{1} P(R)\,dR.
  $$
</div>

---

## 3. RAG 的基本思想：把“知道”拆成“检索 + 生成”

RAG（Retrieval Augmented Generation）将回答过程拆为两段：

1. 从外部知识库检索相关文档
2. 基于检索上下文进行条件生成

常见生成目标可写为：

<div class="card card-body bg-light my-3 text-center">
  $$
  p(y\mid x)\approx \sum_{d\in\mathcal{D}_{k}(x)} p(d\mid x)\,p(y\mid x,d),
  $$
</div>

其中 \(\mathcal{D}\_{k}(x)\) 表示 Top-\(k\) 检索文档集合。

一句话理解：RAG 让模型“先查资料再回答”。

---

## 4. Basic RAG Pipeline（基础流程）

| 阶段                 | 关键动作                                  | 目标                   |
| -------------------- | ----------------------------------------- | ---------------------- |
| 索引（Indexing）     | 文档切块（chunking）+ 向量化（embedding） | 建立可检索知识库       |
| 检索（Retrieval）    | 根据 query 找到 Top-k 文档                | 最大化证据相关性       |
| 增强（Augmentation） | 把证据拼接进 prompt                       | 给生成提供依据         |
| 生成（Generation）   | LLM 结合 query+context 回答               | 减少幻觉、提高可解释性 |

---

## 5. 检索打分：稀疏、稠密与混合

### 5.1 稠密检索常见打分（余弦相似度）

<div class="card card-body bg-light my-3 text-center">
  $$
  \mathrm{sim}(q,d)=
  \frac{\mathbf{e}_q^\top \mathbf{e}_d}
  {\lVert \mathbf{e}_q\rVert_2\lVert \mathbf{e}_d\rVert_2}.
  $$
</div>

### 5.2 混合检索（Hybrid Retrieval）

课件提到常见工程做法：先 BM25（稀疏）召回，再 Dense（向量）召回或重排（rerank），兼顾关键词精确性与语义泛化能力。

---

## 6. Advanced / Modular RAG：从“单链路”到“可组装系统”

课程展示了从 Naive RAG 到 Advanced/Modular RAG 的升级方向：

- Query 重写与分解（提升可检索性）
- 多路召回与重排（降低漏召/误召）
- 噪声过滤（减少无关证据污染）
- 模块解耦（检索器、重排器、生成器、评测器可独立替换）

关键提醒：检索噪声会显著拖累生成质量，尤其在长上下文场景下更明显。

---

## 7. RAG 评估：不只看最终答案

课程提到 RAGAS 等自动评估框架，常分三层：

- Answer Faithfulness：答案是否忠实于检索证据
- Answer Relevance：答案是否真正回答用户问题
- Context Relevance：检索上下文是否与问题相关

这意味着我们需要“检索指标 + 生成指标 + 端到端指标”联合评估。

---

## 系统流程图

```mermaid
flowchart LR
    A["User Query"] --> B["Safety Check (Input)"]
    B --> C["Retriever (Sparse + Dense)"]
    C --> D["Top-k Context"]
    D --> E["LLM Generator"]
    E --> F["Safety Check (Output)"]
    F --> G["Final Answer"]
```

---

## 常见误区

### 误区 1：有了 RAG 就不会幻觉

不对。若检索错、证据噪声高或提示拼接不当，仍会产生错误回答。

### 误区 2：安全只做输出审查就够了

不对。输入侧过滤与策略约束同样关键，否则风险会在生成前就被注入。

### 误区 3：检索 Top-k 越大越好

不对。上下文过长会引入噪声，导致注意力分散和回答退化。

---

## 本讲小结

- LlamaGuard 代表了“安全能力外置化”的系统思路：输入输出双向守卫。
- RAG 代表了“知识能力外置化”的系统思路：检索与生成协同。
- 生产级 LLM 需要安全链路和知识链路一起设计、一起评测。
