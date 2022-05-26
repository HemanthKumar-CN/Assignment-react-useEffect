import React from 'react'

const Todo = () => {
    const [title, setTitle] = React.useState("")
    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    const [page, setPage] = React.useState(1);
    const [flag, setFlag] = React.useState(true)
    // setIsLoading(true)
    React.useEffect(() => {
      
        getTodos(page)
    }, [page])
    
    

    const getTodos=(page=1)=>{
        setIsLoading(true)
        return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks?_page=${page}&_limit=2`)
      .then(res=> res.json())
      .then(res=> {
          console.log(res,res.length)
          if(res.length==0 || res.length==1)
          {
            setFlag(false)
          }
          else
          {
              setFlag(true)
          }
          
          setData(res)
          setIsError(false)
          
      }).catch((err)=> {
          setIsError(true)
      })
      .finally(()=> {
        setIsLoading(false)
      })
    
    }

    const addTodos= (title)=> {
        const payload={
            title,
            status:false 
        }
        setIsLoading(true)
    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
      .then(res=> res.json())
      .then(res=> {
        getTodos()
          
      }).catch((err)=> {
          setIsError(true)
      })
      .finally(()=> {
        setIsLoading(false)
      })
    }

    


  return isLoading ? (<div>...loading</div>) : isError ? ( <div>Something went wrong...</div> ) : (
    <div>
        <h1>Todo</h1>
        <div>
            <input value={title} onChange={(e)=> {
                setTitle(e.target.value)
            }} type="text" placeholder='Add something' />
            <button onClick={()=> {
                addTodos(title)
                setTitle("")
                }}>Add</button>
        </div>
        <div>
            {
                data.map(item=> {
                    return (
                        <div key={item.id}>{`${item.title}-${item.status}`}</div>
                    )
                })
            }
        </div>
        <h2>Page: {page} </h2>
        <button disabled={page===1} onClick={()=> {
            setPage(page-1)
        }}>Prev</button>
        <button disabled={flag==false} onClick={()=> {
            setPage(page+1)
        }}>Next</button>
    </div>
  )
}

export default Todo