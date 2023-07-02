import { Fragment, useEffect, useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"

import { formActions } from "../../../store/form-slice"

const initialState = {
    position: '',
    department: '',
    experience: '',
    positionIsValid: null,
    departmentIsValid: null,
    experienceIsValid: null,
}

const formReducer = (state, action) => {
    if (action.type === 'position') {
        return { ...state, positionIsValid: action.value.trim().length > 0, position: action.value }
    }
    if (action.type === 'department') {
        return { ...state, departmentIsValid: action.value.trim().length > 0, department: action.value }
    }
    if (action.type === 'experience') {
        return { ...state, experienceIsValid: action.value.trim().length > 0, experience: action.value }
    }
    return state;
}

const StepFour = ({ id, onNextStep, disableButton }) => {
    // const [experienceValue, setExperienceValue] = useState(" year")
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
            case 'position': {
                dispatchFormIsValid({ type: 'position', value })
                break;
            }
            case 'department': {
                dispatchFormIsValid({ type: 'department', value })
                break;
            }
            case 'experience': {
                dispatchFormIsValid({ type: 'experience', value })
                break;
            }
            default: {
                break
            }
        }
        let employeeData;
        if (localStorage.getItem('EmployeeData')) {
            switch (name) {
                case 'position': {
                    parsedData.position = value.trim()
                    break;
                }
                case 'department': {
                    parsedData.department = value.trim()
                    break;
                }
                case 'experience': {
                    parsedData.experience = value.trim() + " year"
                    break;
                }
                default: {
                    break
                }
            }
            parsedData.currentStep = 4
            console.log(parsedData)
            let updatedData = JSON.stringify(parsedData)
            localStorage.setItem('EmployeeData', updatedData)
        } else {
            employeeData = {
                position: '',
                department: '',
                experience: '',
                company: '',
            }
            switch (name) {
                case 'position': {
                    employeeData.position = value.trim()
                    break;
                }
                case 'department': {
                    employeeData.department = value.trim()
                    break;
                }
                case 'experience': {
                    employeeData.experience = value.trim() + " year"
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
        position: parsedData.position,
        department: parsedData.department,
        experience: parsedData.experience,
    } : {};

    useEffect(() => {
        const formDataTimer = setTimeout(() => {
            dispatch(formActions.setFormData(formData))
        },2000)
        dataIsValid = parsedData && parsedData.position && parsedData.department && parsedData.experience && parsedData.experience.length > 5
        if(dataIsValid) {
            onNextStep()
        } else {
            disableButton()
        }
        
        return () => {
            clearTimeout(formDataTimer)
        }
    },[formIsValid])

    return (
        <Fragment>
            <div>
                <h1 className="xl:mx-24 lg:mx-6 md:mx-6 mx-2 mt-8 text-lg font-semibold">{currentStepData.title}</h1>
                <p className="xl:mx-24 lg:mx-8 md:mx-6 mx-2 text-md text-gray-600">{currentStepData.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 xl:mx-24 lg:mx-8 md:mx-6 mx-2 mt-4">
                <div className="mt-4">
                    <label htmlFor="position" className="mr-4">Position</label><br />
                    <div className="relative">
                        <input type="text" defaultValue={parsedData ? parsedData.position : ''} onChange={validationHandler} className={`${formIsValid.positionIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="position" name="position" placeholder="Enter position" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="department" className="mr-4">department</label><br />
                    <div className="relative">
                        <input type="text" defaultValue={parsedData ? parsedData.department : ''} onChange={validationHandler} className={`${formIsValid.departmentIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 lg:pr-10 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="department" name="department" placeholder="Enter Department" />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="experience" className="mr-4">Experience</label><br />
                    <div className="flex">
                        <input type="text" defaultValue={parsedData ? parsedData.experience?.slice(0,1) : ''} onChange={validationHandler} className={`${formIsValid.experienceIsValid === false ? 'bg-red-100 border-2 border-red-300' : ''} outline-none p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg`} id="experience" name="experience" placeholder="Experience" />
                        <input type="button" value="Year" className={`bg-purple-700 px-3 py-1 rounded-full mt-4 mb-1 ml-5 text-lg text-white`} />   
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StepFour