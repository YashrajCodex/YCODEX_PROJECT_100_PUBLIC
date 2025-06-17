import { createStore, combineReducers, applyMiddleware } from "redux";
import ReducerAccount from './Features/accounts/accountsSlice';
import ReducerCustomer from './Features/customers/customerSlice'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  account: ReducerAccount,
  customer: ReducerCustomer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

//npm i redux-thunk