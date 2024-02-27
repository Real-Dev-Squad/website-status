import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TaskRequestForm from '@/components/issues/TaskRequestForm';
import { TASK_REQUESTS_DETAILS_URL } from '@/constants/url';

describe('TaskRequestForm Component', () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    date.setDate(date.getDate() + 7);
    const futureYear = date.getFullYear().toString();
    const futureMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const futureDay = date.getDate().toString().padStart(2, '0');
    const sevenDaysFromToday = `${futureYear}-${futureMonth}-${futureDay}`;

    test('renders form with default values', () => {
        const createTaskRequestMock = jest.fn();
        render(<TaskRequestForm createTaskRequest={createTaskRequestMock} />);
        const startDateInput = screen.getByLabelText(
            /Start date:/i
        ) as HTMLInputElement;
        const endDateInput = screen.getByLabelText(
            /End date:/i
        ) as HTMLInputElement;
        const descriptionTextarea = screen.getByLabelText(
            /Description:/i
        ) as HTMLTextAreaElement;
        const submitButton = screen.getByRole('button', {
            name: /Create Request/i,
        });
        expect(startDateInput.value).toBe(today);
        expect(endDateInput.value).toBe(sevenDaysFromToday);
        expect(descriptionTextarea.value).toBe('');
        expect(submitButton).toBeInTheDocument();
    });
    test('updates state when values are entered', () => {
        const createTaskRequestMock = jest.fn();
        render(<TaskRequestForm createTaskRequest={createTaskRequestMock} />);
        const startDateInput = screen.getByLabelText(
            /Start date:/i
        ) as HTMLInputElement;
        const endDateInput = screen.getByLabelText(
            /End date:/i
        ) as HTMLInputElement;
        const descriptionTextarea = screen.getByLabelText(
            /Description:/i
        ) as HTMLTextAreaElement;
        fireEvent.change(startDateInput, { target: { value: '2023-10-17' } });
        fireEvent.change(endDateInput, { target: { value: '2023-10-24' } });
        fireEvent.change(descriptionTextarea, {
            target: { value: 'Test description' },
        });
        expect(startDateInput.value).toBe('2023-10-17');
        expect(endDateInput.value).toBe('2023-10-24');
        expect(descriptionTextarea.value).toBe('Test description');
    });
    test('submits form and calls createTaskRequest function', async () => {
        const createTaskRequestMock = jest.fn();
        render(<TaskRequestForm createTaskRequest={createTaskRequestMock} />);
        const submitButton = screen.getByRole('button', {
            name: /Create Request/i,
        });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(createTaskRequestMock).toHaveBeenCalled();
        });
    });
    test('should display success message with a link', async () => {
        const createTaskRequestMock = jest.fn();
        render(
            <TaskRequestForm
                createTaskRequest={createTaskRequestMock}
                requestId="1234"
            />
        );
        const successHeader = screen.getByTestId('task-request-success-header');
        const successImage = screen.getByTestId('task-request-success-image');
        const successLink = screen.getByTestId(
            'task-request-success-link-message'
        );
        expect(successHeader).toBeInTheDocument();
        expect(successImage).toBeInTheDocument();
        expect(successLink).toBeInTheDocument();
    });
    test('should contain the request id', async () => {
        const requestId = '1234';
        const createTaskRequestMock = jest.fn();
        render(
            <TaskRequestForm
                createTaskRequest={createTaskRequestMock}
                requestId={requestId}
            />
        );
        const successLink = screen.getByTestId('task-request-success-link');
        const href = successLink.getAttribute('href');
        const taskRequestIdSearchParam = new URLSearchParams();
        taskRequestIdSearchParam.append('id', requestId);
        const dashboardTaskRequestUrl = new URL(TASK_REQUESTS_DETAILS_URL);
        dashboardTaskRequestUrl.search = taskRequestIdSearchParam.toString();
        expect(href).toEqual(dashboardTaskRequestUrl.toString());
    });
});
