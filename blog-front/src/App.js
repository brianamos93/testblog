import { useState, useEffect } from 'react'
import PostList from './components/PostList'
import TaskForm from './components/TaskForm'

import postService from './services/posts'

import './App.css';

const App = () => {
  const [posts, setPosts] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    postService
    .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  }, [])

  const addPost = (event) => {
    event.preventDefault()
    const postObject = {
      title: newTitle,
      content: newContent,
      data: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    postService
      .create(postObject)
      .then(returnedPost => {
        setPosts(posts.concat(returnedPost))
        setNewTitle('')
        setNewContent('')
      })

  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleContentChange = (event) => {
    setNewContent(event.target.value)
  }

  const postsToShow = showAll
    ? posts
    : posts.filter(post => post.important)

  const toggleImportanceOf = (id) => {   
    const post = posts.find(n => n.id === id)
    const changedPost = { ...post, important: !post.important}

    postService
      .update(id, changedPost).then(returnedPost => {
        setPosts(posts.map(post => post.id !== id ? post : returnedPost))
      })
      .catch(error => {
        alert(
          `the post '${post.title}' was already deleted from the server`
        )
        setPosts(posts.filter(n => n.id !== id))
      })
  }



  const deletePostOf = (id) => {
    const post = posts.find(n => n.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${post.title}?`)

    if (confirmDelete) {
      postService
      .deletePost(id).then(returnedPost => {
        posts.map(post => post.id !== id ? post : returnedPost)
      })
      setPosts(posts.filter(post => post.id !== id))
    }
  }

    return (
      <div>
        <h1>Posts</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
          </button>
        </div>
        <PostList
          postsToShow={postsToShow}
          toggleImportanceOf={toggleImportanceOf}
          deletePostOf={deletePostOf} 
          />
        <TaskForm
        addPost={addPost} 
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newContent={newContent}
        handleContentChange={handleContentChange} 
        />
      </div>
    )
}

export default App;
