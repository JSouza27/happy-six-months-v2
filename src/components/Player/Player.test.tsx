import { render, screen } from '@testing-library/react';

import Player from '.';

describe('<Player />', () => {
  it('should render the heading', () => {
    const { container } = render(<Player />)

    expect(screen.getByRole('heading', { name: /Player/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
