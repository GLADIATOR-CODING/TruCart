import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Save, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/firestore';

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
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
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
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
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
