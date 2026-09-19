# Translation — Theory and Approach

## What this notebook does

Takes the imperfect word sequences decoded from Rocky's audio and uses the Gemini API to reconstruct natural, grammatically correct English sentences from them.

---

## Why we need an LLM here

The decoded word sequences are raw and noisy:

```
warning warning am question here
what here I question question
danger danger critical warning warning warning
```

These are literal token-for-token translations — like a word-for-word dictionary translation that ignores grammar. A human reading "warning warning am question here" can infer "Hello, I am here" — but only because they understand context and intent.

An LLM does the same thing. Given the vocabulary mapping and the raw token sequence, it infers the most likely intended meaning and reconstructs a natural sentence.

---

## The prompt design

The prompt gives Gemini three things:

1. **Context** — what Rocky's language is and where it comes from
2. **Vocabulary** — the full sound → English word mapping so the model knows what each token means
3. **The sequence** — the raw decoded words to reconstruct

The instruction "signal noise may cause imperfect decoding — use context to infer meaning" is important. It tells the model not to translate literally but to reason about intent — exactly what Ryland Grace does in the book.

---

## API call structure

```python
model = genai.GenerativeModel('gemini-2.0-flash')
response = model.generate_content(prompt)
result = response.text.strip()
```

- `gemini-2.0-flash` — fast, free tier, no credit card required
- One API call per sentence — simple and clean
- Response is `response.text` — the raw string

---

## Why Gemini instead of Claude

The Anthropic API requires purchased credits with no permanent free tier. Google AI Studio provides Gemini 2.0 Flash completely free at 60 requests per minute with just a Google account — no credit card needed. For a project at this scale, the free tier is more than sufficient.

The translation logic, prompt design, and output are identical regardless of which LLM is used. Swapping back to Claude later requires changing only three lines in Cell 1 and the `generate_content` call in the translate function.

---

## Security — API key handling

The API key is stored in a `.env` file at the project root and loaded with `python-dotenv`:

```python
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')
```

The `.env` file is in `.gitignore` and never committed to the repository. The key never appears in any notebook or source file.

---

## Output

Each sentence produces:
- Raw word sequence from the decoder
- Gemini's reconstructed English sentence
- Comparison against the known ground truth meaning

Translations are saved back into `dictionary.json` under each sentence's entry.