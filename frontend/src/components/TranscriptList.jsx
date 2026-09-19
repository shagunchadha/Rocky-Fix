import React from 'react'

export default function TranscriptList({ transcript, interim }){
  return (
    <div className="space-y-3 min-h-[120px]">

      {interim && (
        <div className="p-3 rounded-md border border-[rgba(233,245,255,0.06)] opacity-70">
          <div className="flex items-baseline justify-between">
            <div className="text-sm text-[var(--muted)] italic">{interim.translation}</div>
            <div className="text-xs text-[var(--muted)] ml-3 shrink-0">{Math.round((interim.confidence||0)*100)}%</div>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1 opacity-60">{interim.original}</div>
        </div>
      )}

      {transcript.length === 0 && !interim && (
        <div className="text-sm text-[var(--muted)] opacity-50">
          Start recording to see translations appear here.
        </div>
      )}

      {transcript.map(item => (
        <div key={item.id} className="p-3 rounded-md bg-[rgba(0,209,193,0.04)] border border-[rgba(0,209,193,0.1)]">
          <div className="flex items-baseline justify-between">
            <div className="font-medium">{item.translation}</div>
            <div className="text-sm text-[var(--muted)] ml-3 shrink-0">{Math.round((item.confidence||0)*100)}%</div>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1 opacity-60">{item.original}</div>
          <div className="text-xs text-[var(--muted)] mt-1 opacity-40">{item.timestamp}</div>
        </div>
      ))}

    </div>
  )
}