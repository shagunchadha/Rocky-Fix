// simulates a WebSocket-style translation service
// emits interim and final translation events with realistic timing

const MOCK_EVENTS = [
  {
    interim: { original: 'click-pop-hum...', translation: 'processing signal...', confidence: 0.3 },
    final:   { original: 'click_high → hum_mid → chirp_up', translation: 'Hello, I am here.', confidence: 0.87 }
  },
  {
    interim: { original: 'chirp-chirp...', translation: 'detecting pattern...', confidence: 0.2 },
    final:   { original: 'hum_low → chirp_up → chirp_up', translation: 'What is this?', confidence: 0.74 }
  },
  {
    interim: { original: 'chord-burst...', translation: 'analysing frequency...', confidence: 0.4 },
    final:   { original: 'chirp_down → chord_alien → click_high', translation: 'Warning! Danger approaching.', confidence: 0.91 }
  },
  {
    interim: { original: 'hum-click...', translation: 'cross-referencing...', confidence: 0.35 },
    final:   { original: 'chord_simple → hum_mid → chord_rich', translation: 'I understand you.', confidence: 0.83 }
  },
  {
    interim: { original: 'chirp-chord...', translation: 'decoding sequence...', confidence: 0.25 },
    final:   { original: 'chirp_up → chord_alien → chirp_down', translation: 'I need your help.', confidence: 0.79 }
  },
]

let eventIndex = 0

export function startMockTranslation(onInterim, onFinal){
  const event = MOCK_EVENTS[eventIndex % MOCK_EVENTS.length]
  eventIndex++

  // emit interim after 800ms
  const interimTimer = setTimeout(() => {
    onInterim({
      id: Date.now(),
      ...event.interim,
      timestamp: new Date().toLocaleTimeString()
    })
  }, 800)

  // emit final after 2.5s
  const finalTimer = setTimeout(() => {
    onFinal({
      id: Date.now(),
      ...event.final,
      timestamp: new Date().toLocaleTimeString()
    })
  }, 2500)

  return () => {
    clearTimeout(interimTimer)
    clearTimeout(finalTimer)
  }
}