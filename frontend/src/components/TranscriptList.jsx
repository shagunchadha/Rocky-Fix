import React from 'react'

const MOCK = [
  {id:1, text:'[interim] kling klang... (partial)', interim:true},
  {id:2, text:'Translated: Hello from the rocks.', interim:false, confidence:0.92}
]

export default function TranscriptList(){
  const [lines] = React.useState(MOCK)
  return (
    <div className="space-y-3">
      {lines.map(l=> (
        <div key={l.id} className={`p-3 rounded-md ${l.interim? 'opacity-80':'bg-[rgba(0,209,193,0.04)]'}`}>
          <div className="flex items-baseline justify-between">
            <div className="font-medium">{l.text}</div>
            {!l.interim && <div className="text-sm text-[var(--muted)]">{Math.round((l.confidence||0)*100)}%</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
