# Financial Risk Management（Topic 5）

> 资料来源：`Fin_Risk_Topic_5.pdf`  
> 主题：违约混合模型（Mixture Models of Defaults）、CreditRisk+、条件独立（Conditional Independence）、扇区风险因子（Sector Risk Factors）

## 一句话理解

Topic 5 讨论的是：**信用组合里的相关违约，不一定非要直接设“相关系数”，也可以通过共同风险因子让违约概率先随机化，再在条件独立下自然生成厚尾损失分布。**

---

## 本 Topic 在整门课里的位置

Topic 3 用强度模型描述了单主体和多主体违约时间；  
Topic 4 讨论了信用衍生品和交易对手风险；  
Topic 5 则回到组合信用风险的核心难点之一：

- 如何刻画“违约聚集（default clustering）”
- 如何快速得到贷款组合的损失分布

这一讲是从“结构解释”走向“工业化计算”的关键一步。

---

## 本 Topic 讲了什么

从课件结构看，这一讲可以整理成四条主线：

| 模块 | 内容 |
| --- | --- |
| 5.1 | Bernoulli 混合模型与条件独立 |
| 5.1 | 随机违约概率如何诱导违约相关性 |
| 5.2 | CreditRisk+ 的 Poisson-Gamma 混合结构 |
| 5.2 | 扇区分析（Sector Analysis）与一般多因子扩展 |

如果只保留主线，就是：

> 先把“默认概率本身”设为随机变量，再利用共同因子让默认事件在条件上独立、在无条件上相关，最后用生成函数高效求出整个损失分布。

---

## 为什么重要

信用组合的关键难题不是单个借款人会不会违约，而是：

- 很多借款人会不会在同一时期集中违约
- 尾部损失会不会远比独立情形更厚

如果直接设违约相关矩阵：

- 参数很多
- 校准困难
- 经济含义常常不清晰

混合模型提供了另一种思路：

```mermaid
flowchart LR
    A["共同经济因子"] --> B["随机违约概率 P_i"]
    B --> C["条件独立违约事件 L_i"]
    C --> D["组合默认数 D_n"]
    D --> E["损失分布"]
    E --> F["VaR / ES / 资本配置"]
```

---

## 一、为什么我们关心违约依赖结构

课件一开始就点出：违约依赖结构决定了组合损失分布的形状，尤其决定了尾部到底有多厚。

这件事重要，因为它直接影响：

- 资本配置
- 偿付能力评估
- 极端信用风险（extreme credit risk）的判断

### 一句话理解

**同样的平均违约率，如果违约更集中发生，尾部损失会大很多。**

---

## 二、混合模型的核心想法：先随机化违约概率

普通 Bernoulli 违约变量只有 0 和 1 两个结果。  
混合模型的关键不是直接修改 `L_i`，而是把违约概率本身设成随机变量。

令：

- `L_i`：第 `i` 个主体的违约指示变量
- `P_i`：第 `i` 个主体在给定期限内的随机违约概率

则课件中写成：

<div class="card card-body bg-light my-3 text-center">
  $$
  L_i \sim B(1;P_i),
  \qquad
  P=(P_1,\dots,P_m)\sim F.
  $$
</div>

这里的经济含义是：

- `P_i` 不是常数
- 它会随共同经济状态变化
- 正是这种共同波动，让不同主体的违约发生联动

---

## 三、条件独立为什么是这类模型的核心假设

课件反复强调条件独立（Conditional Independence）：

> 给定共同风险因子之后，不同主体的违约事件彼此独立。

在混合模型里，这可以写成：

<div class="card card-body bg-light my-3 text-center">
  $$
  L_1,\dots,L_m \text{ are independent } \mid P.
  $$
</div>

于是联合概率可以分解为

<div class="card card-body bg-light my-3 text-center">
  $$
  P[L_1=\ell_1,\dots,L_m=\ell_m]
  =
  \int_{[0,1]^m}
  \prod_{i=1}^m
  P_i^{\ell_i}(1-P_i)^{1-\ell_i}
  \,dF(P_1,\dots,P_m).
  $$
</div>

### 一句话理解

**违约不是“直接相关”，而是“都受同一个坏宏观环境影响”，所以在给定环境后它们可以看作独立。**

---

## 四、违约相关性其实来自随机违约概率的协方差

在这个框架下，课件推导出很漂亮的关系：

<div class="card card-body bg-light my-3 text-center">
  $$
  E[L_i] = E[P_i],
  $$
