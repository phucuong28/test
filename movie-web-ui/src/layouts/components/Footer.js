import { logo } from '../../assets/imgs';

const Footer = () => {
    return (
        <div className="bg-[#1d1c1f] text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 w-[320px] md:w-[690px] lg:w-[925px] xl:w-[1080px]">
                <div>
                    <div className="mb-5 w-[160px]">
                        <img className="w-full" src={logo} alt="logo" />
                    </div>
                    <p className="text-[#eeeeee] text-[1.5rem]">
                        Liên hệ: <span>0123456789</span>
                    </p>
                    <p className="text-[#eeeeee] text-[1.5rem]">
                        Email: <span>admin@gmail.com</span>
                    </p>
                    <p className="text-[#eeeeee] text-[1.5rem]">2023 phiuphim.net</p>
                </div>
                <div>
                    <p className="text-[1.8rem] text-[#ffb700] mb-3">Phim mới</p>
                    <a href="/phim-le?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim lẻ mới
                    </a>
                    <a href="/phim-bo?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim bộ mới
                    </a>
                    <a href="/phim-chieu-rap?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim chiếu rạp
                    </a>
                </div>
                <div>
                    <p className="text-[1.8rem] text-[#ffb700] mb-3">Phim lẻ</p>
                    <a href="/the-loai/hanh-dong?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim hành động
                    </a>
                    <a href="/quoc-gia/han-quoc?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim Hàn Quốc
                    </a>
                    <a href="/the-loai/vien-tuong?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim viễn tưởng
                    </a>
                </div>
                <div>
                    <p className="mb-3 text-[#ffb700]">Phim bộ</p>
                    <a href="/quoc-gia/han-quoc?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim Hàn Quốc
                    </a>
                    <a href="/quoc-gia/thai-lan?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim Thái Lan
                    </a>
                    <a href="/quoc-gia/hong-kong?page=1" className="block text-[#eeeeee] text-[1.5rem]">
                        Phim Hồng Kông
                    </a>
                </div>
            </div>
            <div className="p-8 text-center border-t border-[#cccccc] border-opacity-[0.2]">
                <p>All Rights Reserved by PhiuPhim</p>
            </div>
        </div>
    );
};

export default Footer;
