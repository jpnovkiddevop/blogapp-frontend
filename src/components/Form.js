import React, {useContext, useState, useEffect} from 'react'
import { BlogContext } from './App'
import ApiService from './ApiService'
import { useCookies } from 'react-cookie'

function Form() {
  const {editedArticle, updatedInformation, insertedArticle} = useContext(BlogContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [token] = useCookies(['mytoken'])

  useEffect(() => {
    setTitle(editedArticle.title)
    setDescription(editedArticle.description)
  }, [editedArticle])

 const updateArticle = () => {
  ApiService.UpdateArticle(editedArticle.id, {title, description}, token['mytoken'])
  .then(res => updatedInformation(res))
 }
 
 const insertArticle = () => {
  ApiService.InsertArticle({title, description}, token['mytoken'])
  .then(res => insertedArticle(res))
 }

  return (
    <div>
      {editedArticle ? (
        <div className='mb-3'>
          <label htmlFor="title" className='form-label'>Title</label>
          <br />
          <input type="text" id='title' 
          className='form-control'  
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
          <br />
          <label htmlFor="description" className='form-label'>Description</label>
          <br />
          <textarea  id='description' 
          className='form-control' 
          rows="5" value={description}
          onChange={e => setDescription(e.target.value)}></textarea>
          <br /> 
          {editedArticle.id ? <button type='submit' onClick={updateArticle} className='btn btn-success'>Update Article</button>:
        <button type='submit' onClick={insertArticle} className='btn btn-success'>Insert Article</button>}
        </div>
      ): null}
    </div>
  )
}

export default Form
