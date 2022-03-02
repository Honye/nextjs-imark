import Head from 'next/head';
import NavBar from '../../components/NavBar';
import Post from '../../components/Post';
import { searchIssues } from '../../service/github.server';

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

// TODO 分页
export const getStaticProps = async () => {
  const search = await searchIssues({
    q: `repo:${Owner}/${Repo} is:issue is:open`
  }).then((resp) => resp.json());
  const issues = search.items;
  return {
    props: {
      issues,
    },
  };
};

export default Posts;
