import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './components/Post'

import './App.css';

const App = () => {
  const [posts, setPosts] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/posts')
      .then(res => {
        setPosts(res.data)
      })
  }, [])

  const addPost = (event) => {
    event.preventDefault()
    const postObject = {
      title: newTitle,
      content: newContent,
      data: new Date(),
      important: Math.random() > 0.5
    }
    axios
      .post('http://localhost:3001/posts', postObject)
      .then(res => {
        setPosts(posts.concat(res.data))
        setNewTitle('')
        setNewContent('')
        console.log(res)
      })

  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleContentChange = (event) => {
    console.log(event.target.value)
    setNewContent(event.target.value)
  }

  const postsToShow = showAll
    ? posts
    : posts.filter(post => post.important)

  const toggleImportanceOf = (id) => {   
    const url = `http://localhost:3001/posts/${id}`
    const post = posts.find(n => n.id === id)
    const changedPost = { ...post, important: !post.important}

    axios.put(url, changedPost).then(res => {
      setPosts(posts.map(n => n.id !== id ? n : res.data))
    })
  }

    return (
      <div>
        <h1>Posts</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
          </button>
        </div>
        <ul>
          {postsToShow.map(post =>
            <Post 
            key={post.id} 
            post={post}
            toggleImportance={() => toggleImportanceOf(post.id)} 
            />
            )}
        </ul>
        <form onSubmit={addPost}>
          <input type="text" 
          value={newTitle}
          onChange={handleTitleChange}
          />
          <input 
            value={newContent}
            onChange={handleContentChange} 
          />
          <button type="submit">save</button>
        </form>
      </div>
    )
}

export default App;
