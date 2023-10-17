import axios from "axios"
import pusherJs from "pusher-js";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";
export default function masukan(){
    const [input,setInput] = useState({
        username: '',
        daerah: '',
        aspirasi: ''
    })
    const [error,setError] = useState({})
    const [waitBtn,setWaitBtn] = useState(false)
    var styles = {
        body: {
            backgroundImage: 'url("/sketch_bg.png")',
        backgroundSize: 'cover',
        backgroundPositionY: '80%',
        minHeight: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat'
        }
        
      }
    useEffect(() => {
        const pusher = new pusherJs("97ba46579f599fb617f5", {
          cluster: "ap1",
        });
        for(let i in styles.body){
            document.body.style[i] = styles.body[i];
        }
        const channel = pusher.subscribe("chat");
        document.body.st
        return () => {
          pusher.unsubscribe("chat");
        };
      }, []);

    const changeInput = (value,state)=>{
        if(state == 'aspirasi'){
            if(value.length > 60){
                toast.error('Maaf maksimal 60 karakter!')
                return;
            }
        }
        delete error[state]
        setInput(prev =>({
            ...prev,
            [state]: value
        }))
        console.log(input)
    }
    const submitForm = () =>{
        if(waitBtn){
            toast.error('Harap menunggu 30 detik!')
            return;
        }
        let err = false
        for(let key in input) {
            if(input[key] === "") {
                setError(prev=>({
                    ...prev,
                    [key]: 'Wajib diisi' 
                }))
                err = true
            }
        }
        if(input.aspirasi.length > 60){
            toast.error('Maaf maksimal 60 karaker!')
            return;
        }
        if(!err){
            let id = toast.loading('Proses mengirim data',{
                className: 'toast-sketch'
            })

            axios.post('/api/user/add',input).then(e=>{
                axios.post("/api/pusher", { data: e.data });
                toast.update(id,{
                    render:'Terima kasih! berhasil dikirim',
                    className: 'toast-sketch',
                    type: "success", 
                    isLoading: false,
                    autoClose: 2000,
                })
                setWaitBtn(true)
                setTimeout(()=>{
                    setWaitBtn(false)
                },30000)
            }) 
            

            setInput({
                username: '',
                daerah: '',
                aspirasi: ''
            })
            document.querySelector('#pilihdaerah').selectedIndex = 0;
        }else{
            toast.error("Form wajib diisi semua!")
        }
    }
    return(
        <div className="" style={{backgroundSize: 'cover',display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',height: '100vh'}}>
            <img className="absolute w-full" style={{zIndex: '-999',opacity: '0.3',height: '100vh'}} src="https://img.freepik.com/free-photo/crumpled-white-paperboard_95678-119.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696982400&semt=sph"></img>

            <img src="/kata-kota-kita.png" style={{top: '1vw'}} className="absolute left-5 w-36"></img>
            
            <img src="/pkn.png" style={{top: '1vw',right: '9%'}} className="absolute w-24"></img>
            <img src="/kemendik.png" style={{top: '1vw',right: '1%'}} className="absolute w-24"></img>
            {/* <p className="absolute text-red-500 ml-4 mt-16 top-0 left-0" style={{fontSize: '200%'}}>KATA <br/> KOTA <br/> KITA</p> */}
            <ToastContainer />
            <style>
                    {
                        `
                        .Toastify__toast-icon svg{
                            fill: gray !important;
                        }
                        .Toastify__progress-bar--success{
                            color: #41403E;
                            background-color: #41403E;
                        }
                        .toast-sketch{
                            box-shadow: 20px 38px 34px -26px rgba(0, 0, 0, 0.2);
                            border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
                            border: solid 2px #41403E;
                        }
                        .input-sketch{
                            align-self: center;
  background: transparent;
  padding: 10px;
  transition: all 0.5s ease;
  color: #41403E;
  font-size: 1.3rem;
  letter-spacing: 1px;
  outline: none;
  width: 230px
    }
    option{
        text-align: center;
    }
.input-sketch.bigtext{
    width: 260px;
    height: 70px;
    word-wrap: break-word;
        word-break: break-all;
} 
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
label{
    font-size:  1.6rem;
}
.avatar:hover{
    box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.3);
}

.kirim:hover{
    -webkit-filter: drop-shadow(2px 2px 5px #222);
  filter: drop-shadow(2px 2px 5px #222);
}
                        `
                    }
                </style>
            <div className="" style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',marginTop: '-8vh'}}>
                
                <label>Instagram Kamu</label>
                <div className="relative">
                    <img src="/kotakaspirasi.png" className="kotak-aspirasi" style={{width: '230px',height: '60px'}}></img>
                    <input placeholder="Contoh: @namapengguna" value={input.username} defaultValue={input.username} onChange={(e) => changeInput(e.target.value,'username')} className={"lined thick input-sketch absolute top-0 left-3"+(error.username ? ' error' : '')} type="text"/>
                </div>
                

                <label>Area Kamu</label>
                <div className="relative">
                    <img src="/kotakaspirasi.png" className="kotak-aspirasi" style={{width: '230px',height: '60px'}}></img>
                    <select id="pilihdaerah" onChange={(e) => changeInput(e.target.value,'daerah')} className={"input-sketch absolute top-1"+(error.daerah ? 'error' : '')}>
                        <option selected disabled>(-Pilih Area Kamu-)</option>
                        <option value="jakarta-utara">Jakarta Utara</option>
                        <option value="jakarta-pusat">Jakarta Pusat</option>
                        <option value="jakarta-barat">Jakarta Barat</option>
                        <option value="jakarta-selatan">Jakarta Selatan</option>
                        <option value="jakarta-timur">Jakarta Timur</option>
                    </select>
                </div>
                

                <label>10 Kata untuk Jakarta</label>
                <div className="relative">
                    <img src="/kotakaspirasi.png" className={"kotak-aspirasi"+(error.aspirasi ? ' error' : '')} style={{width: '300px',height: '100px'}}></img>
                    <textarea value={input.aspirasi} defaultValue={input.aspirasi} onChange={(e) => changeInput(e.target.value,'aspirasi')} placeholder="Ketik Aspirasimu" className={"pl-5 lined thick input-sketch bigtext absolute top-3 left-5"} type="text"/>
                </div>
                

                <img onClick={submitForm} className={"w-32 mt-5 mb-10 kirim "+(waitBtn ? 'opacity-50' : 'opacity-100')} src="/kirimbtn.png"></img>
                
            </div>
            
        </div>
    )
}