import { Fragment, useState } from "react";

import TopBar from "../UI/TopBar";
import ProgressBar from "../ProgressBar/ProgressBar";
import FormSteps from "./FormSteps/FormSteps";
import NavigationButtons from "../Navigation/NavigationButtons";

const FormWizard = (props) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const disableButtonHandler = () => {
        setIsButtonDisabled(true)
    }

    const enableButtonHandler = () => {
        setIsButtonDisabled(false);
    };

    return (
        <Fragment>
            <TopBar onClick={props.onButtonClick} />
            <div className="grid place-items-center my-7">
                <h1 className="font-semibold text-3xl m-3 text-purple-900">Get an Employee Information</h1>
                <p className="w-[30%] text-center text-gray-700 font-inherit">Please fill the form below to receive an interview details and other information that is ragarding the task</p>
            </div>
            <div className="shadow-2xl w-[70%] p-4 lg:w-[60%] pb-12 xl:w-[50%] mx-auto rounded-xl border-2 border-gray-300">
                <div className="grid place-items-center">
                    <ProgressBar />
                </div>
                <FormSteps onNextStep={enableButtonHandler} disableButton={disableButtonHandler} />
            </div>
            <div className="w-[70%] p-4 lg:w-[60%] xl:w-[50%] mx-auto" >
                <NavigationButtons isDisabled={isButtonDisabled} disableButton={disableButtonHandler} reviewDetails={props.onRreviewDetails} />
            </div>
        </Fragment>
    )
}
export default FormWizard;