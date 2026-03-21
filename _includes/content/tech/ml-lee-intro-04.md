# 李宏毅机器学习（Lecture 4）
# Hung-yi Lee ML (Lecture 4)

> 视频 / Video: [Youtube课程](https://www.youtube.com/watch?v=WeHM2xpYQpw&list=PLJV_el3uVTsMhtt7_Y6sgTHGHp1Vb2P2J&index=4)
---

## A. 为什么 Optimization（优化）会失败？

当我们在进行模型训练时，常会遇到参数更新后，**Training Loss（训练损失）** 不再下降，但我们对结果仍不满意。这通常不是 **Overfitting（过拟合）** 的问题，而是 **Optimization（优化）** 出了问题。

### 1）常见的现象
* **深层 vs. 浅层**：深层网络的表现甚至不如浅层网络或线性模型，说明 Deep Network 的潜力没被发挥。
* **一开始就卡住**：无论如何更新参数，Loss 完全掉不下去。

### 2）失败的猜想：梯度为零
过去认为训练停滞是因为走到了 **Gradient（梯度）** 为零的地方，导致参数无法再更新。这些点统称为 **Critical Point（临界点/驻点）**。

---

## B. 认识 Critical Point（临界点）

当 Gradient 为零时，并非只有大家常说的 **Local Minima（局部极小值）**，还有其他可能性。

1.  **Local Minima（局部极小值）**：四周都比现在的点高，无路可走。
2.  **Local Maxima（局部极大值）**：四周都比现在的点低。
3.  **Saddle Point（鞍点）**：梯度为零，但不是极大值也不是极小值。在某些方向是高点，某些方向是低点（形状像马鞍）。

> **关键观念**：如果你卡在 **Saddle Point（鞍点）**，其实不用害怕，因为旁边还有路可以让 Loss 更低；但如果卡在 **Local Minima**，则相对困难。

---

## C. 数学侦测：它是哪种 Critical Point？

虽然我们无法看清复杂 Loss function 的全貌，但可以用 **Taylor Series Approximation（泰勒级数近似）** 来分析参数 $\theta'$ 附近的地貌。

### 1）泰勒级数近似公式

$$L(\theta) \approx L(\theta') + (\theta - \theta')^T g + \frac{1}{2}(\theta - \theta')^T H (\theta - \theta')$$

* **$g$ (Gradient)**：一次微分。在 Critical Point 时，$g = 0$（向量为零）。
* **$H$ (Hessian)**：二次微分矩阵，收集了所有二次偏微分项 $H_{ij} = \frac{\partial^2 L}{\partial \theta_i \partial \theta_j}$。

### 2）利用 Hessian ($H$) 判断地貌
当 $g=0$ 时，剩余项为 $\frac{1}{2}v^T H v$（其中 $v = \theta - \theta'$）：

| 条件 | 矩阵特性 | 地貌类型 |
| :--- | :--- | :--- |
| 对所有 $v$，$v^T H v > 0$ | Positive Definite (正定) | **Local Minima** (所有特征值为正) |
| 对所有 $v$，$v^T H v < 0$ | Negative Definite (负定) | **Local Maxima** (所有特征值为负) |
| $v^T H v$ 有正负之分 | 有正负特征值 | **Saddle Point** (鞍点) |

---

## D. 如何逃离 Saddle Point（鞍点）？

如果你发现目前的 Critical Point 是 **Saddle Point**，Hessian 矩阵不仅能告诉你身份，还能指引更新方向。

**方法：利用负的 Eigenvalue（特征值）**
1.  找到 $H$ 的一个负特征值 $\lambda < 0$。
2.  找出其对应的 **Eigenvector（特征向量）** $u$。
3.  **沿着 $u$ 的方向更新参数**：让 $\theta = \theta' + u$。
4.  数学证明在该方向上，$\frac{1}{2}u^T H u = \frac{1}{2}\lambda \|u\|^2 < 0$，这会使 $L(\theta) < L(\theta')$，从而降低 Loss。

---

## E. 案例分析：史上最废的神经网络

考虑一个只有两个参数 $w_1, w_2$ 的网络：$y = w_1 \cdot w_2 \cdot x$，训练数据只有一笔 $(x=1, \hat{y}=1)$。

* **Loss Function**: $L = (1 - w_1 w_2)^2$
* **Critical Point**: 在原点 $(0,0)$ 处，$g=0$。
* **Hessian at (0,0)**: 算出矩阵为 $\begin{bmatrix} 0 & -2 \\ -2 & 0 \end{bmatrix}$。
* **Eigenvalues**: 算出为 $2$ 与 $-2$（有正有负）。
* **结论**: 原点是个 **Saddle Point**。

---

## F. 高维度空间的启示：Local Minima 真的常见吗？

### 1）《三体》故事的启示
在低维度看起来是 Local Minima 的点，在更高维度往往只是 Saddle Point。维度越高，路就越多。

### 2）Minimum Ratio（极小值比例）
实验发现，在动辄百万维度的参数空间中，负的特征值比例通常仍占据一定程度，**真正的 Local Minima 其实非常罕见**。

---

## G. 总结脑图

```mermaid
graph TD
    A[Optimization 停滞 Gradient=0] --> B{它是哪种 Critical Point?}
    B -->|四周皆高| C[Local Minima 局部极小值]
    B -->|有高有低| D[Saddle Point 鞍点]
    
    C --> C1[高维空间极其罕见]
    D --> D1[可以逃离]
    D1 --> D2[找负特征值对应的特征向量<br/>沿此方向更新参数]
    
    E[实务考量] --> E1[Hessian 运算量巨大<br/>通常使用其他优化算法]
    E --> E2[高维空间中鞍点远比局部极小值常见]
