import React from 'react'

export default function AudioCapture(){
  const [permission, setPermission] = React.useState('unknown')

  async function request(){
    try{
      await navigator.mediaDevices.getUserMedia({audio:true})
      setPermission('granted')
    }catch(e){
      setPermission('denied')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={request} className="px-3 py-1 rounded-md bg-[var(--primary)] text-black">Enable Mic</button>
      <div className="text-sm text-[var(--muted)]">Mic: {permission}</div>
    </div>
  )
}
