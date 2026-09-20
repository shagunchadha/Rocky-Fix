# Alien Sound Translator

Inspired by *Project Hail Mary* by Andy Weir, where an alien named Rocky communicates through structured pressure waves. This project builds a signal-to-language pipeline that takes audio input, finds repeating patterns, maps them to English words, and reconstructs meaningful sentences — alongside a space-themed web interface for real-time audio capture and translation display.

---

## What this does

```
Audio Input → Detect Sound Units → Cluster Similar Sounds →
Map to English Words → Reconstruct Sentence via LLM
```

The web interface captures microphone audio, visualizes it in real time, and displays mock translations while the backend pipeline is being developed.

---

## Project structure

```
redarc/
├── README.md
├── requirements.txt
│
├── notebooks/                      Python signal processing pipeline
│   ├── synthesize_data.ipynb       generate Rocky-like audio from math
│   ├── detect_units.ipynb          find individual sound units automatically
│   ├── cluster_sounds.ipynb        group similar sounds into categories
│   ├── build_dictionary.ipynb      map categories to English words
│   └── translate.ipynb             reconstruct sentences via Gemini API
│
├── docs/                           theory and math behind each notebook
│   ├── synthesize_data.md
│   ├── detect_units.md
│   ├── cluster_sounds.md
│   ├── build_dictionary.md
│   └── translate.md
│
├── frontend/                       React web application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── HUDHeader.jsx       top navigation with live status
│   │   │   ├── AudioCapture.jsx    microphone controls
│   │   │   ├── Waveform.jsx        real-time frequency visualizer
│   │   │   ├── TranscriptList.jsx  translation output panel
│   │   │   ├── Starfield.jsx       animated space background
│   │   │   └── CharacterWidget.jsx Rocky and Hail Mary decorative figures
│   │   └── services/
│   │       └── mockTranslation.js  simulated translation event stream
│   ├── package.json
│   └── design-tokens.json          color, typography and spacing tokens
│
├── src/                            reusable Python modules
├── audio/                          generated WAV files and visualizations
└── data/                           dictionary.json, cluster mappings
```

---

## Pipeline setup

### Requirements

```bash
conda create -n rocky_env python=3.11
conda activate rocky_env
conda install -c conda-forge numpy scipy matplotlib librosa scikit-learn -y
pip install soundfile python-dotenv google-genai
```

Or:

```bash
pip install -r requirements.txt
```

### API key

Create a `.env` file in the project root:

```
GOOGLE_API_KEY=your-key-here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com).

### Running the notebooks

Open in VS Code, select `rocky_env` as the kernel, run notebooks in order:

| Notebook | What it does |
|---|---|
| `synthesize_data.ipynb` | Generates Rocky-like sounds from sine wave math |
| `detect_units.ipynb` | Finds where each sound unit starts and ends |
| `cluster_sounds.ipynb` | Groups similar sounds together automatically |
| `build_dictionary.ipynb` | Maps sound clusters to English words |
| `translate.ipynb` | Reconstructs full English sentences via Gemini API |

---

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### What the frontend does

- Space-themed HUD interface with deep navy background and cyan accents
- Animated starfield background with floating particles
- Live microphone capture with start/stop controls
- Real-time frequency spectrum visualizer using Web Audio API
- Mock translation pipeline showing interim and final results with confidence scores
- Rocky and Hail Mary character widgets that react to recording state
- Status indicators in the header that update as session state changes

### Frontend stack

- React + Vite
- Tailwind CSS
- Web Audio API for microphone and visualization
- Orbitron + Inter fonts

---

## Current limitations

Clustering accuracy on synthesized audio is approximately 35-40%. The 11 synthesized sound types share overlapping acoustic properties in MFCC feature space, making clean separation difficult with K-Means. The pipeline architecture is correct and runs end to end — the limitation is specific to the synthesized sound vocabulary.

### Why this happens

Sounds like `chord_simple`, `chord_rich` and `chord_alien` differ only in their frequency combinations. Their envelopes, durations and overall energy profiles are nearly identical, so their MFCC fingerprints overlap significantly in feature space. K-Means cannot reliably separate them regardless of dataset size.

### Planned improvements

- Redesign synthesized sounds with wider acoustic separation
- Reduce vocabulary to 5-6 genuinely separable sound types
- Replace K-Means with DBSCAN or Gaussian Mixture Models
- Test on real microphone audio input
- Larger and more diverse training data

---

## Tech stack

| Purpose | Tool |
|---|---|
| Math and arrays | numpy |
| Signal processing | scipy |
| Audio analysis | librosa |
| Clustering | scikit-learn |
| LLM translation | Gemini API |
| Frontend | React, Vite, Tailwind |
| Planned backend | FastAPI |