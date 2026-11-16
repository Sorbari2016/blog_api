import Greeting from "./Greeting";
import { format } from "date-fns";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import Post from "./Post";

const Main = () => {
  const posts = [
    {
      id: 1,
      author: "Clematins",
      title: "Premier League Prediction",
      content: "Arsenal might win the premier league this season",
      createdAt: "2026-11-12",
      published: true,
    },
  ];
  const recentlyPublishedPosts = posts.filter((post) => post.published);
  const date = new Date();
  const formattedDate = format(date, "EEEE do MMMM, yyyy");
  return (
    <main id="main-content">
      <div className="dashboard-header">
        <div className="greeting">
          <Greeting />
        </div>
        <div className="date">
          <p>{formattedDate}</p>
        </div>
      </div>
      <section className="concise-posts">
        {posts.map((post) => (
          <PostCard key={post.id} title={post.title} />
        ))}
      </section>
      <section className="main-cta">
        <h2>Ready to write some stories today? </h2>
        <button className="btn btn-create" type="button">
          <Link to={"posts"}>Create a post</Link>
        </button>
      </section>
      <section className="posts-grid">
        <h2>Recently published posts</h2>
        {recentlyPublishedPosts.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            title={post.title}
            content={post.content}
            dateCreated={post.createdAt}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
