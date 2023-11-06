import extractRepoName from '../../../src/utils/extractRepoName';

describe('Unit | Util | Extract Repo Name', () => {
    test('returns proper value with proper input', () => {
        expect(
            extractRepoName(
                'https://github.com/Real-Dev-Squad/todo-action-items/issues/196'
            )
        ).toEqual('todo action items #196');
        expect(
            extractRepoName(
                'https://github.com/Real-Dev-Squad/website-status/issues/950'
            )
        ).toEqual('website status #950');
    });

    test('returns null with improper input', () => {
        expect(extractRepoName('')).toEqual(null);
    });
});
