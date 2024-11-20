import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import apiServiceProfile from '../../../services/ProfileService';

const useProfileLogic = () => {
  const { token, userId } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token && userId) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      if (token) {
        const profileData = await apiServiceProfile.getProfile(token);
        setProfile(profileData.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading };
};

export default useProfileLogic;
