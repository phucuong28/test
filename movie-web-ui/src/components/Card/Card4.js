const Card4 = (props) => {
    return (
        <a
            href={`/phim/${props.slug}`}
            className="flex items-center gap-5 border border-[#cccccc] border-opacity-[0.3] p-2"
        >
            <div className="w-[50px] h-fit">
                <img
                    className="w-full h-full object-cover"
                    src={`https://img.ophim9.cc/uploads/movies/${props.thumbSrc}`}
                    alt={props.thumbAlt}
                />
            </div>
            <div className="max-w-[200px] md:max-w-none lg:max-w-[200px]">
                <h3 className="text-[#ffb700] truncate">{props.name}</h3>
                <p className="font-normal text-[1.4rem] truncate">{props.original_name}</p>
            </div>
        </a>
    );
};

export default Card4;
