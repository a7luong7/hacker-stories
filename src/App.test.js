import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const component = render(<App />);
  expect(component).not.toBeNull();
});
