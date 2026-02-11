import { Outlet, Link, useNavigate } from 'react-router-dom';

export function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#222', color: 'white' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', fontWeight: 'bold' }}>🏠 Home</Link>
          <Link to="/exercises" style={{ color: 'white' }}>Exercises</Link>
          <Link to="/users" style={{ color: 'white' }}>Users</Link>
        </nav>
        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}
