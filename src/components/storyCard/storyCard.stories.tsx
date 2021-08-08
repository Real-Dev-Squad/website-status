import { Story, Meta } from '@storybook/react';

import StoryCard, { Props } from './index';

export default {
  title: 'Example/StoryCard',
  component: StoryCard,
} as Meta;

const Template: Story<Props> = (args) => <StoryCard {...args} />;

export const Active = Template.bind({});
Active.args = {
  data: {
    title: 'This is title',
    description: 'This is some description regarding the task that I am working on',
    status: 'Active',
    started: '12 days ago',
    dueDate: '8 days',
    subtasks: [
      {
        key: 'task-1',
        title: 'Task 1',
        status: 'Active',
      },
      {
        key: 'task-2',
        title: 'Task 2',
        status: 'Active',
      },
    ],
    owners: {
      backend: {
        name: 'swaraj',
        img: 'https://www.w3schools.com/howto/img_avatar.png',
      },
      frontend: {
        name: 'nikhil',
        img: 'https://www.w3schools.com/howto/img_avatar.png',
      },
      feature: {
        name: 'pranav',
        img: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
  },
};

export const InActive = Template.bind({});
InActive.args = {
  data: {
    title: 'This is inactive title',
    description: 'This is some description regarding the task that I am working on',
    status: 'InActive',
    started: 'Not started',
    dueDate: '8 days',
    subtasks: [
      {
        key: 'task-1',
        title: 'Task 1',
        status: 'Active',
      },
      {
        key: 'task-2',
        title: 'Task 2',
        status: 'Active',
      },
    ],
    owners: {
      backend: {
        name: 'swaraj',
        img: 'https://www.w3schools.com/howto/img_avatar.png',
      },
      frontend: {
        name: 'nikhil',
        img: 'https://www.w3schools.com/howto/img_avatar.png',
      },
      feature: {
        name: 'pranav',
        img: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
  },
};
