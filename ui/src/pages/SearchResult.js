import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import slugify from 'slugify';
import axios from 'axios';
import DropList from '../components/DropList';
import Card2 from '../components/Card/Card2';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet-async';
import { logo } from '../assets/imgs';

const SearchResult = () => {
    const [allMoviesNoPaginated, setAllMoviesNoPaginated] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');
    const [sortType, setSortType] = useState('');

    const pages = Math.ceil(allMoviesNoPaginated?.length / 20);

    const [searchParams] = useSearchParams();

    const { path } = useParams();

    const types = [
        {
            label: 'Phim lẻ',
            value: 'single',
        },
        {
            label: 'Phim bộ',
            value: 'series',
        },
        {
            label: 'Phim chiếu rạp',
            value: true,
        },
        {
            label: 'Phim hoạt hình',
            value: 'hoathinh',
        },
    ];
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
    const years = [
        2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006,
        2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988,
        1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980,
    ];

    const sortTypes = [
        {
            label: 'Lượt xem',
            value: 'view',
        },
        {
            label: 'Năm sản xuất',
            value: 'year',
        },
    ];

    const setSlug = (text) => {
        return slugify(text, {
            replacement: '-',
            lower: true,
            strict: false,
            locale: 'vi',
            trim: true,
        });
    };

    const getTitle = () => {
        let result = '';
        const param0 = searchParams.get('q');
        const param1 = types?.find(
            (t) =>
                setSlug(t.label) === path ||
                t.value === searchParams.get('t') ||
                t.value === Boolean(searchParams.get('cr')),
        )?.label;
        const param2 = categories?.find(
            (t) => setSlug(t.label) === path || setSlug(t.label) === searchParams.get('g'),
        )?.label;
        const param3 = countries?.find(
            (t) => setSlug(t.label) === path || setSlug(t.label) === searchParams.get('c'),
        )?.label;
        const param4 = years?.find((t) => t === Number(searchParams.get('y')));
        if (param0) {
            result = `Từ khóa: ${param0}`;
        } else {
            result = `${param1 ? '' : 'Phim'} ${param1 || ''} ${param2 || ''} ${param3 || ''} ${param4 || ''}`;
        }
        return result;
    };

    const convertPath = () => {
        const param1 = types?.find((t) => setSlug(t.label) === path)?.value;
        const param2 = categories?.find((t) => setSlug(t.label) === path)?.value;
        const param3 = countries?.find((t) => setSlug(t.label) === path)?.value;
        const result = `type=${
            searchParams.get('t') || (param1 === true || param1 === 'true' ? '' : param1) || ''
        }&category=${searchParams.get('g') || param2 || ''}&country=${searchParams.get('c') || param3 || ''}&year=${
            searchParams.get('y') || ''
        }&chieurap=${searchParams.get('cr') || (param1 === true || param1 === 'true' ? param1 : '') || ''}`;
        return result;
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/movie-list/get-all?page=${searchParams.get('page')}&limit=20&search=${
                    searchParams.get('q') || ''
                }&${convertPath()}&sort=${searchParams.get('s') || ''}`,
            );
            setAllMovies(res.data.data);
            setAllMoviesNoPaginated(res.data.allMovies);
        };
        fetchApi();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const param1 = types?.find(
            (t) =>
                setSlug(t.label) === path ||
                t.value === searchParams.get('t') ||
                t.value === Boolean(searchParams.get('cr')),
        )?.value;
        const param2 = categories?.find(
            (t) => setSlug(t.label) === path || setSlug(t.label) === searchParams.get('g'),
        )?.value;
        const param3 = countries?.find(
            (t) => setSlug(t.label) === path || setSlug(t.label) === searchParams.get('c'),
        )?.value;
        const param4 = years?.find((t) => t === Number(searchParams.get('y')));
        const param5 = sortTypes?.find((t) => t.value === searchParams.get('s'))?.value;

        setType(param1);
        setCategory(param2);
        setCountry(param3);
        setYear(param4);
        setSortType(param5);
        // eslint-disable-next-line
    }, [path]);

    return (
        <>
            <Helmet>
                <title>{`Tuyển tập ${getTitle()} - ${getTitle()} mới nhất 2023`}</title>
                <meta name="description" content={`Xem ${getTitle()} tốc độ nhanh, mới nhất 2023`} />
                <link rel="canonical" href={`${process.env.REACT_APP_BASE_URL}/${path}`} />

                <meta property="og:locale" content="vi_VN" />
                <meta property="og:title" content={`Tuyển tập ${getTitle()} - ${getTitle()} mới nhất 2023`} />
                <meta property="og:description" content={`Xem ${getTitle()} tốc độ nhanh, mới nhất 2023`} />
                <meta property="og:url" content={`${process.env.REACT_APP_BASE_URL}/${path}`} />
                <meta property="og:site_name" content={`Tuyển tập ${getTitle()} - ${getTitle()} mới nhất 2023`} />
                <meta property="og:image" content={logo} />
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
                    <li>
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
                                {searchParams.get('q') ? 'Tìm kiếm' : getTitle()}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="h-full bg-[#2d2d2e] text-white font-bold py-4 w-[320px] md:w-[690px] lg:w-[925px] xl:w-[1080px]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 bg-[#242525] p-4">
                    <DropList type="--Kiểu phim--" options={types} selectedValue={type} setValue={setType} />
                    <DropList
                        type="--Thể loại--"
                        options={categories}
                        selectedValue={category}
                        setValue={setCategory}
                    />
                    <DropList type="--Quốc gia--" options={countries} selectedValue={country} setValue={setCountry} />
                    <DropList type="--Năm sản xuất--" options={years} selectedValue={year} setValue={setYear} />
                    <DropList type="--Sắp xếp--" options={sortTypes} selectedValue={sortType} setValue={setSortType} />
                    <div className="bg-[#ffb700] text-[1.4rem]">
                        <a
                            href={`/filter?page=1&t=${(type === true || type === 'true' ? '' : type) || ''}&g=${
                                category || ''
                            }&c=${country || ''}&y=${year || ''}&cr=${
                                (type === true || type === 'true' ? type : '') || ''
                            }&s=${sortType || ''}`}
                            className="flex items-center justify-center w-full h-full"
                        >
                            Lọc phim
                        </a>
                    </div>
                </div>
                <h1 className="text-[2.4rem] my-5">{getTitle().toUpperCase()}</h1>
                <div className="bg-[#242525] p-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {allMovies?.map((am, index) => {
                            return (
                                <Card2
                                    key={index}
                                    thumbSrc={am.thumb_url}
                                    thumbAlt={am.name}
                                    name={am.name}
                                    original_name={am.origin_name}
                                    tag={am.episode_current + ' ' + am.lang}
                                    slug={am.slug}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center">
                        <Pagination
                            path={path}
                            page={Number(searchParams.get('page'))}
                            pages={pages}
                            type={searchParams.get('t')}
                            category={searchParams.get('g')}
                            country={searchParams.get('c')}
                            year={searchParams.get('y')}
                            chieurap={searchParams.get('cr')}
                            sort={searchParams.get('s')}
                            search={searchParams.get('q')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchResult;
