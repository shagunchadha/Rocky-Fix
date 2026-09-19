import React from 'react'

export default function Starfield(){
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    // generate stars
    const stars = Array.from({ length: 150 }, () => ({
      x       : Math.random() * canvas.width,
      y       : Math.random() * canvas.height,
      radius  : Math.random() * 1.8 + 0.8,
      alpha   : Math.random() * 0.5 + 0.5,
      speed   : Math.random() * 0.3 + 0.05,
      drift   : (Math.random() - 0.5) * 0.2,
      twinkle : Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }))

    let animId

    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        // twinkle
        star.twinkle += star.twinkleSpeed
        const alpha = star.alpha * (0.6 + 0.4 * Math.sin(star.twinkle))

        // float upward slowly
        star.y -= star.speed
        star.x += star.drift

        // wrap around
        if(star.y < 0) star.y = canvas.height
        if(star.x < 0) star.x = canvas.width
        if(star.x > canvas.width) star.x = 0

        // draw star with glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 225, 255, ${alpha})`
        ctx.shadowBlur   = star.radius * 4
        ctx.shadowColor  = `rgba(180, 220, 255, ${alpha})`
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position : 'fixed',
        top      : 0,
        left     : 0,
        width    : '100vw',
        height   : '100vh',
        zIndex   : 0,
        pointerEvents: 'none',
      }}
    />
  )
}