import { Fragment, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"

import { formActions } from "../../../store/form-slice"
import { stepFillActions } from "../../../store/stepfill-slice"

const initialState = {
    birthday: '',
    meritalStatus: '',
    languageKnown: '',
    gender: '',
    birthdayIsValid: null,
    meritalStatusIsValid: null,
    languageKnownIsValid: null,
    genderIsValid: null,
}

const formReducer = (state, action) => {
    if (action.type === 'birthday') {
        return { ...state, birthdayIsValid: action.value < "2020-01-01" ? true : false, birthday: action.value }
    }
    if (action.type === 'meritalStatus') {
        return { ...state, meritalStatusIsValid: action.value.trim().length > 0, meritalStatus: action.value }
    }
    if (action.type === 'languageKnown') {
        return { ...state, languageKnownIsValid: action.value.length > 0, languageKnown: action.value }
    }
    if (action.type === 'gender') {
        return { ...state, genderIsValid: action.value.trim().length > 0, gender: action.value }
    }
    return state;
}

const StepTwo = ({ id, onNextStep, disableButton }) => {
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
            case 'birthday': {
                dispatchFormIsValid({ type: 'birthday', value })
                break;
            }
            case 'meritalStatus': {
                dispatchFormIsValid({ type: 'meritalStatus', value })
                break;
            }
            case 'languageKnown': {
                dispatchFormIsValid({ type: 'languageKnown', value })
                break;
            }
            case 'gender': {
                dispatchFormIsValid({ type: 'gender', value })
                break;
            }
            default: {
                break
            }
        }
        let employeeData;
        if (localStorage.getItem('EmployeeData')) {
            switch (name) {
                case 'birthday': {
                    parsedData.birthday = value
                    break;
                }
                case 'meritalStatus': {
                    parsedData.meritalStatus = value
                    break;
                }
                case 'languageKnown': {
                    parsedData.languageKnown = value
                    break;
                }
                case 'gender': {
                    parsedData.gender = value
                    break;
                }
                default: {
                    break
                }
            }
            parsedData.currentStep = 2
            let updatedData = JSON.stringify(parsedData)
            localStorage.setItem('EmployeeData', updatedData)
        } else {
            employeeData = {}
            employeeData.currentStep = 2
            switch (name) {
                case 'birthday': {
                    employeeData.birthday = value
                    break;
                }
                case 'meritalStatus': {
                    employeeData.meritalStatus = value
                    break;
                }
                case 'languageKnown': {
                    employeeData.languageKnown = value
                    break;
                }
                case 'gender': {
                    employeeData.gender = value
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
        birthday: parsedData.birthday,
        meritalStatus: parsedData.meritalStatus,
        languageKnown: parsedData.languageKnown,
        gender: parsedData.gender
    } : {};

    useEffect(() => {
        const formDataTimer = setTimeout(() => {
            dispatch(formActions.setFormData(formData))
        },2000)
        dataIsValid = parsedData && parsedData.birthday < "2020-01-01" && parsedData.meritalStatus && parsedData.languageKnown && parsedData.gender
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
            dispatch(stepFillActions.fillStepTwo(Object.keys(parsedData).length - 6))
        }
    },[parsedData,dispatch])


    return (
        <Fragment>
            <div>
                <h1 className="xl:mx-24 lg:mx-6 md:mx-6 mx-2 mt-8 text-lg font-semibold">{currentStepData.title}</h1>
                <p className="xl:mx-24 lg:mx-8 md:mx-6 mx-2 text-md text-gray-600">{currentStepData.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 xl:mx-24 lg:mx-8 md:mx-6 mx-2 mt-4">
                <div className="mt-4">
                    <label htmlFor="birthday" className="mr-4">Birthday</label><br />
                    <div className="relative">
                        <input type="date" defaultValue={parsedData ? parsedData.birthday : ''} onChange={validationHandler} className={`${formIsValid.birthdayIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none cursor-pointer p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="birthday" name="birthday" placeholder="Enter name" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="meritalStatus" className="mr-4">Merital Status</label><br />
                    <div className="grid grid-cols-2 mt-2">
                        <span>Single</span> <input type="radio" defaultChecked={parsedData && parsedData.meritalStatus === "single" ? true : false } value="single" onChange={validationHandler} className={`${formIsValid.meritalStatusIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none cursor-pointer p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold`} id="meritalStatus" name="meritalStatus" placeholder="meritalStatus Address" />
                        <span>Married</span> <input type="radio" defaultChecked={parsedData && parsedData.meritalStatus === "married" ? true : false } value="married" onChange={validationHandler} className={`${formIsValid.meritalStatusIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none cursor-pointer p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold`} id="meritalStatus2" name="meritalStatus" placeholder="meritalStatus Address" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="languageKnown" className="mr-4">Language Known</label><br />
                    <div className="relative">
                        <select defaultValue={parsedData ? (parsedData.languageKnown ? parsedData.languageKnown : 'Select Language') : 'Select Language'} onChange={validationHandler} className={`${formIsValid.languageKnownIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} cursor-pointer outline-none cursor-pointer p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="languageKnown" name="languageKnown">
                            <option value="Select Language" disabled>Select Language</option>
                            <option value="hindi">Hindi</option>
                            <option value="english">English</option>
                            <option value="Hindi & English">Hindi & English</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="gender" className="mr-4">Gender </label><br />
                    <div className="relative space-x-4 mt-1">
                        <span className="">Male</span><input type="radio" defaultChecked={parsedData && parsedData.gender === "male" ? true : false } value="male" onChange={validationHandler} className={`${formIsValid.genderIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none cursor-pointer p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="gender" name="gender" />
                        <span className="">Female</span><input type="radio" defaultChecked={parsedData && parsedData.gender === "female" ? true : false } value="female" onChange={validationHandler} className={`${formIsValid.genderIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none cursor-pointer p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="female" name="gender" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StepTwo