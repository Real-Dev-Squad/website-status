import { render } from "@testing-library/react";
import Card from "@/components/tasks/card/index";

const DEFAULT_PROPS = {
  content: {
    id: "firestoreDocumentId123",
    lossRate: {
      dinero: 10,
      neelam: 5
    },
    links: [
      "https://realdevsquad.com/learn-site"
    ],
    completionAward: {
      dinero: 110,
      neelam: 10
    },
    dependsOn: [],
    assignee: "ankur",
    startedOn: "1618790400",
    isNoteworthy: true,
    title: "test 1 for drag and drop",
    purpose: "string",
    percentCompleted: 0,
    endsOn: "1618790400",
    status: "assigned",
    featureUrl: "string",
    type: "feature",
    createdBy: "ankush",
  },
  shouldEdit: false,
  onContentChange: jest.fn(),
};

const getFirestoreDateNDaysBefore = (n = 1) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return (new Date(d).getTime()) / 1000;
};

describe("Task card", () => {
  test("Should render card", () => {
    const { getByText } = render(
      <Card {...DEFAULT_PROPS} />
    );

    expect(getByText("test 1 for drag and drop")).toBeInTheDocument();
  });

  test("Should show n days ago for due tasks", () => {
    let props = {
      ...DEFAULT_PROPS,
      content: {
        ...DEFAULT_PROPS.content,
        endsOn: `${getFirestoreDateNDaysBefore(1)}`,
      }
    };
    const { rerender, getByText } = render(
      <Card {...props} />
    );

    expect(getByText("a day ago")).toBeInTheDocument();

    // With updated props
    props = {
      ...props,
      content: {
        ...props.content,
        endsOn: `${getFirestoreDateNDaysBefore(2)}`,
      }
    };

    rerender(
      <Card {...props} />
    )

    expect(getByText("2 days ago")).toBeInTheDocument();
  });

  test("Should show right status", () => {
    const { getByText } = render(
      <Card {...DEFAULT_PROPS} />
    );

    expect(getByText(DEFAULT_PROPS.content.status)).toBeInTheDocument();
  });

  it("Should render 'Close task' button when parent issue is closed", function () {
		const PROPS = {
			...DEFAULT_PROPS,
			content: {
				...DEFAULT_PROPS.content,
				github: {
					issue: {
						closedAt: "2023-04-02T17:31:50",
						status: "closed",
						id: 12278,
					},
				},
			},
		};

		const screen = render(<Card {...PROPS} />);

		const closeTaskBtn = screen.getByRole("button", {
			name: /Close the task/i,
		});
		expect(closeTaskBtn).toBeInTheDocument();
	});

	it("Should not render 'Close task' button when parent issue is closed but the task was already completed", function () {
		const PROPS = {
			...DEFAULT_PROPS,
			content: {
				...DEFAULT_PROPS.content,
        status: "Completed",
				github: {
					issue: {
						closedAt: "2023-04-02T17:31:50",
						status: "closed",
						id: 12278,
					},
				},
			},
		};

		const screen = render(<Card {...PROPS} />);

		const closeTaskBtn = screen.queryByRole("button", {
			name: /Close the task/i,
		});
		expect(closeTaskBtn).not.toBeInTheDocument();
	});

  it("Should render 'Assign to username' button when parent issue has an assignee and is open, the task is available and has not been assigned", function () {
		const PROPS = {
			...DEFAULT_PROPS,
			content: {
				...DEFAULT_PROPS.content,
				status: "Available",
				assignee: undefined,
				github: {
					issue: {
						assignee: "ankushdharkar",
						status: "open",
						id: 12278,
						assigneeRdsInfo: {
							username: "ankush",
							firstName: "Ankush",
							lastName: "Dharkar",
						},
					},
				},
			},
		};

		const screen = render(<Card {...PROPS} />);

		const closeTaskBtn = screen.queryByRole("button", {
			name: /Assign to ankush/i,
		});
		expect(closeTaskBtn).toBeInTheDocument();
	});

  it("Should not render 'Assign to username' button when parent issue has an assignee and is open, the task status is 'Completed' and has not been assigned", function () {
		const PROPS = {
			...DEFAULT_PROPS,
			content: {
				...DEFAULT_PROPS.content,
				status: "Completed",
				assignee: undefined,
				github: {
					issue: {
						assignee: "ankushdharkar",
						status: "open",
						id: 12278,
						assigneeRdsInfo: {
							username: "ankush",
							firstName: "Ankush",
							lastName: "Dharkar",
						},
					},
				},
			},
		};

		const screen = render(<Card {...PROPS} />);

		const closeTaskBtn = screen.queryByRole("button", {
			name: /Assign to ankush/i,
		});
		expect(closeTaskBtn).not.toBeInTheDocument();
	});
});
