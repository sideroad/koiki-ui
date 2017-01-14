import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button from '../Button';

describe('<Button />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Button text="Search" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
