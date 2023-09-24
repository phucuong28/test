const Card3 = (props) => {
    return (
        <a href={`/phim/${props.slug}`} className="block group relative w-[140px] h-[200px] overflow-hidden">
            <img
                className="w-full h-full group-hover:scale-110 transition-all duration-300 object-cover"
                src={`https://img.ophim9.cc/uploads/movies/${props.thumbSrc}`}
                alt={props.thumbAlt}
            />
            <div className="flex items-end absolute top-0 left-0 w-full h-full transition-all duration-300 bg-gradient-to-b from-black/10 to-black/70 cursor-pointer"></div>
            <div className="absolute top-2 left-2 bg-red-600 text-[1rem] px-3 py-1 rounded-md">
                {props?.tag?.toUpperCase()}
            </div>
        </a>
    );
};

export default Card3;
