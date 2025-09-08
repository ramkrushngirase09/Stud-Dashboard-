export async function fetchCourses() {
  const res = await fetch('/courses.json')
  if (!res.ok) throw new Error('Failed to fetch courses')
  return res.json()
}

