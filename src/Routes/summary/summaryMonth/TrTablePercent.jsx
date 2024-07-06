import { useState } from "react";

function TrTablePercent({header, budgeted, accomplished, balance}) {

    return (
        <tr>
            <td class="text-black px-1 w-40">{header}</td>
            <td class="text-black px-3 text-right">{budgeted} %</td>
            <td class="text-black px-3 text-right">{accomplished} %</td>
            <td class="text-black px-3 text-right">{balance} %</td>
        </tr>
    );
}

export default TrTablePercent;


