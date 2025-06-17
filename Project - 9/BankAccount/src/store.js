// import {conigureStore} from '@reduxjs/toolkit'

import { configureStore } from '@reduxjs/toolkit';
import ReducerAccount from './Features/accounts/accountsSlice';
import ReducerCustomer from './Features/customers/customerSlice'



const store = configureStore({
  reducer: {
    account: ReducerAccount,
    customer: ReducerCustomer
  }
})

export default store;

//npm i redux-thunk