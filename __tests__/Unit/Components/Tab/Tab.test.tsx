import React from "react";
import { render } from "@testing-library/react";
import Tab from '@/components/Tabs/Tab';
import TaskList from '@/components/tasks/TaskList/TaskList';

const TASK = {
  id: "firestoreDocumentId123",
  lossRate: {
    dinero: 10,
    neelam: 5,
  },
  links: ["https://realdevsquad.com/learn-site"],
  completionAward: {
    dinero: 110,
    neelam: 10,
  },
  dependsOn: [],
  assignee: "shmbajaj",
  startedOn: "1618790400",
  isNoteworthy: true,
  title: "Testing and Determinsitic State",
  purpose: "string",
  percentCompleted: 0,
  endsOn: "1618790400",
  status: "progress",
  featureUrl: "progress",
  type: "feature",
  createdBy: "shmbajaj",
};
const tasks = Array.from({ length: 10 }).map((_, index) => ({ ...TASK, id: TASK.id + index }));

describe("Tab component", () => {
  it("renders children", () => {
    const text = "Tab Content";
    const { queryAllByText } = render(<Tab>
      <TaskList tasks={tasks} />
    </Tab>);
    expect(queryAllByText(tasks[0].title)).toBeInTheDocument();
  });
});
