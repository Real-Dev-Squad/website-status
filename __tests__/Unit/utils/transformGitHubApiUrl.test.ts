import transformGitHubApiUrl from '../../../src/utils/transformGitHubApiUrl';

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
