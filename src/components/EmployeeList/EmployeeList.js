import { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import ShowExtraDetails from "./ShowExtraDetails";
import { RiArrowDropDownLine } from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { GoSortDesc } from 'react-icons/go'
import { PiShareNetwork } from 'react-icons/pi'
import { MdOutlineModeEdit } from 'react-icons/md'
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'


const PAGE_LIMIT = 10;

const EmployeeList = (props) => {
  const [showDetails, setShowDetails] = useState({show: false, index: null})
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("none");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  
  const employees = useSelector((state) => state.form.records);
  const pageCount = Math.ceil(employees.length / PAGE_LIMIT);

  const startIndex = currentPage * PAGE_LIMIT;
  const endIndex = startIndex + PAGE_LIMIT;

  let currentEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(startIndex, endIndex);

  if (filterOption === "experience") {
    currentEmployees.sort((a, b) => {
      const aExperience = parseInt(a.experience.slice(0, 1));
      const bExperience = parseInt(b.experience.slice(0, 1));
      return bExperience - aExperience;
    });
  } else if (filterOption === "salary") {
    currentEmployees.sort((a, b) => b.salary - a.salary);
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleFilterOptionChange = (event) => {
    const selectedFilterOption = event.target.value;
    setFilterOption(selectedFilterOption);
    setCurrentPage(0);
  };

  const handleEmployeeSelect = (employee) => {
    const isSelected = selectedEmployees.includes(employee);
    if (isSelected) {
      setSelectedEmployees(selectedEmployees.filter((e) => e !== employee));
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === currentEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees([...currentEmployees]);
    }
  };

  const handleShowDetails = (index) => {
    setShowDetails({show: !showDetails.show, index})
  }

  return (
    <div className="mx-auto my-5 border-2 border-gray-200 p-4 bg-white w-full max-w-5xl shadow-xl text-md text-gray-600">
      <div className="mb-4 flex justify-between">
        <div>
          <input
            type="text"
            className="px-5 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search"
          />
        </div>
        <div>  
          <button className="text-purple-700 mr-4" onClick={() => props.onAddEmployee()}>+ Add employee</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 gap-7">
        <div className="flex">
          <span className="font-bold">
            {selectedEmployees.length} selected
          </span>
          <label htmlFor="selectAll" className="ml-6 cursor-pointer">Select all</label>
          <input
              type="checkbox"
              className="mr-2 hidden"
              id="selectAll"
              checked={selectedEmployees.length === currentEmployees.length}
              onChange={handleSelectAll}
            />
            <label className="mb-1 flex"><PiShareNetwork className="text-xl mt-1 mr-2 ml-4 text-purple-600" /><sapn>Share</sapn></label>
            <label className="mb-1 flex"><MdOutlineModeEdit className="text-xl mt-1 mr-2 ml-4 text-purple-600" /><sapn>Edit</sapn></label>

        </div>
        <div className="mb-4 flex gap-4">
        <label className="font-bold mb-1 flex"><GoSortDesc className="text-2xl mt-1 mr-3 text-purple-600" /><sapn className="mt-0.5">Sort By:</sapn></label>
        <select
          className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterOption}
          onChange={handleFilterOptionChange}
        >
          <option value="none">None</option>
          <option value="experience">Experience</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-gray-300 pb-12">
            <td className="font-bold pb-3"></td>
            <td className="font-bold pb-3"><div className="mr-3">Index</div></td>
            <td className="font-bold pb-3">Name</td>
            <td className="font-bold pb-3">Position</td>
            <td className="font-bold pb-3">Department</td>
            <td className="font-bold pb-3">Email</td>
            <td className="font-bold pb-3 flex">Experience<HiOutlineArrowNarrowUp className="text-purple-700 mt-1 mr-2" /></td>
            <td className="font-bold pb-3">Status</td>
          </tr>
          </thead>
          <tbody>
          {currentEmployees.map((employee, index) => (
            <>
            <tr key={index} className={`border-b border-gray-300 duration-300 ${showDetails.show === true && showDetails.index === index && 'border-b-0 bg-purple-100'} p-4`}>
              <td className="flex pt-4">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 ml-1 mt-1 accent-purple-500"
                  checked={selectedEmployees.includes(employee)}
                  onChange={() => handleEmployeeSelect(employee)}
                />
                <div className="cursor-pointer" onClick={() => handleShowDetails(index)}>
                  <RiArrowDropDownLine className={`text-2xl duration-300 ${showDetails.show === true && showDetails.index === index && 'rotate-180'}`} />
                </div>
              </td>
              <td className="table-cell-gap"><div className="pb-3 pt-3 ml-2 font-serif">{startIndex + index + 1}</div></td>
              <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider">{employee.name}</div></td>
              <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider">{employee.position}</div></td>
              <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider">{employee.department}</div></td>
              <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider">{employee.email}</div></td>
              <td className="table-cell-gap"><div className="pb-3 pt-3 font-serif tracking-wider">{employee.experience}</div></td>
              <td className="table-cell-gap "><div className="pb-3 pt-3 font-serif tracking-wider flex"><BsDot className={`text-2xl -ml-3 ${employee.employementType === "Full time" && 'text-green-400'} ${employee.employementType === "Part time" && 'text-yellow-600'} ${employee.employementType === "Remote" && 'text-blue-600'}`} />{employee.employementType}</div></td>
            </tr>
            {showDetails.show === true && showDetails.index === index && <ShowExtraDetails employee={employee} />}
            </>
          ))}
          </tbody>
      </table>

      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel={<span className="px-2">...</span>}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center mt-4"
        pageLinkClassName="py-2 mx-4 rounded-md"
        previousLinkClassName="px-3 py-2 mx-4 rounded-md focus:bg-purple-200 text-gray-900"
        nextLinkClassName="px-3 py-2 mx-4 rounded-md focus:bg-purple-200 text-gray-900"
        disabledClassName="opacity-50 cursor-not-allowed mx-4"
        activeClassName="bg-purple-600 text-white"
      />
    </div>
  );
};

export default EmployeeList;
