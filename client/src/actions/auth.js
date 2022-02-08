import * as api from "../api";
import * as actionTypes from "./actionTypes";

export const signIn = (formData, navigate) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: actionTypes.AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async dispatch => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: actionTypes.AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
