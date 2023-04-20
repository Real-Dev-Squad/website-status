import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TaskLevelMap } from '@/components/tasks/card/TaskLevelMap';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import taskItem from '@/interfaces/taskItem.type';

import { renderWithProviders } from '@/test-utils/renderWithProvider';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TaskLevelMap', () => {
    const taskTagLevel: taskItem[] = [
        {
            tagId: '1',
            tagName: 'Tag 1',
            levelValue: 1,
            itemId: '1',
            itemType: 'TASK',
            levelId: '1',
            levelName: 'easy',
            tagType: 'SKILL',
        },
        {
            tagId: '2',
            tagName: 'Tag 2',
            levelValue: 2,
            itemId: '1',
            itemType: 'TASK',
            levelId: '1',
            levelName: 'easy',
            tagType: 'SKILL',
        },
    ];

    it('renders a list of task tags', () => {
        renderWithProviders(
            <TaskLevelMap
                taskTagLevel={taskTagLevel}
                shouldEdit={false}
                itemId={'1'}
            />
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        const levelElements = screen.getAllByTestId('level');
        expect(levelElements[0]).toHaveTextContent('LVL:1');
        expect(levelElements[1]).toHaveTextContent('LVL:2');
    });

    it('renders a list of task tags with remove button when shouldEdit and isUserAuthorized are true', () => {
        renderWithProviders(
            <isUserAuthorizedContext.Provider value={true}>
                <TaskLevelMap
                    taskTagLevel={taskTagLevel}
                    shouldEdit={true}
                    itemId={'1'}
                />
            </isUserAuthorizedContext.Provider>
        );
        // const updateTaskTagLevel = jest.fn();

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        const removeButtons = screen.getAllByTestId('delete-btn');
        expect(removeButtons).toHaveLength(2);

        fireEvent.click(removeButtons[0]);

        expect(tagElements).toHaveLength(2);
        // expect(updateTaskTagLevel).toHaveBeenCalledWith(taskTagLevel[0]);
    });
});
