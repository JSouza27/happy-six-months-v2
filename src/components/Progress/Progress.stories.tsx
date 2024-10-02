import { Meta, StoryObj } from '@storybook/react';
import Progress from '.';

export default {
  title: 'Progress',
  component: Progress,
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: 'lightgray',
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
} as Meta<typeof Progress>;

export const Default: StoryObj<typeof Progress> = {
  args: {
    currentIndex: 3,
    length: 5
  }
};
