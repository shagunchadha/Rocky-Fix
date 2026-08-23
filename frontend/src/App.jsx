import React from 'react'
import AudioCapture from './components/AudioCapture'
import Waveform from './components/Waveform'
import TranscriptList from './components/TranscriptList'

export default function App(){
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="font-display text-2xl">Alien Translator — Prototype</h1>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        <section className="bg-[var(--surface)] p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <AudioCapture />
            <div className="text-sm text-[var(--muted)]">Status: <span className="text-[var(--primary)]">Idle</span></div>
          </div>
          <Waveform />
        </section>

        <section className="bg-[var(--glass-panel)] p-4 rounded-lg">
          <TranscriptList />
        </section>
      </main>
    </div>
  )
}
