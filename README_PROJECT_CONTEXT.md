# Alien Sound Translator

## Project Goal

Build a web application that allows users to:

- Capture alien or unusual sounds through a microphone.
- Visualize audio in real time.
- Translate sounds using a future AI/ML model.
- Display interim and final translations in boxed panels.
- Eventually include playful space elements such as a spaceship or rocky-like character inspired by *Project Hail Mary*.

The current priority is frontend UI/UX. Backend and model integration will be handled later.

## Decisions So Far

### Frontend Stack

- React for interactive UI components.
- Vite for development and builds.
- Tailwind CSS for styling and responsive layouts.
- WaveSurfer.js for waveform visualization.
- Web Audio API for microphone access.
- Framer Motion later for interface transitions.
- Optional Lottie or Three.js for spaceship and character animations.

React is appropriate because the app will contain interactive microphone controls, live waveform visualizations, transcript panels, translation controls, connection status, confidence indicators, and character or spaceship widgets.

### Realtime Communication

The planned flow is:

```text
Browser microphone
        |
        v
getUserMedia + MediaRecorder
        |
        v
WebSocket
        |
        v
FastAPI backend
        |
        v
Translation model
        |
        v
Interim and final translations
```

During frontend development, realtime translation will be simulated with mock data or a mock WebSocket service.

The initial WebSocket approach is suitable for approximately 500 ms to 2 seconds of latency. WebRTC can be considered later if extremely low latency or multi-user audio is required.

### Backend

FastAPI is the preferred future backend because:

- It is Python-based.
- It works well with machine-learning libraries.
- It supports asynchronous routes and WebSockets.
- It can integrate with PyTorch, Whisper, or custom models.
- It provides automatic API documentation.

Flask was considered but is less convenient for asynchronous streaming. Backend implementation has not started yet.

### API Keys

Future model or speech-service API keys must remain on the backend. They must never be exposed in React source code, browser local storage, public frontend environment variables, client WebSocket messages, or the built frontend bundle.

The backend should use environment variables or a secret manager. Future security features may include authentication, short-lived session tokens, rate limiting, audio consent controls, TLS-secured HTTPS/WebSockets, and audio retention/deletion policies.

## Design Direction

The selected direction is:

> A playful space-tech interface built on a readable scientific HUD foundation.

The interface should feel like an alien-sound analysis instrument inside a spacecraft while remaining clear and usable.

Planned visual characteristics:

- Deep-space background.
- Cyan, violet, and orange accents.
- Glass-like HUD panels.
- Technical borders and labels.
- Subtle starfield or grid textures.
- Boxed translation results.
- Animated recording and processing indicators.
- Small spaceship or rocky-like character accents.
- Strong contrast and readable captions.

Playful elements should remain secondary so they do not distract from the translation experience.

## Design Tokens

`design-tokens.json` is intended to be the single source of truth for colors, fonts, spacing, border radii, shadows, motion durations, and component styles.

Suggested palette:

```text
Background: #071027
Surface: #0B1226
Primary cyan: #00D1C1
Accent violet: #8A3FFC
Highlight orange: #FF8A00
Muted text: #9AA6B2
Main text: #E9F5FF
Error: #FF5C5C
Success: #47D16B
```

Suggested typography:

- Orbitron for display and HUD headings.
- Inter or Space Grotesk for interface text.

The tokens are intended to be exported into CSS variables and later connected to Tailwind.

## Frontend Files Created

```text
frontend/
  package.json
  index.html
  tailwind.config.cjs
  postcss.config.cjs
  src/
    main.jsx
    App.jsx
    index.css
    components/
      AudioCapture.jsx
      Waveform.jsx
      TranscriptList.jsx
      HUDHeader.jsx
```

### Current Implementation

