import React, { useRef } from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { TaskLevelMap } from '@/components/tasks/card/TaskLevelMap';
import taskItem from '@/interfaces/taskItem.type';

import { renderWithProviders } from '@/test-utils/renderWithProvider';
import useUserData from '@/hooks/useUserData';

jest.mock('@/hooks/useUserData', () => {
    return () => ({
        data: {
            roles: {
                admin: true,
                super_user: false,
            },
        },
        isUserAuthorized: true,
        isSuccess: true,
    });
});

describe('TaskLevelMap', () => {
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

    it('renders a list of task tags with remove button when shouldEdit and isUserAuthorized are true', () => {
        const deleteTaskTagLevel = jest.fn();

        render(
            <TaskLevelMap
                taskTagLevel={taskTagLevel}
                shouldEdit={true}
                itemId={'1'}
                deleteTaskTagLevel={deleteTaskTagLevel}
            />
        );

        const tagElements = screen.getAllByTestId('tag-name');
        expect(tagElements).toHaveLength(2);

        const removeButtons = screen.getAllByTestId('delete-btn');
        expect(removeButtons).toHaveLength(2);

        fireEvent.click(removeButtons[0]);

        expect(deleteTaskTagLevel).toHaveBeenCalledWith({
            taskItemToDelete: taskTagLevel[0],
            itemId: '1',
        });
    });
});
