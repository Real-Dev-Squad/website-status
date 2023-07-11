import DragDropContextWrapper from '@/components/availability-panel/drag-drop-context';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { tasks, TASK } from '../../../../../__mocks__/db/tasks';

describe('DrogDropContextWrapper Component', () => {
    test('component with no member & no tasks should show a placeholder', () => {
        const { queryAllByAltText, getByText } = render(
            <Provider store={store()}>
                <DragDropContextWrapper
                    idleMembers={[]}
                    unAssignedTasks={[]}
                    refreshData={null}
                />
            </Provider>
        );
        getByText('No idle members found');
        getByText('No task found');
        const ghostNodes = queryAllByAltText('ghost');
        expect(ghostNodes).toHaveLength(2);
        expect(ghostNodes[0]).toHaveAttribute(
            'src',
            '/_next/image?url=%2Fghost.png&w=384&q=75'
        );
        expect(ghostNodes[1]).toHaveAttribute(
            'src',
            '/_next/image?url=%2Fghost.png&w=384&q=75'
        );
    });

    test('component should render all the tasks & rembers as expected', () => {
        const { queryAllByText, getByText } = render(
            <Provider store={store()}>
                <DragDropContextWrapper
                    idleMembers={['Akash Shukla']}
                    unAssignedTasks={tasks}
                    refreshData={null}
                />
            </Provider>
        );
        const unAssignedTaskNodes = queryAllByText(TASK.title);
        expect(unAssignedTaskNodes).toHaveLength(10);
        getByText('Akash Shukla');
    });
});
