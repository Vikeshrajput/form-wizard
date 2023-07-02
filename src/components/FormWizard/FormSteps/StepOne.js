import { Fragment, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"

import { formActions } from "../../../store/form-slice"
import { stepFillActions } from "../../../store/stepfill-slice"

const initialState = {
    name: '',
    email: '',
    mobile: '',
    company: '',
    alterNativeNumber: '',
    nameIsValid: null,
    emailIsValid: null,
    mobileIsValid: null,
    companyIsValid: null,
    alterNativeNumberIsValid: null,
}

const formReducer = (state, action) => {
    if (action.type === 'name') {
        return { ...state, nameIsValid: action.value.trim().length > 0, name: action.value }
    }
    if (action.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return { ...state, emailIsValid: emailRegex.test(action.value.trim()), email: action.value }
    }
    if (action.type === 'mobile') {
        return { ...state, mobileIsValid: action.value.toString().length > 9, mobile: action.value }
    }
    if (action.type === 'company') {
        return { ...state, companyIsValid: action.value.trim().length > 0, company: action.value }
    }
    if (action.type === 'alterNativeNumber') {
        return { ...state, alterNativeNumberIsValid: action.value.toString().length > 9, alterNativeNumber: action.value }
    }
    return state;
}

const StepOne = ({ id, onNextStep, disableButton }) => {
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

    let showAlternativeNumber;
    if(formIsValid.mobile && formIsValid.mobile.toString().length > 9) {
        showAlternativeNumber = true
    }

    const validationHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name': {
                dispatchFormIsValid({ type: 'name', value })
                break;
            }
            case 'email': {
                dispatchFormIsValid({ type: 'email', value })
                break;
            }
            case 'mobile': {
                dispatchFormIsValid({ type: 'mobile', value })
                break;
            }
            case 'company': {
                dispatchFormIsValid({ type: 'company', value })
                break;
            }
            case 'alterNativeNumber': {
                dispatchFormIsValid({ type: 'alterNativeNumber', value })
                break;
            }
            default: {
                break
            }
        }
        let employeeData;
        if (localStorage.getItem('EmployeeData')) {
            switch (name) {
                case 'name': {
                    parsedData.name = value.trim()
                    break;
                }
                case 'email': {
                    parsedData.email = value.trim()
                    break;
                }
                case 'mobile': {
                    parsedData.mobile = value.trim()
                    break;
                }
                case 'company': {
                    parsedData.company = value.trim()
                    break;
                }
                case 'alterNativeNumber': {
                    parsedData.alterNativeNumber = value.trim()
                    break;
                }
                default: {
                    break
                }
            }
            parsedData.currentStep = 1
            let updatedData = JSON.stringify(parsedData)
            localStorage.setItem('EmployeeData', updatedData)
        } else {
            employeeData = {}
            employeeData.currentStep = 1
            switch (name) {
                case 'name': {
                    employeeData.name = value.trim()
                    break;
                }
                case 'email': {
                    employeeData.email = value.trim()
                    break;
                }
                case 'mobile': {
                    employeeData.mobile = value.trim()
                    break;
                }
                case 'company': {
                    employeeData.company = value.trim()
                    break;
                }
                case 'alterNativeNumber': {
                    employeeData.alterNativeNumber = value.trim()
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
        name: parsedData.name,
        email: parsedData.email,
        mobile: parsedData.mobile,
        company: parsedData.company,
        alterNativeNumber: parsedData.alterNativeNumber,
    } : {};

    useEffect(() => {
        const formDataTimer = setTimeout(() => {
            dispatch(formActions.setFormData(formData))
        },2000)
        dataIsValid = parsedData && parsedData.email && parsedData.mobile && parsedData.alterNativeNumber ? parsedData.name && parsedData.email.includes('@') && parsedData.mobile.toString().length > 9 && parsedData.company && parsedData.alterNativeNumber.toString().length > 9 : false
        if(dataIsValid) {
            onNextStep()
        } else {
            disableButton()
        }
        
        return () => {
            clearTimeout(formDataTimer)
        }
    },[formIsValid])

    useEffect(() => {
        if(parsedData) {
            dispatch(stepFillActions.fillStepOne(Object.keys(parsedData).length - 1))
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
                    <label htmlFor="name" className="mr-4">Name</label><br />
                    <div className="relative">
                        <input type="text" defaultValue={parsedData ? parsedData.name : ''} onChange={validationHandler} className={`${formIsValid.nameIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="name" name="name" placeholder="Enter name" autoComplete="given-name" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="name" className="mr-4">Email</label><br />
                    <div className="relative">
                        <input type="text" defaultValue={parsedData ? parsedData.email : ''} onChange={validationHandler} className={`${formIsValid.emailIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="email" name="email" placeholder="Email Address" autoComplete="email" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="name" className="mr-4">Phone Number</label><br />
                    <div className="relative">
                        <input type="number" defaultValue={parsedData ? parsedData.mobile : ''} onChange={validationHandler} className={`${formIsValid.mobileIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="mobile" name="mobile" placeholder="(123) 456 - 7890" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="name" className="mr-4">Company </label><br />
                    <div className="relative">
                        <input type="text" defaultValue={parsedData ? parsedData.company : ''} onChange={validationHandler} className={`${formIsValid.companyIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="company" name="company" placeholder="Company name" autoComplete="on" />
                    </div>
                </div>
                {showAlternativeNumber && <div className="mt-4">
                    <label htmlFor="alterNativeNumber" className="mr-4">Alternative Number</label><br />
                    <div className="relative">
                        <input type="number" defaultValue={parsedData ? parsedData.alterNativeNumber : ''} onChange={validationHandler} className={`${formIsValid.alterNativeNumberIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="alterNativeNumber" name="alterNativeNumber" placeholder="(123) 456 - 7890" />
                    </div>
                </div>}
            </div>
        </Fragment>
    )
}

export default StepOne