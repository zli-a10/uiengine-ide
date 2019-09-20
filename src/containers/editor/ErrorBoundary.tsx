import React, { PureComponent } from "react";
import { Result, Button } from "antd";

class ErrorBoundary extends PureComponent<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  handleRestore = () => {
    location.reload();
  };

  render() {
    const { hasError, error } = this.state;
    if (hasError && error) {
      return (
        <Result
          status="error"
          title="Oops! IDE is meeting some critical issue"
          subTitle={error.stack}
          extra={[
            <Button type="primary" key="console">
              Got it!
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
