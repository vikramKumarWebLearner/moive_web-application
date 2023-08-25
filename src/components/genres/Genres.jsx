// import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
    const { genress } = useSelector((state) => state.home);
       console.log(genress);
    return (
        <div className="genres">
            {data?.map((g) => {
                if (!genress[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genress[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;