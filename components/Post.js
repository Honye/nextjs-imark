import Link from 'next/link';

const Post = (props) => {
  const { title, created_at, number, labels, milestone, repo } = props;
  const img = `https://acg.toubiec.cn/random.php?i=${number}`

  return (
    <>
      <article className="post">
        <div className="mb-4 image">
          <Link href={`/posts/${number}`}>
            <a><img className="img" src={img} /></a>
          </Link>
        </div>
        <div className="p-4">
          <div className="flex mb-1">
            <time className="font-mono date" dateTime={created_at}>{created_at.substr(0, 10)}</time>
            {milestone &&
              <Link href={`https://github.com/${repo.full_name}/milestone/${milestone.number}`}>
                <a className="font-mono milestone">{milestone.title}</a>
              </Link>
            }
          </div>
          <h3 className="title hover:text-yellow-500">
            <Link href={`/posts/${number}`}><a>{title}</a></Link>
          </h3>
          <ul className="label-list">
            {labels.map((label) => (
              <li
                key={label.id}
                className="label"
                style={{
                  '--label-r': parseInt(label.color.substr(0, 2), 16),
                  '--label-g': parseInt(label.color.substr(2, 2), 16),
                  '--label-b': parseInt(label.color.substr(4, 2), 16),
                }}
              >
                <Link
                  href={`https://github.com/${repo.full_name}/issues?q=${encodeURIComponent(`is:issue is:open label:"${label.name}"`)}`}
                ><a>{label.name}</a></Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <style jsx>{`
        .image {
          width: 100%;
          padding-bottom: 50%;
          position: relative;
        }
        .img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .date,
        .milestone {
          color: #959da5;
        }
        .date + .milestone::before {
          content: "";
          width: 1.25rem;
          height: 1px;
          margin: 0 0.5em;
          background-color: #d1d5da;
          display: inline-block;
          vertical-align: middle;
        }
        .title {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .label-list {
          margin-top: 1rem;
          display: flex;
        }
        .label {
          --lightness-threshold: 0.453;
          --perceived-lightness: calc(((var(--label-r) * 0.2126) + (var(--label-g) * 0.7152) + (var(--label-b) * 0.0722)) / 255);
          --lightness-switch: max(0, min(calc((var(--perceived-lightness) - var(--lightness-threshold)) * -1000), 1));
          background-color: rgb(var(--label-r), var(--label-g), var(--label-b));
          color: hsl(0, 0%, calc(var(--lightness-switch) * 100%));
          font-size: 0.75rem;
          line-height: 1.5;
          padding: 0 0.5em;
          border-radius: 0.75em;
          font-weight: 500;
        }
        .label + .label {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default Post;
