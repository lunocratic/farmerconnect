import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getToken } from '../utils/api'
import '../styles/AdminDashboard.css'

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    recentUsers: 0
  })
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    // Check if user is admin
    if (!user || !user.isAdmin) {
      navigate('/auth')
      return
    }
    fetchUsers()
  }, [user, navigate])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = getToken()
      
      const response = await fetch('http://localhost:3001/api/auth/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users')
      }

      setUsers(data.users)
      
      // Calculate stats
      const totalAdmins = data.users.filter(u => u.isAdmin).length
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const recentUsers = data.users.filter(u => new Date(u.createdAt) > thirtyDaysAgo).length

      setStats({
        totalUsers: data.count,
        totalAdmins,
        recentUsers
      })
    } catch (err) {
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const token = getToken()
      const response = await fetch(`http://localhost:3001/api/auth/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user')
      }

      // Refresh users list
      fetchUsers()
    } catch (err) {
      alert(err.message || 'Failed to delete user')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>👨‍💼 Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔐</div>
          <div className="stat-info">
            <h3>{stats.totalAdmins}</h3>
            <p>Administrators</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>{stats.recentUsers}</h3>
            <p>New (30 days)</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search by name, email, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Users Table */}
      <div className="users-section">
        <h2>All Users ({filteredUsers.length})</h2>
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Role</th>
                <th>Posts</th>
                <th>Followers</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} />
                        ) : (
                          <span>{u.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.location || 'N/A'}</td>
                  <td>
                    {u.isAdmin ? (
                      <span className="badge admin">Admin</span>
                    ) : (
                      <span className="badge user">User</span>
                    )}
                  </td>
                  <td>{u.postsCount}</td>
                  <td>{u.followers?.length || 0}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {!u.isAdmin && (
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="no-users">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
