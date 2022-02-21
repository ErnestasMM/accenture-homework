export type States = 'processing' | 'error' | 'success';

export enum ErrorCodes {
  NO_STOCK = 'NO_STOCK',
  INCORRECT_DETAILS = 'INCORRECT_DETAILS'
}

export type ProcessingPage = {
  title: string
  message: string | null
}

const ERROR_PAGE_TITLE = 'Error page';

export const ERROR_MESSAGES: {
  [key in ErrorCodes]: ProcessingPage;
} = {
  [ErrorCodes.NO_STOCK]: {
    title: ERROR_PAGE_TITLE,
    message: 'No stock has been found'
  },
  [ErrorCodes.INCORRECT_DETAILS]: {
    title: ERROR_PAGE_TITLE,
    message: 'Incorrect details have been entered'
  },
};

export const GENERIC_ERROR_MESSAGE: ProcessingPage = {
  title: ERROR_PAGE_TITLE,
  message: null,
};

export const SUCCESS_MESSAGE: ProcessingPage = {
  title: 'Order complete',
  message: null
};

export const UNEXPECTED_EXCEPTION_MESSAGE: ProcessingPage = {
  title: 'Unexpected exception',
  message: 'There was no success or error state specified'
};
