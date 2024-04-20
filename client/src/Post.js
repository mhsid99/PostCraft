import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from './config';

export default function Post({_id, title, summary, cover, content, createdAt, author}) {

  // Log the constructed image URL
  console.log("Image URL:", `${BACKEND_BASE_URL}/cover`);

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          {/*<img src={`${BACKEND_BASE_URL}/cover`} alt="" />*/}
          <img src={'https://postcraft-tl1k.onrender.com/'+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
