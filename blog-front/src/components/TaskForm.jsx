const TaskForm = ({ addPost, newTitle, handleTitleChange, newContent, handleContentChange }) => {
	return (
		<form onSubmit={addPost}>
          <input type="text" 
          value={newTitle}
          onChange={handleTitleChange}
          />
          <input 
            value={newContent}
            onChange={handleContentChange} 
          />
          <button type="submit">Save</button>
        </form>
	)
}

export default TaskForm