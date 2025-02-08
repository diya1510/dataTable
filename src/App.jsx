import { useState } from 'react'
import DataTable from './datatable.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <DataTable/>
    </div>
  )
}

export default App
