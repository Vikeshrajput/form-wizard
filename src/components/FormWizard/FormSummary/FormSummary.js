import { Fragment } from "react";
import { useDispatch } from "react-redux";

import SummaryFeild from "./SummaryFeild";
import { formActions } from "../../../store/form-slice";
import { stepFillActions } from "../../../store/stepfill-slice";

const FormSummary = (props) => {
    const dispatch = useDispatch()

    let parsedData;

    if(localStorage.getItem('EmployeeData')) {
        let formData = localStorage.getItem('EmployeeData')
        parsedData = JSON.parse(formData)
    }

    const goBack = () => {
        props.goBack()
    }

    const addEmployeeHandler = () => {
        dispatch(formActions.submitForm())
        dispatch(formActions.resetCurrentStep(1))
        dispatch(stepFillActions.resetAllStepsFill())
        localStorage.clear('EmployeeData')
        props.goBackToForm()
    }
    return (
        <Fragment>
            <div className="shadow-2xl w-[70%] my-12 p-4 lg:w-[60%] pb-12 xl:w-[50%] mx-auto rounded-xl border-2 border-gray-300">
                <div className="grid sm:grid-cols-2 gap-4 xl:mx-24 lg:mx-8 md:mx-6 mx-2 mt-4">
                    <SummaryFeild id="name" feildName="Name" feildData={parsedData?.name} />
                    <SummaryFeild id="email" feildName="Email" capatalize={false} feildData={parsedData?.email} />
                    <SummaryFeild id="mobile" feildName="Phone number" feildData={parsedData?.mobile} />
                    <SummaryFeild id="company" feildName="Company" feildData={parsedData?.company} />
                    <SummaryFeild id="alterNativeNumber" feildName="Alternative Number" feildData={parsedData?.alterNativeNumber} />
                    <SummaryFeild id="birthday" feildName="Birthday" feildData={parsedData?.birthday} />
                    <SummaryFeild id="meritalStatus" feildName="Merital Status" feildData={parsedData?.meritalStatus} />
                    <SummaryFeild id="languageKnown" feildName="Language Known" feildData={parsedData?.languageKnown} />
                    <SummaryFeild id="gender" feildName="Gender" feildData={parsedData?.gender} />
                    <SummaryFeild id="joiningDate" feildName="Joining Date" feildData={parsedData?.joiningDate} />
                    <SummaryFeild id="salary" feildName="Salary" feildData={parsedData?.salary} />
                    <SummaryFeild id="employementType" feildName="Employment Type" feildData={parsedData?.employementType} />
                    <SummaryFeild id="position" feildName="Position" feildData={parsedData?.position} />
                    <SummaryFeild id="department" feildName="Department" feildData={parsedData?.department} />
                    <SummaryFeild id="experience" feildName="Experience" feildData={parsedData?.experience} />
                </div>
                <div className="mb-8">
                    <button onClick={addEmployeeHandler} className={`bg-purple-900 hover:bg-purple-800 float-right mr-3 mt-4 rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold`}>Add Employee</button>
                    <button onClick={goBack} className={`bg-purple-900 hover:bg-purple-800 float-right mr-3 mt-4 rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold`}>Go Back</button>
                </div>
            </div>
        </Fragment>
    )
}

export default FormSummary;