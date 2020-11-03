import React from 'react';

export const showError = (error) => (
  <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
    {error}
  </div>
);

export const showSuccess = (success) => (
  <div
    className="alert alert-success"
    style={{ display: success ? '' : 'none' }}
  >
    Success
  </div>
  );

export const showLoading = (loading) => (
  <div
    className="alert alert-info"
    style={{ display: loading ? '' : 'none' }}
  >
    Loading...
  </div>
);
