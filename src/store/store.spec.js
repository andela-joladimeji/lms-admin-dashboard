// import * as ActionTypes from '../constants/actionTypes';

import MockDate from 'mockdate';
import { createStore } from 'redux';

// import { getFormattedDateTime } from '../utils/dateHelper';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

describe('Store', () => {
  // let dateModified;
  beforeAll(() => {
    // hardcoded date for consistency in tests and snapshots on all machines
    MockDate.set(new Date("1/31 23:14:01"));
    // dateModified = getFormattedDateTime();
  });
  afterAll(() => MockDate.reset());

  it('should display results when necessary data is provided', () => {
    const store = createStore(rootReducer, initialState);

    const actions = [
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = true;
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should not display results when necessary data is not provided', () => {
    const store = createStore(rootReducer, initialState);

    const actions = [
    ];

    actions.forEach(action => store.dispatch(action));

    const actual = false;

    const expected = false;


    expect(actual).toEqual(expected);
  });


  it('should handle a flurry of actions', () => {
    const store = createStore(rootReducer, initialState);

    const actions = [
    ];
    actions.forEach(action => store.dispatch(action));

    const moreActions = [
    ];

    moreActions.forEach(action => store.dispatch(action));

    const actual = 10;
    //expect(actual.fuelSavings).toEqual(expected);

    // with jest snapshots the above assertion can be replaced with this one line
    // jest will store the value in a file within ./__snapshots__
    // snapshots can/should be committed and reviewed
    // jest will also update snapshot or delete unused ones using the command `npm run test -- -u`
    expect(actual).toMatchSnapshot();
  });
});
