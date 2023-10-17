import '@/styles/globals.css'
import e from 'cors';
import localFont from 'next/font/local'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../public/Handoko.ttf' })
 
export default function App({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false);
  const [verify,setVerify] = useState('')
  const [input,setInput] = useState('')
  const[error,setError] = useState('')
  const handleContextMenu = (e) => {
    e.preventDefault(); // Menghentikan peristiwa konteks menu
  };

  useEffect(()=>{
    const isMobileDevice = window.innerWidth < 768;
    setVerify(localStorage.getItem('verify'))
    setIsMobile(isMobileDevice);
  },[])

  const submitVerify = (e) =>{
    if(input == 'pass123'){
      setVerify("1")
    window.localStorage.setItem('verify','1')
    }else{
      setError('Password salah!')
    }
    
  }

  if(isMobile){
    return (
      <div className='flex justify-center align-center bg-white absolute w-full top-0 left-0 right-0 bottom-0'>
        <p className='text-3xl text-center mt-24'>Oops... hanya bisa diakses melalui PC!!!</p>
      </div>
    )
  }else{
    if(verify == '1'){
      return (
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      )
    }else{
      return (
        <main className={myFont.className}>
          <div className='bg-white absolute w-full top-0 left-0 right-0 bottom-0' style={{zIndex: 999}}>
          <div className='flex flex-col items-center justify-center'>
          <p className='text-3xl mt-24'>Password</p>
          <input type='text' onChange={(e)=>{ 
            setError('')
            setInput(e.target.value)
            }
            } className='p-3 text-xl border-2 border-slate-700'></input>
          <span className='text-red-400 text-lg'>{error}</span>
          <button onClick={submitVerify} className='bg-slate-700 mt-3 text-white border p-2'>Submit</button>
          </div>
          
        </div>
        </main>
      )
    }
  }
  
}