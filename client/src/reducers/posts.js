import * as actionTypes from "../actions/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL:
      return action.payload;
    case actionTypes.CREATE:
      return [...posts, action.payload];
    case actionTypes.UPDATE:
      return posts.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
    case actionTypes.DELETE:
      return posts.filter(post => post._id !== action.payload);
    default:
      return posts;
  }
};
