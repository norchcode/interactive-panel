import Lottie from "lottie-react"
import { useEffect, useState } from "react"
import next_btn from '@/lottie/next_btn.json'

export default function form(){
    const [angka,setAngka] = useState(1)
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
      setIsClient(true)
    }, [])
  const myStyle = `body{
    overflow: hidden;
  }
  
  h1, h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  h1 {
    top: 24px;
    color: white;
    font-size: 12px;
  }
  
  h2 {
    top: 44px;
    color: white;
    font-size: 10px;
    opacity: 0.7;
  }
  
  ul.items {
    display: flex;
    position: absolute;
    height: auto;
    top: -25vh;
    left: 5vw;
  }
  ul.items li {
    width: 20px;
    height: 20px;
    margin: 0px 15px;
    background: var(--main);
    border-radius: 50%;
    opacity: 0.4;
    cursor: pointer;
  }
  ul.items li.active {
    opacity: 1;
  }
  
  form {
    position: absolute;
    width: 300px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  form fieldset {
    background: white;
    border-radius: 3px;
    opacity: 0;
    margin-left: -30px;
    display: none;
    transform: scale(0.2);
    transition: all 0.4s ease-in-out;
    border-radius: 20px;
  }
  form fieldset input, form fieldset p {
    display: inline-block;
    color: #333333;
    font-size: 16px;
    letter-spacing: 1px;
  }
  form fieldset p {
    margin-top: 0px;
    text-align: center;
  }
  form fieldset input {
    margin-top: 8px;
    border: 3px solid var(--main);
    border-radius: 50px;
    padding: 20px;
    height: 80px;
    width: 350px;
    font-size: 18px;
    outline: none;
  }
  form fieldset .icon {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 15px;
    transition: all 0.4s ease;
  }
  form fieldset .icon i {
    position: absolute;
    display: block;
  }
  form fieldset .icon i::before, form fieldset .icon i::after {
    position: absolute;
    content: "";
  }
  form fieldset .icon.left {
    left: 10px;
  }
  form fieldset .icon.right {
    right: 10px;
    cursor: pointer;
  }
  form fieldset .icon.button:hover {
    background: #f2f2f2;
    border-radius: 3px;
    transition: all 0.4s ease;
  }
  form fieldset.enable {
    z-index: 1;
    display: block;
    opacity: 1;
    transition: all 0.5s ease-out 0.2s;
    transform: scale(1);
    animation: enable 0.5s ease-out 0.2s;
  }
  form fieldset.disable {
    opacity: 0;
    transition: all 0.3s ease-in;
    transform: translateY(120px) scale(0.9);
  }
  
  body.error fieldset {
    transform-origin: 50% 100%;
    animation: error 0.3s ease-out;
  }
  
  @keyframes enable {
    0% {
      opacity: 0;
      transform: scale(0.2);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes error {
    0%, 50%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-3deg);
    }
    75% {
      transform: rotate(3deg);
    }
  }
  /**
   * * Icons in CSS, long as f****
   * */
  .icon .arrow {
    width: 2px;
    height: 17px;
    top: 5px;
    left: 14px;
    background: #333333;
  }
  .icon .arrow::before {
    width: 6px;
    height: 6px;
    bottom: -1px;
    left: -3px;
    border-color: #333333;
    border-right: 2px solid;
    border-bottom: 2px solid;
    transform: rotate(45deg);
  }
  
  .icon .user {
    width: 20px;
    height: 10px;
    bottom: 5px;
    left: 5px;
    box-shadow: 0 0 0 2px #333333 inset;
    border-radius: 6px 6px 3px 3px;
  }
  .icon .user::before {
    width: 10px;
    height: 10px;
    top: -9px;
    left: 5px;
    box-shadow: 0 0 0 2px #333333 inset;
    border-radius: 50%;
  }
  
  .icon .letter {
    width: 20px;
    height: 12px;
    top: 9px;
    left: 5px;
    box-shadow: 0 0 0 2px #333333 inset;
    border-radius: 3px;
  }
  .icon .letter::before, .icon .letter::after {
    width: 11px;
    height: 2px;
    top: 4px;
    background: #333333;
  }
  .icon .letter::before {
    left: 0;
    transform: rotate(30deg);
  }
  .icon .letter::after {
    right: 0;
    transform: rotate(-30deg);
  }
  
  .icon .lock {
    width: 20px;
    height: 16px;
    top: 9px;
    left: 5px;
    box-shadow: 0 0 0 2px #333333 inset;
    border-radius: 3px;
  }
  .icon .lock::before {
    width: 8px;
    height: 8px;
    top: -4px;
    left: 4px;
    border: 2px solid transparent;
    border-top: 2px solid #333333;
    border-right: 2px solid #333333;
    border-radius: 50%;
    transform: rotate(-45deg);
  }
  .icon .lock::after {
    width: 6px;
    height: 7px;
    top: 4px;
    left: 7px;
    box-shadow: 0 0 0 2px #333333 inset;
  }
  
  .icon .heart {
    width: 10px;
    height: 10px;
    top: 11px;
    left: 7px;
    background: #ff5233;
    transform: rotate(45deg);
  }
  .icon .heart::before, .icon .heart::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff5233;
  }
  .icon .heart::before {
    left: -6px;
  }
  .icon .heart::after {
    top: -6px;
  }`
    const nextBtn = ()=>{
      if(angka <= 3){
        setAngka(angka+1)
      }
      
    }

    return(
        <div style={{overflow: 'hidden'}}>
          <style>
        {isClient ? myStyle : ''}
      </style>
            <h1>Step by step form</h1>
            <h2>Just practising Javascript</h2>
            <form>
            <ul className="items">
              <li onClick={()=>setAngka(1)} className={angka == 1 || angka == 4 ? 'active' : ''}></li>
              <li onClick={()=>setAngka(2)} className={angka == 2 || angka == 4 ? 'active' : ''}></li>
              <li onClick={()=>setAngka(3)} className={angka == 3 || angka == 4 ? 'active' : ''}></li>
            </ul>
              <fieldset className={"username " + (angka == 1 ? 'enable' : '')}>
                <input autoComplete="off" type="text" name="username " placeholder="Tulis Aspirasi"/>
              </fieldset>
              <fieldset className={"email " + (angka == 2 ? 'enable' : '')}>
                <input autoComplete="off" type="text" name="username " placeholder="Tulis Aspirasi"/>
              </fieldset>
              <fieldset className={"pass " + (angka == 3 ? 'enable' : '')}>
                <input autoComplete="off" type="text" name="username " placeholder="Tulis Aspirasi"/>
              </fieldset>
              <Lottie style={{cursor: 'pointer'}} className="ml-4" onClick={nextBtn} loop={true} animationData={next_btn}></Lottie>
              
              <fieldset className="thanks">
                <div className="icon left"><i className="heart"></i></div>
                <p>Thanks for your time</p>
                <div onClick={nextBtn} className="icon right"><i className="heart"></i></div>
              </fieldset>
            </form>
        </div>
    )
}