const Card1 = (props) => {
    return (
        <a
            href={`/phim/${props.slug}`}
            className="block group relative w-[155px] h-[210px] lg:w-[170px] lg:h-[230px] xl:w-[200px] xl:h-[265px] overflow-hidden"
        >
            <img
                className="w-full h-full group-hover:scale-110 transition-all duration-300 object-fill"
                src={`https://img.ophim9.cc/uploads/movies/${props.thumbSrc}`}
                alt={props.thumbAlt}
            />
            <div className="flex items-end absolute top-0 left-0 w-full h-full transition-all duration-300 bg-gradient-to-b from-black/10 to-black/70 cursor-pointer">
                <div className="p-4">
                    <p className="max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] text-[#ffb700] text-[1.3rem] md:text-[1.5rem] truncate">
                        {props.name}
                    </p>
                    <p className="max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] text-[1.3rem] md:text-[1.5rem] font-normal text-[#f1f1f1] truncate">
                        {props.original_name}
                    </p>
                </div>
            </div>
            <div className="absolute top-2 left-2 bg-red-600 text-[1.1rem] px-3 py-1 rounded-md">
                {props?.tag?.toUpperCase()}
            </div>
        </a>
    );
};

export default Card1;
