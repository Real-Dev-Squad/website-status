import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TaskRequestForm from '@/components/issues/TaskRequestForm';

describe('TaskRequestForm Component', () => {
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    date.setDate(date.getDate() + 7);
    const sevenDaysFromToday = date.toISOString().split('T')[0];
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
});
