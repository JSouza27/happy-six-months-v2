import { Meta, StoryObj } from '@storybook/react';
import PhotoCarousel from '.';
import { images } from '@/mocks/images';

export default {
  title: 'PhotoCarousel',
  component: PhotoCarousel
} as Meta<typeof PhotoCarousel>;

export const Default: StoryObj<typeof PhotoCarousel> = {
  args: {
    images
  }
};
