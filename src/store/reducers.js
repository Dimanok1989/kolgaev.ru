import { combineReducers } from 'redux'
import { fuelReducer } from './fuel/reducers'

export default combineReducers({
    fuel: fuelReducer,
});