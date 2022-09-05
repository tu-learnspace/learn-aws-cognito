export const createDefaultHttpHeader = (options) => ({
  ...options,
  'Content-Type': 'application/json',
});

export const createAuthenticationHeader = ({ access_token }) => {
  return {
    Authorization: `Bearer ${access_token}`,
  };
};

export const createHttpHeaderWithApiKey = (apiKey) => {
  return {
    'x-api-key': apiKey,
  };
};
