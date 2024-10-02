import { render, screen } from '@testing-library/react';

import SignIn from '.';

describe('<SignIn />', () => {
  it('should render the heading', () => {
    const { container } = render(<SignIn />)

    expect(screen.getByRole('heading', { name: /SignIn/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
