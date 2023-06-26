import { useRouter } from 'next/router';

interface MockedUseRouter {
    query: {
        [key: string]: string;
    };
}

export function mockNextRouter(): jest.Mocked<typeof useRouter> {
    return jest.fn().mockReturnValue({
        query: {
            dev: 'true',
        },
    }) as jest.Mocked<typeof useRouter>;
}
