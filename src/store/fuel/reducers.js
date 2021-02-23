import {
    FUEL_ADD_SHOW,
} from './actions'

const defaultState = {
    showAdd: false,
};

export const fuelReducer = (state = defaultState, action) => {

    switch (action.type) {

        case FUEL_ADD_SHOW:
            return {
                ...state,
                showAdd: action.payload
            }

        default:
            return state;
    
    }

}