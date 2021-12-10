import Head from 'next/head';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import ArticleMarkdown from '../../components/ArticelMarkdown';
import { gql } from '@apollo/client';
import client from '../../service/github.gql';
import { getIssues } from '../../service/github.server';

const Owner = 'honye';
const Repo = 'notes';

const Post = (props) => {
  const { title, issue } = props;
  const { author, createdAt } = issue;
  return (
    <>
      <Head>
        <title>{title} - iMark</title>
      </Head>
      <NavBar />
      <div className="container mx-auto pt-5 pb-8 font-mono px-4">
        <article>
          <header className="mb-10">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <div className="flex items-center mt-2">
              <Link href={author.url}>
                <a className="inline-flex">
                  <img className="w-8 h-8 rounded-full" src={author.avatarUrl} />
                </a>
              </Link>
              <time className="ml-3 text-gray-500" dateTime={createdAt}>{createdAt.substr(0, 10)}</time>
            </div>
          </header>
          <ArticleMarkdown className="markdown-body">{issue.body}</ArticleMarkdown>
        </article>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const issues = await getIssues({
    owner: Owner,
    repo: Repo,
  }).then((res) => res.json());
  const paths = issues.map((issue) => ({
    params: {
      id: `${issue.number}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const query = gql`
    query GetIssue {
      repository(owner: "${Owner}", name: "${Repo}") {
        issue(number: ${id}) {
          title
          author {
            login
            avatarUrl
            url
          }
          createdAt
          body
        }
      }
    }
  `;
  const { data: res } = await client.query({ query });
  return {
    props: {
      id,
      title: res.repository.issue.title,
      issue: res.repository.issue,
    },
  };
};

export default Post;
