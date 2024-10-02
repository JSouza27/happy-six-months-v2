import { render, screen } from '@testing-library/react';

import WebPlayback from '.';

describe('<WebPlayback />', () => {
  it('should render the heading', () => {
    const { container } = render(<WebPlayback />)

    expect(screen.getByRole('heading', { name: /WebPlayback/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
