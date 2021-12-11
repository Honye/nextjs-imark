import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../service/github.gql';
import styles from '../styles/Movies.style.js';

export const getStaticProps = async () => {
  const query = gql`
    query GetMovies {
      viewer {
        login,
        projectNext(number: 5) {
          title
          description
          items(first: 6) {
            totalCount
            nodes {
              id
              title
              fieldValues(first: 20) {
                totalCount
                nodes {
                  projectField {
                    name
                    settings
                  }
                  value
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data: res } = await client.query({ query });
  const _projects = res.viewer.projectNext.items.nodes;
  const projects = [];
  for (const item of _projects) {
    const project = {};
    project.id = item.id;
    for (const fieldValue of item.fieldValues.nodes) {
      const field = fieldValue.projectField;
      const settings = JSON.parse(field.settings);
      let value = fieldValue.value;
      if (settings && settings.options) {
        value = settings.options.find((option) => option.id === value).name;
      }
      project[fieldValue.projectField.name] = value;
    }
    projects.push(project);
  }

  return {
    props: {
      user: res.viewer.login,
      projects,
    }
  }
};

const Movies = (props) => {
  const { projects } = props;
  return (
    <>
      <Head>
        <title>Movies - iMark</title>
      </Head>
      <div className="page">
        <h1 className="title">{props.user}'s Movies</h1>
        <ul className="movie-list">
          {projects.map((project) => (
            <div className="flip-container" key={project.id}>
              <div className="fliper">
                <img className="front" src={project.Image} referrerPolicy="no-referrer" />
                <div className="dark:bg-gray-700 back movie-item__info">
                  <h3 style={{ marginLeft: '-0.5em' }}>{project.Title}</h3>
                  <meter
                    className="movie-item__rating"
                    value={project.Rating.length}
                    max={10}
                    data-content={project.Rating}
                  >{project.Rating}</meter>
                  <div>{project.Date.substr(0, 10)}</div>
                </div>
              </div>
            </div>
          ))}
        </ul>
        <style jsx>{styles}</style>
      </div>
    </>
  );
};

export default Movies;
