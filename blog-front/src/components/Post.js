const Post = ({ post, toggleImportance }) => {
	const label = post.important
	? 'make not important' : 'make important'
	return (
		<ul>
			<li>{post.title}</li><button onClick={toggleImportance}>{label}</button>
			<ul>
				<li>{post.content}</li>
			</ul>
		</ul>
	)
}

export default Post