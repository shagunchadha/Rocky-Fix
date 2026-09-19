import React from 'react'

export default function HUDHeader({ status, connectionState }){
  return (
    <header className="w-full border-b border-[rgba(233,245,255,0.08)] bg-[rgba(11,18,38,0.6)] backdrop-blur-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
        <span className="font-display text-sm tracking-widest uppercase text-[var(--text)]">Alien Sound Translator</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
        <div>
          Session: <span className="text-[var(--text)]">{connectionState}</span>
        </div>
        <div>
          Status: <span className={status === 'Recording' ? 'text-[var(--highlight)]' : status === 'Translating' ? 'text-[var(--accent)]' : 'text-[var(--primary)]'}>{status}</span>
        </div>
      </div>
    </header>
  )
}