- `package.json` includes React, React DOM, Vite, Tailwind CSS, PostCSS, Autoprefixer, and WaveSurfer.js.
- `main.jsx` creates the React root and renders `App`.
- `App.jsx` composes the heading, audio capture section, status text, waveform placeholder, and transcript list.
- `index.css` contains Tailwind directives and initial CSS custom properties based on the design tokens.
- `AudioCapture.jsx` requests microphone permission with `getUserMedia({ audio: true })`.
- `Waveform.jsx` currently displays a placeholder; WaveSurfer.js has not been mounted yet.
- `TranscriptList.jsx` displays one mock interim result and one finalized translation with confidence.
- `HUDHeader.jsx` exists but has not yet been fully integrated into `App.jsx`.

## Not Yet Completed

- Verify dependencies with `npm install`.
- Confirm the Vite development server runs.
- Verify Tailwind with a production build.
- Systematically import design tokens into Tailwind.
- Connect WaveSurfer.js.
- Connect the waveform to real microphone data.
- Implement audio recording and streaming.
- Add the mock WebSocket service.
- Replace hardcoded transcript events with live state.
- Add a translation toggle.
- Implement the character widget.
- Refine responsive layouts.
- Complete accessibility testing.
- Create the FastAPI backend.
- Connect a translation model.
- Add API keys or authentication.

The initial frontend README was deleted at the user's request. This document is the project-context README requested afterward.

## Recommended Implementation Plan

### Phase 1: Verify the Frontend Environment

```bash
cd frontend
npm install
npm run dev
```

Verify the production build:

```bash
npm run build
```

### Phase 2: Stabilize the Static UI

- Integrate `HUDHeader`.
- Improve desktop and mobile layouts.
- Add a better status panel.
- Add start and stop recording controls.
- Add a translation mode toggle.
- Separate interim and final transcript states.
- Add confidence badges.
- Add a latency indicator.
- Add a character placeholder.

### Phase 3: Add Mock Realtime Behavior

Create a mock WebSocket-style service that emits events such as:

```json
{
  "type": "translation",
  "status": "interim",
  "original": "kling klang",
  "translation": "Unknown signal",
  "confidence": 0.62
}
```

Then connect the service to React state, animate interim updates, lock finalized translations into the transcript, add timestamps, and add a start/stop simulation control.

### Phase 4: Add Audio Visualization

- Use `getUserMedia`.
- Create an `AudioContext`.
- Read amplitude data with an analyser node.
- Animate waveform bars or a canvas.
- Add WaveSurfer.js later for playback and scrubbing.

### Phase 5: Add Space-Tech Visual Polish

- Starfield background.
- HUD grid or technical markings.
- Subtle glow effects.
- Recording pulse.
- Loading and translation animations.
- Spaceship or rocky-like character asset.
- Responsive mobile layout.
- Reduced-motion support.

### Phase 6: Build the Backend Later

Once the frontend experience is stable:

- Create a FastAPI backend.
- Add a health endpoint.
- Add session creation.
- Add `/ws/audio`.
- Receive audio chunks.
- Connect to a model or speech service.
- Return interim and final translation events.
- Add server-side API key management.
- Add authentication and rate limiting.

## Target Architecture

### Frontend Development

```text
React + Tailwind frontend
          |
          v
Mock WebSocket during UI development
```

### First Real Integration

```text
React frontend
      |
      v
WebSocket audio stream
      |
      v
FastAPI backend
      |
      v
Translation service or model
```

### Long-Term Architecture

```text
React frontend
      |
      v
Realtime gateway
      |
      +--> Audio preprocessing
      |
      +--> Translation inference service
      |
      +--> Session and result storage
      |
      +--> Result broadcasting
```

## Current Priority

1. Run `npm install`.
2. Run `npm run dev`.
3. Run `npm run build`.
4. Fix setup errors.
5. Integrate the HUD header.
6. Improve the static UI.
7. Add mock WebSocket behavior.
8. Connect the waveform to simulated or real microphone activity.

Backend implementation should begin only after the frontend interaction model and visual direction feel solid.
