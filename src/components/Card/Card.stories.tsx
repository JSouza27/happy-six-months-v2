import { Meta, StoryObj } from '@storybook/react';
import Card from '.';

export default {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (story) => (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw'
        }}
      >
        {story()}
      </div>
    )
  ]
} as Meta<typeof Card>;

export const Default: StoryObj = {};
