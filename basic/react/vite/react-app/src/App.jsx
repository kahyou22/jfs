import { useState } from "react";
// import "./App.css";

function Header({ title }) {
  return (
    <header>
      <h1>
        <a href="/">{title}</a>
      </h1>
    </header>
  );
}

function Nav({ topics, handleChange }) {
  return (
    <nav>
      <ol>
        {topics.map((topic) => (
          <li key={topic.id}>
            <a
              href={`/read/${topic.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleChange(topic.id);
              }}
            >
              {topic.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];
  const [pageId, setPageId] = useState(topics[0].id);

  function handleChange(id) {
    setPageId(id);
  }

  return (
    <div>
      <Header title="WEB" />
      <Nav topics={topics} handleChange={handleChange} />
      {topics.map((topic) => {
        if (pageId != topic.id) return;
        return <Article title={topic.title} body={topic.body} />;
      })}
      {/* <Article
        title={topics[pageId - 1].title}
        body={topics[pageId - 1].body}
      /> */}
    </div>
  );
}

export default App;
