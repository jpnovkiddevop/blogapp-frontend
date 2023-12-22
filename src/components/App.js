import React, {useState, useEffect} from "react";
import ArticlesList from "./ArticlesList";
import Form from "./Form";
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'

export const BlogContext = React.createContext()

function App() {
  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let history = useNavigate()
  

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [token])

  useEffect(() => {
  if (!token['mytoken']) {
    window.location.href ='/'; 
  }
}, [token, history]);
  
  const editButton = (article) => {
    setEditedArticle(article)
  }

  const updatedInformation = (article) => {
    const newArticles = articles.map(myArticle => {
        if(myArticle.id === article.id) {
          return article
        }else {
          return myArticle
        }
    }) 
    setArticles(newArticles)
  }

  const insertedArticle = (article) => {
    const newArticles = [...articles, article]
    setArticles(newArticles)
  }

  const deleteButton = (article) => {
    const newArticles = articles.filter((myArticle) => myArticle.id !== article.id)
    setArticles(newArticles)
  }


  const articleForm = () => {
    setEditedArticle({title:'', description:''})
  }

  const logoutBtn = () => {
    removeToken(['mytoken'])
    setArticles([])
  }

  return (
    <BlogContext.Provider value={{articles, editButton, editedArticle, updatedInformation, insertedArticle, deleteButton}}>
      <div className="container">
        <div className="row">
        <div className="col">
          <h3>Blog App</h3>
          <br /> <br />
        </div>
        <div className="col">
          <button onClick={articleForm} className="btn btn-secondary btn-sm">Insert</button>
        </div>
        <div className="col">
          <button onClick={logoutBtn} className="btn btn-secondary btn-sm">Logout</button>
        </div>
        </div>
        <ArticlesList />
        <hr />
        {editedArticle ? <Form /> : null}

      </div>
    </BlogContext.Provider>
  );
}

export default App;
