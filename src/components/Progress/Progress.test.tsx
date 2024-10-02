import { render, screen } from '@testing-library/react';

import Progress from '.';

describe('<Progress />', () => {
  it('should render the heading', () => {
    const { container } = render(<Progress />)

    expect(screen.getByRole('heading', { name: /Progress/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
