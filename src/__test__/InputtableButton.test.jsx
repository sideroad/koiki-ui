import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import InputtableButton from '../InputtableButton';

describe('<InputtableButton />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<InputtableButton text="Search" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
