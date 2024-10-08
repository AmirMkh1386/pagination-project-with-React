import {useEffect, useState} from "react";

function App() {

  const [todos, setTodos] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [paginatedTodos, setPaginatedTodo] = useState([])

  let pageSize = 10
  let pagesNumbers

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(datas => {
          setTodos(datas)
            let endIndex = pageSize * currentPage
            let startIndex = endIndex - pageSize
            let allShownTodos = datas.slice(startIndex, endIndex)
            setPaginatedTodo(allShownTodos)
        })
  }, [])


    useEffect(() => {
      let endIndex = pageSize * currentPage
      let startIndex = endIndex - pageSize
      let allShownTodos = todos.slice(startIndex, endIndex)
      setPaginatedTodo(allShownTodos)
    }, [currentPage])

    const changePaginate = (newPage) => {
      setCurrentpage(newPage)
    }

    const pagesCount = Math.ceil(todos.length / pageSize)
    pagesNumbers = Array.from(Array(pagesCount).keys())
  return (
      <div>
        {
          !todos ? 'loading' : (
              <table className='table'>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>User Id</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {paginatedTodos .map(todo => (
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.userId}</td>
                      <td>{todo.title}</td>
                      <td>
                        <p className={todo.completed ? "btn btn-success" : "btn btn-danger"}>
                          {todo.completed ? "Completed" : "Pending"}
                        </p>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )
        }
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {pagesNumbers.map((pageNumber) => (
                <li className={[pageNumber + 1 === currentPage ? 'page-item active' : 'page-item']} onClick={() => changePaginate(pageNumber + 1)} key={pageNumber + 1}>
                  <span className="page-link">{pageNumber + 1}</span>
                </li>
            ))}
          </ul>
        </nav>
      </div>
  );
}

export default App;
