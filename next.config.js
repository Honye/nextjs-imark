module.exports = {
  async rewrites() {
    return [
      { source: '/api', destination: '/apis' },
      { source: '/api/trending/:language', destination: '/api/trending' },
      { source: '/api/github/:user', destination: '/api/github' },
      { source: '/trending/:language', destination: '/trending' },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: false,
      }
    ];
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}
