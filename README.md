# REDARC — Rocky Environment Decoder and Response Converter

Inspired by *Project Hail Mary* by Andy Weir, where an alien named Rocky communicates through structured pressure waves. This project builds a pipeline that takes audio input, finds repeating patterns, maps them to English words, and reconstructs meaningful sentences.

This is the same approach SETI researchers use with real signals — a legitimate signal-to-language decoder.

---

## What this does

```
Audio Input → Detect Sound Units → Cluster Similar Sounds → 
Map to English Words → Reconstruct Sentence via LLM
```

---

## Project structure

```
Rocky fix/
├── README.md
├── requirements.txt
│
├── notebooks/
│   ├── synthesize_data.ipynb       generate Rocky-like audio from math
│   ├── detect_units.ipynb          find individual sound units automatically
│   ├── cluster_sounds.ipynb        group similar sounds into categories
│   ├── build_dictionary.ipynb      map categories to English words
│   └── translate.ipynb             reconstruct sentences via LLM
│
├── docs/
│   ├── synthesize_data.md          theory and math behind synthesis
│   ├── detect_units.md
│   ├── cluster_sounds.md
│   ├── build_dictionary.md
│   └── translate.md
│
├── src/
│   ├── synthesizer.py
│   ├── detector.py
│   ├── clusterer.py
│   └── translator.py
│
├── audio/                          generated WAV files
├── data/                           dictionary.json, cluster mappings
└── app.py                          final Streamlit app
```

---

## Setup

```bash
conda create -n rocky_env python=3.11
conda activate rocky_env
conda install -c conda-forge numpy scipy matplotlib librosa -y
pip install soundfile
```

Or with requirements.txt:

```bash
pip install -r requirements.txt
```

Open in VS Code, select `rocky_env` as the kernel in any notebook.

---

## Running

Open notebooks in order and run cells top to bottom with `Shift + Enter`.
Read the matching file in `docs/` for theory behind each notebook.

| Notebook | What it does |
|---|---|
| `synthesize_data.ipynb` | Generates Rocky-like sounds from sine wave math |
| `detect_units.ipynb` | Finds where each sound unit starts and ends |
| `cluster_sounds.ipynb` | Groups similar sounds together automatically |
| `build_dictionary.ipynb` | Maps sound clusters to English words |
| `translate.ipynb` | Reconstructs full English sentences via LLM |

---

## Tech stack

| Purpose | Library |
|---|---|
| Math and arrays | `numpy` |
| Signal processing | `scipy` |
| Audio analysis | `librosa` |
| Audio file I/O | `soundfile`, `scipy.io.wavfile` |
| Visualisation | `matplotlib` |
| Clustering | `scikit-learn` |
| Translation | Claude API |
| Final UI | `streamlit` |