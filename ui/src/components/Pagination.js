const Pagination = ({ page, pages, path, type, category, country, year, chieurap, sort, search }) => {
    let middlePagination;

    const getPath = (value) => {
        if (window.location.href.includes('the-loai')) {
            return `/the-loai/${path}?page=${value}`;
        } else if (window.location.href.includes('quoc-gia')) {
            return `/quoc-gia/${path}?page=${value}`;
        } else if (window.location.href.includes('filter')) {
            return `/filter?page=${value}&t=${type}&g=${category}&c=${country}&y=${year}&cr=${chieurap}&s=${sort}`;
        } else if (window.location.href.includes('search')) {
            return `/search?page=${value}&q=${search}`;
        } else {
            return `/${path}?page=${value}`;
        }
    };

    if (pages <= 3) {
        middlePagination = [...Array(pages)].map((_, idx) => (
            <button key={idx + 1} onClick={() => (window.location.href = getPath(idx + 1))} disabled={page === idx + 1}>
                {idx + 1}
            </button>
        ));
    } else {
        const startValue = Math.floor((page - 1) / 3) * 3;

        middlePagination = (
            <>
                {[...Array(3)].map((_, idx) => (
                    <button
                        key={startValue + idx + 1}
                        disabled={page === startValue + idx + 1}
                        onClick={() => (window.location.href = getPath(startValue + idx + 1))}
                    >
                        {startValue + idx + 1}
                    </button>
                ))}

                <button>...</button>
                <button onClick={() => (window.location.href = getPath(pages))}>{pages}</button>
            </>
        );

        if (page > 3) {
            if (pages - page >= 3) {
                middlePagination = (
                    <>
                        <button onClick={() => (window.location.href = getPath('1'))}>1</button>
                        <button>...</button>
                        <button onClick={() => (window.location.href = getPath(startValue))}>{startValue}</button>
                        {[...Array(3)].map((_, idx) => (
                            <button
                                key={startValue + idx + 1}
                                disabled={page === startValue + idx + 1}
                                onClick={() => (window.location.href = getPath(startValue + idx + 1))}
                            >
                                {startValue + idx + 1}
                            </button>
                        ))}

                        <button>...</button>
                        <button onClick={() => (window.location.href = getPath(pages))}>{pages}</button>
                    </>
                );
            } else {
                let amountLeft = pages - page + 3;
                middlePagination = (
                    <>
                        <button onClick={() => (window.location.href = getPath('1'))}>1</button>
                        <button>...</button>
                        <button onClick={() => (window.location.href = getPath(startValue))}>{startValue}</button>
                        {[...Array(amountLeft)].map((_, idx) => (
                            <button
                                key={startValue + idx + 1}
                                disabled={page === startValue + idx + 1}
                                style={pages < startValue + idx + 1 ? { display: 'none' } : null}
                                onClick={() => (window.location.href = getPath(startValue + idx + 1))}
                            >
                                {startValue + idx + 1}
                            </button>
                        ))}
                    </>
                );
            }
        }
    }

    return (
        pages > 1 && (
            <div className="pagination">
                <button
                    className="pagination__prev"
                    onClick={() => (window.location.href = getPath(page - 1))}
                    disabled={page === 1}
                >
                    &#171;
                </button>
                {middlePagination}
                <button
                    className="pagination__next"
                    onClick={() => (window.location.href = getPath(page + 1))}
                    disabled={page === pages}
                >
                    &#187;
                </button>
            </div>
        )
    );
};

export default Pagination;
