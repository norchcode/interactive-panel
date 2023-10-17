import axios from "axios";
import pusherJs from "pusher-js";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { io } from "socket.io-client";

export default function aspirasi(){
    const [count, setCount] = useState(50);
    const [data,setData] = useState([[],[],[],[]])
    const marqueeRefs = useRef([]);
    let speedSlider = [50,30,40,20]
    let fz = [{fz: '3.5vh',tinggi: '30%'},{fz: '3vh',tinggi: '30%'},{fz: '3.2vh',tinggi: '25%'}]
    useEffect(() => {
      const pusher = new pusherJs("97ba46579f599fb617f5", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("owner");

      channel.bind("owner-event", function (data) {
          let output = data.data.data
          console.log(output)
          setData((prevDataArray) => {
            const newDataArray = [...prevDataArray]; // Make a shallow copy of the outer array
            const innerArrayToUpdate = [...prevDataArray[1]]; // Make a shallow copy of the inner array
      
            // Modify the inner array (in this case, adding a new object at index 6)
            innerArrayToUpdate.splice(0, 0, { text: output.aspirasi, user: output.username,animation: false});
      
            // Update the outer array with the modified inner array
            newDataArray[1] = innerArrayToUpdate;
      
            return newDataArray; // Set the state with the updated data
          });
          setTimeout(()=>{
            
        axios.get('/api/user/getowner').then(e=>{
          console.log(e)
        e.data.data.forEach((val,i)=>{
          setTimeout(() => {
            let angkaran = [0,2,3]
            var angka = Math.floor(Math.random() * 3);
            setData((prevDataArray) => {
              const newDataArray = [...prevDataArray]; // Make a shallow copy of the outer array
              const innerArrayToUpdate = [...prevDataArray[angkaran[angka]]]; // Make a shallow copy of the inner array
        
              // Modify the inner array (in this case, adding a new object at index 6)
              innerArrayToUpdate.splice(0, 0, { text: val.aspirasi, user: val.username,animation: false});
        
              // Update the outer array with the modified inner array
              newDataArray[angkaran[angka]] = innerArrayToUpdate;
              
              return newDataArray; // Set the state with the updated data
            });
          }, i * 11000);
        })
      })
          },2000)
        });

      // axios.get('/api/user/get').then(e=>{
      //   let copy = [[],[],[],[]]
      //   e.data.data.forEach(val=>{
      //     let angka = Math.floor(Math.random() * 4)
      //     copy[angka].push({text: val.aspirasi,user: val.username,animation: false})
      //   })
      //   setData2(copy)
      // })
      return () => {
        pusher.unsubscribe("owner");
      };
  }, []);

  const checkbtn = () =>{
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // Hitung posisi tengah horizontal
    var centerX = viewportWidth / 2;
    centerX = Math.floor(centerX - (centerX * (70/100)))
    viewportWidth = Math.floor(viewportWidth - (viewportWidth * (30 / 100)))
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
                innerArrayToUpdate.splice(baris, 0, { text: "Halo halo jakarta", user: "@vinn", animation: true });
          
                // Update the outer array with the modified inner array
                newDataArray[arr] = innerArrayToUpdate;
          
                return newDataArray; // Set the state with the updated data
              });
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