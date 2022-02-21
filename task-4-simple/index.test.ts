import { getProcessingPage } from './index';
import util from 'util';

describe('getProcessingPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success response message on success state', async () => {
    const state = {
      state: 'success'
    };

    const page = await getProcessingPage([state]);

    expect(page).toEqual({
      title: 'Order complete',
      message: null,
    });
  });

  it('should wait for 2 seconds on processing state', async () => {
    jest.spyOn(global, 'setTimeout');

    const state = {
      state: 'processing'
    };

    const pagePromise = getProcessingPage([state]);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
    expect(util.inspect(pagePromise).includes('pending')).toBe(true);

    jest.advanceTimersByTime(2000);
    const page = await pagePromise;

    expect(page).toEqual(undefined);
  });

  it.each([
    {
      errorCode: 'NO_STOCK',
      expectedMessage: 'No stock has been found'
    },
    {
      errorCode: 'INCORRECT_DETAILS',
      expectedMessage: 'Incorrect details have been entered'
    },
    {
      errorCode: null,
    },
    {}
  ])('should return correct error response', async ({ errorCode, expectedMessage = null }) => {
    const state = {
      state: 'error',
      errorCode,
    };

    const page = await getProcessingPage([state]);

    expect(page).toEqual({
      title: 'Error page',
      message: expectedMessage,
    });
  });

  it('should handle a chain of states', async () => {
    const states = [{
      state: 'processing'
    }, {
      state: 'processing'
    }, {
      state: 'success'
    }, {
      state: 'error'
    }];

    jest.spyOn(global, 'setTimeout').mockImplementation(((cb) => cb()) as any);

    const page = await getProcessingPage(states);

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 2000);
    expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 2000);

    expect(page).toEqual({
      title: 'Order complete',
      message: null,
    });
  });
});
