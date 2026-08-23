# Build Dictionary — Theory and Math

## What this notebook does

Takes the cluster-to-sound mapping from clustering and adds the final layer — mapping sound names to English words. Then decodes the full detected audio sequence into readable word sequences grouped into sentences.

---

## 1. The three-layer mapping

The full decoding chain is:

```
cluster ID  →  sound name  →  English word
     3       →  click_high  →  warning
     7       →  hum_mid     →  am
     0       →  chirp_up    →  question
```

Each layer was built in a different notebook:
- Cluster → sound name: built in `cluster_sounds` from ground truth comparison
- Sound name → English word: defined here manually as `SOUND_TO_WORD`

In a real unknown-signal scenario, the sound→word mapping would be learned iteratively — you'd identify anchor concepts (math, physical constants) and work outward, exactly like Ryland Grace does in the book.

---

## 2. The sound → word mapping

This is the Rosetta Stone of the project. Each sound type is assigned an English concept:

```python
SOUND_TO_WORD = {
    'click_low'    : 'I',
    'click_mid'    : 'here',
    'click_high'   : 'warning',
    'hum_low'      : 'what',
    ...
}
```

The mapping is designed so that sequences of these words approximate the intended sentence meaning. The LLM in the next notebook reconstructs grammatical English from these word sequences.

---

## 3. Sentence boundary detection

Units are grouped into sentences by looking at time gaps between consecutive onsets:

```
if gap between unit[i] and unit[i+1] > SENTENCE_GAP:
    start new sentence
```

`SENTENCE_GAP = 0.3` seconds. We inserted 0.4 second pauses between sentences during synthesis, so any gap above 0.3 seconds reliably indicates a sentence boundary.

This is a simple but effective approach for clean synthesized audio. For real-world audio, more sophisticated boundary detection would be needed.

---

## 4. What the output looks like

After decoding, each sentence becomes a word sequence:

```
sentence 1 → warning warning critical I warning
sentence 2 → understand am I safe need
```

These are not grammatically correct English — they are the raw word tokens extracted from Rocky's sounds. The translate notebook passes these to an LLM which reconstructs natural English sentences from them.

---

## Output files

| File | Contents |
|---|---|
| `data/dictionary.json` | Updated with sound_to_word, decoded_sequence, sentences_detected |
| `audio/decoded_sequence.png` | Timeline of decoded words with sentence boundaries |