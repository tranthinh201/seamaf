import { createSlice } from '@reduxjs/toolkit'

interface authState {
    login: {
      currentUser: boolean | null;
      isFetching: boolean;
      error: boolean;
    };
    register: {
      isFetching: boolean;
      error: boolean;
      success: boolean;
    };
    logout: {
      currentUser: boolean |null
    }
  }
  
  const initialState: authState = {
    login: {
      currentUser: false,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: {
      currentUser: false
    }
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginStart: (state) => {
        state.login.currentUser = null;
      },
      loginSuccess: (state, action) => {
        state.login.isFetching = true;
        state.login.currentUser = action.payload;
        state.login.error = false;
      },
      loginFailed: (state) => {
        state.login.isFetching = false;
        state.login.error = true;
      },
      logoutStart: (state) => {
        state.login.currentUser = null;
      },
      logoutSuccess: (state, action) => {
        state.login.isFetching = true;
        state.login.currentUser = action.payload;
        state.login.error = false;
      },
      logoutFailed: (state) => {
        state.login.isFetching = false;
        state.login.error = true;
      },
    },
  });

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutFailed,
    logoutSuccess
} = authSlice.actions


export default authSlice.reducer


