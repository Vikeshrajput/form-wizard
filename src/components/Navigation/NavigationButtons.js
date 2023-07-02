import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/form-slice";

const NavigationButtons = ({isDisabled, disableButton, reviewDetails}) => {
    const currentStep = useSelector((state) => state.form.currentStep);
    const dispatch = useDispatch();

    const handleNext = () => {
        dispatch(formActions.nextStep());
        disableButton()
    };

    const handlePrevious = () => {
        dispatch(formActions.previousStep());
    };

    const reviewDetailsHandler = () => {
        reviewDetails()
    }

    return (
        <div className="ml-auto float-right mb-24">
            {currentStep > 1 && (
                <button onClick={handlePrevious} className="bg-purple-900 rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold hover:bg-purple-800 mr-3">Previews Step</button>
                )}
            {currentStep < 4 && (
                <button onClick={handleNext} disabled={isDisabled} className={`${isDisabled ? 'bg-gray-400':'bg-purple-900 hover:bg-purple-800'} rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold`}>Next Step</button>
            )}
            {currentStep === 4 && (
                <button disabled={isDisabled} onClick={reviewDetailsHandler} className={`${isDisabled ? 'bg-gray-400':'bg-purple-900 hover:bg-purple-800'} rounded-full tracking-wider text-white text-[12px] px-6 py-2.5 font-semibold`}>Review details</button>
            )}
        </div>
    );
}

export default NavigationButtons