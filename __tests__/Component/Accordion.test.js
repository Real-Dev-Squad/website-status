import { render, fireEvent } from '@testing-library/react';
import Accordion from '../../src/components/Accordion';

describe('Accordion', () => {
  it('Show accordion title', async () => {
    const { getByText, getByTestId } = render(
      <Accordion
        title="Active"
        open={true}
      >
        <p>
          Paragraph text 
        </p>
      </Accordion>
    );

    expect(getByText('Active')).toBeInTheDocument();
    expect(getByText('Paragraph text')).toBeInTheDocument();

    expect(getByTestId('accordion-content')).toHaveClass('open');

    fireEvent.click(getByText('Active'));
    expect(getByTestId('accordion-content')).toHaveClass('close');
  });
});

