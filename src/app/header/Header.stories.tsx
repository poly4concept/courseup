import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { Header } from './Header';

export default {
  title: 'Header',
  component: Header,
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/taMF1mrqs7jAS7myzk78mT/clockwork?node-id=0%3A1',
  },
};
