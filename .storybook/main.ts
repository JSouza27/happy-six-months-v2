import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.tsx'],
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true
      }
    }
  },
  addons: ['@storybook/addon-essentials', 'storybook-addon-next-router'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: true
  },
  async webpackFinal(config) {
    config.resolve?.modules?.push(`${process.cwd()}/src`);
    return config;
  }
};
export default config;
