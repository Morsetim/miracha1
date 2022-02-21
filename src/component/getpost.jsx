import "./post.css";

const Post = ({id, title, body, onEdit, onDelete}) => {
    return(
        <div className="Gapp">
              <div className='post'>
                <div className="post-n-body">
                <span className="post-title">{ title }</span>
                <span className="post-body">{body}</span>
                </div>
                <div className="btn-edit-del">
                    <button className="btn-edit" onClick={() => onEdit({id, title, body} )}>Edit</button>
                    <button className="btn-del"  onClick={() =>  onDelete(id)}>Delete</button>
                </div>
              </div>
        </div>
    );
};

export default Post;