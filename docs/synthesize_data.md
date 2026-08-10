# Sound Synthesis — Theory and Math

## What this notebook does

Generates Rocky-like sounds entirely from math — no recordings, no samples.
Produces a WAV file of synthesized alien speech and visualizes it three ways.

---

## 1. What is sound?

Sound is air pressure changing over time. In a computer, we represent it as a list of numbers — each number is a pressure value at one instant. Play them back fast enough and you get sound.

The most fundamental sound pattern is a **sine wave**:

```
wave = sin(2π × frequency × t)
```

- `frequency` = oscillations per second (Hz). 440 Hz = musical note A. 1200 Hz = higher click.
- `t` = array of time values from 0 to duration
- `2π` converts cycles to radians (how Python's sin works)

---

## 2. Sample rate

We use **44100 Hz** — CD quality. This means 44100 numbers represent one second of audio.

The highest frequency representable = 22050 Hz (Nyquist theorem: half the sample rate). Rocky's sounds live between 200–3000 Hz, well within range.

---

## 3. The four sound primitives

### Click — exponential decay

A sine wave multiplied by a curve that drops instantly:

```
output = sin(2π × f × t) × e^(−decay × t)
```

`e^(−30t)` drops from 1.0 to near zero in ~0.1 seconds. This gives: loud at start, silent almost immediately — a percussive pop.

```
Amplitude
1.0 |*
    |  *
0.5 |     *
0.0 |          * * * * ...
    └────────────────────── Time
```

### Hum — vibrato modulation

A sustained tone with slow pitch wobble (vibrato):

```
vibrato = depth × sin(2π × vibrato_rate × t)
wave    = sin(2π × (base_freq + vibrato) × t)
```

The vibrato makes pitch oscillate above and below the base frequency 5 times per second. Sounds organic rather than mechanical. Linear fade-in and fade-out prevent harsh clicks at the edges.

### Chirp — frequency sweep

Pitch that rises or falls over its duration. The key insight: you cannot simply change the frequency argument in `sin()` — that breaks the phase and produces the wrong sound.

The correct approach is to **integrate** the changing frequency:

```
freq_curve = linspace(freq_start, freq_end, N)
phase      = 2π × cumsum(freq_curve) / sample_rate
wave       = sin(phase)
```

`cumsum` (cumulative sum) is numerical integration. Integrating frequency gives continuous phase, which gives the correct gliding tone.

### Chord — superposition

Multiple sine waves added together and normalized:

```
wave = (sin(2π×f1×t) + sin(2π×f2×t) + sin(2π×f3×t)) / 3
```

This is **superposition** — a core principle of wave physics. All real sounds (voice, instruments) are combinations of many sine waves. The alien chord uses frequencies 333, 555, 777, 999 Hz — not harmonically related, giving it an unsettling non-human quality.

---

## 4. The three visualizations

### Waveform
Amplitude vs time. Shows when sounds happen and how loud they are. Useful for spotting timing, not for identifying what sounds they are.

### Spectrogram
The most important view. Shows **frequency content over time**:

- Audio is split into overlapping windows of 1024 samples
- A **Fast Fourier Transform (FFT)** decomposes each window into its frequencies
- Each window becomes one vertical slice of the image
- Color encodes strength — bright = strong, dark = absent

Result: each Rocky sound appears as a colored blob at its frequency. Clicks = vertical bright lines. Hums = horizontal lines. Chirps = diagonal lines sweeping up or down.

This is what the detection notebook analyzes to find sound unit boundaries.

### FFT Spectrum
FFT applied to the entire audio at once — shows which frequencies appear most overall. A global summary, useful for understanding Rocky's voice range.

---

## 5. The dictionary file

`data/dictionary.json` is built incrementally:

- Here: sentence structure — which sound sequences mean what
- After clustering: cluster IDs per sound type get added
- After dictionary building: cluster → English word mapping gets added
- After translation: full sentence reconstructions get added

Think of it as the Rosetta Stone being built piece by piece.

---

## Key takeaway

Every Rocky sound is just:

```
sin wave  +  envelope shaping  +  optional frequency change  +  optional superposition
```

Four operations. The output sounds genuinely alien. The detection notebook's job is to take a WAV file and automatically find where each sound unit begins and ends — without knowing any of the above.