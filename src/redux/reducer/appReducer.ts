import { INCREAMENT, DECREAMENT, CHANGE_APP_MODE, SAVE_APP_TOKEN, RELOAD_CART } from './../actions/actionTypes';

const initData = {
    darkMode: false,
    token: "",
    isReloadCart: false,
}

const appReducer = (state = initData, { type, payload }: any) => {
    switch (type) {
        case CHANGE_APP_MODE:
            return {
                ...state,
                darkMode: payload
            }
        case SAVE_APP_TOKEN:
            return {
                ...state,
                token: payload
            }
        case RELOAD_CART:
            return {
                ...state,
                isReloadCart: payload
            }
        default:
            return state
    }
}
export default appReducer