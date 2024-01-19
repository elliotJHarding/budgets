import React, {useState} from "react";
import './Holidays.css'

export default function HolidayList({holidays, holidayOnClick}) {

    const formatDate = (date) => new Date(Date.parse(date)).toLocaleDateString('en-gb', {month:'short', day:'numeric'})

    const holidayYearItems = holidays.map(holidayYear => {

        let holidayItems = holidayYear.holidays.map(holiday =>
           <tr className="hover" onClick={event => holidayOnClick(event, holiday)}>
               <td><img src={holiday.img}/></td>
               <td><p className="title">{holiday.name}</p></td>
               <td>{formatDate(holiday.startDate)}</td>
               <td> - </td>
               <td>{formatDate(holiday.endDate)}</td>
           </tr>
        )

        return <>
            <p className="title">{holidayYear.year}</p>
            <table className="rounded" rules="none">
                {holidayItems}
            </table>
        </>
    })


    return (
        <div className="holidayList column gap">
            {holidayYearItems}
        </div>
    )
}

