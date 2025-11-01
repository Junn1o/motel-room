import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
// dùng redux lưu lại giá trị ở local để khi reload trang sẽ không lặp lại về ban đầu
const commonConfig = {
    storage,
    stateReconciler : autoMergeLevel2
}
// white list là những thứ mình muốn lưu lại ở local thì mình sẽ nói cho persist
const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist : ['isLoggedIn','token']
}
const rootReducer = combineReducers({
    auth : persistReducer(authConfig,authReducer),
    user: userReducer
})
export default rootReducer