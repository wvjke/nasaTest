import React, { useEffect, useState } from "react";
import { fetchData } from "../api/apiRequest";
import { parseNEOData } from "../services/parseNeoData";
import { NEOData } from "../services/parseNeoData";
import "./neoList.scss";

const NEOList: React.FC = () => {
    const [neoList, setNeoList] = useState<NEOData[]>([]);

    useEffect(() => {
        fetchData()
            .then((res) => {
                if (Array.isArray(res)) {
                    setNeoList(parseNEOData(res));
                } else {
                    console.error("wrong data from server");
                }
            })
            .catch((e) => console.error(e));
    }, []);

    console.log(neoList);

    return <></>;
};

export default NEOList;
