import { Link } from 'react-router-dom';

export function LandingPage() {
  const apps = [
    { title: 'Exercise Library', path: '/exercises', icon: '🏋️‍♂️', color: '#646cff' },
    { title: 'User Manager', path: '/users', icon: '👥', color: '#2ecc71' }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Enterprise Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
        {apps.map(app => (
          <Link key={app.path} to={app.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: `2px solid ${app.color}`, padding: '20px', borderRadius: '12px', width: '200px' }}>
              <div style={{ fontSize: '3rem' }}>{app.icon}</div>
              <h3>{app.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
