import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import Card3 from '../components/Card/Card3';
import Card4 from '../components/Card/Card4';
import { Helmet } from 'react-helmet-async';

const Stream = () => {
    // Rating star
    const [ratingChange, setRatingChange] = useState(false);
    const [ratingMovie, setRatingMovie] = useState({});

    const [link, setLink] = useState();
    const [episodes, setEpisodes] = useState([]);
    const [movie, setMovie] = useState({});
    const [newMovies, setNewMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);

    const { slug1, slug2 } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`https://ophim1.com/phim/${slug1}`);
            setMovie(res.data.movie);
            setEpisodes(res.data.episodes);
        };
        fetchApi();
    }, [slug1]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/movie-list/get-no-filter`);
            setRandomMovies(res.data.randomMovies);
            setNewMovies(res.data.newMovies);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const editEpisodes = episodes[0]?.server_data?.map((eps) => {
            return {
                name: eps?.name,
                slug: `tap-${eps?.name}`,
                link: eps?.link_embed,
            };
        });
        const findEps = editEpisodes?.find((eps) => {
            return eps?.slug === slug2;
        });
        setLink(findEps);
    }, [episodes, slug2]);

    // Rating star
    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/movie-list/get-all-rating`);
            const findMovie = res?.data?.allRatings?.find((item) => item?.slug === slug1);
            setRatingMovie(findMovie);
        };
        fetchApi();
    }, [slug1, ratingChange]);

    const handleRatingStar = async (rating) => {
        const data = {
            movieSlug: slug1,
            rating: {
                totalRatings: ratingMovie?.rating?.totalRatings + rating,
                totalTurns: ratingMovie?.rating?.totalTurns + 1,
            },
        };
        await axios.patch(`${process.env.REACT_APP_API_URL}/movie-list/rating`, data);
        setRatingChange(!ratingChange);
    };

    const divideAndRound = () => {
        const result = ratingMovie?.rating?.totalRatings / ratingMovie?.rating?.totalTurns;
        if (isNaN(result)) {
            return 10;
        } else {
            return result;
        }
    };

    return (
        <>
            <Helmet>
                <title>{`${movie?.name} - Tập ${link?.name}`}</title>
                <meta name="description" content={movie?.content} />
                <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${slug1}/${slug2}`} />

                <meta property="og:locale" content="vi_VN" />
                <meta property="og:title" content={`${movie?.name} - Tập ${link?.name}`} />
                <meta property="og:description" content={movie?.content} />
                <meta property="og:url" content={`${process.env.REACT_APP_BASE_URL}/${slug1}/${slug2}`} />
                <meta property="og:site_name" content={`${movie?.name} - Tập ${link?.name}`} />
                <meta property="og:image" content={movie?.poster_url} />
                <meta property="og:image:width" content="300" />
                <meta property="og:image:height" content="55" />
            </Helmet>
            <nav
                className="flex bg-[#333333] px-5 py-3 mt-3 w-[320px] md:w-[690px] lg:w-[925px] xl:w-[1080px]"
                aria-label="Breadcrumb"
            >
                <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-[1.4rem] font-normal text-[#ffb700]">
                            <svg
                                className="w-5 h-5 mr-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Trang chủ
                        </a>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <a
                                href={`/phim/${slug1}`}
                                className="ml-1 text-[1.4rem] font-normal text-[#ffb700] md:ml-2"
                            >
                                {movie?.name}
                            </a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="ml-1 text-[1.4rem] font-normal text-[#f1f1f1] md:ml-2">
                                Tập {link?.name}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="lg:grid lg:grid-cols-3 gap-10 h-full bg-[#2d2d2e] text-white font-bold py-4 w-[320px] md:w-[690px] lg:w-[925px] xl:w-[1080px]">
                <div className="col-span-2">
                    <div className="mb-4 mx-[-20px] md:mx-0">
                        <iframe
                            title="myFrame"
                            className="w-full aspect-video"
                            src={link?.link}
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="bg-[#242525] p-4">
                        <div className="flex flex-col items-center bg-[#333333] py-2">
                            <StarRatings
                                rating={divideAndRound()}
                                starRatedColor="yellow"
                                changeRating={handleRatingStar}
                                numberOfStars={10}
                                starDimension="18px"
                                starSpacing="2px"
                                name="rating"
                            />
                            <p className="font-normal text-[#f1f1f1]">
                                {`(${divideAndRound().toFixed(1)} điểm / ${ratingMovie?.rating?.totalTurns || 1} lượt)`}
                            </p>
                        </div>
                        <div className="md:flex items-center border-t border-b py-2 my-9">
                            <p className="font-normal whitespace-nowrap text-[1.5rem]">DANH SÁCH</p>
                            <ul className="flex flex-wrap text-black font-normal text-[1.3rem] text-center md:ml-20 md:pr-2 gap-3 md:max-h-[160px] md:overflow-auto">
                                {episodes?.map((eps) => {
                                    return eps?.server_data?.map((sd, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="w-fit whitespace-nowrap bg-white leading-none rounded-lg"
                                            >
                                                <a
                                                    href={`/phim/${movie?.slug}/tap-${sd?.name}`}
                                                    className={
                                                        slug2 === `tap-${sd?.name}`
                                                            ? 'block p-3.5 text-[1.2rem] rounded-lg bg-[#ffb700] text-white'
                                                            : 'block p-3.5 text-[1.2rem] rounded-lg'
                                                    }
                                                >
                                                    {sd?.name}
                                                </a>
                                            </li>
                                        );
                                    });
                                })}
                            </ul>
                        </div>
                        <div className="font-normal">
                            <h1 className="text-[2.4rem] mb-5">NỘI DUNG PHIM</h1>
                            <div className="text-[1.5rem]" dangerouslySetInnerHTML={{ __html: movie?.content }}></div>
                        </div>
                        <div className="font-normal mt-5">
                            <h2 className="text-[2rem] mb-5">Tags</h2>
                            <div className="flex flex-wrap gap-x-2 gap-y-4">
                                <span className="bg-gray-100 text-gray-800 text-[1.5rem] font-medium mr-2 px-2.5 py-0.5 rounded border-t-2 border-[#ffb700]">
                                    {movie?.name}
                                </span>
                                <span className="bg-gray-100 text-gray-800 text-[1.5rem] font-medium mr-2 px-2.5 py-0.5 rounded border-t-2 border-[#ffb700]">
                                    {movie?.origin_name}
                                </span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="mt-5">
                                <h2 className="mb-5">Bình luận</h2>
                                <div
                                    className="fb-comments bg-[#eeeeee]"
                                    data-href={`${process.env.REACT_APP_BASE_URL}/phim/${slug1}`}
                                    data-width="100%"
                                    data-numposts="5"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#242525] p-4 mt-5">
                        <h2 className="font-normal text-[2.4rem] mb-5">Có thể bạn muốn xem!</h2>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={20}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 5,
                                    spaceBetween: 100,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 50,
                                },
                                1366: {
                                    slidesPerView: 5,
                                    spaceBetween: 70,
                                },
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {randomMovies?.map((sm, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Card3
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
                </div>
                <div className="mt-5 lg:mt-0">
                    <div className="bg-[#242525] p-4">
                        <h2>PHIM ĐỀ CỬ</h2>
                        <div className="flex flex-col gap-3 mt-5">
                            {newMovies?.map((sm, index) => {
                                return (
                                    <Card4
                                        key={index}
                                        thumbSrc={sm.thumb_url}
                                        thumbAlt={sm.name}
                                        name={sm.name}
                                        original_name={sm.origin_name}
                                        slug={sm.slug}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-[#242525] p-4 mt-5">
                        <h2>GỢI Ý CHO BẠN</h2>
                        <div className="flex flex-col gap-3 mt-5">
                            {newMovies?.map((sm, index) => {
                                return (
                                    <Card4
                                        key={index}
                                        thumbSrc={sm.thumb_url}
                                        thumbAlt={sm.name}
                                        name={sm.name}
                                        original_name={sm.origin_name}
                                        slug={sm.slug}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stream;
