import fetch from 'node-fetch';

/**
 * @param {object} params
 * @param {string} params.code
 * @param {string} params.state
 */
const accessToken = async ({ code, state }) => {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    })
  }).then((resp) => resp.text());
  const urlSearchParams = new URLSearchParams(res);
  const ret = {};
  for (const [key, value] of urlSearchParams) {
    ret[key] = value;
  }
  return ret;
};

export default async (req, res) => {
  const { access_token } = await accessToken(req.query);
  const redirect = decodeURIComponent(req.query.redirect);
  const url = new URL(redirect);
  const searchParams = new URLSearchParams(url.search);
  searchParams.append('token', access_token);
  res.redirect(302, url.toString());
};
