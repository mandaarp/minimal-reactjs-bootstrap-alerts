import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders danger button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/danger/i);
  expect(linkElement).toBeInTheDocument();
});
