import { Meta, StoryObj } from '@storybook/react';
import Player from '.';

export default {
  title: 'Player',
  component: Player,
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
          justifyContent: 'center'
        }}
      >
        {story()}
      </div>
    )
  ]
} as Meta<typeof Player>;

export const Default: StoryObj<typeof Player> = {
  args: {
    title: 'Nome da música'
  }
};
