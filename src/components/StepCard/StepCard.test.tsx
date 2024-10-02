import { render, screen } from '@testing-library/react';

import StepCard from '.';

describe('<StepCard />', () => {
  it('should render the heading', () => {
    const { container } = render(<StepCard />)

    expect(screen.getByRole('heading', { name: /StepCard/i })).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
