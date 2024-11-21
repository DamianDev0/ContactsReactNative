export interface ApiError {
  statusCode: number;
  message: string;
  timestamp?: string;
  path?: string;
}

export const handleApiError = (error: any): ApiError => {
  if (error.response && error.response.data) {
    const {statusCode, message, timestamp, path} = error.response.data;
    return {
      statusCode: statusCode || error.response.status,
      message: message || 'Unknown error occurred',
      timestamp,
      path,
    };
  } else if (error.request) {
    return {statusCode: 0, message: 'Unable to connect to the server'};
  } else {
    return {
      statusCode: 0,
      message: error.message || 'Unexpected error occurred',
    };
  }
};
