import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'

function Home({ students, setStudents }) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(null)

  function onDelete(studentId) {
    setStudents(prev => prev.filter(s => s.id !== studentId))
  }

  function updateStudent(updated) {
    setStudents(prev => prev.map(s => (s.id === editing.id ? { ...s, ...updated } : s)))
    setEditing(null)
    navigate('/')
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Students</h2>
        <button className="btn btn-success" onClick={() => navigate('/add')}>Add Student</button>
      </div>
      <StudentList students={students} onEdit={(s) => { setEditing(s) }} onDelete={onDelete} />

      {editing && (
        <div className="card p-3 shadow-sm mt-4">
          <h4 className="mb-3">Edit Student</h4>
          <StudentForm onSubmit={updateStudent} initial={editing} />
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [students, setStudents] = useState([])
  const [tip, setTip] = useState('Loading tip…')

  useEffect(() => {
    setTip('Preparing tips…')
    setTimeout(async () => {
      await new Promise(r => setTimeout(r, 300))
      setTip('Pro tip: Async tasks run after the current call stack (event loop)!')
    }, 500)
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-light">
        <div className="container">
          <div className="alert alert-info mt-3">{tip}</div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home students={students} setStudents={setStudents} />} />
        <Route path="/add" element={<AddPage setStudents={setStudents} />} />
        <Route path="/edit" element={<div className="container py-4"><div className="alert alert-warning">Editing is inline on Home. Go back to Home to edit.</div></div>} />
      </Routes>
    </BrowserRouter>
  )
}

function AddPage({ setStudents }) {
  const navigate = useNavigate()
  return (
    <div className="container py-4">
      <div className="card p-3 shadow-sm">
        <h3 className="mb-3">Add Student</h3>
        <StudentForm onSubmit={(data) => {
          setStudents(prev => [{ id: Date.now(), ...data }, ...prev])
          navigate('/')
        }} />
      </div>
    </div>
  )
}
