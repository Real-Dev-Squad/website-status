import React from 'react'
import StalePR from './index'

export default {
    title: 'Stale Pull Request',
    component: StalePR
}

const stalepr = {
                    "title":"Deeptiman - solution",
                    "username":"codecrook",
                    "state":"open",
                    "createdAt":"2020-03-15T15:18:48Z",
                    "updatedAt":"2020-03-17T20:44:31Z",
                    "repository":"Max-Movies-In-Years",
                    "url":"https://github.com/Real-Dev-Squad/Max-Movies-In-Years/pull/2",
                    "labels":[],
                    "assignees":["codecrook"]
                }
const Template = (args) => <StalePR {...args} />;

export const DemoComponent = Template.bind({});
DemoComponent.args = {
  pullRequest : stalepr
};