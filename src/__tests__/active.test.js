import { render, screen } from '@testing-library/react';
import Active from '@pages/active';

test('Render an active text', () => {
  render(<Active />);
  const linkElement = screen.getByTest(/No active tasks found/i);
  expect(linkElement).toBeInTheDocument();
});
