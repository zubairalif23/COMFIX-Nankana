import React from 'react';

/*
  Without this, any uncaught error thrown during render (for example,
  from the Leaflet map on Report Issue / Issue Details) causes React
  to silently unmount the entire app, leaving a blank white screen
  until the user manually refreshes. This boundary catches that,
  logs the real error to the console for debugging, and shows a
  recoverable fallback instead.
*/
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('COMFIX crashed:', error, info?.componentStack);
  }

  handleReload = () => {
    // Reset local state, then reload to guarantee a clean app instance.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              This page hit an unexpected error. Reloading usually fixes it.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
