import React from "react";

/**
 * ErrorBoundary component that catches and displays errors.
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  handleClearData() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops! An error occurred.</h1>
          <p>To fix it, try clearing your local files and then refresh the page.</p>
          <div>{this.state.error?.message}</div>
          <button onClick={() => location.reload()}>Refresh Page</button>
          <button onClick={this.handleClearData}>Clear Data</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
