import { Fragment, useState } from "react";

import StepOne from "../FormSteps/StepOne";
import StepTwo from "../FormSteps/StepTwo";
import StepThree from "../FormSteps/StepThree";
import StepFour from "../FormSteps/StepFour";

const ReviewDetails = (props) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const goBack = () => {
        props.goBack()
    }    
    const disableButtonHandler = () => {
        setIsButtonDisabled(true)
    }

    const enableButtonHandler = () => {
        setIsButtonDisabled(false);
    };

    const addEmployeeHandler = () => {
        props.onShowSummary()
        props.goBack()
    }
    return (
        <Fragment>
            <div className="shadow-2xl w-[70%] p-4 lg:w-[60%] pb-20 xl:w-[50%] mx-auto rounded-xl border-2 border-gray-300 my-12">
                <StepOne id={1} onNextStep={enableButtonHandler} disableButton={disableButtonHandler}/>
                <StepTwo id={2} onNextStep={enableButtonHandler} disableButton={disableButtonHandler} />
                <StepThree id={3} onNextStep={enableButtonHandler} disableButton={disableButtonHandler} />
                <StepFour id={4} onNextStep={enableButtonHandler} disableButton={disableButtonHandler} />
                <button disabled={isButtonDisabled} onClick={addEmployeeHandler} className={`${isButtonDisabled ? 'bg-gray-400' : 'bg-purple-900 hover:bg-purple-800'} float-right mr-3 mt-4 rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold`}>Summary</button>
                <button onClick={goBack} className={`bg-purple-900 hover:bg-purple-800 float-right mr-3 mt-4 rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold`}>Go Back</button>
            </div>
        </Fragment>
    )
}

export default ReviewDetails;