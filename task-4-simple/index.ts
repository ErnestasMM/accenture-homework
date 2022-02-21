export const getProcessingPage = async (states: { state: string, errorCode?: string | null }[]) => {
  for (let { state, errorCode } of states) {
    if (state === 'processing') {
      await new Promise((res) => setTimeout(res, 2000));
      continue;
    }
    if (state === 'success') {
      return {
        title: 'Order complete',
        message: null,
      };
    }
    let errorMessage = null;
    if (errorCode === 'NO_STOCK') {
      errorMessage = 'No stock has been found';
    } else if (errorCode === 'INCORRECT_DETAILS') {
      errorMessage = 'Incorrect details have been entered';
    }

    return {
      title: 'Error page',
      message: errorMessage
    };
  }
};
