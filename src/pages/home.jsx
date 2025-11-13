import Mypic from "../assets/Mypicture.jpg"
import { SiNextdotjs } from "react-icons/si";
import "../assets/css/otherr.css"
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
    const text = ['hello', 'next'];
    return (
        <>
            <div className="w-[700px] m-auto mt-[50px]">
                <div className="HeaderDetail ">

                    <div className="img flex justify-center">
                        <img className=" rounded-2xl" src={Mypic} alt="" width={200} height={200} />
                    </div>

                    <div className="nameText text-center text-[20px]">
                        <p className=" text-[40px]"> <Typewriter
                            words={["Hello Everyone", "My name is", "Supanat Chavanich", "You can call Me Gain"]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={50}
                            deleteSpeed={10}
                            delaySpeed={3000}
                        /></p>
                        <p><span>67155077</span> <span>ชั้นปีที่ 2</span></p>
                    </div>
                </div>

                <div className="Text-detaill w-[30rem] m-auto rounded-2xl my-5 bg-pink-300   py-[15px]">
                    <div>
                        <div className="HeaderDescription flex gap-3 justify-center">
                            <p>สาขาวิทยาการคอมพิวเตอร์</p> | <p>คณะเทคโนโลยีสารสนเทศ</p>
                        </div>
                        <div className="univercity text-center">
                            <p>มหาวิทยาลับศรีปทุม</p>
                        </div>
                    </div>
                </div>

                <div className="description text-center shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] rounded-2xl p-5 w-[30rem] m-auto">
                    <p>สวัสดีครับผมเก็นครับ อายุ 19 ปี อยู่จังหวัดฉะเชิงเทรา จบมัธยมศึกษาปีที่ 6 จากโรงเรียนเบญจมราชรังสฤษฎิ์ ปัจจุบันเป็นนักศึกษามหาวิทยาลัยศรีปทุม
                        สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ ผมเป็นคนชอบเรียนรู้สิ่งใหม่ๆอยู่เสมอ
                        เล่นเกมเพื่อผ่อนคลาย โดยส่วนมากจะศึกษาสิ่งใหม่ๆอยู่เสมอ
                    </p>
                </div>
                <div className="skill flex justify-center gap-10 my-8 text-[30px]">
                    <div>
                        <i className="fa-brands fa-html5 text-orange-500"></i>
                    </div>
                    <div>
                        <i className="fa-brands fa-css3-alt text-blue-500"></i>
                    </div>
                    <div>
                        <i className="fa-brands fa-square-js text-yellow-500"></i>
                    </div>
                    <div>
                        <SiNextdotjs className="icon-Next mt-1" />
                    </div>
                    <div>
                        <i className="fa-brands fa-react text text-blue-500"></i>
                    </div>
                    <div>
                        <i className="fa-brands fa-node-js text-green-500"></i>
                    </div>
                </div>
            </div>
        </>
    )
}