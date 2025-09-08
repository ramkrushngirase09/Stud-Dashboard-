export default function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <div className="text-center text-muted py-5">No students yet. Click "Add Student" to get started.</div>
  }

  return (
    <div className="row g-3">
      {students.map(s => (
        <div key={s.id} className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <img src={s.profileImage || 'https://via.placeholder.com/600x300?text=Student'} className="card-img-top" alt="profile" />
            <div className="card-body">
              <h5 className="card-title">{s.name}</h5>
              <p className="card-text mb-1"><i className="bi bi-envelope"></i> {s.email}</p>
              <p className="card-text">Course ID: {s.courseId}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(s)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(s.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

