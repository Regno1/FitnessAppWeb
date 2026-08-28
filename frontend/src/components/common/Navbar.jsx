// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, selectIsLoggedIn } from '../../store/authslice';
import {
  LayoutDashboard, Activity, PlusCircle, Sparkles,
  LogOut, Menu, X, Zap, ChevronRight,
} from 'lucide-react';

const NAV_LINKS = [
  { to: '/dashboard',       label: 'Dashboard',    Icon: LayoutDashboard },
  { to: '/activities',      label: 'Activities',   Icon: Activity },
  { to: '/activities/log',  label: 'Log Activity', Icon: PlusCircle },
  { to: '/recommendations', label: 'AI Insights',  Icon: Sparkles },
];

const IPHONE_BLUE = '#3E5BE8';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setAvatarOpen(false);
  };

  const userName = user?.firstName || user?.email?.split('@')[0] || 'User';
  const initials = userName.slice(0, 2).toUpperCase();

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 0.9rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: isActive ? '#000000' : '#666666',
    background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
    border: isActive ? '1px solid rgba(0,0,0,0.12)' : '1px solid transparent',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  });

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 'var(--navbar-height)',
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #ebebeb',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1200, width: '100%', margin: '0 auto',
          padding: '0 1.5rem', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        }}>
          {/* Logo */}
          <NavLink to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: IPHONE_BLUE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 14px rgba(62, 91, 232, 0.35)`,
            }}>
              <Zap size={18} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: IPHONE_BLUE, letterSpacing: '-0.02em' }}>
              FitTrack
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1, justifyContent: 'center' }}
              className="desktop-nav">
              {NAV_LINKS.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} style={navLinkStyle}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.style.background.includes('0.06')) {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                      e.currentTarget.style.color = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.style.background.includes('0.06')) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#666666';
                    }
                  }}
                >
                  <Icon size={15} strokeWidth={2} />
                  {label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {isLoggedIn ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  aria-label="User menu"
                  style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: '#000000',
                    border: '2px solid rgba(0,0,0,0.15)',
                    color: '#ffffff', fontWeight: 700, fontSize: '0.8rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {initials}
                </button>

                {avatarOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setAvatarOpen(false)} />
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: 240,
                      background: '#ffffff', border: '1px solid #e8e8e8',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                      zIndex: 100, overflow: 'hidden',
                      animation: 'fadeInScale 0.2s ease forwards',
                    }}>
                      <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                        <div style={{ fontWeight: 600, color: '#0a0a0a', fontSize: '0.9rem' }}>{userName}</div>
                        <div style={{ color: '#7a7a7a', fontSize: '0.78rem', marginTop: 2 }}>{user?.email}</div>
                      </div>
                      {NAV_LINKS.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} onClick={() => setAvatarOpen(false)} style={{ textDecoration: 'none' }}>
                          <div style={{
                            padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
                            color: '#4a4a4a', fontSize: '0.875rem', transition: 'all var(--transition-fast)',
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#000000'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4a4a4a'; }}
                          >
                            <Icon size={15} strokeWidth={2} /> {label}
                          </div>
                        </NavLink>
                      ))}
                      <div style={{ borderTop: '1px solid #f0f0f0', padding: '0.5rem' }}>
                        <button onClick={handleLogout} style={{
                          width: '100%', padding: '0.6rem 0.75rem',
                          background: '#f7f7f7', border: '1px solid #e8e8e8',
                          borderRadius: 'var(--radius-md)', color: '#333333',
                          fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
                          cursor: 'pointer', transition: 'all var(--transition-fast)',
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = '#ffffff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#333333'; }}
                        >
                          <LogOut size={14} strokeWidth={2} /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <NavLink to="/login" style={{
                  background: 'transparent', color: '#4a4a4a',
                  padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
                  fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
                  border: '1px solid #e8e8e8', transition: 'all var(--transition-fast)',
                }}>Log In</NavLink>
                <NavLink to="/register" style={{
                  background: '#000000', color: '#ffffff',
                  padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)',
                  fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}>Get Started</NavLink>
              </div>
            )}

            {/* Mobile hamburger */}
            {isLoggedIn && (
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="mobile-menu-btn"
                style={{
                  background: '#f7f7f7', border: '1px solid #e8e8e8',
                  borderRadius: 'var(--radius-sm)', color: '#4a4a4a',
                  cursor: 'pointer', padding: '0.4rem 0.5rem',
                  display: 'none', alignItems: 'center', justifyContent: 'center',
                }}>
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && isLoggedIn && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#ffffff', borderBottom: '1px solid #e8e8e8', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.25rem',
            animation: 'fadeIn 0.2s ease',
          }}>
            {NAV_LINKS.map(({ to, label, Icon }) => (
              <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({ ...navLinkStyle({ isActive }), padding: '0.75rem 1rem' })}>
                <Icon size={15} strokeWidth={2} /> {label}
              </NavLink>
            ))}
            <button onClick={handleLogout} style={{
              marginTop: '0.5rem', padding: '0.75rem 1rem',
              background: '#f7f7f7', border: '1px solid #e8e8e8',
              borderRadius: 'var(--radius-md)', color: '#333333',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <LogOut size={14} strokeWidth={2} /> Sign Out
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;