import TaskList from "@/components/tasks/TaskList/TaskList";
import { render, screen, fireEvent } from "@testing-library/react";

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

describe("TaskList", function () {
  it("Should render TaskList", function () {
    render(<TaskList tasks={tasks} />);

    const task = screen.queryByText(TASK.title);
    const _tasks = screen.queryAllByText(TASK.title);

    expect(task).toBeInTheDocument();
    expect(_tasks).toHaveLength(10);
  });

  it("Should render see more button", function () {
    render(<TaskList tasks={tasks} hasLimit={true} />);

    const seeMore = screen.getByRole("button", { name: /see more/i });

    expect(seeMore).toBeInTheDocument();
  });

  it("Should render 3 tasks intially and then load and render more 5 tasks after see more button click event", function () {
    render(<TaskList tasks={tasks} hasLimit={true} />);

    const _tasks = screen.queryAllByText(TASK.title);
    const seeMore = screen.getByRole("button", { name: /see more/i });

    expect(_tasks).toHaveLength(3);
    fireEvent.click(seeMore);
    expect(_tasks).toHaveLength(8);
  });

  it("Shouldn't render see more button after all tasks load and render", function () {
    render(<TaskList tasks={tasks} hasLimit={true} />);

    const _tasks = screen.queryAllByText(TASK.title);
    const seeMore = screen.getByRole("button", { name: /see more/i });

    expect(_tasks).toHaveLength(3);
    fireEvent.click(seeMore);
    fireEvent.click(seeMore);
    expect(_tasks).toHaveLength(10);
    expect(seeMore).not.toBeInTheDocument();
  });
});
