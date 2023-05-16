import { INCREAMENT, DECREAMENT } from './actionTypes';
export const increaseAction = ((step: Number) => {
    return {
        type: INCREAMENT,
        step: step
    }
})

export const decreaseAction = ((step: Number) => {
    return {
        type: DECREAMENT,
        step: step
    }
})