import fetch from 'node-fetch';
import cheerio from 'cheerio';

const fetchTrendingList = () => {
  return fetch('https://github.com/trending')
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

export default (req, res) => {
  fetchTrendingList()
    .then((data) => {
      res.statusCode = 200;
      res.json(data);
    });
}
