import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialValue = {
    user: null,
    isAuthenticated: false,
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "AnimePahe_One_Piece_-_1071_1080p_SubsPlease_Moment.jpg",
  };
function Reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {...state, user: action.payload, isAuthenticated: true}
        case 'logout':
            return {...state, user: null, isAuthenticated: false}
        default:
            throw new Error("Unknown action triggered!");
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(Reducer, initialValue)
    
    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({type: 'login', payload: FAKE_USER})
        
    }
    function logout() {
        dispatch({type: 'logout'})
    }
    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout
    }}>
        { children }
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if(context === undefined)
        throw new Error("AuthContext is used outside the AuthProvider");
    return context;
}

export {AuthProvider, useAuth}