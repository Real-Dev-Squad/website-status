import { render, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import Card from "@/components/tasks/card/index";
import { isUserAuthorizedContext } from "@/context/isUserAuthorized";
import { RouterContext } from "next/dist/shared/lib/router-context";
import {
  createMockRouter,
  renderWithRouter,
} from "@/test_utils/createMockRouter";
import { NextRouter } from "next/router";

const DEFAULT_PROPS = {
  content: {
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
  return new Date(d).getTime() / 1000;
};

jest.useFakeTimers();
describe("Task card", () => {
  test("Should render card", () => {
    const { getByText } = renderWithRouter(<Card {...DEFAULT_PROPS} />, {
      query: { dev: "true" },
    });

    expect(getByText("test 1 for drag and drop")).toBeInTheDocument();
  });

  test("Should show n days ago for due tasks", () => {
    let props = {
      ...DEFAULT_PROPS,
      content: {
        ...DEFAULT_PROPS.content,
        endsOn: `${getFirestoreDateNDaysBefore(1)}`,
      },
    };
    const { rerender, getByText } = renderWithRouter(<Card {...props} />);

    expect(getByText("a day ago")).toBeInTheDocument();

    // With updated props
    props = {
      ...props,
      content: {
        ...props.content,
        endsOn: `${getFirestoreDateNDaysBefore(2)}`,
      },
    };

    rerender(
      <RouterContext.Provider value={createMockRouter({}) as NextRouter}>
        <Card {...props} />
      </RouterContext.Provider>
    );

    expect(getByText("2 days ago")).toBeInTheDocument();
  });
  test("should show edit button when ALT key is long pressed", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <isUserAuthorizedContext.Provider value={true}>
        <Card {...DEFAULT_PROPS} />
      </isUserAuthorizedContext.Provider>,
      { query: { dev: "true" } }
    );
    const component = getByTestId("task-card");

    act(() => {
      fireEvent.keyDown(component, { key: "Alt", code: "AltLeft" });
      jest.advanceTimersByTime(300);
    });

    expect(queryByTestId("edit-button")).toBeInTheDocument();
  });
  test("should show edit button when ALT key is long pressed", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <isUserAuthorizedContext.Provider value={true}>
        <Card {...DEFAULT_PROPS} />
      </isUserAuthorizedContext.Provider>,
      { query: { dev: "true" } }
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Shift" });
      document.dispatchEvent(event);
      jest.advanceTimersByTime(300);
    });
    // this will cause setShowUpdatedTaskCard(true)

    const component = getByTestId("task-card");

    act(() => {
      fireEvent.keyDown(component, { key: "Alt", code: "AltLeft" });
      jest.advanceTimersByTime(300);
    });

    expect(queryByTestId("edit-button")).toBeInTheDocument();
  });
});
