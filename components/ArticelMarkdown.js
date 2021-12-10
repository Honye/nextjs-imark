import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const ArticleMarkdown = ({ className, children }) => {
  return (
    <ReactMarkdown
      className={className}
      rehypePlugins={[gfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ node, ...props }) => {
          return <img referrerPolicy="no-referrer" {...props} />
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              style={vs}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>{children}</code>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default ArticleMarkdown;
