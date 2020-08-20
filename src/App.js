import React, {
  useEffect, useState
} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])
  const [name, setName] = useState('')
  const [repositorio, setRepositorio] = useState('')
  const [techs, setTechs] = useState([])

  function handleRepositories () {
    api.get('/repositories').then(response=>{
      setRepositories(response.data)
    })
  }
 
  async function handleAddRepository(e) {
    e.preventDefault()
    const response = await api.post('/repositories', {
      "title": name,
      "url": repositorio,
      "techs": techs
    })

    setRepositories([...repositories, response.data])
    setName('');setRepositorio('');setTechs([])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoryList = repositories.filter(repository => repository.id !== id)

    setRepositories(repositoryList);
  }

  useEffect(()=>{
    handleRepositories()
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((i,t)=>{
          return <li key={t}>
                    {i.title}

                    <button onClick={() => handleRemoveRepository(i.id)}>
                      Remover
                    </button>
                  </li>
        })}
      </ul>

      <br /><br />
      <form onSubmit={handleAddRepository}>
        <label htmlFor="">Nome:</label>
        <input id="name" name="name" type="text" onChange={(e)=>setName(e.target.value)} value={name} />
        <br /><br />
        <label htmlFor="">Url Repositório:</label>
        <input id="repo" name="repo" type="text" onChange={(e)=>setRepositorio(e.target.value)} value={repositorio} />
        <br /><br />
        <label htmlFor="">Tecnologias:</label> <br />
        <label> Node
        <input id="name" name="name" type="checkbox" onClick={(e)=>setTechs([...techs, e.target.value])} value="NodeJS" />
        </label>
        <label> React
        <input id="name" name="name" type="checkbox" onClick={(e)=>setTechs([...techs, e.target.value])} value="ReactJS"/> </label>
        <label> Vue
        <input id="name" name="name" type="checkbox" onClick={(e)=>setTechs([...techs, e.target.value])} value="Vue" /></label>

        <br />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;
