import React from 'react'

export default function Waveform({ isRecording }){
  const canvasRef = React.useRef(null)
  const animRef   = React.useRef(null)
  const analyserRef = React.useRef(null)
  const sourceRef   = React.useRef(null)
  const contextRef  = React.useRef(null)

  React.useEffect(() => {
    if(isRecording){
      startVisualizer()
    } else {
      stopVisualizer()
    }
    return () => stopVisualizer()
  }, [isRecording])

  async function startVisualizer(){
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const ctx    = new AudioContext()
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256

      source.connect(analyser)

      contextRef.current  = ctx
      sourceRef.current   = source
      analyserRef.current = analyser

      draw()
    } catch(e) {
      console.error('Visualizer error:', e)
    }
  }

  function stopVisualizer(){
    cancelAnimationFrame(animRef.current)
    if(contextRef.current) contextRef.current.close()
    contextRef.current  = null
    analyserRef.current = null

    // clear canvas
    const canvas = canvasRef.current
    if(canvas){
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  function draw(){
  const canvas   = canvasRef.current
  const analyser = analyserRef.current
  if(!canvas || !analyser) return

  const ctx    = canvas.getContext('2d')
  const buffer = new Uint8Array(analyser.frequencyBinCount)

  function loop(){
    animRef.current = requestAnimationFrame(loop)
    analyser.getByteFrequencyData(buffer)

    const W = canvas.offsetWidth * window.devicePixelRatio || canvas.width
    const H = canvas.height
    canvas.width = W

    ctx.clearRect(0, 0, W, H)

    const barCount = buffer.length
    const barWidth = W / barCount * 0.8
    const gap      = W / barCount * 0.2

    buffer.forEach((val, i) => {
      const barHeight = (val / 255) * H * 0.9
      const alpha     = 0.3 + (val / 255) * 0.7
      const x         = i * (barWidth + gap)
      const y         = (H - barHeight) / 2  // centered vertically

      ctx.fillStyle = `rgba(0, 209, 193, ${alpha})`
      ctx.fillRect(x, y, barWidth, barHeight)
    })
  }

  loop()
}

  return (
    <div className="w-full rounded-md overflow-hidden bg-[rgba(255,255,255,0.02)] border border-[rgba(233,245,255,0.04)]">
      <canvas
        ref={canvasRef}
        width={800}
        height={160}
        className="w-full h-40"
      />
      {!isRecording && (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--muted)] text-sm pointer-events-none">
        </div>
      )}
    </div>
  )
}