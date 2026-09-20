import React from 'react'

function Rocky({ isRecording }){
  const color = isRecording ? '#00d1c1' : '#8a3ffc'
  const glow  = isRecording ? 'rgba(0,209,193,0.5)' : 'rgba(138,63,252,0.4)'

  return (
    <svg width="140" height="155" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="48" rx="34" ry="30"
        fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"
      />
      <path d="M50 18 L68 24 L78 38 L74 54 L62 62 L50 64 L38 62 L26 54 L22 38 L32 24 Z"
        fill="rgba(11,18,38,0.95)" stroke={color} strokeWidth="1.5"
      />
      <path d="M38 28 L44 34 L40 42" stroke={color} strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
      <path d="M62 26 L58 35 L64 40" stroke={color} strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
      <path d="M34 46 L42 50 L38 56" stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
      <path d="M66 44 L58 50 L62 56" stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
      <path d="M46 36 L52 40 L48 46 L54 50" stroke={color} strokeWidth="0.7" opacity="0.3" strokeLinecap="round"/>
      <circle cx="40" cy="42" r="4" fill="rgba(11,18,38,0.9)" stroke={color} strokeWidth="1.2"/>
      <circle cx="60" cy="42" r="4" fill="rgba(11,18,38,0.9)" stroke={color} strokeWidth="1.2"/>
      <circle cx="40" cy="42" r="2" fill={color} style={{ filter: `drop-shadow(0 0 5px ${glow})` }}/>
      <circle cx="60" cy="42" r="2" fill={color} style={{ filter: `drop-shadow(0 0 5px ${glow})` }}/>
      <path d="M42 54 Q50 58 58 54" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M30 40 Q18 38 10 44" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M28 48 Q16 50 10 58" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M32 56 Q22 62 18 72" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M40 62 Q36 72 32 82" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M70 40 Q82 38 90 44" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M72 48 Q84 50 90 58" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M68 56 Q78 62 82 72" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M60 62 Q64 72 68 82" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      {isRecording && (
        <>
          <ellipse cx="50" cy="48" rx="40" ry="36"
            fill="none" stroke="rgba(0,209,193,0.25)" strokeWidth="1"
            style={{ animation: 'rocky-wave 2s ease-out infinite' }}
          />
          <ellipse cx="50" cy="48" rx="48" ry="42"
            fill="none" stroke="rgba(0,209,193,0.12)" strokeWidth="1"
            style={{ animation: 'rocky-wave 2s ease-out 0.5s infinite' }}
          />
        </>
      )}
      <style>{`
        @keyframes rocky-wave {
          0%   { opacity: 0.8; transform: scale(0.9); transform-origin: 50% 48%; }
          100% { opacity: 0;   transform: scale(1.2); transform-origin: 50% 48%; }
        }
      `}</style>
    </svg>
  )
}

