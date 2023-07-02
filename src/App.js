import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormWizard from './components/FormWizard/FormWizard'
import PrevDataModel from "./components/UI/PrevDataModel";
import ReviewDetails from "./components/FormWizard/ReviewDetails/ReviewDetails";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import FormSummary from "./components/FormWizard/FormSummary/FormSummary";
import { fetchEmployeeData } from "./store/form-actions";
import { sendEmployeeData } from "./store/form-actions";
import { uiSliceActions } from "./store/ui-slice";
import { formActions } from "./store/form-slice";
import Notification from "./components/UI/Notification";

let isInitial = false;


function App() {
  const [displayModel, setDisplayModel] = useState(false)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
  const [reviewDetails, setReviewDetails] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const formData = useSelector(state => state.form)
  const notification = useSelector((state) => state.ui.showNotification);

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('EmployeeData')) {
      const existingData = localStorage.getItem('EmployeeData');
      const parsedData = existingData ? JSON.parse(existingData) : {} ;
      if(Object.keys(parsedData).length > 1) {
        setDisplayModel(true)
      }
    }
  },[])

  useEffect(() => {
    dispatch(fetchEmployeeData());
  },[dispatch])

  useEffect(() => {

    if(isInitial) {
      isInitial = false;
      return;
    }
    if(formData.changed === true) {
      dispatch(sendEmployeeData(formData))
      dispatch(formActions.resetChanged())
    }
    setTimeout(() => {
      dispatch(uiSliceActions.hideNotification())
    },3000)

  }, [formData.changed, dispatch]);

  const confirmHandler = () => {
    setDisplayModel(false)
  }

  const cancelHandler = () => {
    localStorage.clear('EmployeeData')
    setDisplayModel(false)
    window.location.reload(false);

  }

  const reviewDetailsHandler = () => {
    setReviewDetails(true)
  }

  const resetReviewsDetails = () => {
    setReviewDetails(false)
  }

  const goBackToReviewDetails = () => {
      setShowSummary(false)
      setReviewDetails(true)
  }

  const showEmployeeDetailsHandler = () => {
    setShowEmployeeDetails(true)
  }

  const addEmployeeHandler = () => {
    setShowEmployeeDetails(false)
  }

  const showSummaryHandler = () => {
    setShowSummary(!showSummary)
  }

  const goBackToFormHandler = () => {
    setShowSummary(false)
  }

  const title = "Previews Entered details found"
  const massege = "Continue with Previews Details"

 
  return (
    <Fragment>
      {notification && (<Notification status={notification.status} title={notification.title} message={notification.message} />)}
      {displayModel && <PrevDataModel title={title} massege={massege} onConfirm={confirmHandler} onCancel={cancelHandler} />}
      {!reviewDetails && !showEmployeeDetails && !showSummary && <FormWizard onRreviewDetails={reviewDetailsHandler} onButtonClick={showEmployeeDetailsHandler} />}
      {showEmployeeDetails && !showSummary && <EmployeeList onAddEmployee={addEmployeeHandler} />}
      {reviewDetails && !showSummary && <ReviewDetails goBack={resetReviewsDetails} onShowSummary={showSummaryHandler} />}
      {showSummary && <FormSummary goBack={goBackToReviewDetails} goBackToForm={goBackToFormHandler} onShowSummary={showSummaryHandler} />}
    </Fragment>
  );
}

export default App;
