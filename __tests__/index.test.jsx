/**
 * @jest-environment jsdom
 */

import { getPage } from 'next-page-tester';
import { screen } from '@testing-library/react'

describe('Index', () => {
  it('Render index page', async () => {
    const { render } = await getPage({
      route: '/',
    });
    render();

    expect(screen.getByText('Tasks')).toBeInTheDocument()
  })
})
