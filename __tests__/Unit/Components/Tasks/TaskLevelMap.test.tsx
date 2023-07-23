import React from 'react';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { TaskLevelMap } from '@/components/tasks/card/TaskLevelMap';
import taskItem from '@/interfaces/taskItem.type';
import { renderWithProviders } from '@/test-utils/renderWithProvider';
import handlers from '../../../../__mocks__/handlers';
import { setupServer } from 'msw/node';
import selfHandler, {
    adminUserHandler,
} from '../../../../__mocks__/handlers/self.handler';

const server = setupServer();

describe('TaskLevelMap', () => {
    beforeAll(() => {
        server.listen({
            onUnhandledRequest: 'warn',
        });
    });

    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    const taskTagLevel: taskItem[] = [
        {
            tagId: '1',
            tagName: 'Tag 1',
            levelValue: 1,
            itemType: 'TASK',
            levelId: '1',
            levelName: 'easy',
            tagType: 'SKILL',
        },
        {
            tagId: '2',
            tagName: 'Tag 2',
            levelValue: 2,
            itemType: 'TASK',
            levelId: '1',
            levelName: 'easy',
            tagType: 'SKILL',
        },
    ];

    it('renders a list of task tags', () => {
        const deleteTaskTagLevel = jest.fn();
        renderWithProviders(
            <TaskLevelMap
                taskTagLevel={taskTagLevel}
                shouldEdit={false}
                itemId={'1'}
                deleteTaskTagLevel={deleteTaskTagLevel}
            />
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        const levelElements = screen.getAllByTestId('level');
        expect(levelElements[0]).toHaveTextContent('LVL:1');
        expect(levelElements[1]).toHaveTextContent('LVL:2');
    });

    it('renders a list of task tags with remove button when shouldEdit and isUserAuthorized are true', async () => {
        server.use(...adminUserHandler);
        const deleteTaskTagLevel = jest.fn();

        renderWithProviders(
            // utility
            <TaskLevelMap
                taskTagLevel={taskTagLevel}
                shouldEdit={true}
                itemId={'1'}
                deleteTaskTagLevel={deleteTaskTagLevel}
            />
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        await waitFor(() => {
            const removeButtons = screen.getAllByTestId('delete-btn');
            expect(removeButtons).toHaveLength(2);
            fireEvent.click(removeButtons[0]);
        });
        expect(deleteTaskTagLevel).toHaveBeenCalledWith({
            taskItemToDelete: taskTagLevel[0],
            itemId: '1',
        });
    });

    it('renders a list of task tags without the remove button when shouldEdit is true but isUserAuthorized is false', async () => {
        server.use(...selfHandler);
        const deleteTaskTagLevel = jest.fn();

        renderWithProviders(
            <TaskLevelMap
                taskTagLevel={taskTagLevel}
                shouldEdit={true}
                itemId={'1'}
                deleteTaskTagLevel={deleteTaskTagLevel}
            />
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        await waitFor(() => {
            const removeButtons = screen.queryAllByTestId('delete-btn');
            expect(removeButtons).toHaveLength(0);
        });
    });
});
