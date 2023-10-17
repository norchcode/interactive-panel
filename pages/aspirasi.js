import { useState } from "react";
import Marquee from "react-fast-marquee";

export default function aspirasi(){
    const [count, setCount] = useState(10);

  const add = () => {
    // Menambah 1 ke cardCount saat tombol diklik
    setCount(count + 1);
  };
    return(
        <div>
            <div className="marquee_parent">
            <Marquee className="marquee">
            {Array.from({ length: count }, (_, index) => (
                    <div className="marquee_list" aria-hidden="true">
                    Lorem Ipsum {index}
                    </div>
                ))}
            </Marquee>
            </div>
            <div className="marquee_parent">
            <Marquee className="marquee">
            {Array.from({ length: count }, (_, index) => (
                    <div className="marquee_list" aria-hidden="true">
                    Lorem Ipsum {index}
                    </div>
                ))}
            </Marquee>
            </div>
            <div className="marquee_parent">
            <Marquee className="marquee">
            {Array.from({ length: count }, (_, index) => (
                    <div className="marquee_list" aria-hidden="true">
                    Lorem Ipsum {index}
                    </div>
                ))}
            </Marquee>
            </div>
            <div className="marquee_parent">
            <Marquee className="marquee">
            {Array.from({ length: count }, (_, index) => (
                    <div className="marquee_list" aria-hidden="true">
                    Lorem Ipsum {index}
                    </div>
                ))}
            </Marquee>
            </div>
            
        </div>
    )
}