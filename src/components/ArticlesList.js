import React , {useContext} from 'react'
import { BlogContext } from './App'
import ApiService from './ApiService'
import { useCookies } from 'react-cookie'

function ArticlesList() {
    const {articles, editButton, deleteButton} = useContext(BlogContext)
     const [token] = useCookies(['mytoken'])

    const editBtn = (article) => {
        editButton(article) 
    }

    const deleteBtn = (article) => {
      ApiService.DeleteArticle(article.id, token['mytoken'])
      .then(() => deleteButton(article))
      .catch(error => console.log(error))

    }



  return (
    <div>
    {console.log(articles)}
        {articles && articles.map((article) => {
        return (
          <div key={article.id}>

             <h2 >{article.title}</h2>
             <p>{article.description}</p>

             <div className="row">
                <div className="col-md-1">
                    <button className='btn btn-secondary' onClick={() => editBtn(article)}>Update</button>
                </div>
                <div className="col">
                    <button className='btn btn-danger' onClick={() => deleteBtn(article)}>Delete</button>
                </div>              
             </div>
            <hr />
          </div>
          
        
        )
      })}
    </div>
  )
}

export default ArticlesList
