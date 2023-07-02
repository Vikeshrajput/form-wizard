import { Fragment } from "react";

import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { MdDateRange } from 'react-icons/md';
import { FaBirthdayCake } from 'react-icons/fa';
import { BsTelephoneInbound } from 'react-icons/bs';
const ShowExtraDetails = ({ employee }) => {
    return (
        <Fragment>
            <tr className="border-b border-gray-300">
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider"></div></td>
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider"></div></td>
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider"><div className="font-semibold flex"><HiOutlineCurrencyRupee className="mt-1 mr-1 text-purple-700" />Salary</div>{employee.salary}</div></td>
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider capitalize"><div className="font-semibold flex"><CgProfile className="mt-1 mr-1 text-purple-700" />Gender</div>{employee.gender}</div></td>
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider"><div className="font-semibold flex"><MdDateRange className="mt-1 mr-1 text-purple-700" />Joining Date</div>{employee.joiningDate}</div></td>
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider capitalize"><div className="font-semibold flex"><BsTelephoneInbound className="mt-1 mr-1 text-purple-800" /> Contact</div>{employee.mobile}</div></td>
                <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider capitalize"><div className="font-semibold flex"><FaBirthdayCake className="mt-1 mr-1 text-purple-600" />Birthday</div>{employee.birthday}</div></td>
            </tr>
        </Fragment>
    )
}

export default ShowExtraDetails;