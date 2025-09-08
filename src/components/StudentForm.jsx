import { useEffect, useMemo, useState } from 'react'
import { fetchCourses } from '../api/courses'

export default function StudentForm({ onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [courseId, setCourseId] = useState(initial?.courseId || '')
  const [profileImage, setProfileImage] = useState(initial?.profileImage || '')

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const data = await fetchCourses()
        setCourses(data)
      } catch (e) {
        setError('Could not load courses')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !email || !courseId) {
      setError('Please fill required fields')
      return
    }
    if (!emailValid) {
      setError('Enter a valid email')
      return
    }
    onSubmit({ name, email, courseId: Number(courseId), profileImage })
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Name*</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email*</label>
        <input type="email" className={`form-control ${email && !emailValid ? 'is-invalid' : ''}`} value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Enrolled Course*</label>
        <select className="form-select" value={courseId} onChange={e => setCourseId(e.target.value)} required disabled={loading}>
          <option value="" disabled>{loading ? 'Loading courses…' : 'Select a course'}</option>
          {courses.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Profile Image URL</label>
        <input className="form-control" value={profileImage} onChange={e => setProfileImage(e.target.value)} placeholder="https://..." />
      </div>
      {profileImage && (
        <div className="col-12">
          <img src={profileImage} alt="preview" className="rounded shadow" style={{ maxHeight: 120 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </div>
      )}
      {error && (
        <div className="col-12"><div className="alert alert-danger">{error}</div></div>
      )}
      <div className="col-12">
        <button className="btn btn-primary px-4" type="submit">{initial ? 'Update' : 'Add'} Student</button>
      </div>
    </form>
  )
}

