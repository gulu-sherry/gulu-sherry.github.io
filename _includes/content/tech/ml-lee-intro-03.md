# 李宏毅机器学习（Lecture 3）
# Hung-yi Lee ML (Lecture 3)

> 视频 / Video: [Youtube课程](https://www.youtube.com/watch?v=WeHM2xpYQpw&list=PLJV_el3uVTsMhtt7_Y6sgTHGHp1Vb2P2J&index=3)



---

## A. 作业长什么样？训练数据（Training Data） vs 测试数据（Test Data）

这门课前期的多个作业（例如作业二到作业五）虽然任务不同，但形式高度相似：

### 1）训练数据（Training Data）
训练数据里通常包含样本的：
- 输入（Feature / \(x^i\)）
- 预测目标（Label / \( \hat{y}^i \) 或 \(y^i\)）

直觉上：你拿到的是一堆“输入—正确答案”的配对。

### 2）测试数据（Test Data）
测试数据里只有输入 \(x\)，没有答案 \(y\)。

你做的事就是：先训练出参数（参数向量）\(\theta^*\)，再把 \(\theta^*\) 代入模型去预测测试输出，并提交到 Kaggle。

---

## B. 训练（Training）到底在做什么：f\(_\theta\)(x) → Loss → Optimization

老师把训练过程总结成三步（你可以当作所有作业的通用套路）：

1. **定义模型（Model）**：带未知参数的函数  
   \[
   f_\theta(x)
   \]
   - \(\theta\)：模型里所有未知参数（parameter set）
   - 输入 \(x\)：特征（feature）

2. **定义损失（Loss）函数**：  
   Loss 本身是一个函数，输入是一组参数值 \(\theta\)，输出表示“这组参数好不好”：
   \[
   L(\theta)
   \]

3. **优化（Optimization）**：  
   找到让 Loss 最小的参数：
   \[
   \theta^* = \arg\min_\theta L(\theta)
   \]

最后把 \(\theta^*\) 代入测试数据，得到预测值并提交。

> 常见现实提醒：直接跑助教的 sample code 往往只能得到一个 very simple baseline（简单基线），想变好需要更系统的“诊断（diagnosis）+改进（improvement）”。

---

## C. 先看训练损失（Training Loss）：Model Bias vs Optimization vs Overfitting

当你在 Kaggle 上的分数不满意时，老师的第一建议是：
**先检查 Training Loss，再决定接下来该怀疑什么。**

### 1）数据分布：Mismatch（分布不匹配）

一类容易被误认为 overfitting 的问题：

- 如果训练集（Training Set）和测试集（Test Set）的数据生成分布不同（distribution mismatch），你怎么加模型复杂度/怎么调训练，都可能很难改善。

> 典型：训练时学到的规律根本不适用于测试时的世界。

---

### 2）决策表：用 Training/Test Loss 判断问题来源

| 现象 | 更可能的原因 | 你该怎么做 |
|---|---|---|
| Training Loss 很大 | Model Bias（模型偏差：模型表达能力不够） 或 Optimization（优化没做好） | 增强模型表达能力（加特征/增大模型/更换架构）或改进优化策略（避免梯度下降失败） |
| Training Loss 很小，但 Testing/Validation Loss 很大 | Overfitting（过拟合） | 用正则化（Regularization）、Dropout、Early stopping、Data augmentation（数据增强）等限制自由度 |
| Training/Test 都很差 | Mismatch（分布不匹配） | 回到数据划分与任务设计；通常不是“调模型就能救” |

---

## D. Model Bias（模型偏差）是什么意思？为什么太简单会“永远找不到针”

老师用非常形象的比喻解释 Model Bias：

- 你有一个允许的模型集合（function set），对应不同参数 \(\theta\) 可以产生不同函数；
- 如果这个集合太小，里面**没有任何一个函数**能把 Loss 降到很低；
- 那么即使你算出了 \(\theta^*\)（在你集合里最好的那个），Loss 也仍然不会足够低。

**解决方向**（课堂结论）：
- 增加输入特征（features）
- 使用更大/更灵活的模型（例如更深的网络，深度学习）

---

## E. Optimization（优化问题）是什么意思？Residual Network 的例子

当你怀疑“不是模型不够大，而是梯度下降（Gradient Descent）没找到好解”时，老师给了一个判断方法：

**比较不同深度（depth）的模型在 Training Loss 上的上限。**

课堂例子：Residual Network（残差网络）论文的片段：
- 20 层网络在训练过程中能达到更低的 Training Loss
- 56 层网络反而训练不上去（Training Loss 更高）

如果 56 层网络表达能力（Model capacity）理论上更强，那它没做到，说明更可能是 **Optimization 不给力（optimization failure）**，而不是 overfitting 或 model bias。

---

## F. Overfitting（过拟合）是什么？训练损失（train）小，测试损失（test）大

Overfitting（过拟合）在课堂里被严格定义为：
- **Training Loss 变好（更低）**
- 但 **Testing Loss 不跟着变好（更高）**

老师给了极端直觉例子：
- 如果模型“太会记”（capacity 很大），它可以在训练点上完美拟合
- 但在训练没见过的位置（测试点）上会产生“自由发挥（freestyle）”，导致测试损失暴涨

---

## G. 过拟合（Overfitting）怎么解决？

课堂提到两个大方向：

### 方向 1：增加训练数据（Training Data）
最直观有效，但在作业中不允许你去“额外搜集数据”。

因此落地变成：
- Data augmentation（数据增强）：基于任务理解，生成合理的新样本  
  （例如图像的左右翻转、裁剪缩放等）

### 方向 2：限制模型自由度（降低表达能力）
给模型加“限制（constraint）”，让它更不容易在训练点上乱拟合。

课堂举例：
- 让模型参数更少（less neurons）
- 参数共享（shared parameters）
- 用更少的特征（fewer features）
- Early stopping（早停）
- Regularization（正则化）
- Dropout（随机丢弃）

> 重要提醒：约束太强会反过来带来 Model Bias（模型偏差）。

---

## H. 模型复杂度（Complexity）怎么选？Validation（验证）比 Public leaderboard（公开榜）更靠谱

老师用直观曲线说明：
- 模型越复杂（complex），Training Loss 往往越低
- Testing Loss 会先下降后上升（到达 overfitting 发生的拐点之后）

因此要找“中庸”（not too complex, not too simple）的模型。

### 1）Public vs Private：别在公开榜上“反复试错”
Kaggle 通常会把测试分成：
- **Public testing set（公开榜）**
- **Private testing set（私有榜）**

如果你反复根据 Public leaderboard（公开榜）调模型，你就可能在 Public 上过拟合，而在 Private 上翻车。

### 2）正确做法：Validation Set（验证集）选模型
老师推荐：
- 把训练数据划分成 Training Set 和 Validation Set
- 用 Validation Loss 选择模型
- 选好后再看 Kaggle（公共/私有）结果

---

## I. N-fold Cross Validation（N 折交叉验证）：更稳的模型选择

当你担心 Validation 划分不理想，老师给出 N-fold Cross Validation：

1. 将训练数据切成 N 份
2. 轮流用其中 1 份做 Validation，其余做 Training
3. 得到每个模型在 N 个 setting 下的平均结果
4. 选择平均表现最好的模型

---

## J. 课堂实例：2/26 的预测很差，并不是“模型坏了”，而是 Mismatch（分布不匹配）

老师最后展示了一个“看起来很惨”的预测例子：
- 2/26 是某次观看人次的最高日（反常低谷/高谷）
- 但模型预测仍然偏离很大（误差很明显）

原因并非单纯 overfitting，而是：真实数据里出现了训练分布里没有覆盖的情形（课堂中举了与节日相关的“特殊日”）。

这就是 Mismatch（分布不匹配）：模型学到的规律无法覆盖新情况。

---

## K. 一张脑图：从“记录 Loss”到“选择解决方案”

```mermaid
flowchart TB
    A[先记录 Training Loss / Testing Loss\n并判断是否 mismatch] --> B{Training Loss 大吗？}
    B -- 是 --> C{模型表达够吗？}
    C -- 不够 --> C1[Model Bias（模型偏差）\n加特征/增大模型/深度学习]
    C -- 够 --> C2[Optimization（优化问题）\n比较浅/深模型\n检查梯度下降是否没找到好解]
    B -- 否 --> D{Testing Loss 大吗？}
    D -- 是 --> D1[Overfitting（过拟合）\nRegularization/Dropout/Early stopping\nData augmentation]
    D -- 否 --> D2[模型工作正常\n只需做微调/提升基线]
    A --> E{如果分布明显不同}\n
    E --> E1[Mismatch（分布不匹配）\n问题往往需要重做数据/任务设计]
```

> 注：这张图把课堂大部分结论串起来；你每次遇到作业不理想，都可以先按它走一遍。

---

## L. 思考

1. 你的作业里，training loss 和 testing loss 的变化趋势说明了什么？
2. 你有没有做过“浅模型 vs 深模型”的对比来区分 optimization failure 和 model bias？
3. 你是否因为反复看 Public leaderboard 而可能产生了 “选择过拟合”？你会怎么避免？

