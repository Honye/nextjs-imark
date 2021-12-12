import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import { getIssues } from '../../service/github.server';

const Owner = 'honye';
const Repo = 'notes';

const Posts = (props) => {
  const { issues } = props;
  return (
    <>
      <Head>
        <title>Posts - iMark</title>
        <meta name="description" content="Posts powered by GitHub Issues" />
      </Head>
      <NavBar />
      <ul className="container mx-auto p-6 post-list">
        {issues.map((issue) => (
          <li key={issue.id} className="shadow-lg rounded-lg overflow-hidden post-item">
            <Post {...issue} repo={{ full_name: `${Owner}/${Repo}` }} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .post-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-gap: 2rem;
        }
        .post-item {
          background: var(--color-neutral-subtle);
        }
      `}</style>
    </>
  );
};

export const getStaticProps = async () => {
  const issues = await getIssues({
    owner: Owner,
    repo: Repo,
  }).then((resp) => resp.json());
  return {
    props: {
      issues,
    },
  };
};

export default Posts;
