import React from 'react';
import {shallow} from 'enzyme';
import { LoginPage } from './LoginPage';

describe('<LoginPage />', () => {
  it('should contain <span />', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.find('span').length).toEqual(1);
  });
  it('should contain "Login with Google"', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.text()).toEqual('Login with Google');
  });
});
