const Post = ({ post, toggleImportance, deletePost }) => {
	const label = post.important
	? 'make not important' : 'make important'
	return (
		<ul>
			<li>{post.title}</li>
			<button onClick={toggleImportance}>{label}</button>
			<button onClick={deletePost}>Delete Post</button>
			<ul>
				<li>{post.content}</li>
			</ul>
		</ul>
	)
}

export default Post