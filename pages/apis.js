import Head from 'next/head';
import styles from '../styles/Apis.module.css';

export default function API () {
  return (
    <div className={styles.container}>
      <Head>
        <title>API Document | Honyex</title>
      </Head>
      <main>
        <h1>API Document</h1>
        <div className="section">
          <div>
            <h3 id="">
              <a href="#">List GitHub trending repositories</a>
            </h3>
          </div>
          <pre>
            <code>
              <span className={styles.bgBlue}>get</span>
              &nbsp;/api/trending
            </code>
          </pre>
          <div>
            <h4>
              <a href="#">Parameters</a>
            </h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>In</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>language</code>
                  </td>
                  <td>string</td>
                  <td>path</td>
                  <td>
                    <p>Programming language</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>since</code>
                  </td>
                  <td>string</td>
                  <td>query</td>
                  <td>
                    <p>Can be one of <code>daily</code>, <code>weekly</code>, <code>monthly</code></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>spoken_language_code</code>
                  </td>
                  <td>string</td>
                  <td>query</td>
                  <td>
                    <p>Spoken language</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <h4>
              <a href="#">Code samples</a>
            </h4>
            <h5>Shell</h5>
            <pre>
              <code>
                curl \
                  https://honyex/vercel.app/api/trending
              </code>
            </pre>
            <h4>Default response</h4>
            <pre>
              <code>Status: 200 OK</code>
            </pre>
            <div>
              <pre>
                <code>--</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
