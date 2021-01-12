import React from 'react'
import Task from './index'

export default {
    title: 'Task',
    component: Task
}

const pr ={
      "title": "Create /users/:id for getting user details",
      "completionDate": "In next 5 days",
      "startedAt": "3 days ago",
      "author": "Nikhil",
      "profilePicture": "https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/nikhil/img.png",
      "issueStatus": "PR Review",
      "completionStatus": "pending"
    }
const Template = (args) => <Task {...args} />;

export const DemoComponent = Template.bind({});
DemoComponent.args = {
  pullRequest : pr
};
