import Head from "next/head";
import { gql } from '@apollo/client';
import client from '../../service/github.gql';
import { getIssues } from '../../service/github.server';

const Owner = 'honye';
const Repo = 'notes';

const Post = (props) => {
  const { title } = props;
  return (
    <>
      <Head>
        <title>{title} - iMark</title>
      </Head>
      <h1 className="text-3xl font-semibold font-mono">{title}</h1>
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
        }
      }
    }
  `;
  const { data: res } = await client.query({ query });
  return {
    props: {
      id,
      title: res.repository.issue.title,
    },
  };
};

export default Post;
