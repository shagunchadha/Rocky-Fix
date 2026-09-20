import React from 'react'
import HUDHeader from './components/HUDHeader'
import AudioCapture from './components/AudioCapture'
import Waveform from './components/Waveform'
import TranscriptList from './components/TranscriptList'
import { startMockTranslation } from './services/mockTranslation'
import Starfield from './components/Starfield'
import CharacterWidget from './components/CharacterWidget'

export default function App(){
  const [status, setStatus]           = React.useState('Idle')
  const [isRecording, setIsRecording] = React.useState(false)
  const [transcript, setTranscript]   = React.useState([])
  const [interim, setInterim]         = React.useState(null)
  const translationRef = React.useRef(null)

  React.useEffect(() => {
    if(isRecording){
      translationRef.current = setInterval(() => {
        startMockTranslation(
          (item) => { setStatus('Translating'); setInterim(item) },
          (item) => { setStatus('Recording'); setInterim(null); setTranscript(prev => [item, ...prev].slice(0, 20)) }
        )
      }, 4000)

      startMockTranslation(
        (item) => { setStatus('Translating'); setInterim(item) },
        (item) => { setStatus('Recording'); setInterim(null); setTranscript(prev => [item, ...prev].slice(0, 20)) }
      )
    } else {
      clearInterval(translationRef.current)
      setInterim(null)
      setStatus('Idle')
    }
    return () => clearInterval(translationRef.current)
  }, [isRecording])

  return (
    <div className="min-h-screen text-[var(--text)] flex flex-col relative">
      <Starfield />
      <div className="grid-overlay" />
      <div className="scan-line" />
      <CharacterWidget isRecording={isRecording} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <HUDHeader status={status} connectionState="Local" />

        <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-6 grid grid-cols-1 gap-6">

          <section className={`hud-panel p-4 ${isRecording ? 'hud-panel-active' : ''}`}>
            <div className="text-xs font-display tracking-widest text-[var(--muted)] uppercase mb-3">Audio Input</div>
            <AudioCapture
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              setStatus={setStatus}
            />
            <div className="mt-4">
              <Waveform isRecording={isRecording} />
            </div>
          </section>

          <section className="hud-panel p-4">
            <div className="text-xs font-display tracking-widest text-[var(--muted)] uppercase mb-3">Translation Output</div>
            <TranscriptList transcript={transcript} interim={interim} />
          </section>

        </main>
      </div>
    </div>
  )
}