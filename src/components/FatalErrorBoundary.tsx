import React, {Component, ErrorInfo, PropsWithChildren} from 'react';

import FatalErrorScreen from './FatalErrorScreen';

type FatalErrorBoundaryState = {
  error: unknown;
};

class FatalErrorBoundary extends Component<
  PropsWithChildren,
  FatalErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  componentDidCatch(error: unknown, _: ErrorInfo) {
    this.setState({error});
  }

  render() {
    return (
      <FatalErrorBoundaryContext.Provider
        value={{
          setFatalError: error => {
            this.setState({error});
          },
        }}>
        {this.state.error ? (
          <FatalErrorScreen error={this.state.error} />
        ) : (
          this.props.children
        )}
      </FatalErrorBoundaryContext.Provider>
    );
  }
}

const FatalErrorBoundaryContext = React.createContext<{
  setFatalError: (error: unknown) => void;
}>({
  setFatalError: () => {
    throw new Error(
      'useFatalErrorBoundary must be used within an FatalErrorBoundary',
    );
  },
});

export function useFatalErrorBoundary() {
  return React.useContext(FatalErrorBoundaryContext);
}

export default FatalErrorBoundary;
