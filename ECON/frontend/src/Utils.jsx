

const BACKEND_PORT = 5000; 

export const getBackendURL = () => {
  return `http://${window.location.hostname}:${BACKEND_PORT}`;
};
