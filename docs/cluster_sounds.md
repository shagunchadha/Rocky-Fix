# Sound Clustering — Theory and Math

## What this notebook does

Takes the feature matrix from detection (N units × 4 features) and groups similar units together automatically using K-Means clustering — without being told what the groups are.

---

## 1. Why normalize first

The four features are on completely different scales:

```
dominant_freq  →  200 – 2400  Hz
duration       →  0.03 – 0.5  seconds
mean_rms       →  0.001 – 0.9
centroid       →  300 – 2000  Hz
```

If we cluster on raw values, frequency dominates simply because its numbers are larger. `StandardScaler` fixes this by transforming each feature to have mean=0 and std=1:

```
scaled = (value - mean) / std
```

Now all four features contribute equally to the distance calculation.

---

## 2. K-Means clustering

K-Means partitions N points into K groups by minimizing **inertia** — the total squared distance from each point to its cluster center:

```
inertia = Σ  ||point - cluster_center||²
```

Algorithm:
1. Place K centers randomly
2. Assign each point to its nearest center
3. Move each center to the mean of its assigned points
4. Repeat steps 2–3 until assignments stop changing

We use `n_init=10` — runs 10 times with different random starts, keeps the best result. This avoids bad local minima.

We set `K=11` because we defined 11 sound types in synthesis. In a real unknown-signal scenario you would pick K from the elbow curve.

---

## 3. The elbow method

Running K-Means for K=2 to K=20 and plotting inertia shows a curve that drops steeply then flattens. The "elbow" — where the curve bends — is the natural number of clusters in the data. Beyond that point, adding more clusters gives diminishing returns.

---

## 4. PCA for visualization

Our feature space is 4-dimensional — impossible to plot directly. PCA (Principal Component Analysis) finds the two directions of maximum variance and projects all points onto them.

```
4D feature space  →  PCA  →  2D projection
```

The `explained_variance_ratio_` tells you how much information is preserved. If it's above 80%, the 2D plot is a reliable view of the actual cluster structure.

Points of the same color in the PCA plot = units the algorithm thinks sound similar.

---

## 5. Cluster quality check

Because we synthesized the audio ourselves, we know the ground truth — which sound each unit actually was. We compare:

```
true sound name   vs   cluster ID assigned
click_high             cluster 3
click_high             cluster 3   ← good, same cluster
hum_mid                cluster 7
click_high             cluster 3   ← good
hum_mid                cluster 2   ← bad, split across clusters
```

Perfect clustering = every instance of the same sound type lands in the same cluster. In practice some overlap is expected, especially between sounds with similar frequencies.

---

## 6. Cluster map

The final output is a mapping from cluster ID → most common true sound in that cluster:

```json
{
  "0": "chirp_up",
  "1": "hum_low",
  "2": "click_high",
  ...
}
```

This is saved into `dictionary.json` and used in the next notebook to map cluster sequences → English words.

---

## Output files

| File | Contents |
|---|---|
| `data/cluster_labels.npy` | Cluster ID for each detected unit |
| `data/dictionary.json` | Updated with cluster_map |
| `audio/elbow_curve.png` | Inertia vs K plot |
| `audio/clusters_pca.png` | 2D scatter plot of clusters |
| `audio/clusters_timeline.png` | Cluster ID of each unit over time |