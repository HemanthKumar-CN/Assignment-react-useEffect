import React from 'react'

const Todos = () => {

    const [data, setData] = React.useState([])
  const [value, setValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {

    getTodos(page)

  }, [page])





  const getTodos = (page) => {
    setIsLoading(true)
    return fetch(`http://localhost:8080/Chapters?_page=${page}&_limit=2`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setData(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=> {
        setIsLoading(false)
      })

  }

  const addTodos=(value)=> {
    const payload={
      value,
      status:false
    }
    setIsLoading(true)
    return fetch(`http://localhost:8080/Chapters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res=> res.json())
    .then(res=> {
      getTodos()
    })
    .catch((err)=> {
        
    })
    .finally(()=> {
        setIsLoading(false)
    })
  }

  return isLoading ? (<div>...loading</div>) : (
    <div>
        <h1>Todo</h1>
      <input type="text" placeholder="Add something" value={value} onChange={(e)=> {
        setValue(e.target.value)
      }} />
      <button onClick={()=> {
        addTodos(value)
        setValue("")
      }}>Save</button>

    
      <div>
        {
          data.map(item => {
            return  (
              <div key={item.id}>{item.value}</div>
            )
          })
        }
      </div>
      <h2>Page: {page}</h2>
      <button disabled={page===1} onClick={()=> setPage(page-1)}>Prev</button>
      <button onClick={()=> setPage(page+1)}>Next</button>
    </div>
  )
}

export default Todos