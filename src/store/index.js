import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import formSlice from "./form-slice";
import stepfillSlice from "./stepfill-slice";

const store = configureStore({ reducer: { ui: uiSlice, form: formSlice, stepFill: stepfillSlice } })

export default store