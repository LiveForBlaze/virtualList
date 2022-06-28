import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getAllByTestId("item").length).toBe(12);
  expect(screen.getAllByTestId("item-additional").length).toBe(3);
});