</div>

以及

<div class="card card-body bg-light my-3 text-center">
  $$
  \mathrm{Cov}(L_i,L_j)
  =
  E[P_iP_j]-E[P_i]E[P_j]
  =
  \mathrm{Cov}(P_i,P_j).
  $$
</div>

这意味着：

> 违约事件之间的相关性，本质上来自违约概率本身的共同波动。

进一步，违约相关系数可写成

<div class="card card-body bg-light my-3 text-center">
  $$
  \mathrm{corr}(L_i,L_j)
  =
  \frac{\mathrm{Cov}(P_i,P_j)}
  {\sqrt{E[P_i](1-E[P_i])}\sqrt{E[P_j](1-E[P_j])}}.
  $$
</div>

---

## 五、一因子 Bernoulli 混合模型

如果组合较同质，可以进一步简化为：

- 所有主体共享同一个随机违约概率 `p`
- 条件于 `p`，违约事件独立

此时默认总数 `L` 的分布写成：

<div class="card card-body bg-light my-3 text-center">
  $$
  P[L=k]
  =
  \binom{m}{k}
  \int_0^1 p^k(1-p)^{m-k}\,dF(p).
  $$
</div>

这就是**二项分布的混合（mixture of binomials）**。

### 和普通二项分布有什么区别

- 若 `p` 固定，就是普通独立违约的 binomial
- 若 `p` 随经济状态波动，就会出现更厚的尾部

---

## 六、一因子模型下，相关性如何由 `var(p)` 决定

课件给出这个模型里最核心的公式之一：

<div class="card card-body bg-light my-3 text-center">
  $$
  \rho = \mathrm{corr}(L_i,L_j) = \frac{\mathrm{var}(p)}{p(1-p)},
  $$
</div>

其中 `p = E[p]`。

这个式子非常有直觉：

- `var(p)` 越大，说明宏观状态越不稳定
- 默认事件的联动就越强
- 损失分布尾部也越厚

### 常见误区

**误区：只要知道 pairwise correlation，损失分布就差不多确定了。**

不对。  
课件特别提醒：很多不同的混合分布 `F`，可以有相同的两两违约相关性，但会导出完全不同的尾部损失分布。

---

## 七、组合默认数的方差为什么会被额外放大

令组合默认数为

<div class="card card-body bg-light my-3 text-center">
  $$
  D_n = \sum_{i=1}^n L_i.
  $$
</div>

则在一因子 Bernoulli 混合模型中，

<div class="card card-body bg-light my-3 text-center">
  $$
  E[D_n] = np,
  $$
</div>

并且

<div class="card card-body bg-light my-3 text-center">
  $$
  \mathrm{var}(D_n)
  =
  np(1-p) + n(n-1)\mathrm{var}(p).
  $$
</div>

前一项是独立 Bernoulli 的普通波动，后一项就是共同因子带来的额外放大项。

若看分数损失 `D_n/n`，则

<div class="card card-body bg-light my-3 text-center">
  $$
  \mathrm{var}\left(\frac{D_n}{n}\right)
  \to
  \mathrm{var}(p)
  \qquad (n\to\infty).
  $$
</div>

### 一句话理解

**组合足够大以后，分散化并不能消掉共同因子的波动。**

---

## 八、为什么常用 Beta 分布做混合分布

课件用 Beta 分布来刻画随机违约概率 `p`：

<div class="card card-body bg-light my-3 text-center">
  $$
  f(x)
  =
  \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}
  x^{\alpha-1}(1-x)^{\beta-1},
  \qquad x\in[0,1].
  $$
</div>

其均值与方差为

<div class="card card-body bg-light my-3 text-center">
  $$
  E[p] = \frac{\alpha}{\alpha+\beta},
  \qquad
  \mathrm{var}(p)=
  \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.
  $$
</div>

### 为什么方便

- 支持集在 `[0,1]`
- 参数少，能直接控制均值和方差
- 很适合教学和快速实验

### 但不要过度解释

课件也提醒：Beta 分布主要是为了解析方便，不一定有很强的金融经济含义。

---

## 九、CreditRisk+ 到底在解决什么问题

CreditRisk+ 是一个工业界很经典的信用组合模型。  
它的目标不是细致解释每家公司的财务演化，而是：

> 在尽量少假设、尽量快计算的前提下，给出组合损失分布。

它的几个特点：

