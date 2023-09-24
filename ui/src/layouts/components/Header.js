import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faXmark, faArrowRight, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { logo } from '../../assets/imgs';
import { useDebounce } from '../../hooks';
import Card5 from '../../components/Card/Card5';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [countryOpen, setCountryOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [allMovies, setAllMovies] = useState([]);

    const debouncedValue = useDebounce(searchValue, 300);

    const categories = [
        { label: 'Hành động', value: 'hanh-dong' },
        { label: 'Tình cảm', value: 'tinh-cam' },
        { label: 'Hài hước', value: 'hai-huoc' },
        { label: 'Cổ trang', value: 'co-trang' },
        { label: 'Tâm lý', value: 'tam-ly' },
        { label: 'Hình sự', value: 'hinh-su' },
        { label: 'Chiến tranh', value: 'chien-tranh' },
        { label: 'Thể thao', value: 'the-thao' },
        { label: 'Võ thuật', value: 'vo-thuat' },
        { label: 'Viễn tưởng', value: 'vien-tuong' },
        { label: 'Phiêu lưu', value: 'phieu-luu' },
        { label: 'Khoa học', value: 'khoa-hoc' },
        { label: 'Kinh dị', value: 'kinh-di' },
        { label: 'Âm nhạc', value: 'am-nhac' },
        { label: 'Thần thoại', value: 'than-thoai' },
        { label: 'Tài liệu', value: 'tai-lieu' },
        { label: 'Gia đình', value: 'gia-dinh' },
        { label: 'Chính kịch', value: 'chinh-kich' },
        { label: 'Bí ẩn', value: 'bi-an' },
        { label: 'Học đường', value: 'hoc-duong' },
        { label: 'Kinh điển', value: 'kinh-dien' },
    ];

    const countries = [
        { label: 'Trung Quốc', value: 'trung-quoc' },
        { label: 'Hàn Quốc', value: 'han-quoc' },
        { label: 'Nhật Bản', value: 'nhat-ban' },
        { label: 'Thái Lan', value: 'thai-lan' },
        { label: 'Âu Mỹ', value: 'au-my' },
        { label: 'Đài Loan', value: 'dai-loan' },
        { label: 'Hồng Kông', value: 'hong-kong' },
        { label: 'Khác', value: 'khac' },
    ];

    useEffect(() => {
        menuOpen && (document.body.style.overflow = 'hidden');
        !menuOpen && (document.body.style.overflow = 'unset');
    }, [menuOpen]);

    useEffect(() => {
        const fetchApi = async () => {
            if (!debouncedValue) return;
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/movie-list/get-all?page=1&limit=5&search=${debouncedValue}&type=&category=&country=&year=&chieurap=`,
            );
            setAllMovies(res.data.data);
        };
        fetchApi();
    }, [debouncedValue]);

    return (
        <>
            <div className="relative block xl:flex xl:items-center xl:justify-between h-fit xl:h-[60px] bg-[#1d1c1f] py-4 w-[320px] md:w-[690px] lg:w-[925px] xl:w-[1080px]">
                <div className="flex items-center justify-between xl:justify-normal h-fit xl:h-[60px]">
                    <div className="w-[160px] h-fit xl:h-[60px] text-white">
                        <a href="/" className="block h-fit xl:h-[60px]">
                            <img className="w-full h-fit xl:h-[60px] object-contain" src={logo} alt="logo" />
                        </a>
                    </div>
                    <ul className="hidden xl:flex items-center text-white font-semibold text-[1.5rem] ml-5">
                        <li className="cursor-pointer hover:text-[#ffb700]">
                            <a className="px-5 py-3" href="/phim-le?page=1">
                                PHIM LẺ
                            </a>
                        </li>
                        <li className="cursor-pointer hover:text-[#ffb700]">
                            <a className="px-5 py-3" href="/phim-bo?page=1">
                                PHIM BỘ
                            </a>
                        </li>
                        <li className="cursor-pointer hover:text-[#ffb700]">
                            <a className="px-5 py-3" href="/phim-chieu-rap?page=1">
                                PHIM CHIẾU RẠP
                            </a>
                        </li>
                        <li className="cursor-pointer hover:text-[#ffb700]">
                            <a className="px-5 py-3" href="/phim-hoat-hinh?page=1">
                                PHIM HOẠT HÌNH
                            </a>
                        </li>
                        <li className="group relative px-5 py-3 cursor-pointer hover:text-[#ffb700]">
                            THỂ LOẠI <FontAwesomeIcon icon={faCaretDown} />
                            <ul className="hidden absolute group-hover:grid grid-cols-3 gap-3 w-[450px] top-[100%] left-0 font-normal bg-white text-black text-[1.6rem] px-7 py-5 rounded-md shadow-lg z-50">
                                {categories?.map((t, index) => {
                                    return (
                                        <li className="hover:text-[#ffb700]" key={index}>
                                            <a href={`/the-loai/${t.value}?page=1`}>{t.label}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className="group relative px-5 py-3 cursor-pointer hover:text-[#ffb700]">
                            QUỐC GIA <FontAwesomeIcon icon={faCaretDown} />
                            <ul className="hidden absolute group-hover:grid grid-cols-2 gap-3 w-[300px] top-[100%] left-0 font-normal bg-white text-black text-[1.6rem] px-7 py-5 rounded-md shadow-lg z-50">
                                {countries?.map((c, index) => {
                                    return (
                                        <li className="hover:text-[#ffb700]" key={index}>
                                            <a href={`/quoc-gia/${c.value}?page=1`}>{c.label}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                    {/* Dropdown */}
                    <div
                        onClick={() => setMenuOpen(true)}
                        className="xl:hidden text-[#cccccc] text-[2.8rem] cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className="relative w-full xl:flex-1 mt-4 xl:mt-0">
                    <input
                        className="w-full text-[1.4rem] border-none outline-none px-5 py-3 rounded-lg"
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                window.location.replace(`/search?page=1&q=${debouncedValue}`);
                            }
                        }}
                    />
                    {debouncedValue && (
                        <ul className="absolute top-[100%] left-0 w-full bg-[#242d35] text-white p-3 shadow-md z-50">
                            {allMovies?.map((am, index) => {
                                return (
                                    <li className="w-full" key={index}>
                                        <Card5
                                            thumbSrc={am.thumb_url}
                                            thumbAlt={am.name}
                                            name={am.name}
                                            original_name={am.origin_name}
                                            slug={am.slug}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div
                onClick={() => setMenuOpen(false)}
                className={menuOpen ? 'fixed top-0 left-0 bottom-0 right-0 bg-[#000000]/[0.4] z-50' : ''}
            >
                <ul
                    onClick={(e) => e.stopPropagation()}
                    className={
                        !menuOpen
                            ? 'fixed top-0 right-[-100%] h-screen text-[1.5rem] text-white bg-[#2a2a2a] transition-all duration-[1s] w-full md:w-[450px] z-50'
                            : 'fixed top-0 right-0 h-screen text-[1.5rem] text-white bg-[#2a2a2a] transition-all duration-[1s] w-full md:w-[450px] z-50'
                    }
                >
                    <li className="relative font-bold bg-[#262626] text-[2.2rem] leading-none py-6 text-center border-b border-[#cccccc] border-opacity-[0.2]">
                        DANH MỤC
                        <span
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-[50%] translate-y-[-50%] left-0 leading-none p-5 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </li>
                    <li className="leading-none cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]">
                        <a className="block p-6" href="/phim-le?page=1">
                            PHIM LẺ
                        </a>
                    </li>
                    <li className="leading-none cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]">
                        <a className="block p-6" href="/phim-bo?page=1">
                            PHIM BỘ
                        </a>
                    </li>
                    <li className="leading-none cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]">
                        <a className="block p-6" href="/phim-chieu-rap?page=1">
                            PHIM CHIẾU RẠP
                        </a>
                    </li>
                    <li className="leading-none cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]">
                        <a className="block p-6" href="/phim-hoat-hinh?page=1">
                            PHIM HOẠT HÌNH
                        </a>
                    </li>
                    <li
                        onClick={() => {
                            setTypeOpen(true);
                        }}
                        className="flex items-center justify-between leading-none p-6 cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]"
                    >
                        <span>THỂ LOẠI</span>
                        <span className="flex items-center">
                            <span className="flex items-center justify-center w-[16px] h-[16px] bg-[#ffb700] text-white mr-3 text-[1rem] rounded-full">
                                {categories?.length}
                            </span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </li>
                    <li
                        onClick={() => {
                            setCountryOpen(true);
                        }}
                        className="flex items-center justify-between leading-none p-6 cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]"
                    >
                        <span>QUỐC GIA</span>
                        <span className="flex items-center">
                            <span className="flex items-center justify-center w-[16px] h-[16px] bg-[#ffb700] text-white mr-3 text-[1rem] rounded-full">
                                {countries?.length}
                            </span>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </li>
                </ul>
                <ul
                    onClick={(e) => e.stopPropagation()}
                    className={
                        typeOpen && menuOpen
                            ? 'fixed top-0 right-0 h-screen text-[1.5rem] text-white bg-[#2a2a2a] transition-all duration-[1s] w-full md:w-[450px] overflow-y-auto z-[51]'
                            : 'fixed top-0 right-[-100%] h-screen text-[1.5rem] text-white bg-[#2a2a2a] transition-all duration-[1s] w-full md:w-[450px] overflow-y-auto z-[51]'
                    }
                >
                    <li className="relative font-bold bg-[#262626] text-[2.2rem] leading-none py-6 text-center border-b border-[#cccccc] border-opacity-[0.2]">
                        THỂ LOẠI
                        <span
                            onClick={() => {
                                setTypeOpen(false);
                            }}
                            className="absolute top-[50%] translate-y-[-50%] left-0 leading-none p-5 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </li>
                    {categories?.map((t, index) => {
                        return (
                            <li
                                key={index}
                                className="leading-none cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]"
                            >
                                <a className="block p-6" href={`/the-loai/${t.value}?page=1`}>
                                    {t.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <ul
                    onClick={(e) => e.stopPropagation()}
                    className={
                        countryOpen && menuOpen
                            ? 'fixed top-0 right-0 h-screen text-[1.5rem] text-white bg-[#2a2a2a] transition-all duration-[1s] w-full md:w-[450px] overflow-y-auto z-[51]'
                            : 'fixed top-0 right-[-100%] h-screen text-[1.5rem] text-white bg-[#2a2a2a] transition-all duration-[1s] w-full md:w-[450px] overflow-y-auto z-[51]'
                    }
                >
                    <li className="relative font-bold bg-[#262626] text-[2.2rem] leading-none py-6 text-center border-b border-[#cccccc] border-opacity-[0.2]">
                        QUỐC GIA
                        <span
                            onClick={() => {
                                setCountryOpen(false);
                            }}
                            className="absolute top-[50%] translate-y-[-50%] left-0 leading-none p-5 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </li>
                    {countries?.map((c, index) => {
                        return (
                            <li
                                key={index}
                                className="leading-none cursor-pointer border-b border-[#cccccc] border-opacity-[0.2] hover:text-[#ffb700]"
                            >
                                <a className="block p-6" href={`/quoc-gia/${c.value}?page=1`}>
                                    {c.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Header;
