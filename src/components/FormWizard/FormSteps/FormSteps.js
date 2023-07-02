import { useSelector } from "react-redux"

import StepOne from "./StepOne"
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";


const FormSteps = (props) => {
    const currentStep = useSelector(state => state.form.currentStep)
    const steps = useSelector(state => state.form.steps)

    const currentStepData = steps.find(step => step.id === currentStep)

    return (
        <div>
            {currentStepData.id === 1 && <StepOne id={currentStepData.id} onNextStep={props.onNextStep} disableButton={props.disableButton} />}
            {currentStepData.id === 2 && <StepTwo id={currentStepData.id} onNextStep={props.onNextStep} disableButton={props.disableButton} />}
            {currentStepData.id === 3 && <StepThree id={currentStepData.id} onNextStep={props.onNextStep} disableButton={props.disableButton} />}
            {currentStepData.id === 4 && <StepFour id={currentStepData.id} onNextStep={props.onNextStep} disableButton={props.disableButton} />}
        </div>
    )
}

export default FormSteps