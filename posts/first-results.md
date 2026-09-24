Here is a short write-up of early experiments. Replace this text with your own findings.

![Training loss for the baseline (grey) and the proposed method (blue)](assets/cover.svg)

## Setup

We compare a baseline against the proposed method on the same data split. The core update looks like this:

```python
import numpy as np

def step(w, grad, lr=0.1, decay=1e-4):
    """One regularized gradient step."""
    return w - lr * (grad + decay * w)

w = np.zeros(3)
for _ in range(100):
    w = step(w, grad=np.array([1.0, -2.0, 0.5]))
print(w)
```

## Results

| Method   | Accuracy | Time (s) |
|----------|---------:|---------:|
| Baseline |     81.2 |       42 |
| Proposed |     84.7 |       39 |

> Preliminary results. Numbers will change as more seeds finish.

Inline code like `learning_rate=0.1` also works. Click the figure to zoom in.
