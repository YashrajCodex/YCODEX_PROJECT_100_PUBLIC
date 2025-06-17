import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};
function ReducerAccount(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}
function ReducerCustomer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/CreateCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

//action creators for account

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

//action creators for customer

function CreateCustomer(fullName, nationalID) {
  return {
    type: "customer/CreateCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

const rootReducer = combineReducers({
  account: ReducerAccount,
  customer: ReducerCustomer,
});
const store = createStore(rootReducer);

console.log(store.getState());

store.dispatch(CreateCustomer("Yashraj Joshi", "345465343"));

console.log(store.getState());
