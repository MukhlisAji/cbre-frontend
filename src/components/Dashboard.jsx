import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <p>This is Home</p> <Link to="/data-entry-portal">go to Data Entry?</Link>

    </div>
  )
}
