import React, {useState} from "react";
import Icon from "./Icon";

export default function YearPicker({selectedYear, setSelectedYear}) {


    return (
        <div className="yearPicker row gap">
            <div onClick={() => setSelectedYear(selectedYear - 1)}>
                <Icon name="chevron_left"/>
            </div>
            <p>{selectedYear}</p>
            <div onClick={() => setSelectedYear(selectedYear + 1)}>
                <Icon name="chevron_right" />
            </div>
        </div>

    )

}