- 用精算思想而不是结构性公司价值模型
- 不靠大规模模拟，而偏向解析与数值快速算法
- 尤其适合做情景分析和资本度量

---

## 十、CreditRisk+ 的核心近似：Bernoulli 变 Poisson

在 CreditRisk+ 中，单个 obligor 的违约事件被近似成 Poisson 事件。  
这会带来解析便利，但也意味着：

- 理论上允许“同一 obligor 多次违约”
- 在 PD 很小的时候，这种近似通常还能接受

### 关键直觉

如果违约概率很小、组合很大，那么：

- binomial 可以被 Poisson 近似
- 再把 Poisson 参数随机化，就能得到更厚尾的默认数分布

---

## 十一、生成函数为什么在 CreditRisk+ 里这么重要

CreditRisk+ 大量使用概率生成函数（Probability Generating Function, PGF）。

对离散非负整数随机变量 `K`，定义

<div class="card card-body bg-light my-3 text-center">
  $$
  G_K(z)=E[z^K]=\sum_{k=0}^{\infty}P[K=k]z^k.
  $$
</div>

它的重要性在于：

- 系数直接对应概率质量函数
- 独立变量求和时，pgf 直接相乘
- 从“默认数分布”过渡到“损失金额分布”时非常方便

### 一个基础例子

Poisson 随机变量 `N \sim \text{Poisson}(\alpha)` 的 pgf 是

<div class="card card-body bg-light my-3 text-center">
  $$
  G_N(z)=e^{\alpha(z-1)}.
  $$
</div>

Bernoulli 随机变量 `Y` 的 pgf 则是

<div class="card card-body bg-light my-3 text-center">
  $$
  G_Y(z)=1+p(z-1).
  $$
</div>

---

## 十二、Poisson-Gamma 混合为什么会导出负二项分布

CreditRisk+ 的关键设定是：

- 条件于某个 sector intensity `x_k`，默认数服从 Poisson
- `x_k` 本身服从 Gamma 分布

令 sector risk factor `x_k \sim \Gamma(\alpha_k,\beta_k)`，则其均值和方差为

<div class="card card-body bg-light my-3 text-center">
  $$
  \mu_k=\alpha_k\beta_k,
  \qquad
  \sigma_k^2=\alpha_k\beta_k^2.
  $$
</div>

因此可反推出

<div class="card card-body bg-light my-3 text-center">
  $$
  \alpha_k = \frac{\mu_k^2}{\sigma_k^2},
  \qquad
  \beta_k = \frac{\sigma_k^2}{\mu_k}.
  $$
</div>

把 Poisson 的条件 pgf 对 Gamma 分布积分后，课件得到：

<div class="card card-body bg-light my-3 text-center">
  $$
  F_k(z)
  =
  [1-\beta_k(z-1)]^{-\alpha_k}.
  $$
</div>

这正是负二项型（negative binomial-type）的 pgf。

### 一句话理解

**固定 Poisson 太“薄尾”；把它的强度再随机化，尾部自然就厚起来了。**

---

## 十三、扇区分析：相关性通过 sector factor 隐式产生

CreditRisk+ 不直接给 obligor-obligor 设相关系数，而是把组合按 sector 拆开：

- 行业
- 国家
- 评级层级

每个 sector 有自己的随机强度 `x_k`，均值为该 sector 的预期默认数：

<div class="card card-body bg-light my-3 text-center">
  $$
  \mu_k = \sum_{A\in S_k} P_A.
  $$
</div>

同一 sector 内主体共享同一个风险驱动，因此违约会联动；  
不同 sector 若相互独立，整体组合 pgf 就是各 sector pgf 的乘积：

<div class="card card-body bg-light my-3 text-center">
  $$
  F(z)=\prod_{k=1}^n F_k(z).
  $$
</div>

### 为什么这样做有用

- 参数数量明显少于全相关矩阵
- 每个 sector 有一定经济解释
- 更适合工业级快速计算

---

## 十四、从默认数走到损失金额：暴露带（Exposure Bands）

课件里还有一个很实际的处理：把损失金额离散化。

对于 obligor `A`：

- 原始敞口损失记作 `\tilde v_A`
- 取一个基本损失单位 `L`
- 把它四舍五入到 `v_A L`

为了补偿离散化误差，调整后的违约概率取为

<div class="card card-body bg-light my-3 text-center">
  $$
  P_A = \frac{\tilde v_A}{v_A L}\tilde P_A.
  $$
