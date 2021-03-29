import { useRouter } from 'next/router';
import Head from 'next/head';
import qs from 'querystring';

export default function Tending (props) {
  const router = useRouter();
  const language = router.query.language || '';
  const range = ({
    daily: 'Today',
    weekly: 'this week',
    monthly: 'this month'
  })[router.query.since || 'daily'];

  return (
    <div>
      <Head>
        <title>Trending {language ? language + ' ' : ''}repositories on GitHub {range}</title>
      </Head>
      <main>
        <ul>
        {
          props.repositories.map((repo, index) => (
            <li key={index} className="border-b px-8 py-4">
              <div className="flex items-center">
                <a className="inline-flex items-center" href={`https://github.com/${repo.owner.login}`}>
                  <img className="w-8 h-8 rounded-full" src={repo.owner.avatar_url} />
                  <div className="mx-4">{repo.owner.login}</div>
                </a>
              </div>
              <a className="font-medium my-1 mt-2 text-blue-500 inline-block"
                href={`https://github.com/${repo.owner.login}/${repo.name}`}
              >{repo.name}</a>
              <p className="my-1">{repo.description}</p>
              <div className="flex items-center">
                <span>{repo.language}</span>
                <span className="ml-8 flex items-center"><span className="text-xl font-medium mr-1">✩</span>{repo.stargazers_count}</span>
              </div>
            </li>
          ))
        }
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps (context) {
  const { req, query } = context;
  let protocol = 'http';
  if (req.headers.referer) {
    [protocol = 'https'] = req.headers.referer.split('://');
  }
  const { language, ...rest } = query;
  const queryString = qs.stringify(rest);
  const url = `${protocol}://${req.headers.host}/api/trending`
    + (language ? `/${language}` : '')
    + (queryString ? `?${queryString}` : '');
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      repositories: data
    }
  };
}
