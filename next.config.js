module.exports = {
  async rewrites () {
    return [
      { source: '/api', destination: '/apis' },
      { source: '/api/trending/:language', destination: '/api/trending' }
    ];
  }
}
