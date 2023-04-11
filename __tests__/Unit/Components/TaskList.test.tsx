import TaskList from '@/components/tasks/TaskList/TaskList';
import { render, screen, fireEvent } from '@testing-library/react';

const TASK = {
    id: 'firestoreDocumentId123',
    lossRate: {
        dinero: 10,
        neelam: 5,
    },
    links: ['https://realdevsquad.com/learn-site'],
    completionAward: {
        dinero: 110,
        neelam: 10,
    },
    dependsOn: [],
    assignee: 'shmbajaj',
    startedOn: '1618790400',
    isNoteworthy: true,
    title: 'Testing and Determinsitic State',
    purpose: 'string',
    percentCompleted: 0,
    endsOn: '1618790400',
    status: 'progress',
    featureUrl: 'progress',
    type: 'feature',
    createdBy: 'shmbajaj',
};
const tasks = Array.from({ length: 10 }).map((_, index) => ({
    ...TASK,
    id: TASK.id + index,
}));

describe('TaskList', function () {
    it('Should render TaskList', function () {
        render(<TaskList tasks={tasks} updateTask={jest.fn()} />);

        const _tasks = screen.queryAllByText(TASK.title);

        expect(_tasks).toHaveLength(10);
        expect(_tasks[0]).toBeInTheDocument();
        expect(_tasks[0]).toHaveTextContent(TASK.title);
    });

    it('Should render see more button', function () {
        render(
            <TaskList tasks={tasks} hasLimit={true} updateTask={jest.fn()} />
        );

        const seeMore = screen.getByRole('button', { name: /see more/i });

        expect(seeMore).toBeInTheDocument();
    });

    it('Should render 3 tasks intially and then render more 5 tasks after click event', function () {
        render(
            <TaskList tasks={tasks} hasLimit={true} updateTask={jest.fn()} />
        );

        const _tasks = screen.queryAllByText(TASK.title);
        const seeMore = screen.getByRole('button', { name: /see more/i });

        expect(_tasks).toHaveLength(3);
        fireEvent.click(seeMore);
        expect(screen.queryAllByText(TASK.title)).toHaveLength(8);
    });

    it('Shouldn\'t render see more button after all tasks are loaded and rendered', function () {
        render(
            <TaskList tasks={tasks} hasLimit={true} updateTask={jest.fn()} />
        );

        const _tasks = screen.queryAllByText(TASK.title);
        const seeMore = screen.getByRole('button', { name: /see more/i });

        expect(_tasks).toHaveLength(3);
        fireEvent.click(seeMore);
        fireEvent.click(seeMore);
        expect(screen.queryAllByText(TASK.title)).toHaveLength(10);
        expect(seeMore).not.toBeInTheDocument();
    });
});
