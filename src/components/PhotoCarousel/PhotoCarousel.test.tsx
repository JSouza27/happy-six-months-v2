import { render, screen } from '@testing-library/react';

import PhotoCarousel from '@/components/PhotoCarousel';
import { images } from '@/mocks/images';

describe('<PhotoCarousel />', () => {
  it('should render the image', () => {
    render(<PhotoCarousel images={images} />);

    const image = screen.getByRole('img');
    console.log(image);
  });
});
