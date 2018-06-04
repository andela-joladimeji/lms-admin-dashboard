import { LOAD_REVIEWS_START, LOAD_REVIEWS_SUCCESS, LOAD_REVIEWS_ERROR } from '../actions/reviewActions';

export const initialState = {
  reviews: [],
  isFetching: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS_START:
      return {
        ...state,
        isFetching: true
      };
    case LOAD_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.reviews,
        isFetching: false
      };
    case LOAD_REVIEWS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
    }
};
