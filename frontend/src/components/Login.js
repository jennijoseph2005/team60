import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'faculty'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    else if (formData.username.length < 4) newErrors.username = 'Username must be at least 4 characters';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', formData.username);

      switch (data.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'hod':
          navigate('/hod-dashboard');
          break;
        case 'faculty':
          navigate('/faculty-dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="username-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Faculty Management System</h1>
          <p>Sign in with your institutional credentials</p>
        </div>

        {loginError && <div className="error-message">{loginError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Login As</label>
            <div className="role-selector">
              {['faculty', 'hod', 'admin'].map(role => (
                <button
                  key={role}
                  type="button"
                  className={`role-option ${formData.role === role ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role }))}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={`Enter your ${formData.role} username`}
              className={errors.username ? 'error' : ''}
              autoComplete="username"
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
              autoComplete="current-password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> Signing in...
              </>
            ) : (
              `Sign in as ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Technical support: <a href="mailto:support@university.edu">support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
