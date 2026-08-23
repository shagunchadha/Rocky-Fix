import React from 'react'

export default function HUDHeader(){
  return (
    <div className="flex items-center justify-between">
      <div className="font-display text-lg">Alien Translator</div>
      <div className="text-sm text-[var(--muted)]">Live Prototype</div>
    </div>
  )
}
