import { Fragment, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"

import { formActions } from "../../../store/form-slice"
import { stepFillActions } from "../../../store/stepfill-slice"

const initialState = {
    joiningDate: '',
    salary: '',
    employementType: '',
    joiningDateIsValid: null,
    salaryIsValid: null,
    employementTypeIsValid: null,
}

const formReducer = (state, action) => {
    if (action.type === 'joiningDate') {
        let currentDate = new Date()
        let date = currentDate.getFullYear()
        return { ...state, joiningDateIsValid: action.value.slice(0,4) <= date, joiningDate: action.value }
    }
    if (action.type === 'salary') {
        return { ...state, salaryIsValid: action.value.trim().length > 0, salary: action.value }
    }
    if (action.type === 'employementType') {
        return { ...state, employementTypeIsValid: action.value.trim().length > 0, employementType: action.value }
    }
    return state;
}

const StepThree = ({ id, onNextStep, disableButton }) => {
    const [formIsValid, dispatchFormIsValid] = useReducer(formReducer, initialState)
    const dispatch = useDispatch()

    const steps = useSelector(state => state.form.steps)
    const currentStepData = steps.find(step => step.id === id)

    let parsedData;
    let dataIsValid = false;

    if (localStorage.getItem('EmployeeData')) {
        let existingData = localStorage.getItem('EmployeeData')
        parsedData = existingData ? JSON.parse(existingData) : {};
    }

    const validationHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'joiningDate': {
                dispatchFormIsValid({ type: 'joiningDate', value })
                break;
            }
            case 'salary': {
                dispatchFormIsValid({ type: 'salary', value })
                break;
            }
            case 'employementType': {
                dispatchFormIsValid({ type: 'employementType', value })
                break;
            }
            default: {
                break
            }
        }
        let employeeData;
        if (localStorage.getItem('EmployeeData')) {
            switch (name) {
                case 'joiningDate': {
                    parsedData.joiningDate = value
                    break;
                }
                case 'salary': {
                    parsedData.salary = value
                    break;
                }
                case 'employementType': {
                    parsedData.employementType = value
                    break;
                }
                default: {
                    break
                }
            }
            parsedData.currentStep = 3
            let updatedData = JSON.stringify(parsedData)
            localStorage.setItem('EmployeeData', updatedData)
        } else {
            employeeData = {}
            employeeData.currentStep = 3
            switch (name) {
                case 'joiningDate': {
                    employeeData.joiningDate = value
                    break;
                }
                case 'salary': {
                    employeeData.salary = value
                    break;
                }
                case 'employementType': {
                    employeeData.employementType = value
                    break;
                }
                default: {
                    break
                }
            }
            localStorage.setItem('EmployeeData', JSON.stringify(employeeData))
        }
    }

    const formData = parsedData ? {
        joiningDate: parsedData.joiningDate,
        salary: parsedData.salary,
        employementType: parsedData.employementType,
    } : {};

    useEffect(() => {
        const formDataTimer = setTimeout(() => {
            dispatch(formActions.setFormData(formData))
        }, 2000)
        dataIsValid = parsedData && parsedData.joiningDate && parsedData.salary && parsedData.employementType
        if (dataIsValid) {
            onNextStep()
        } else {
            disableButton()
        }

        return () => {
            clearTimeout(formDataTimer)
        }
    }, [formIsValid])

    useEffect(() => {
        if(parsedData) {
            dispatch(stepFillActions.fillStepThree(Object.keys(parsedData).length - 10))
        }
    },[parsedData, dispatch])

    return (
        <Fragment>
            <div>
                <h1 className="xl:mx-24 lg:mx-6 md:mx-6 mx-2 mt-8 text-lg font-semibold">{currentStepData.title}</h1>
                <p className="xl:mx-24 lg:mx-8 md:mx-6 mx-2 text-md text-gray-600">{currentStepData.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 xl:mx-24 lg:mx-8 md:mx-6 mx-2 mt-4">
                <div className="mt-4">
                    <label htmlFor="joiningDate" className="mr-4">Joining Date</label><br />
                    <div className="relative">
                        <input type="date" defaultValue={parsedData ? parsedData.joiningDate : ''} onChange={validationHandler} className={`${formIsValid.joiningDateIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="joiningDate" name="joiningDate" placeholder="Enter name" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="salary" className="mr-4">Salary</label><br />
                    <div className="grid grid-cols-2">
                        <input type="text" defaultValue={parsedData ? parsedData.salary : ''} onChange={validationHandler} className={`${formIsValid.salaryIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 lg:pr-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold`} id="salary" name="salary" placeholder="Enter Salary" /><span className="text-green-600">( In LPA )</span>
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="employementType" className="mr-4">Emplyoment Type</label><br />
                    <div className="relative">
                        <select defaultValue={parsedData ? (parsedData.employementType ? parsedData.employementType : 'Select Type') : 'Select Type'} onChange={validationHandler} className={`${formIsValid.employementTypeIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="employementType" name="employementType" placeholder="Employement type">
                            <option value="Select Type" disabled>Select Type</option>
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StepThree