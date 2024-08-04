import React, {FunctionComponent, useMemo} from 'react';

import AlertBox from './AlertBox';

type ErrorBoxProps = {
  error: unknown;
};

const ErrorBox: FunctionComponent<ErrorBoxProps> = ({error}) => {
  const errorMessage = useMemo(() => {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }, [error]);

  return <AlertBox message={errorMessage} theme="error" />;
};

export default ErrorBox;
