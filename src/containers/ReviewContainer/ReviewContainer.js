import { connect } from 'react-redux';
import { Review } from '../../components/review';
import { loadReviews } from '../../actions/reviewActions';

const mapStateToProps = (state) => {
  return {
    isFetching: state.review.isFetching,
    reviews: state.review.reviews,
    error: state.review.error
  };
};

const mapDispatchToProps = {
  loadReviews
};

const ReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);

export default ReviewContainer;