</div>

这一步的目的很朴素：

- 把连续的损失金额变成整数单位
- 这样就能直接用 pgf 处理整组合损失分布

---

## 十五、损失金额分布的生成函数

对于 sector `k`，课件把暴露结构写成多项式

<div class="card card-body bg-light my-3 text-center">
  $$
  P_k(z)
  =
  \frac{1}{\mu_k}
  \sum_{A\in S_k}
  \frac{\varepsilon_A}{v_A} z^{v_A},
  $$
</div>

其中 `\varepsilon_A` 是 obligor `A` 的期望损失。

于是 sector 的损失 pgf 为

<div class="card card-body bg-light my-3 text-center">
  $$
  G_k(z)=F_k(P_k(z)).
  $$
</div>

整个组合的损失 pgf 为

<div class="card card-body bg-light my-3 text-center">
  $$
  G(z)=\prod_{k=1}^n G_k(z).
  $$
</div>

这就是 CreditRisk+ 的计算核心：  
**先求每个 sector 的默认数分布，再与暴露分布复合，最后合成为整个组合损失分布。**

---

## 十六、一般扇区分析：一个 obligor 也可以受多个因子影响

课件进一步推广到一般 sector analysis。  
不再要求每个 obligor 只属于一个 sector，而是允许它对多个 sector factor 有暴露：

<div class="card card-body bg-light my-3 text-center">
  $$
  \sum_{k=1}^n \theta_{Ak}=1.
  $$
</div>

这里 `\theta_{Ak}` 表示 obligor `A` 对 sector `k` 风险因子的依赖权重。

于是随机默认强度可以写为

<div class="card card-body bg-light my-3 text-center">
  $$
  x_A
  =
  P_A
  \left(
    \theta_{A0} + \theta_{A1}S_1 + \cdots + \theta_{AK}S_K
  \right),
  $$
</div>

其中各 `S_k` 通常服从 Gamma 分布。

### 一句话理解

**一个企业的信用风险可以同时受行业、地区、评级、宏观因子影响，而不是只能贴一个标签。**

---

## 十七、CreditRisk+ 的优点与局限

### 优点

- 输入要求相对少
- 计算快，适合情景分析
- 不依赖大规模 Monte Carlo
- 尾部概率可比纯模拟更稳定

### 局限

- 使用 Poisson 近似，允许“多次违约”这种理论悖论
- 默认相关性范围有限，往往偏正且偏温和
- 对 recovery、rating migration、动态路径的刻画较弱
- 更偏组合分布计算，不太回答“为什么某个企业今天会违约”

---

## 常见误区

### 误区 1：条件独立等于违约独立

不对。  
条件独立说的是“给定共同因子之后”独立；无条件下仍然可能高度相关。

### 误区 2：只要 pairwise correlation 一样，尾部风险也差不多

不对。  
不同 mixing distribution 可以给出相同 pairwise correlation，却产生完全不同的尾部厚度。

### 误区 3：CreditRisk+ 是在精确模拟企业违约机制

不是。  
它更像是一个解析型组合损失引擎，而不是公司层面的结构模型。

### 误区 4：扇区分得越细越好

也不一定。  
分得太细会降低每个 sector 的稳定性和可解释性，还可能让参数更难估计。

---

## Topic 5 小结

### 这一讲真正建立了什么

- 理解混合模型如何通过随机违约概率产生默认相关性
- 掌握条件独立在信用组合模型中的意义
- 理解一因子 Bernoulli mixture 下相关性与 `var(p)` 的关系
- 认识 Beta mixing 如何改变尾部厚度
- 掌握 CreditRisk+ 的 Poisson-Gamma 核心结构
- 理解 sector analysis 如何把相关性嵌入组合损失分布
- 理解 pgf 为什么适合快速计算信用组合损失

### 一句话总结

**Topic 5 的核心，是把“违约相关性”转写成“共同因子驱动下违约概率的随机波动”，并用 CreditRisk+ 把这种厚尾结构高效地映射成组合损失分布。**

---

## 可继续思考的问题

1. 为什么条件独立模型虽然简单，却仍能生成很强的尾部聚集风险？
2. 如果两个模型给出相同的平均 PD 和 pairwise correlation，为什么 VaR 仍可能差很多？
3. CreditRisk+ 为什么特别适合大组合、低 PD 的贷款组合？
4. 在实际业务里，sector 应该按行业、地区、评级，还是这些维度混合来划分？
