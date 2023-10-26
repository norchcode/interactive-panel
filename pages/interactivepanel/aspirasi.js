import axios from "axios";
import pusherJs from "pusher-js";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { io } from "socket.io-client";

export default function aspirasi(){
    const [count, setCount] = useState(50);
    const [data,setData] = useState([[{text: '',user: '',animation: false}],[{text: '',user: '',animation: false}],[{text: '',user: '',animation: false}],[{text: '',user: '',animation: false}]])
    const [clearAnimation,setClearAnimation] = useState(false)
    const marqueeRefs = useRef([]);
    const [ang,setAng] = useState(1)
    let speedSlider = [50,30,40,20]
    let fz = [{fz: '3.5vh',tinggi: '30%'},{fz: '3vh',tinggi: '30%'},{fz: '3.2vh',tinggi: '25%'}]
    useEffect(() => {
      const reloadInterval = setInterval(() => {
        location.reload();
      }, 10 * 60 * 1000);

      const pusher = new pusherJs("97ba46579f599fb617f5", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("chat");

      channel.bind("chat-event", function (data) {
        console.log(new Date().toLocaleString())
          let output = data.data.data
          console.log(output)
          var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

          // Hitung posisi tengah horizontal
          var centerX = viewportWidth / 2;

          centerX = Math.floor(centerX - (centerX * (60/100)))
              viewportWidth = Math.floor(viewportWidth - (viewportWidth * (8 / 100)))

    var angka = Math.floor(Math.random() * 4);
        const marqueeElements = document.querySelectorAll('.marquee_parent')[angka].querySelectorAll('.rfm-child')
        for(let i = 0; i < marqueeElements.length; i++){
        if (marqueeElements[i]) {
            const rect = marqueeElements[i].getBoundingClientRect();
            var elemenTengahX = (rect.left + rect.right) / 2;
            // const isOutOfScreen = rect.left == 0;
            if (elemenTengahX >= centerX && elemenTengahX <= viewportWidth) {
              console.log(marqueeElements[i])
              // break
              let marqueeEl = marqueeElements[i].querySelector('.marquee_list')
              let arr = marqueeEl.getAttribute('array')
              let baris = marqueeEl.getAttribute('baris')
              console.log(marqueeEl)
              setData((prevDataArray) => {
                const newDataArray = [...prevDataArray]; // Make a shallow copy of the outer array
                const innerArrayToUpdate = [...prevDataArray[arr]]; // Make a shallow copy of the inner array
          
                // Modify the inner array (in this case, adding a new object at index 6)
                innerArrayToUpdate.splice(baris, 0, { text: output.aspirasi, user: output.username,animation: true});
          
                // Update the outer array with the modified inner array
                newDataArray[arr] = innerArrayToUpdate;
          
                return newDataArray; // Set the state with the updated data
              });
              setClearAnimation(true)
              break;
            }
          }
    }
        });

      axios.get('/api/user/get').then(e=>{
        let copy = [[],[],[],[]]
        e.data.data.forEach(val=>{
          let angka = Math.floor(Math.random() * 4)
          copy[angka].push({text: val.aspirasi,user: val.username,animation: false})
        })
        setData(copy)
      })
      return () => {
        pusher.unsubscribe("chat");
        clearInterval(reloadInterval);
      };
  }, []);

  useEffect(()=>{
    if(clearAnimation){
      setTimeout(()=>{
        const newState = data.map(innerArray =>
          innerArray.map(item => ({
            ...item,
            animation: false
          }))
        );
        setData(newState);
          },6000)
    }
          setClearAnimation(false)
     
  },[data,clearAnimation])

  const checkbtn = () =>{
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // Hitung posisi tengah horizontal
    var centerX = viewportWidth / 2;
    centerX = Math.floor(centerX - (centerX * (60/100)))
    setAng(ang + 1)
    viewportWidth = Math.floor(viewportWidth - (viewportWidth * (8 / 100)))
    var angka = Math.floor(Math.random() * 4);
        const marqueeElements = document.querySelectorAll('.marquee_parent')[angka].querySelectorAll('.rfm-child')
        // console.log(marqueeElements)
        for(let i = 0; i < marqueeElements.length; i++){
        if (marqueeElements[i]) {
            const rect = marqueeElements[i].getBoundingClientRect();
            var elemenTengahX = (rect.left + rect.right) / 2;
            // const isOutOfScreen = rect.left == 0;
            if (elemenTengahX >= centerX && elemenTengahX < viewportWidth) {
              console.log(marqueeElements[i])
              // break

              let marqueeEl = marqueeElements[i].querySelector('.marquee_list')
              let arr = marqueeEl.getAttribute('array')
              let baris = marqueeEl.getAttribute('baris')
              console.log(marqueeEl)
              setData((prevDataArray) => {
                const newDataArray = [...prevDataArray]; // Make a shallow copy of the outer array
                const innerArrayToUpdate = [...prevDataArray[arr]]; // Make a shallow copy of the inner array
          
                // Modify the inner array (in this case, adding a new object at index 6)
                innerArrayToUpdate.splice(baris, 0, { text: "Halo halo jakarta " + ang, user: "@vinn", animation: true });
                // Update the outer array with the modified inner array   
                newDataArray[arr] = innerArrayToUpdate;
          
                return newDataArray; // Set the state with the updated data
              });
              setClearAnimation(true)
              console.log(data)
              
              break;
            }
          }
    }
  }

    return(
        <div>
          {/* <button onClick={checkbtn}>TEKAN AKU</button> */}
            {data.map((e,i)=>{
              
              return (
                <div className="marquee_parent">
                <Marquee speed={speedSlider[i]} className="marquee">
                  {e.map((azz,w)=>{
                    var angka = Math.floor(Math.random() * 3);
                    if(azz.text.toLowerCase().includes('polusi')){
                      return (<div className="relative ct" style={{width: 'fit-content',marginRight: '20%'}}>
                              <img src={"/boost-awan.png"}  className="absolute" style={{width: '40%',height: '75%',top: '-10%',right: '-37%',zIndex: '-2',objectFit: 'contain'}}></img>
                              <img src={"/boost-awan.png"}  className="absolute" style={{width: '40%',height: '75%',top: '45%',right: '-37%',zIndex: '-2',objectFit: 'contain'}}></img>

                              <div array={i} baris={w} ref={(el) => marqueeRefs.current.push(el)} className={"marquee_list id" + i + w + ' relative '+(azz.animation ? "animation" : '')} style={{zIndex: '5'}} aria-hidden="true">
                                  <p className="text-black" style={{fontSize: fz[angka].fz}}>{azz.text} <br/> <span style={{fontSize: '70%'}}>{azz.user}</span></p>
                              </div>

                    </div>)
                    }else{
                      return (<div className="relative ct" style={{width: 'fit-content'}}>
                            
                              <img src={"/boost.png"}  className="absolute" style={{width: fz[angka].tinggi,height: '70%',top: '20%',right: '-15%',zIndex: '-1',objectFit: 'cover'}}></img>

                              <div array={i} baris={w} ref={(el) => marqueeRefs.current.push(el)} className={"marquee_list id" + i + w + ' relative '+(azz.animation ? "animation" : '')} aria-hidden="true">
                                  <p className="text-black" style={{fontSize: fz[angka].fz}}>{azz.text} <br/> <span style={{fontSize: '70%'}}>{azz.user}</span></p>
                              </div>

                    </div>)
                    
                    
                    }
                    
                  })}
                </Marquee>
              </div>
          
              )
            })}
            
        </div>
    )
}