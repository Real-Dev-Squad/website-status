import { render, fireEvent } from '@testing-library/react'
import Accordion from '../../src/components/Accordion'

describe('Accordion', () => {
  it('Show accordion title', async () => {
    const { getByText, getByTestId } = await render(
      <Accordion
        title="title"
        open={true}
      >
        <p>
          test text
        </p>
      </Accordion>
    );

    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('test text')).toBeInTheDocument();
    fireEvent.click(getByTestId('accordion-title'));
    expect(getByTestId('accordion-content')).toHaveStyle('display: block');
  })
})
