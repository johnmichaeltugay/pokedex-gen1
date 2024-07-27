import { useState } from 'react'
import './styles/App.scss'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0);

  axios.get('https://pokeapi.co/api/v2/pokemon/', {
    params: {
      limit: "??",
    }
  })
    .then((response) => {
      console.log(response.data);
  })
    .catch((error) => {
      console.log(error);
  })

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
       */}
      <div className="w-full h-full">
        Landing Area
        <button> hello </button>
        <a>Link sample</a>
      </div>
    </>
  )
}

export default App
