import { useState, useEffect } from 'react';
import Card1 from '../components/Card/Card1';
import Card2 from '../components/Card/Card2';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet-async';
import { logo } from '../assets/imgs';

const Home = () => {
    const [newMovies, setNewMovies] = useState([]);
    const [singleMovies, setSingleMovies] = useState([]);
    const [seriesMovies, setSeriesMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/movie-list/get-no-filter`);
            setNewMovies(res.data.newMovies);
            setSingleMovies(res.data.singleMovies);
            setSeriesMovies(res.data.seriesMovies);
            setRandomMovies(res.data.randomMovies);
        };
        fetchApi();
    }, []);

    return (
        <>
            <Helmet>
                <title>Phiu Phim - Phim mới | Phim hay | Phim chất lượng cao | Phim online</title>
                <meta
                    name="description"
                    content="Phiu Phim - Xem phim trực tuyến chất lượng cao, phim bộ, phim lẻ, phim chiếu rạp đầy đủ mọi thể loại, cập nhật nhanh nhất, nội dung đa dạng."
                />
                <link rel="canonical" href="/" />

                <meta property="og:locale" content="vi_VN" />
                <meta
                    property="og:title"
                    content="Phiu Phim - Phim mới | Phim hay | Phim chất lượng cao | Phim online"
                />
                <meta
                    property="og:description"
                    content="Phiu Phim - Xem phim trực tuyến chất lượng cao, phim bộ, phim lẻ, phim chiếu rạp đầy đủ mọi thể loại, cập nhật nhanh nhất, nội dung đa dạng."
                />
                <meta property="og:url" content="http://35.197.147.180" />
                <meta
                    property="og:site_name"
                    content="Phiu Phim - Phim mới | Phim hay | Phim chất lượng cao | Phim online"
                />
                <meta property="og:image" content={logo} />
                <meta property="og:image:width" content="300" />
                <meta property="og:image:height" content="55" />
            </Helmet>
            <div className="h-full bg-[#2d2d2e] text-white font-bold py-4 w-[320px] md:w-[690px] lg:w-[925px] xl:w-[1080px]">
                <div>
                    <div className="flex items-center mb-5 bg-[#242525]">
                        <div className="inline-block bg-black p-5 md:p-4">
                            <h1 className="font-bold text-[1.4rem] md:text-[1.8rem] leading-none">PHIM ĐỀ CỬ</h1>
                        </div>
                        <div className="inline-block border-r-[19.5px] border-r-transparent border-l-[19.5px] border-l-black border-b-[19.5px] border-b-transparent border-t-[19.5px] border-t-transparent"></div>
                    </div>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {randomMovies?.map((sm, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Card1
                                        thumbSrc={sm.thumb_url}
                                        thumbAlt={sm.name}
                                        name={sm.name}
                                        original_name={sm.origin_name}
                                        tag={sm.episode_current + ' ' + sm.lang}
                                        slug={sm.slug}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-5 bg-[#242525]">
                        <div className="flex items-center">
                            <div className="inline-block bg-black p-5 md:p-4">
                                <h2 className="font-bold text-[1.4rem] md:text-[1.8rem] leading-none">PHIM CHIẾU RẠP</h2>
                            </div>
                            <div className="inline-block border-r-[19.5px] border-r-transparent border-l-[19.5px] border-l-black border-b-[19.5px] border-b-transparent border-t-[19.5px] border-t-transparent"></div>
                        </div>
                        <div className="text-[1.3rem] bg-[#ffb700] my-3 mr-3">
                            <a href="/phim-chieu-rap?page=1" className="block px-5 py-1">
                                Xem tất cả
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-[#3f4044] p-5 gap-5">
                        {newMovies?.map((sm, index) => {
                            return (
                                <Card2
                                    key={index}
                                    thumbSrc={sm.thumb_url}
                                    thumbAlt={sm.name}
                                    name={sm.name}
                                    original_name={sm.origin_name}
                                    tag={sm.episode_current + ' ' + sm.lang}
                                    slug={sm.slug}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-5 bg-[#242525]">
                        <div className="flex items-center">
                            <div className="inline-block bg-black p-5 md:p-4">
                                <h2 className="font-bold text-[1.4rem] md:text-[1.8rem] leading-none">PHIM BỘ MỚI</h2>
                            </div>
                            <div className="inline-block border-r-[19.5px] border-r-transparent border-l-[19.5px] border-l-black border-b-[19.5px] border-b-transparent border-t-[19.5px] border-t-transparent"></div>
                        </div>
                        <div className="text-[1.3rem] bg-[#ffb700] my-3 mr-3">
                            <a href="/phim-bo?page=1" className="block px-5 py-1">
                                Xem tất cả
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-[#3f4044] p-5 gap-5">
                        {seriesMovies?.map((sm, index) => {
                            return (
                                <Card2
                                    key={index}
                                    thumbSrc={sm.thumb_url}
                                    thumbAlt={sm.name}
                                    name={sm.name}
                                    original_name={sm.origin_name}
                                    tag={sm.episode_current + ' ' + sm.lang}
                                    slug={sm.slug}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-5 bg-[#242525]">
                        <div className="flex items-center">
                            <div className="inline-block bg-black p-5 md:p-4">
                                <h2 className="font-bold text-[1.4rem] md:text-[1.8rem] leading-none">PHIM LẺ MỚI</h2>
                            </div>
                            <div className="inline-block border-r-[19.5px] border-r-transparent border-l-[19.5px] border-l-black border-b-[19.5px] border-b-transparent border-t-[19.5px] border-t-transparent"></div>
                        </div>
                        <div className="text-[1.3rem] bg-[#ffb700] my-3 mr-3">
                            <a href="/phim-le?page=1" className="block px-5 py-1">
                                Xem tất cả
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-[#3f4044] p-5 gap-5">
                        {singleMovies?.map((sm, index) => {
                            return (
                                <Card2
                                    key={index}
                                    thumbSrc={sm.thumb_url}
                                    thumbAlt={sm.name}
                                    name={sm.name}
                                    original_name={sm.origin_name}
                                    tag={sm.episode_current + ' ' + sm.lang}
                                    slug={sm.slug}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-5 bg-[#242525]">
                        <div className="flex items-center">
                            <div className="inline-block bg-black p-5 md:p-4">
                                <h2 className="font-bold text-[1.4rem] md:text-[1.8rem] leading-none">TOP PHIM</h2>
                            </div>
                            <div className="inline-block border-r-[19.5px] border-r-transparent border-l-[19.5px] border-l-black border-b-[19.5px] border-b-transparent border-t-[19.5px] border-t-transparent"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-[#3f4044] p-5 gap-5">
                        {randomMovies?.map((sm, index) => {
                            return (
                                <Card2
                                    key={index}
                                    thumbSrc={sm.thumb_url}
                                    thumbAlt={sm.name}
                                    name={sm.name}
                                    original_name={sm.origin_name}
                                    tag={sm.episode_current + ' ' + sm.lang}
                                    slug={sm.slug}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
