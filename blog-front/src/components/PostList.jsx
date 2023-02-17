import Post from '../components/Post'

const PostList = ({ postsToShow, toggleImportanceOf, deletePostOf }) => {
	return (
		<ul>
          {postsToShow.map(post =>
            <Post 
            key={post.id} 
            post={post}
            toggleImportance={() => toggleImportanceOf(post.id)} 
            deletePost={() => deletePostOf(post.id)}
            />
            )}
        </ul>
	)
}
export default PostList