import DragDropContextWrapper from '@/components/availability-panel/drag-drop-context';
import { tasks, TASK } from '../../../../../__mocks__/db/tasks';
import { renderWithProviders } from '../../../../../src/test-utils/renderWithProvider';

export const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
export const idleMemberFallbackText = 'No idle members found';
export const tasksFallbackText = 'No task found';

describe('DrogDropContextWrapper Component', () => {
    describe('should show placeholder', () => {
        test('when there is no task & members', () => {
            const { queryAllByAltText, getByText } = renderWithProviders(
                <DragDropContextWrapper
                    idleMembers={[]}
                    unAssignedTasks={[]}
                    refreshData={null}
                />
            );
            getByText(idleMemberFallbackText);
            getByText(tasksFallbackText);
            const ghostNodes = queryAllByAltText('ghost');
            expect(ghostNodes).toHaveLength(2);
            expect(ghostNodes[0]).toHaveAttribute(
                'src',
                expect.stringMatching(urlPattern)
            );
            expect(ghostNodes[1]).toHaveAttribute(
                'src',
                expect.stringMatching(urlPattern)
            );
        });

        test('when there is no task', () => {
            const { getByAltText, getByText } = renderWithProviders(
                <DragDropContextWrapper
                    idleMembers={['Akash Shukla']}
                    unAssignedTasks={[]}
                    refreshData={null}
                />
            );
            expect(getByText(tasksFallbackText)).toBeVisible();
            expect(getByAltText('ghost')).toHaveAttribute(
                'src',
                expect.stringMatching(urlPattern)
            );
        });

        test('when there is no idleMemeber', () => {
            const { getByAltText, getByText } = renderWithProviders(
                <DragDropContextWrapper
                    idleMembers={[]}
                    unAssignedTasks={tasks}
                    refreshData={null}
                />
            );
            expect(getByText(idleMemberFallbackText)).toBeVisible();
            expect(getByAltText('ghost')).toHaveAttribute(
                'src',
                expect.stringMatching(urlPattern)
            );
        });
    });

    test('should render all the tasks & members as expected', () => {
        const { queryAllByText, getByText } = renderWithProviders(
            <DragDropContextWrapper
                idleMembers={['Akash Shukla']}
                unAssignedTasks={tasks}
                refreshData={null}
            />
        );
        const unAssignedTaskNodes = queryAllByText(TASK.title);
        expect(unAssignedTaskNodes).toHaveLength(10);
        expect(unAssignedTaskNodes[0]).toBeVisible();
        expect(unAssignedTaskNodes[6]).toBeVisible();
        getByText('Akash Shukla');
    });

    test('should have tasks & members items draggable', () => {
        const { container } = renderWithProviders(
            <DragDropContextWrapper
                idleMembers={['Akash Shukla']}
                unAssignedTasks={tasks}
                refreshData={null}
            />
        );
        const taskList = container.querySelectorAll('.memberCard');
        expect(taskList[0].getAttribute('draggable')).toBeTruthy();
    });
});
