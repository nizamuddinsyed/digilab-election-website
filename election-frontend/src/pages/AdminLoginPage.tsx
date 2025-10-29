import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { authAPI } from '../services/api';
import { LockClosedIcon, ShieldCheckIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const AdminLoginPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData.username, formData.password);
      localStorage.setItem('auth_token', response.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige py-20 px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-beige-dark">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-3xl bg-charcoal shadow-xl mb-8">
              <ShieldCheckIcon className="h-14 w-14 text-white" />
            </div>
            <h2 className="font-heading font-black text-4xl text-charcoal mb-2">
              {t.admin.login}
            </h2>
            <p className="text-charcoal-light font-heading">
              Secure Admin Access
            </p>
          </div>
          
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                <p className="text-sm font-semibold text-red-800 text-center">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                  {t.admin.username}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserCircleIcon className="h-5 h-5 text-charcoal-light" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-2xl block w-full pl-12 pr-4 py-4 border-2 border-beige-dark placeholder-charcoal-light text-charcoal focus:outline-none focus:border-charcoal font-heading transition-all"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                  {t.admin.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-charcoal-light" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-2xl block w-full pl-12 pr-4 py-4 border-2 border-beige-dark placeholder-charcoal-light text-charcoal focus:outline-none focus:border-charcoal font-heading transition-all"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-5 px-4 border-0 font-bold rounded-2xl text-white bg-charcoal hover:bg-charcoal-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.common.loading}
                  </div>
                ) : (
                  <span className="flex items-center uppercase tracking-wider">
                    <ShieldCheckIcon className="w-5 h-5 mr-2" />
                    {t.admin.loginButton}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;