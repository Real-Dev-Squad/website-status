import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { TaskLevelMap } from '@/components/tasks/card/TaskLevelMap';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
describe('TaskLevelMap', () => {
    const taskTagLevel = [
        {
            tagId: '1',
            tagName: 'Tag 1',
            levelValue: '1',
            itemId: '1',
            itemType: 'TASK',
            levelId: '1',
            levelName: 'easy',
            tagType: 'SKILL',
        },
        {
            tagId: '2',
            tagName: 'Tag 2',
            levelValue: '2',
            itemId: '1',
            itemType: 'TASK',
            levelId: '1',
            levelName: 'easy',
            tagType: 'SKILL',
        },
    ];

    it('renders a list of task tags', () => {
        render(
            <TaskLevelMap
                taskTagLevel={taskTagLevel}
                shouldEdit={false}
                updateTaskTagLevel={jest.fn()}
            />
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        const levelElements = screen.getAllByTestId('level');
        expect(levelElements[0]).toHaveTextContent('LVL:1');
        expect(levelElements[1]).toHaveTextContent('LVL:2');
    });

    it('renders a list of task tags with remove button when shouldEdit and isUserAuthorized are true', () => {
        const updateTaskTagLevel = jest.fn();
        render(
            <isUserAuthorizedContext.Provider value={true}>
                <TaskLevelMap
                    taskTagLevel={taskTagLevel}
                    shouldEdit={true}
                    updateTaskTagLevel={updateTaskTagLevel}
                />
            </isUserAuthorizedContext.Provider>
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        const removeButtons = screen.getAllByTestId('delete-btn');
        expect(removeButtons).toHaveLength(2);

        fireEvent.click(removeButtons[0]);
        expect(updateTaskTagLevel).toHaveBeenCalledWith(
            taskTagLevel[0],
            'delete'
        );
    });
});
