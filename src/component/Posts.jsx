import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './../App.css';
import Post from './getpost';

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [post, setPost] = useState({title:"", body:""});
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  const handleOnSubmit = (e) => { e.preventDefault(); };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setPost((prevState) => ({...prevState, [name]: value }));
  };
 
  const resetFormField = () => {
    setPost((prevState) => ({...prevState, title:"", body:"" }));
    setEditMode(false)
  }

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(baseUrl, {
        params: {
          _limit: 7
        }
      })
      setPosts(res.data)
    };
    getPost();
  }, []);

  const onDelete = (id) =>{
    const newData = posts.filter(post => post.id !== id)
    setPosts(newData)
  }
  
  const onAddPost = (e) => {
    e.preventDefault();
    if(post.title === '' || post.body === '') return;
    
    if(editMode){
      const newData = posts.map(p => {
        if(p.id === post.id){
          p = post
        }
        return p
      })
      setPosts(newData)
    } else {
      axios.post(baseUrl, post).then((res)=>{ 
          // update the id for uniqueness
          res.data.id =  res.data.id + posts.length;
        setPosts([...posts, res.data]) 
      });
    }
    resetFormField();
  }

  const onEdit = (data) => {
      setPost(data);
      setEditMode(true)
  }

  const blue ={
    backgroundColor: 'blue',
    border: 'none',
    color: 'white',
    padding: '10px 22px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderadius: '2px',
    width: '100px',
    marginBottom: '20px'
};
  const gray ={
      backgroundColor: 'gray',
      border: 'none;',
      color: 'white',
      padding: '10px 22px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderadius: '2px',
      width: '100px',
      marginBottom: '20px'
  };

  return (
    <div className="App">
      <form className="form-input" onSubmit={onAddPost}>
          <div className="first-div">
            <h3>Create Post</h3>
            <p className='task-two' onClick={()=> navigate('/actors/get-awards')}>Task 2 &#8594;</p>
          </div>
            <input className='input' type="text" onChange={handleInputChange} placeholder="title" name="title" value={post.title}/>
            <textarea  className='text-area' type="text" onChange={handleInputChange} placeholder="create a post..." name="body"  value={post.body}/>
            <button   style={editMode ? gray : blue }
            onSubmit={handleOnSubmit}>{editMode ? 'Update' : 'Add'}</button>
        </form>
      {posts.map((post) =>
      <Post
        id={post.id}
        key={post.id}
        title={post.title}
        body={post.body}
        onEdit={onEdit}
        onDelete={onDelete}
      />      
      )}
    </div>
  );
}

export default App;
