import { getProcessingPage, State } from './index';
import {
  ERROR_MESSAGES,
  ErrorCodes,
  GENERIC_ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  UNEXPECTED_EXCEPTION_MESSAGE
} from './constants';
import util from 'util';

describe('getProcessingPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success response message on success state', async () => {
    const state: State = {
      state: 'success'
    };

    const page = await getProcessingPage([state]);

    expect(page).toEqual(SUCCESS_MESSAGE);
  });

  it('should wait for 2 seconds on processing state', async () => {
    jest.spyOn(global, 'setTimeout');

    const state: State = {
      state: 'processing'
    };

    const pagePromise = getProcessingPage([state]);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
    expect(util.inspect(pagePromise).includes('pending')).toBe(true);

    jest.advanceTimersByTime(2000);
    const page = await pagePromise;

    expect(page).toEqual(UNEXPECTED_EXCEPTION_MESSAGE);
  });

  it.each([
    {
      errorCode: ErrorCodes.NO_STOCK,
    },
    {
      errorCode: ErrorCodes.INCORRECT_DETAILS,
    },
    {
      errorCode: null,
    },
    {}
  ])('should return correct error response', async ({ errorCode }) => {
    const state: State = {
      state: 'error',
      errorCode,
    };

    const page = await getProcessingPage([state]);

    const expectedResponse = errorCode != null ? ERROR_MESSAGES[errorCode] : GENERIC_ERROR_MESSAGE;
    expect(page).toEqual(expectedResponse);
  });

  it('should handle a chain of states', async () => {
    const states: State[] = [{
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

    expect(page).toEqual(SUCCESS_MESSAGE);
  });
});