function HailMary({ isRecording }){
  const engineColor = isRecording ? '#ff8a00' : 'rgba(255,138,0,0.4)'
  const bodyColor   = isRecording ? '#9aa6b2' : 'rgba(154,166,178,0.6)'

  return (
    <svg width="130" height="170" viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="45" cy="108" rx="10" ry="5"
        fill={isRecording ? 'rgba(255,138,0,0.3)' : 'rgba(255,138,0,0.08)'}
        style={{ filter: 'blur(4px)' }}
      />
      {isRecording && (
        <ellipse cx="45" cy="112" rx="6" ry="8"
          fill="rgba(255,138,0,0.25)"
          style={{ animation: 'engine-flicker 0.25s ease-in-out infinite alternate', filter: 'blur(2px)' }}
        />
      )}
      <rect x="32" y="30" width="26" height="60" rx="4"
        fill="rgba(11,18,38,0.95)" stroke={bodyColor} strokeWidth="1.2"
      />
      <line x1="32" y1="50" x2="58" y2="50" stroke={bodyColor} strokeWidth="0.6" opacity="0.5"/>
      <line x1="32" y1="65" x2="58" y2="65" stroke={bodyColor} strokeWidth="0.6" opacity="0.5"/>
      <line x1="32" y1="80" x2="58" y2="80" stroke={bodyColor} strokeWidth="0.6" opacity="0.5"/>
      <line x1="45" y1="30" x2="45" y2="90" stroke={bodyColor} strokeWidth="0.5" opacity="0.3"/>
      <path d="M32 30 Q45 8 58 30 Z"
        fill="rgba(11,18,38,0.95)" stroke={bodyColor} strokeWidth="1.2"
      />
      <ellipse cx="45" cy="58" rx="20" ry="5"
        fill="none" stroke={isRecording ? '#00d1c1' : bodyColor} strokeWidth="1.5" opacity="0.8"
      />
      <ellipse cx="45" cy="58" rx="20" ry="5" fill="rgba(0,209,193,0.05)"/>
      <ellipse cx="45" cy="28" rx="5" ry="6"
        fill={isRecording ? 'rgba(0,209,193,0.25)' : 'rgba(138,63,252,0.15)'}
        stroke={isRecording ? '#00d1c1' : '#8a3ffc'}
        strokeWidth="1"
        style={{ filter: `drop-shadow(0 0 5px ${isRecording ? '#00d1c1' : '#8a3ffc'})` }}
      />
      <line x1="32" y1="45" x2="12" y2="45" stroke={bodyColor} strokeWidth="1.2" opacity="0.7"/>
      <rect x="4" y="38" width="10" height="14" rx="1"
        fill="rgba(11,18,38,0.9)" stroke={bodyColor} strokeWidth="1" opacity="0.8"
      />
      <line x1="58" y1="45" x2="78" y2="45" stroke={bodyColor} strokeWidth="1.2" opacity="0.7"/>
      <rect x="76" y="38" width="10" height="14" rx="1"
        fill="rgba(11,18,38,0.9)" stroke={bodyColor} strokeWidth="1" opacity="0.8"
      />
      <path d="M36 90 L34 102 L56 102 L54 90 Z"
        fill="rgba(11,18,38,0.95)" stroke={bodyColor} strokeWidth="1"
      />
      <ellipse cx="45" cy="102" rx="10" ry="3"
        fill={engineColor} style={{ filter: 'blur(2px)' }}
      />
      <style>{`
        @keyframes engine-flicker {
          0%   { opacity: 0.3; transform: scaleY(0.7); }
          100% { opacity: 1.0; transform: scaleY(1.3); }
        }
      `}</style>
    </svg>
  )
}

export default function CharacterWidget({ isRecording }){
  return (
    <>
      {/* Rocky — top right, lurking, no label */}
      <div style={{
        position  : 'fixed',
        top       : '70px',
        right     : '16px',
        zIndex    : 20,
        opacity   : 0.9,
        filter    : `drop-shadow(0 0 16px ${isRecording ? 'rgba(0,209,193,0.5)' : 'rgba(138,63,252,0.4)'})`,
        transition: 'filter 0.5s ease',
      }}>
        <Rocky isRecording={isRecording} />
      </div>

      {/* Hail Mary — bottom left */}
      <div style={{
        position  : 'fixed',
        bottom    : '16px',
        left      : '16px',
        zIndex    : 20,
        opacity   : 0.9,
        filter    : `drop-shadow(0 0 16px ${isRecording ? 'rgba(255,138,0,0.5)' : 'rgba(154,166,178,0.2)'})`,
        transition: 'filter 0.5s ease',
      }}>
        <HailMary isRecording={isRecording} />
        <div style={{
          textAlign    : 'center',
          fontSize     : '8px',
          color        : isRecording ? '#ff8a00' : '#9aa6b2',
          fontFamily   : 'Orbitron, monospace',
          letterSpacing: '0.15em',
          marginTop    : '2px',
          transition   : 'color 0.5s ease',
        }}>
          HAIL MARY
        </div>
      </div>
    </>
  )
}