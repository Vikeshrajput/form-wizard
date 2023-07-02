import { formActions } from "./form-slice";
import { uiSliceActions } from "./ui-slice";

export const fetchEmployeeData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://employee-details-903f5-default-rtdb.firebaseio.com/employee.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch Employee data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const employeeData = await fetchData();
      dispatch(formActions.replaceData({
        records: employeeData.records || [],
      }));
    } catch (error) {
      console.log(error)
    }
  };
};

export const sendEmployeeData = (formData) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending employee data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://employee-details-903f5-default-rtdb.firebaseio.com/employee.json",
        {
          method: "PUT",
          body: JSON.stringify({records: formData.records,}),
        }
      );

      if (!response.ok) {
        throw new Error("sending employee data failed");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent employee data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending employee data failed",
        })
      );
    }
  };
};
