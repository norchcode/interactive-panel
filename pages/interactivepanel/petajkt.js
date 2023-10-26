import { useEffect, useRef, useState } from "react";
import jabar from "../../public/jabar.png"
import jaksel from "../../public/jaksel.png"
import jakut from "../../public/jakut.png"
import japus from "../../public/japus.png"
import jatim from "../../public/jatim.png"
import pusherJs from "pusher-js";
import axios from "axios";
import e from "cors";

export default function petajkt(){
    const [marker,setMarker] = useState("")
    const [pusherChannel, setPusherChannel] = useState(null);
    const [data, setData] = useState(null);
    const [user,setUser] = useState({
      jakartabarat: [],
      jakartatimur: [],
      jakartaselatan: [],
      jakartapusat: [],
      jakartautara: []
    })
    const [kembali,setKembali] = useState({
      jenis: "0",
      data: {
        parent: 'jakarta-barat'
      }
    })

    const [aspirasi,setAspirasi] = useState({
      jakartabarat: '',
      jakartatimur: '',
      jakartautara: '',
      jakartapusat: '',
      jakartaselatan: ''
    })
  
    let dinamis = {
      jakartabarat: ['museum-macan','museum-fata','pancoran-glodok','pecel-lele','starling'],
      jakartatimur: ['keongmas','kanal','buperta','kesakpa','velo'],
      jakartaselatan: ['mbloc','mrt','pim','scbd','sudirman','patpancoran','semanggi'],
      jakartapusat: ['katredal','gn','bni','jamdinding','monas','mrts','pasar','arjuna','istana','jiexpo','lapbanteng','patselamat','gbk','tanahabang'],
      jakartautara: ['dufan','hutan-bakau','jis','museum-bahari','pelasunda']
    }

    let angkaRan = {
      jakartabarat: Math.floor(Math.random() * 5),
      jakartatimur: Math.floor(Math.random() * 5),
      jakartaselatan: Math.floor(Math.random() * 7),
      jakartapusat: Math.floor(Math.random() * 14),
      jakartautara: Math.floor(Math.random() * 5)
    }

    let interval = null;
    const letters = "AXY";
    useEffect(()=>{
      const pusher = new pusherJs("97ba46579f599fb617f5", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("chat");
      setPusherChannel(channel);

      // channel.bind("chat-event", function (data) {
      //   let output = data.data.data
        
      //   // kembalikan(output)
        
      // })
        axios.get('/api/user/get').then(e=>{
          const updateState = {
            jakartabarat: [],
            jakartatimur: [],
            jakartaselatan: [],
            jakartapusat: [],
            jakartautara: []
          }
          e.data.data.forEach(val=>{
            updateState[val.daerah.replace(/-/g, '')].push(val)
           
            // let angka = Math.floor(Math.random() * 4)
            // copy[angka].push({text: val.aspirasi,user: val.username,animation: false})
          })
          setUser(updateState)
          // setData(copy)
        })
 
      return () => {
        pusher.unsubscribe("chat");
      };
    },[])

    useEffect(() => {

      if(pusherChannel && pusherChannel.bind){
       
        pusherChannel.unbind('chat-event');

        pusherChannel.bind('chat-event', (pusherData) => {
          
          let dat = pusherData.data.data
          document.querySelector('.peta-'+dat.daerah).classList.add('animasi-tulisan')
          setUser((prevDataArray) => {
            const newDataArray = {...prevDataArray}; // Make a shallow copy of the outer array
            newDataArray[dat.daerah.replace(/-/g,'')].push(dat)
            return newDataArray; // Set the state with the updated data
          });
          setTimeout(()=>{
            kembalikan(pusherData.data.data)
            document.querySelector('.'+dat.daerah+' .mark.m-'+dat.id).classList.add('animasi-naikturun')
            
            setData(pusherData.data.data)
            setTimeout(function() {
              klikmarker(dat.daerah,dinamis[dat.daerah.replace(/-/g, '')][angkaRan[dat.daerah.replace(/-/g, '')]],'50%',dat)
              setTimeout(function(){
                document.querySelector('.'+dat.daerah+' .mark.m-'+dat.id).classList.remove('animasi-naikturun')
                document.querySelectorAll('.tulisan-zoom').forEach(el=>{
                  el.classList.remove('ketengah')
                })
                    if(kembali.jenis == "0"){
                      document.querySelector('.petafull').classList.remove('-z-10')
                      document.querySelector('.petafull').style.opacity = '1'
                      document.querySelector('.petafull').parentNode.style.zIndex = '10'
                      document.querySelectorAll('.parent-provinsi').forEach(el=>{
                        el.style.opacity = '0'
                      })
                      document.querySelectorAll('.parent-provinsi').forEach(el=>{
                        el.style.zIndex = "-100"
                      })
                      document.querySelectorAll('.peta').forEach(element =>{
              
                        element.style.opacity = '1'
                      })
                      document.querySelector('.btn-kembali').classList.add('hidden')
                    }else{
                      document.querySelectorAll('.tulisan-zoom').forEach(el=>{
                        el.classList.remove('ketengah')
                      })
                      document.querySelectorAll('.parent-provinsi').foEach(el=>{
                        el.style.left = '0%'
                      })
                      document.querySelectorAll('.parent-provinsi').forEach(el=>{
                        el.querySelector('h1').style.opacity = '0'
                      })
                      document.querySelectorAll('.parent-provinsi .gambar-attr').forEach(el=>{
                        el.style.opacity = '0'
                      })
                      document.querySelectorAll('.mark').forEach(element =>{
              
                        element.style.display = 'block'
                    })
                    setKembali(prev=>({
                      ...prev,
                      jenis: "0"
                    }))
                    }
              },60000)
          }, 5000);
          },5000)
          
          
        })
      }
    }, [pusherChannel, data]);
    

    const kembalikan = (output) =>{
      if(kembali.jenis == "0"){
        document.querySelector('.petafull').classList.remove('-z-10')
        document.querySelector('.petafull').style.opacity = '1'
        document.querySelector('.petafull').parentNode.style.zIndex = '10'
        document.querySelectorAll('.parent-provinsi').forEach(el=>{
          el.style.opacity = '0'
        })
        document.querySelectorAll('.parent-provinsi').forEach(el=>{
          el.style.zIndex = "-100"
        })
        document.querySelectorAll('.peta').forEach(element =>{

          element.style.opacity = '1'
        })
        document.querySelector('.btn-kembali').classList.add('hidden')
      }else{
        document.querySelectorAll('.tulisan-zoom').forEach(el=>{
          el.classList.remove('ketengah')
        })
        document.querySelectorAll('.parent-provinsi').forEach(el=>{
          el.style.left = '0%'
        })
        document.querySelectorAll('.parent-provinsi').forEach(el=>{
          el.querySelector('h1').style.opacity = '0'
        })
        document.querySelectorAll('.parent-provinsi .gambar-attr').forEach(el=>{
          el.style.opacity = '0'
        })
        document.querySelectorAll('.mark').forEach(element =>{

          element.style.display = 'block'
      })
      setKembali(prev=>({
        ...prev,
        jenis: "0"
      }))
      }

      setZoom(null,output.daerah)
      setAspirasi((prev)=>({
        ...prev,
        [output.daerah.replace(/-/g, '')]: output.aspirasi.replace(/\n/g, '') + ' -'+output.username
      }))
    }

    const resetZoom = () =>  {
      document.querySelectorAll('.peta').forEach(element =>{
        element.classList.remove('opacity-0')
      })
      setMarker("")
    }
    const animateText = (event) =>{
      let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 3)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 10);
    }
    const setZoom = (el,marker) =>{
    
        document.querySelector('.peta-'+marker).classList.remove('animasi-tulisan')
        document.querySelectorAll('.peta').forEach(element =>{
          element.style.opacity = '0'
        })
        document.querySelector('.petafull').style.opacity = '0'
        document.querySelector('.petafull').parentNode.style.zIndex = '-10'
        document.querySelector('.'+marker).style.left = '0%'
        document.querySelector('.'+marker +' h1').style.opacity = '0'
        document.querySelectorAll('.'+marker +' .gambar-attr').forEach(el=>{
          el.style.opacity = '0'
        })
        document.querySelectorAll('.'+marker+' .mark').forEach(element =>{
  
          element.style.display = 'block'
        })
      
        
        document.querySelector('.'+marker).style.opacity = '1'
        document.querySelector('.'+marker).style.zIndex = '15'
        document.querySelector('.'+marker+' .peta-prov').style.opacity = '1'
        document.querySelectorAll('.'+marker+' .mark').forEach(el=>{
          el.style.opacity = '1'
        })
        setMarker(marker)
        setKembali(prev=>({
          ...prev,
          jenis: "0",
          data:{
            parent: marker
          }
        }))
        document.querySelector('.btn-kembali').classList.remove('hidden')
      
    }

    const back = () =>{
      if(kembali.jenis == "0"){
        document.querySelector('.petafull').classList.remove('-z-10')
        document.querySelector('.petafull').style.opacity = '1'
        document.querySelector('.petafull').parentNode.style.zIndex = '10'
        document.querySelector('.'+kembali.data.parent).style.opacity = '0'
        document.querySelector('.'+kembali.data.parent).style.zIndex = "-100"
        document.querySelectorAll('.peta').forEach(element =>{

          element.style.opacity = '1'
        })
        document.querySelector('.btn-kembali').classList.add('hidden')
      }else{
        document.querySelector('.'+kembali.data.parent+' .tulisan-zoom').classList.remove('ketengah')
        document.querySelector('.'+kembali.data.parent).style.left = '0%'
        document.querySelector('.'+kembali.data.parent +' h1').style.opacity = '0'
        document.querySelector('.'+kembali.data.parent +' .'+ kembali.data.attr).style.opacity = '0'
        document.querySelectorAll('.mark').forEach(element =>{

          element.style.display = 'block'
          element.classList.remove('animasi-naikturun')
      })
      setKembali(prev=>({
        ...prev,
        jenis: "0"
      }))
      }
      
    }
    

    const klikmarker = (e,a,p,user) => {
      document.querySelector('.'+e).style.left = '-20%'
      document.querySelector('.'+e +' h1').style.opacity = '1'
      document.querySelector('.'+e +' .'+a).style.opacity = '1'
      document.querySelector('.'+e+' .tulisan-zoom').classList.add('ketengah')
      document.querySelectorAll('.'+e+' .mark').forEach(element =>{
        element.style.display = 'none'
      })

        document.querySelector('.'+e +' .mark.m-'+user.id).style.display = 'block'
        document.querySelector('.'+e +' .mark.m-'+user.id).classList.add('animasi-naikturun')
   
      document.querySelector('.'+e +' .'+a).style.opacity = '1'
      setKembali(prev=>({
        ...prev,
        jenis: "1",
        data: {
          parent: e,
          attr: a,
          posisi: p
        }
      }))
      document.querySelector('.btn-kembali').classList.remove('hidden')
      setAspirasi((prev)=>({
        ...prev,
        [user.daerah.replace(/-/g, '')]: user.aspirasi.replace(/\n/g, '')+ ' -'+user.username
      }))
    }

    return (
       <div className="flex justify-between h-screen align-center relative" style={{backgroundImage: `url('/bg.png')`,backgroundRepeat: 'repeat',overflow: 'hidden'}}>
        <div className="self-start"></div>
        {/* <button onClick={()=> setMarker(1)}>klik</button> */}
        <style>
          {
            `
            .petafull{
              transition: all 0.8s;
              opacity: 1;
            }
            .tulisan-zoom{
              left: 10% !important;
              top: 40% !important;
              font-weight: bold;
              bottom: 60% !important;
              font-size: 400% !important;
            }
            .ketengah{
              top: 0% !important;
              left: 140% !important;
              right: 0% !important;
              font-size: 280% !important;
            }
            .animasi-tulisan{
              transition: 7s;
              transform: scale(1.5);
              z-index: 100;
            }
            .animasi-naikturun{
              animation-play-state: running;
              animation: moveUpDown 2s linear infinite;
            }
            .peta{
              opacity: 1;
            }
            .peta:hover{
              transition: 7s;
              transform: scale(1.5);
              z-index: 100;
            }
            .gambar-attr{
              min-width: 40vh !important;
              max-width: 40vh !important;
              right: -57vw !important;
              top: 10vh !important;
              object-fit: contain !important;
                    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
                    border: solid 2px #41403E;
            }
            .text-aspirasi{
              top: 58vh !important;
              font-size: 300% !important;
              right: -110% !important;
              line-height: 100%;
            }
            .peta-prov{
              transition: all 1s;
              opacity: 0;
              object-fit: cover;
            }
            .zoom-jakbar{
              opacity: 0
              
            }
            .jakarta-selatan{
              opacity: 0;
              
            }
            .jakarta-timur{
              opacity: 0;
              
              transition: 0.8s;
            }
            .jakarta-pusat{
              opacity: 0;
              
            }
            .jakarta-barat{
              opacity: 0;
            }
            .jakarta-utara{
              opacity: 0;
              
            }
            .mark{
              opacity: 0;
              transition: all 1s;
              cursor: pointer
              animation-play-state: running;
              
            }
            .mark:hover{
              animation: moveUpDown 2s linear infinite;
            }
            .logo-kkk{
              position: absolute;
              right: -30%;
              bottom: 2%;
              width: 20%;
            }
           
          @keyframes moveUpDown {
            0%{
                transform: scale(1);
            }
            50% {
                transform: scale(1.4);
            }
            100% {
              transform: scale(1);
          }
        }
            `
          }
        </style>
          <button onClick={back} style={{zIndex: '100'}} className="absolute bottom-0 flex m-5 items-center input-sketch text-4xl left-0 hidden btn-kembali">
            <img src="/return.png" style={{width: '10%'}} className=""></img>
            KEMBALI
          </button>
        
          <div className="jakarta-utara parent-provinsi absolute" style={{transition: 'all 0.5s'}}>
          <img src="/dufan.png" className="gambar-attr dufan" style={{width: '50%',position: 'absolute',right: '-130%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/hutan-bakau.png" className="gambar-attr hutan-bakau" style={{width: '50%',position: 'absolute',right: '-130%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/jis.png" className="gambar-attr jis" style={{width: '50%',position: 'absolute',right: '-130%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/museum-bahari.png" className="gambar-attr museum-bahari" style={{width: '50%',position: 'absolute',right: '-130%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/pelasunda.png" className="gambar-attr pelasunda" style={{width: '50%',position: 'absolute',right: '-130%',opacity: 0,transition: 'all 1s'}}></img>



          <h1 className="text-aspirasi" onTransitionEnd={(e)=>animateText(e)} data-value={aspirasi.jakartautara}style={{width:'40%',fontSize: '200%',position: 'absolute',right: '-120%', bottom: '13%',transition: 'all 1s',opacity: '0'}}>{aspirasi.jakartautara}</h1>
          <h1 className="absolute top-0 left-0 tulisan-zoom" style={{left: '44vw',whiteSpace: 'nowrap',fontSize:'250%'}}>JAKARTA UTARA</h1>
          <img className="peta-prov" style={{width: '50vw',height: '100vh',objectFit: 'contain',position: 'relative',left: '50%',overflow: 'hidden'}} src="/zoom_jakut.png"></img>

          {
            user.jakartautara.map((el,i)=>{
              if(i % 2 == 0){
                return(
                  <img src="/mark.png" className={"absolute m-"+el.id+" mark m-"+dinamis.jakartautara[angkaRan.jakartautara]} onClick={()=> klikmarker('jakarta-utara',dinamis.jakartautara[angkaRan.jakartautara],'50%',el)} style={{width: '10%',top: 37 + ((50 - 37) * (el.x / 100))+'%',right:  -52 + ((-15 - -52) * (el.x / 100))+'%'}}></img>
                )
              }else{
                return(
                  <img src="/mark.png" className={"absolute m-"+el.id+" mark m-"+dinamis.jakartautara[angkaRan.jakartautara]} onClick={()=> klikmarker('jakarta-utara',dinamis.jakartautara[angkaRan.jakartautara],'50%',el)} style={{width: '10%',top: 40 + ((50 - 40) * (el.x / 100))+'%',right:  10 + ((22 - 10) * (el.x / 100))+'%'}}></img>
                )
              }
              
            })
          }

          {/* {
            user.jakartautara.map((el,i)=>{
              
            })
          } */}

{/* top 50% 40% , right 10%, 22% */}
{/* <img src="/mark.png" className={"absolute mark"} style={{width: '10%',top: '40%',right:  '22%'}}></img> */}
  
        </div>

        <div className="jakarta-barat parent-provinsi absolute" style={{transition: 'all 0.5s'}}>
          <img src="/museum-fata.png" className="gambar-attr museum-fata" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/museum-macan.png" className="gambar-attr museum-macan" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/pancoran-glodok.png" className="gambar-attr pancoran-glodok" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/pecel-lele.png" className="gambar-attr pecel-lele" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/starling.png" className="gambar-attr starling" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>

          <h1 className="text-aspirasi" onTransitionEnd={(e)=>animateText(e)} data-value={aspirasi.jakartabarat}style={{width:'40%',fontSize: '200%',position: 'absolute',right: '-120%', bottom: '13%',transition: 'all 1s',opacity: '0'}}>{aspirasi.jakartabarat}</h1>
          <h1 className="absolute top-0 tulisan-zoom" style={{left: '44vw',whiteSpace: 'nowrap',fontSize:'240%'}}>JAKARTA BARAT</h1>
          <img className="peta-prov" style={{width: '50vw',height: '100vh',objectFit: 'contain',position: 'relative',left: '50%',overflow: 'hidden'}} src="/zoom_jakbar.png"></img>

          {
            user.jakartabarat.map((el,i)=>{
              return(
                <img src="/mark.png" className={"absolute mark m-"+el.id+" m-"+dinamis.jakartabarat[angkaRan.jakartabarat]} onClick={()=> klikmarker('jakarta-barat',dinamis.jakartabarat[angkaRan.jakartabarat],'50%',el)} style={{width: '10%',top: (el.y * ((81 - 29) / 100)) + 29+'vh',right:  -32 + ((9 - -32) * (el.x / 100))+'%'}}></img>
              )
            })
          }

        </div>

        <div className="jakarta-timur parent-provinsi absolute" style={{transition: 'all 0.5s',marginTop: '3%'}}>
          <img src="/keongmas.png" className="gambar-attr keongmas" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/buperta.png" className="gambar-attr buperta" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s',top: '-10%'}}></img>
          <img src="/kanal.png" className="gambar-attr kanal" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/kesakpa.png" className="gambar-attr kesakpa" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/velo.png" className="gambar-attr velo" style={{width: '40%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>

          <h1 className="text-aspirasi" onTransitionEnd={(e)=>animateText(e)} data-value={aspirasi.jakartatimur}style={{width:'40%',fontSize: '200%',position: 'absolute',right: '-120%', bottom: '8%',transition: 'all 1s',opacity: '0'}}>{aspirasi.jakartatimur}</h1>


          <h1 className="absolute top-0 tulisan-zoom" style={{left: '44vw',whiteSpace: 'nowrap',fontSize:'240%',top: '-7%'}}>JAKARTA TIMUR</h1>

          <img className="peta-prov" style={{width: '50vw',height: '90vh',objectFit: 'contain',position: 'relative',left: '50%',overflow: 'hidden'}} src="/zoom_jaktim.png"></img>
          {
            user.jakartatimur.map((el,i)=>{
              return(
                <img src="/mark.png" className={"absolute mark m-"+el.id+" m-"+dinamis.jakartatimur[angkaRan.jakartatimur]} onClick={()=> klikmarker('jakarta-timur',dinamis.jakartatimur[angkaRan.jakartatimur],'50%',el)} style={{width: '10%',top: (el.y * ((80 - 11) / 100)) + 11+'vh',right: (el.x * ((5 - -5) / 100)) + -5+'vw'}}></img>
              )
            })
          }
          {/* <img src="/mark.png" className={"absolute mark"} style={{width: '10%',top: '40%',right:  '22%'}}></img> */}
        </div>

        <div className="jakarta-selatan parent-provinsi absolute" style={{transition: 'all 0.5s',marginTop: '5%'}}>
          <img src="/mbloc.png" className="gambar-attr mbloc" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/mrt.png" className="gambar-attr mrt" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/pim.png" className="gambar-attr pim" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/scbd.png" className="gambar-attr scbd" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/sudirman.png" className="gambar-attr sudirman" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/patpancoran.png" className="gambar-attr patpancoran" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/semanggi.png" className="gambar-attr semanggi" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>

          <h1 className="text-aspirasi" onTransitionEnd={(e)=>animateText(e)} data-value={aspirasi.jakartaselatan}style={{width:'40%',fontSize: '200%',position: 'absolute',right: '-120%', bottom: '13%',transition: 'all 1s',opacity: '0'}}>{aspirasi.jakartaselatan}</h1>
          <h1 className="text-4xl tulisan-zoom absolute top-0 left-0" style={{left: '44vw',whiteSpace: 'nowrap',fontSize:'240%',top: '-10%'}}>JAKARTA SELATAN</h1>
          <img className="peta-prov" style={{width: '50vw',height: '80vh',objectFit: 'contain',position: 'relative',left: '50%',overflow: 'hidden'}} src="/zoom_jaksel.png"></img>
          {
            user.jakartaselatan.map((el,i)=>{
              return(
                <img src="/mark.png" className={"absolute m-"+el.id+" mark m-"+dinamis.jakartaselatan[angkaRan.jakartaselatan]} onClick={()=> klikmarker('jakarta-selatan',dinamis.jakartaselatan[angkaRan.jakartaselatan],'50%',el)} style={{width: '10%',top: (el.y * ((43 - 6) / 100)) + 6+'vh',right: (el.x * ((6 - -12) / 100)) + -12+'vw'}}></img>
              )
            })
          }
        </div>

        <div className="jakarta-pusat parent-provinsi absolute" style={{transition: 'all 0.5s',marginTop: '5%'}}>
          <img src="/katredal.png" className="gambar-attr katredal" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/gn.png" className="gambar-attr gn" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/bni.png" className="gambar-attr bni" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/sarinah.png" className="gambar-attr sarinah" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/jamdinding.png" className="gambar-attr jamdinding" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/monas.png" className="gambar-attr monas" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/mrt.png" className="gambar-attr mrts" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/pasar.png" className="gambar-attr pasar" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/arjuna.png" className="gambar-attr arjuna" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/istana.png" className="gambar-attr istana" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/jiexpo.png" className="gambar-attr jiexpo" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/lapbanteng.png" className="gambar-attr lapbanteng" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/patselamat.png" className="gambar-attr patselamat" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/gbk.png" className="gambar-attr gbk" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          <img src="/tanahabang.png" className="gambar-attr tanahabang" style={{width: '40%',top: '-15%',position: 'absolute',right: '-121%',opacity: 0,transition: 'all 1s'}}></img>
          
          <h1 className="text-aspirasi" onTransitionEnd={(e)=>animateText(e)} data-value={aspirasi.jakartapusat}style={{width:'40%',fontSize: '200%',position: 'absolute',right: '-120%', bottom: '13%',transition: 'all 1s',opacity: '0',top: '50%'}}>{aspirasi.jakartapusat}</h1>

          <h1 className="absolute top-0 left-0 tulisan-zoom" style={{left: '44vw',whiteSpace: 'nowrap',fontSize:'240%',top: '-11%'}}>JAKARTA PUSAT</h1>

          <img className="peta-prov" style={{width: '50vw',height: '80vh',objectFit: 'contain',position: 'relative',left: '50%',overflow: 'hidden'}} src="/zoom_jakpus.png"></img>

          {
            user.jakartapusat.map((el,i)=>{
              return(
                <img src="/mark.png" className={"absolute m-"+el.id+" mark m-"+dinamis.jakartapusat[angkaRan.jakartapusat]} onClick={()=> klikmarker('jakarta-pusat',dinamis.jakartapusat[angkaRan.jakartapusat],'50%',el)} style={{width: '10%',top: (el.y * ((43 - 6) / 100)) + 6+'vh',right: (el.x * ((2 - -13) / 100)) + -13+'vw'}}></img>
              )
            })
          }
        </div>


        <div className="relative">
            <div className="absolute bottom-0" style={{width: '20%',left: '10%',top: '15%'}}>
              <img className="peta peta-jakarta-barat" style={{zIndex: '10',position: 'relative'}} onClick={(el)=> setZoom(el,'jakarta-barat')} src="/jabar.png"></img>
              {
                user.jakartabarat.map(el=>{
                  return(
                    <img src="/mark.png" className="absolute mark-utama" style={{width: '50%',top: -6 + ((40 - -6) * (el.y / 100))+'%',right: -7 + ((35 - -7) * (el.x / 100))+'%'}}></img>
                  )
                })
              }
   
      
            </div>
            <div className="absolute bottom-0" style={{width: '20%',right: '15%',top: '8%'}}>
              <img className="peta peta-jakarta-utara" style={{zIndex: '10',position: 'relative'}} onClick={(el)=> setZoom(el,'jakarta-utara')} src="/jakut.png"></img>
              {
                user.jakartautara.map(el=>{
                  return(
                    <img src="/mark.png" className="absolute mark-utama" style={{width: '50%',top: -5 + ((30 - -5) * (el.y / 100))+'%',right: 20 + ((55 - 20) * (el.x / 100))+'%'}}></img>
                  )
                })
              }

            </div>
            <div className="absolute bottom-0" style={{width: '20%',right: '50%',left: '40%',top: '25%'}}>
              <img className="peta peta-jakarta-pusat" style={{zIndex: '10',position: 'relative'}} onClick={(el)=> setZoom(el,'jakarta-pusat')} src="/japus.png"></img>
              {
                user.jakartapusat.map(el=>{
                  return(
                    <img src="/mark.png" className="absolute mark-utama" style={{width: '50%',top: -10 + ((25 - -10) * (el.y / 100))+'%',right: -30 + ((100 - -30) * (el.x / 100))+'%'}}></img>
                  )
                })
              }
              
            </div>
            
           <img onClick={() => resetZoom()} src="/peta-new.png" className={'petafull'} style={{width: '80%',height: '95%'}} ></img>
            <img src="/logo-kkk.png" className="logo-kkk"></img>
           <div className="absolute bottom-0" style={{width: '20%',left: '24%',bottom: '25%'}}>
              <img onClick={(el)=> setZoom(el,'jakarta-selatan')} style={{zIndex: '10',position: 'relative'}} className="peta peta-jakarta-selatan" src="/jaksel.png"></img>
              {
                user.jakartaselatan.map(el=>{
                  return(
                    <img src="/mark.png" className="absolute mark-utama" style={{width: '50%',top: -35 + ((70 - -35) * (el.y / 100))+'%',right: -1 + ((75 - -1) * (el.x / 100))+'%'}}></img>
                  )
                })
              }

            </div>

            <div className="absolute bottom-0" style={{width: '20%',right: '35%',bottom: '22%'}}>
              <img onClick={(el)=> setZoom(el,'jakarta-timur')} style={{zIndex: '10',position: 'relative'}} className="peta peta-jakarta-timur" src="/jatim.png"></img>
              {
                user.jakartatimur.map(el=>{
                  return(
                    <img src="/mark.png" className="absolute mark-utama" style={{width: '50%',top: -20 + ((85 - -20) * (el.y / 100))+'%',right: -3 + ((100 - -3) * (el.x / 100))+'%'}}></img>
                  )
                })
              }
            </div>
        </div>
        <div></div>
       </div>
    )
}