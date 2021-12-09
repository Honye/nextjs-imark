import nodeFetch from 'node-fetch';

const fetch = (...args) => {
  const [url = '', options = {} ] = args;
  const { headers, otherOptions } = options;
  return nodeFetch(
    new URL(url, 'https://api.github.com').href,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        accept: 'application/vnd.github.v3+json',
        ...headers,
      },
      ...otherOptions,
    },
  );
};

export const getIssues = async (params) => {
  const { owner, repo } = params;
  return fetch(`/repos/${owner}/${repo}/issues`, {
    method: 'GET',
  });
};
