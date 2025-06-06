import { ExtensionRequest } from '@/interfaces/task.type';

export const now = Date.now();

export const mockExtensionRequests: ExtensionRequest[] = [
  {
    id: '1',
    reason: 'Need more time',
    newEndsOn: now + 86400000,
    title: 'Fix bugs',
    taskId: '123',
    oldEndsOn: now,
    status: 'APPROVED',
    requestNumber: 1,
    timestamp: now,
    assignee: 'john',
    assigneeId: 'user-1',
    reviewedBy: 'admin',
    reviewedAt: Math.floor(now / 1000),
  },
  {
    id: '2',
    reason: 'Additional requirements',
    newEndsOn: now + 172800000,
    title: 'Add features',
    taskId: '123',
    oldEndsOn: now - 86400000,
    status: 'PENDING',
    requestNumber: 2,
    timestamp: now - 43200000,
    assignee: 'john',
    assigneeId: 'user-1',
  },
  {
    id: '3',
    reason: 'Need more time',
    newEndsOn: now + 86400000,
    title: 'Fix bugs',
    taskId: '123',
    oldEndsOn: now,
    status: 'APPROVED',
    requestNumber: 3,
    timestamp: now,
    assignee: 'john',
    assigneeId: 'user-1',
    reviewedBy: 'admin',
    reviewedAt: 1619090400,
  },
  {
    id: '4',
    reason: 'Additional requirements',
    newEndsOn: now + 172800000,
    title: 'Add features',
    taskId: '123',
    oldEndsOn: now - 86400000,
    status: 'DENIED',
    requestNumber: 4,
    timestamp: now - 43200000,
    assignee: 'john',
    assigneeId: 'user-1',
    reviewedBy: 'manager',
    reviewedAt: 1714611746,
  },
  {
    id: '5',
    reason: 'Task complexity increased',
    newEndsOn: now + 172800000,
    title: 'Implement new API',
    taskId: '123',
    oldEndsOn: now - 86400000,
    status: 'PENDING',
    requestNumber: 5,
    timestamp: now - 43200000,
    assignee: 'john',
    assigneeId: 'user-1',
  },
];