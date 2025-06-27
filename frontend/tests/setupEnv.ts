declare global {
  // Augment the globalThis type to include importMetaEnv
  var importMetaEnv: {
    VITE_API_BASE_URL: string;
  };
}

globalThis.importMetaEnv = {
  VITE_API_BASE_URL: 'https://fake-api.com'
};
