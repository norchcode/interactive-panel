import React, { useRef, useState } from "react"
import { Parallax, ParallaxLayer,IParallax } from "@react-spring/parallax"
import styles from '../styles/btncloud.module.css'

// Little helpers ...


const inputig = (e) =>{
    var el = document.createElement('span');
  document.body.appendChild(el);
  var updateElement = function(q) {
    var offset = Math.floor(Math.random() * 100);
    var duration = Math.floor(Math.random() * 10);
    var size = 15 + 10 - duration;
    el.innerHTML = '<span style="color: gray;right:'+offset+'vw; font-size: '+size+'px; animation-duration:'+duration+'s">'+q.slice(-1)+'</span>';
    setTimeout(function () {
      updateElement(q);
    }, duration * 1000);
  };  
  updateElement(e.target.value);
}

export default function App() {
    const [hover,setHover] = useState(false)
    const url = (name, wrap = false) =>{
        if(wrap){
            return `url('https://awv3node-homepage.surge.sh/build/assets/${name}.svg')`
        }else{
            return `https://awv3node-homepage.surge.sh/build/assets/${name}.svg`
        }
    }
    const parallax = useRef(IParallax)
    return (
      <div style={{ width: '100%', height: '100%', background: '#805E73', overflow: 'hidden' }}>
        <style>
            {
                `
                div{overflow-y: hidden !important;}
                span {
                    position: absolute;
                    right: 25px;
                    top: -50px;
                    animation-name: move;
                    animation-timing-function: ease-out;
                    animation-iteration-count: infinite;
                  }
                  
                  @keyframes move {
                    0% {
                      top: 100vh;
                      opacity: 0;
                    }
                    25% {
                      opacity: 1;
                    }
                    50% {
                      opacity: 1;
                    }
                    75% {
                      opacity: 0;
                    }
                    100% {
                      top: -25px;
                      opacity: 0;
                    }
                  }
                `
            }
        </style>
        <Parallax ref={parallax} pages={4}>
        <ParallaxLayer offset={0} speed={-1} style={{ backgroundColor: 'lightblue' }} />
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: 'black' }} />
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
          <ParallaxLayer offset={3} speed={1} style={{ backgroundColor: 'lightgreen' }} />
          
  
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />
  
  <ParallaxLayer offset={0} speed={0.8} style={{ opacity: 0.8 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={0} speed={0.2} style={{ opacity: 0.9 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </ParallaxLayer>
          <ParallaxLayer offset={0.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={2.5}
            speed={-0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}>
            <img src={url('earth')} style={{ width: '30%' }} />
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={2}
            speed={-0.3}
            style={{
              backgroundSize: '80%',
              backgroundPosition: 'center',
              backgroundImage: url('clients', true),
            }}
          />
  
          <ParallaxLayer
            offset={0}
            speed={0.1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

                <input type="text" onChange={inputig} placeholder="Masukan nama ig" className="rounded-full outline-none text-slate-500 border-2 p-5"></input>

                <button onClick={() => parallax.current.scrollTo(1)} className={styles['btn-cloud'] + ' mt-56 w-44'}>next</button>
                

            {/* <img src={url('server')} style={{ width: '20%' }} /> */}
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div></div>
            <div className="text-slate-300 text-center">
            <h1 className="mb-5">Pilih avatar kamu</h1>

            <div className="grid grid-cols-3 gap-8 p-5">
     
                <img onMouseEnter={()=> setHover(!hover)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdPUrvq_PqcJ6xThm45NFBRnGYPElU28gAw&usqp=CAU" className={"w-20 rounded-full " + styles['hover-avatar']}></img>
           
                <img onMouseEnter={()=> setHover(!hover)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdPUrvq_PqcJ6xThm45NFBRnGYPElU28gAw&usqp=CAU" className={"w-20 rounded-full " + styles['hover-avatar']}></img>
                <img onMouseEnter={()=> setHover(!hover)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdPUrvq_PqcJ6xThm45NFBRnGYPElU28gAw&usqp=CAU" className={"w-20 rounded-full " + styles['hover-avatar']}></img>
           
                <img onMouseEnter={()=> setHover(!hover)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdPUrvq_PqcJ6xThm45NFBRnGYPElU28gAw&usqp=CAU" className={"w-20 rounded-full " + styles['hover-avatar']}></img>
                <img onMouseEnter={()=> setHover(!hover)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdPUrvq_PqcJ6xThm45NFBRnGYPElU28gAw&usqp=CAU" className={"w-20 rounded-full " + styles['hover-avatar']}></img>
           
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdPUrvq_PqcJ6xThm45NFBRnGYPElU28gAw&usqp=CAU" className={"w-20 rounded-full " + styles['hover-avatar']}></img>
            </div>
            
            </div>
            
          </ParallaxLayer>
  
          <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => parallax.current.scrollTo(3)}>
            <img src={url('clients-main')} style={{ width: '40%' }} />
          </ParallaxLayer>
          <ParallaxLayer
            offset={3}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(0)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={url('bash')} style={{ width: '40%' }} />
          </ParallaxLayer>
        </Parallax>
      </div>
    )
  }
