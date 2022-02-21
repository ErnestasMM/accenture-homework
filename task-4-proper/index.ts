import {
  ERROR_MESSAGES,
  ErrorCodes,
  GENERIC_ERROR_MESSAGE,
  ProcessingPage,
  States,
  SUCCESS_MESSAGE,
  UNEXPECTED_EXCEPTION_MESSAGE
} from './constants';

export type State = {
  state: States
  errorCode?: ErrorCodes | null
}

const PROCESSING_HANDLERS: { [key in States]: (state: State) => Promise<ProcessingPage | null> } = {
  processing: () => new Promise((res) => setTimeout(() => res(null), 2000)),
  error: ({ errorCode }) => Promise.resolve(ERROR_MESSAGES[errorCode] || GENERIC_ERROR_MESSAGE),
  success: () => Promise.resolve(SUCCESS_MESSAGE),
};

/**
 * @usage:
 * await getProcessingPage([{ state: 'processing' }, { state: 'error' }]);
 * */
export const getProcessingPage = async (states: State[]): Promise<ProcessingPage> => {
  for (let state of states) {
    const handler = PROCESSING_HANDLERS[state.state];
    const responseMessage = await handler(state);

    if (responseMessage) {
      return responseMessage;
    }
  }

  return UNEXPECTED_EXCEPTION_MESSAGE;
};

