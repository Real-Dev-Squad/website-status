import {
    extractRepoName,
    transformGitHubApiUrl,
} from '../../../src/utils/urlTransform';

describe('Unit | Util | Transform GitHub Api Url', () => {
    test('returns proper value with proper input', () => {
        expect(
            transformGitHubApiUrl(
                'https://api.github.com/repos/Real-Dev-Squad/todo-action-items/issues/196'
            )
        ).toEqual(
            'https://github.com/Real-Dev-Squad/todo-action-items/issues/196'
        );
    });

    test('returns # with improper input', () => {
        expect(transformGitHubApiUrl('')).toEqual('#');
    });
});

describe('Unit | Util | Extract Repo Name', () => {
    test('returns proper value with proper input', () => {
        expect(
            extractRepoName(
                'https://github.com/Real-Dev-Squad/todo-action-items/issues/196'
            )
        ).toEqual('todo action items #196');
        expect(
            extractRepoName(
                'https://api.github.com/repos/Real-Dev-Squad/todo-action-items/issues/196'
            )
        ).toEqual('todo action items #196');
    });

    test('returns null with improper input', () => {
        expect(extractRepoName('')).toEqual(null);
    });
});
