import { Link } from "react-router-dom";
import pencilIcon from "../assets/icons/pencil.png";
import deleteIcon from "../assets/icons/delete-icon.png";
import commentIcon from "../assets/icons/chat.png";

const Post = ({ author, title, content, dateCreated }) => {
  return (
    <article className="post-card">
      <div className="post-header">
        <h4 className="title">{title}</h4>
        <span className="date-created">{dateCreated}</span>
      </div>
      <div className="post-body">
        <p className="content">{content}</p>
      </div>
      <div className="post-footer">
        <span className="post-info">{author}</span>
        <span className="post-actions">
          <Link to={"posts/"}>
            <img src={commentIcon} alt="comment icon" className="icon" />
          </Link>
          <Link to={"posts/"}>
            <img src={pencilIcon} alt="edit icon" className="icon" />
          </Link>
          <form action="post/" method="POST">
            <button type="submit" className="btn btn-delete">
              <img src={deleteIcon} alt="delete icon" className="icon" />
            </button>
          </form>
        </span>
      </div>
    </article>
  );
};

export default Post;
