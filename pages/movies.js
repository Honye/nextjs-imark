import { gql } from '@apollo/client';
import client from '../service/github.gql';

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
    <div className="page">
      <h1 className="title">{props.user}'s Movies</h1>
      <ul className="movie-list">
        {projects.map((project) => (
          <div className="flip-container" key={project.id}>
            <div className="fliper">
              <img className="front" src={project.Image} referrerPolicy="no-referrer" />
              <div className="back movie-item__info">
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
      <style jsx>{`
        .page {
          margin: 0 auto;
          max-width: 1000px;
          padding: 2rem;
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .movie-list {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
        }

        .flip-container {
          perspective: 1000px;
        }
        .fliper {
          border-radius: 10px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          position: relative;
          transform-style: preserve-3d;
          transition: 0.6s;
        }
        .flip-container:hover .fliper {
          transform: rotateY(180deg);
        }
        .front, .back {
          width: 100%;
          border-radius: inherit;
          overflow: hidden;
          backface-visibility: hidden;
        }
        .front {
          min-height: 195px;
          position: relative;
          z-index: 2;
        }
        .back {
          position: absolute;
          top: 0;
          left: 0;
          transform: rotateY(180deg);
          background-color: #fff;
        }

        .movie-item__info {
          font-size: 12px;
          line-height: 1.5;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
          row-gap: 10px;
          padding: 10px;
        }
        .movie-item__rating {
          min-height: 18px;
        }
        .movie-item__rating::-webkit-meter-inner-element {
          display: none;
        }
        .movie-item__rating::before {
          content: attr(data-content);
          line-height: inherit;
        }
      `}</style>
    </div>
  );
};

export default Movies;
