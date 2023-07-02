import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formActions } from "../../store/form-slice";

const ProgressBar = () => {
    const formstep =  useSelector(state => state.form.currentStep)
    const formStepFill = useSelector(state => state.stepFill)
    const dispatch = useDispatch()

    return (
        <Fragment>
            <div className="flex my-4">
                <button className="px-[7px] text-white rounded-full bg-purple-700 text-sm" onClick={() => formstep > 1 ? dispatch(formActions.resetCurrentStep(1)) : null}>1</button>
                <div className="w-[80px] mx-4 mt-2.5 h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div className={`duration-300 left-0 bg-purple-800 h-1 rounded-full`} style={{width: `${formStepFill.stepOneFillPercantage}px`}}></div>
                </div>
                <button className={`${formstep > 1 ? 'bg-purple-700' : 'bg-gray-400'} duration-300 px-[7px] text-white rounded-full text-sm`} onClick={() => formstep > 2 ? dispatch(formActions.resetCurrentStep(2)) : null}>2</button>
                <div className="w-[80px] mx-4 mt-2.5 h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div className={`duration-300 left-0 bg-purple-800 h-1 rounded-full`} style={{width: `${formStepFill.stepTwoFillPercantage}px`}}></div>
                </div>
                <button className={`${formstep > 2 ? 'bg-purple-700' : 'bg-gray-400'} duration-300 px-[7px] text-white rounded-full text-sm`} onClick={() => formstep > 3 ? dispatch(formActions.resetCurrentStep(3)) : null}>3</button>
                <div className="w-[80px] mx-4 mt-2.5 h-1 bg-gray-300 rounded-full overflow-hidden">
                    <div className={`duration-300 left-0 bg-purple-800 h-1 rounded-full`} style={{width: `${formStepFill.stepThreeFillPercantage}px`}}></div>
                </div>
                <span className={`${formstep > 3 ? 'bg-purple-700' : 'bg-gray-400'} duration-300 px-[7px] text-white rounded-full text-sm`}>4</span>
            </div>
            <hr className="border-1 border-gray-300 w-[95%] lg:w-80%] xl:w-[75%]" />
        </Fragment>
    )
}

export default ProgressBar;