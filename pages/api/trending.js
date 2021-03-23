import fetch from 'node-fetch';
import cheerio from 'cheerio';

/**
 * @param {object} params
 * @param {string} [params.language] Language
 * @param {'daily'|'weekly'|'monthly'} [params.since] Date range
 * @param {string} [params.spoken_language_code] Spoken Language
 */
const fetchTrendingList = (params) => {
  let url = 'https://github.com/trending';
  const { language, ...query } = params;
  if (language) {
    url += `/${language}`
  }
  const queryString = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&');
  if (queryString) {
    url += `?${queryString}`;
  }

  return fetch(url)
    .then((data) => {
      return data.text().then((text) => {
        const $ = cheerio.load(text);
        const list = $('.Box .Box-row')
          .get()
          .map(repo => {
            const $repo = $(repo);
            const title = $repo.find('.h3').text().trim();
            const [owner, name] = title.split('/').map(v => v.trim());
            const description = $(($repo.children())[2]).text().trim();
            const language = $repo.find('[itemprop="programmingLanguage"]').text().trim();
            const starCount = $repo.find('[aria-label="star"].octicon.octicon-star').parent().text().trim();
            return {
              owner: {
                login: owner,
                avatar_url: `https://github.com/${owner}.png`
              },
              name,
              description,
              language,
              stargazers_count: starCount
            };
          });
        return list;
      });
    });
};

export default async (req, res) => {
  const resp = await fetchTrendingList(req.query);
  res.statusCode = 200;
  res.json(resp);
}
