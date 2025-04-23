import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    skills: '',
    experience: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) return;

      try {
        const endpoint = user.accType.toLowerCase() === 'freelancer'
          ? `http://localhost:4000/api/v1/freelancer/${user.userID}`
          : `http://localhost:4000/api/v1/client/${user.userID}`;

        const response = await axios.get(endpoint);
        setUserDetails(response.data);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          bio: response.data.bio || '',
          skills: response.data.skills || '',
          experience: response.data.experience || '',
        });
      } catch (err) {
        setError('Failed to fetch user details');
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const endpoint = user.accType.toLowerCase() === 'freelancer'
        ? `http://localhost:4000/api/v1/freelancer/${user.userID}`
        : `http://localhost:4000/api/v1/client/${user.userID}`;

      await axios.put(endpoint, formData);
      setUserDetails({ ...userDetails, ...formData });
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1abc9c]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333] shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#1abc9c]">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#c1faff] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                  />
                </div>
                <div>
                  <label className="block text-[#c1faff] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                  />
                </div>
                <div>
                  <label className="block text-[#c1faff] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                  />
                </div>
                {user.accType.toLowerCase() === 'freelancer' && (
                  <>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Skills</label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                <label className="block text-[#c1faff] mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[#c1faff] mb-2">Name</h3>
                  <p className="text-white">{userDetails?.name}</p>
                </div>
                <div>
                  <h3 className="text-[#c1faff] mb-2">Email</h3>
                  <p className="text-white">{userDetails?.email}</p>
                </div>
                <div>
                  <h3 className="text-[#c1faff] mb-2">Phone</h3>
                  <p className="text-white">{userDetails?.phone || 'Not provided'}</p>
                </div>
                {user.accType.toLowerCase() === 'freelancer' && (
                  <>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Skills</h3>
                      <p className="text-white">{userDetails?.skills || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Experience</h3>
                      <p className="text-white">{userDetails?.experience || 'Not provided'}</p>
                    </div>
                  </>
                )}
              </div>
              <div>
                <h3 className="text-[#c1faff] mb-2">Bio</h3>
                <p className="text-white">{userDetails?.bio || 'No bio provided'}</p>
              </div>
              <div className="pt-6 border-t border-[#333]">
                <h3 className="text-[#c1faff] mb-2">Account Type</h3>
                <p className="text-white capitalize">{user?.accType}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 