# Sound Unit Detection — Theory and Math

## What this notebook does

Loads the synthesized WAV file and automatically finds where each individual sound unit begins and ends — without any prior knowledge of how the audio was constructed.

---

## 1. The core problem

The audio is one continuous stream. We need to find the boundaries between sound units. The signal between units is near-silent (low energy). A new unit starting = a sudden rise in energy.

```
Audio:   ___/‾‾‾\___/‾‾‾‾‾\____/‾‾\___
Units:        [  ]   [     ]   [  ]
```

---

## 2. RMS energy

RMS (Root Mean Square) measures loudness over a short window of samples:

```
RMS = sqrt( mean( x² ) )
```

We slide this window across the entire audio in steps (hops), computing one RMS value per step. The result is a curve showing how loudness changes over time.

- `WINDOW = 512` samples (~11ms) — how much audio each measurement covers
- `HOP = 128` samples (~3ms) — how far we step between measurements

Smaller hop = smoother curve, more frames to process.

---

## 3. Onset strength

Onset strength = how sharply the RMS rises at each frame:

```
onset_strength = diff(rms)   # difference between consecutive RMS values
onset_strength = clip(0)     # keep only positive differences (rising edges only)
```

A sudden loud sound produces a sharp positive spike. Silence or a sustained tone produces near-zero values.

---

## 4. Peak detection

`scipy.signal.find_peaks` finds the spikes in onset strength above a threshold:

```
THRESHOLD = max(onset_strength) * 0.15
```

15% of the maximum spike is the cutoff — anything below is treated as background noise. `MIN_GAP_FRAMES` prevents two onsets being detected within 50ms of each other (avoids double-detection on a single sound).

---

## 5. Slicing into units

Each onset time becomes a cut point. The slice for unit `i` runs from onset `i` to onset `i+1`. The last unit runs to onset + MAX_DURATION.

A small backwards offset (`OFFSET_SEC = 0.01`) starts each slice 10ms before the detected onset — because the onset detector fires slightly after the sound actually begins.

---

## 6. Feature extraction

Each unit is described by four numbers:

| Feature | How computed | What it captures |
|---|---|---|
| Dominant frequency | FFT → frequency at peak magnitude | Overall pitch |
| Duration | `len(samples) / sample_rate` | How long the sound lasts |
| Mean RMS | `sqrt(mean(x²))` | Average loudness |
| Spectral centroid | `sum(freq × magnitude) / sum(magnitude)` | Brightness — where the energy sits in the spectrum |

These four numbers form one row in the feature matrix. The shape is `(N_units × 4)`.

This matrix is what the clustering notebook reads — it groups units with similar feature vectors together.

---

## Output files

| File | Contents |
|---|---|
| `data/unit_features.npy` | Feature matrix, shape (N × 4) |
| `data/onset_times.npy` | Onset time of each unit in seconds |
| `data/dictionary.json` | Updated with unit count and onset times |
| `audio/onset_detection.png` | Visualization of detected onsets |