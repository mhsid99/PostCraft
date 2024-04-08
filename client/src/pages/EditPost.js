import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://postcraft-tl1k.onrender.com/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  const updatePost = async (ev) => {
    ev.preventDefault();
    try {
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id', id);
      if (files?.[0]) {
        data.set('file', files?.[0]);
      }
      const response = await fetch(`https://postcraft-tl1k.onrender.com/post/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Failed to update post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  const deletePost = async () => {
    try {
      const response = await fetch(`https://postcraft-tl1k.onrender.com/post/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        // Redirect to home page after successful deletion
        window.location.href = 'http://localhost:3000/'; // Navigate to home page
      } else {
        console.error('Failed to delete post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (redirect) {
    return null; // Or redirect to a different route if necessary
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder="Title"
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder="Summary"
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button type="submit" style={{ marginTop: '5px' }}>Update post</button>
      <button type="button" onClick={deletePost} style={{ marginTop: '5px' }}>Delete post</button>
    </form>
  );
};

export default EditPost;

