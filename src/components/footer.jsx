import '../assets/css/footer.css'

export default function Footer() {
    return (
        <div className=''>
            <div className="w-fit m-auto">
                <div className="icon">
                    <ul className="flex gap-10 text-[30px] justify-center">
                        <li className='text-blue-600'><a href="https://www.facebook.com/suph.nath.khn.deim.418797/" target="_blank"><i class="fa-brands fa-facebook"></i></a></li>
                        <li className='text-yellow-300'><a href="https://mail.google.com/mail/u/1/#inbox" target="_blank"><i class="fa-solid fa-envelope"></i></a></li>
                        <li className='text-green-500'><a href="https://line.me/ti/p/r_h5KsT3Fy" target="_blank"><i class="fa-brands fa-line"></i></a></li>
                    </ul>
                </div>

                <div className="footer-Detail text-center">
                    <p>มหาวิทยาลับศรีปทุม</p>
                    <p>คณะเทคโนโลยีสารสนเทศ | สาขาวิทยาการคอมพิวเตอร์</p>
                    <p className="text-[10px]">&copy; Supanat Chavanich | 2025</p>
                </div>
            </div>
        </div>
    )
}