import React from 'react'

export default function AudioCapture({ isRecording, setIsRecording, setStatus }){
  const [permission, setPermission] = React.useState('unknown')
  const streamRef = React.useRef(null)

  async function requestPermission(){
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setPermission('granted')
      setStatus('Idle')
    } catch(e){
      setPermission('denied')
    }
  }

  function startRecording(){
    if(permission !== 'granted') return
    setIsRecording(true)
    setStatus('Recording')
  }

  function stopRecording(){
    setIsRecording(false)
    setStatus('Idle')
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {permission !== 'granted' && (
        <button
          onClick={requestPermission}
          className="px-4 py-1.5 rounded-md bg-[var(--primary)] text-black text-sm font-medium"
        >
          Enable Mic
        </button>
      )}

      {permission === 'granted' && !isRecording && (
        <button
          onClick={startRecording}
          className="px-4 py-1.5 rounded-md bg-[var(--primary)] text-black text-sm font-medium"
        >
          Start Recording
        </button>
      )}

      {permission === 'granted' && isRecording && (
        <button
          onClick={stopRecording}
          className="px-4 py-1.5 rounded-md bg-[var(--highlight)] text-black text-sm font-medium"
        >
          Stop Recording
        </button>
      )}

      <div className="text-sm text-[var(--muted)]">
        Mic: <span className={permission === 'granted' ? 'text-[var(--primary)]' : permission === 'denied' ? 'text-[var(--error)]' : 'text-[var(--muted)]'}>{permission}</span>
      </div>

      {isRecording && (
        <div className="flex items-center gap-2 text-sm text-[var(--highlight)]">
          <div className="w-2 h-2 rounded-full bg-[var(--highlight)] animate-pulse" />
          Recording
        </div>
      )}
    </div>
  )
}
