import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Save, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../services/firestore';
import { useToast } from '../components/Toast';
import { deleteUser } from 'firebase/auth';

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);

  // Load profile from Firestore
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setDisplayName(profile.displayName || '');
          setLocation(profile.location || '');
          if (profile.createdAt?.toDate) {
            setCreatedAt(profile.createdAt.toDate());
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);
    try {
      await updateUserProfile(user.uid, {
        displayName: displayName.trim(),
        location: location.trim(),
      });
      await refreshProfile();
      setSaved(true);
      showToast('Profile updated successfully', 'success');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      showToast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to completely delete your account? This action cannot be undone.");
    if (!confirm || !user) return;
    
    setDeleting(true);
    try {
      await deleteUserAccount(user.uid);
      await deleteUser(user);
      showToast('Account deleted successfully', 'success');
    } catch (err) {
      console.error('Failed to delete account:', err);
      showToast(err.message || 'Failed to delete account. You may need to sign in again first.', 'error');
      setDeleting(false);
    }
  };

  const photoURL = user?.photoURL;
  const email = user?.email || '';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--fg)' }}>
            Profile
          </h1>
          <p className="text-sm font-medium mb-8" style={{ color: 'var(--fg-faint)' }}>
            Manage your account settings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-tile p-6 md:p-8 rounded-2xl"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-brand animate-spin" />
            </div>
          ) : (
            <>
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {photoURL ? (
                  <img src={photoURL} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-md" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center">
                    <span className="text-2xl font-extrabold text-brand">
                      {displayName ? displayName[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--fg)' }}>{displayName || 'User'}</h2>
                  <p className="text-sm" style={{ color: 'var(--fg-faint)' }}>{email}</p>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--fg-faint)' }}>Display Name</label>
                  <div className="glass-tile flex items-center px-4 py-3 rounded-xl">
                    <User className="w-4 h-4 mr-3 shrink-0" style={{ color: 'var(--fg-faint)' }} />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      style={{ color: 'var(--fg)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--fg-faint)' }}>Email</label>
                  <div className="glass-tile flex items-center px-4 py-3 rounded-xl opacity-60">
                    <Mail className="w-4 h-4 mr-3 shrink-0" style={{ color: 'var(--fg-faint)' }} />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-transparent outline-none text-sm font-medium cursor-not-allowed"
                      style={{ color: 'var(--fg-muted)' }}
                    />
                  </div>
                  <p className="text-[10px] mt-1 ml-1" style={{ color: 'var(--fg-faint)' }}>Email cannot be changed</p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--fg-faint)' }}>Location</label>
                  <div className="glass-tile flex items-center px-4 py-3 rounded-xl">
                    <MapPin className="w-4 h-4 mr-3 shrink-0" style={{ color: 'var(--fg-faint)' }} />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Your city or area"
                      className="w-full bg-transparent outline-none text-sm font-medium"
                      style={{ color: 'var(--fg)' }}
                    />
                  </div>
                </div>

                {createdAt && (
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--fg-faint)' }}>
                    <Calendar className="w-3.5 h-3.5" />
                    Member since {createdAt.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] shadow-md flex items-center justify-center gap-2 ${
                    saved
                      ? 'bg-brand/10 text-brand shadow-none'
                      : 'bg-brand hover:bg-brand-dark text-white shadow-brand/15'
                  } disabled:opacity-50`}
                >
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : saved ? (
                    '✓ Saved successfully'
                  ) : (
                    <><Save className="w-4 h-4" /> Save changes</>
                  )}
                </button>

                {/* Danger Zone */}
                <div className="pt-8 mt-8 border-t border-red-500/10">
                  <h3 className="text-sm font-bold text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-xs text-red-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting account...</> : 'Delete Account'}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
