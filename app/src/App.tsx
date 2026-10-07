import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { CheckinPage } from './pages/CheckinPage'
import { FilaPage } from './pages/FilaPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 px-8 py-10">
          <Routes>
            <Route path="/" element={<CheckinPage />} />
            <Route path="/fila" element={<FilaPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
