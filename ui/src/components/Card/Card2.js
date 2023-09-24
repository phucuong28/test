const Card2 = (props) => {
    return (
        <a href={`/phim/${props.slug}`} className="block relative bg-[#1d1c1f] w-full h-fit cursor-pointer">
            <div className="h-[160px] md:h-[230px]">
                <img
                    className="w-full h-full object-fill"
                    src={`https://img.ophim9.cc/uploads/movies/${props.thumbSrc}`}
                    alt={props.thumbAlt}
                />
            </div>
            <div className="p-5">
                <p className="max-w-[160px] text-[#ffb700] truncate m-0">{props.name}</p>
                <p className="max-w-[160px] font-normal text-[#f1f1f1] text-[1.3rem] truncate m-0">
                    {props.original_name}
                </p>
            </div>
            <div className="absolute top-2 left-2 bg-red-600 text-[1.1rem] px-3 py-1 rounded-md">
                {props?.tag?.toUpperCase()}
            </div>
        </a>
    );
};

export default Card2;
