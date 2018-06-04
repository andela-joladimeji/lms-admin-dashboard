import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import {CSVLink} from 'react-csv';

class Review extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadReviews();
  }

  renderReviews() {
    let {reviews, error, isfetching} = this.props;
    if (error) {
      return <p>An error occured: {error}</p>;
    }
    if (!isfetching && !reviews) {
      return <p>No data to display</p>;
    }
    if (reviews && reviews.length > 0) {
      return (
        <div>
          <CSVLink data={reviews} filename={"reviews.csv"} >Download Data</CSVLink>
          <ReactTable
              data={reviews}
              filterable
              defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value}
              columns={[
              {
                Header: "Review Data",
                columns: [
                  {
                    Header: "Course id",
                    accessor: "course_id",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["course_id"] }),
                    filterAll: true
                  },
                  {
                    Header: "Course Name",
                    accessor: "course_name",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["course_name"] }),
                    filterAll: true
                  },
                  {
                    Header: "Output Name",
                    accessor: "output_name",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["output_name"] }),
                    filterAll: true
                  },
                  {
                    Header: "Submission URL",
                    accessor: "submission_url",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["submission_url"] }),
                    filterAll: true
                  },
                  {
                    Header: "Fellow Name",
                    accessor: "fellow_name",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["fellow_name"] }),
                    filterAll: true
                  },
                  {
                    Header: "Fellow Email",
                    accessor: "fellow_email",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["fellow_email"] }),
                    filterAll: true
                  },
                  {
                    Header: "Assigned Reviewer Name",
                    accessor: "assigned_ta_name",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["assigned_ta_name"] }),
                    filterAll: true
                  },
                  {
                    Header: "Assigned Reviewer Email",
                    accessor: "assigned_ta_email",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["assigned_ta_email"] }),
                    filterAll: true
                  },
                  {
                    Header: "Last Reviewer Name",
                    accessor: "latest_reviewer_name",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["latest_reviewer_name"] }),
                    filterAll: true
                  },
                  {
                    Header: "Last Reviewer Email",
                    accessor: "latest_reviewer_email",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["latest_reviewer_email"] }),
                    filterAll: true
                  },
                  {
                    Header: "Last Reviewer Role",
                    accessor: "latest_reviewer_role",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["latest_reviewer_role"] }),
                    filterAll: true
                  },
                  {
                    Header: "Date Of Review Request",
                    accessor: "review_request_date",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["review_request_date"] }),
                    filterAll: true
                  },
                  {
                    Header: "Date Of Review Completion",
                    accessor: "latest_reviewer_completion_date",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["latest_reviewer_completion_date"] }),
                    filterAll: true
                  },
                  {
                    Header: "Status",
                    accessor: "status",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["status"] }),
                    filterAll: true
                  }
                ]
              }
            ]}
              defaultPageSize={15}
              className="-striped -highlight"
          />
          </div>
      );
    }
  }

  render() {
    return (
      <div>{ this.renderReviews() }</div>
    );
  }
}

Review.propTypes = {
  reviews: PropTypes.array,
  error: PropTypes.string,
  loadReviews: PropTypes.func,
  isfetching: PropTypes.bool,
};

export default Review;
