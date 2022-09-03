import fetch from '@/helperFunctions/fetch';
import mockAxios from 'jest-mock-axios';

describe("Test fetch", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('Should call axios', async () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();
    const { requestPromise } = fetch({ url: 'http://localhost' });

    requestPromise
      .then(thenFn)
      .catch(catchFn);

    expect(mockAxios).toHaveBeenCalledTimes(1);
  });
});
