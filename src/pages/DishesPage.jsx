import React, {useEffect, useState} from "react";
import PageTitleName from "../components/Text/PageTitleName.jsx";
import FullRoundedFrame from "../components/Frames/FullRoundedFrame.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import CardTitle from "@/components/Text/CardTitle.jsx";

function DishesPage() {
    const [purposes, setPurposes] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        const result = await axios.get('/api/purposes');
        setPurposes(result.data.result);
    }

    return (
        <div>
            <PageTitleName titleName={'Цели питания'}/>
            <div className="grid grid-cols-4 gap-10">
                {
                    purposes.map((purpose, index) => {
                        return (
                            <Link to={'/purposes/' + purpose.purpose_id}>
                                <FullRoundedFrame key={index} bg_color={'BCD1BD'}>
                                    <CardTitle title={purpose.name} />
                                    <img src={`/images/dishes/${purpose.img_name}`}  alt={""}/>
                                </FullRoundedFrame>
                            </Link>
                        )
                    })
                }
            </div>
            <div className={"py-10"}>
                <Outlet/>
            </div>
        </div>
    )
}

export default DishesPage;
