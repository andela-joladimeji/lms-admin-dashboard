import ReviewService from '../api/ReviewApi';

export const LOAD_REVIEWS_START = "LOAD_REVIEWS_START";
export const LOAD_REVIEWS_SUCCESS = "LOAD_REVIEWS_SUCCESS";
export const LOAD_REVIEWS_ERROR = "LOAD_REVIEWS_ERROR";

export function loadReviewsStart() {
  return {
    type: LOAD_REVIEWS_START
  };
}

export function loadReviewsSuccess(reviews) {
  return {
    type: LOAD_REVIEWS_SUCCESS,
    reviews
  };
}

export function loadReviewsError(error) {
  return {
    type: LOAD_REVIEWS_ERROR,
    error
  };
}

export function loadReviews() {
  return (dispatch) => {
    dispatch(loadReviewsStart());
    return ReviewService
      .get().then((response) => {
        dispatch(loadReviewsSuccess(response.data));
      }).catch((error) => {
        dispatch(loadReviewsError(error));
      });
  };
}