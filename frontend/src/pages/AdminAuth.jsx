import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

function AdminAuth() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3001/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setToken(data.token)
      login(data, data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="logo">🔐 Admin Portal</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>
          Administrator Access Only
        </p>

        {error && (
          <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            type="email"
            name="email"
            placeholder="Admin Email" 
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input 
            type="password"
            name="password"
            placeholder="Admin Password" 
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Admin Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/auth')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#10b981', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            ← Back to User Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminAuth
