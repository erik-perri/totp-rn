import 'react-native';

import {expect, it} from '@jest/globals';
import {render} from '@testing-library/react-native';
import React from 'react';

import App from '../src/App';

it('renders correctly', async () => {
  const {findByText} = render(<App />);

  expect(await findByText('No authenticators found.')).toBeTruthy();
});
