import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    qualification: '',
    about: '',
    amount: 50.0,
    spent: 0,
    rating: 0.0,
    totalReviews: 0
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        // Fetch user data
        const userResponse = await axios.get(
          `http://localhost:4000/api/v1/user/${user.userID}`
        );
        setUserData(userResponse.data);

        // Fetch profile data based on account type
        if (user.accType.toLowerCase() === 'freelancer') {
          const freelancerResponse = await axios.get(
            `http://localhost:4000/api/v1/freelancer/${user.userID}`
          );
          setProfileData(freelancerResponse.data);
          setFormData({
            niche: freelancerResponse.data.niche || '',
            hourlyRate: freelancerResponse.data.hourlyRate || 0,
            qualification: freelancerResponse.data.qualification || '',
            about: freelancerResponse.data.about || ''
          });
        } else {
          const clientResponse = await axios.get(
            `http://localhost:4000/api/v1/client/${user.userID}`
          );
          setProfileData(clientResponse.data);
          setFormData({
            companyName: clientResponse.data.companyName || '',
            companyAddress: clientResponse.data.companyAddress || '',
            qualification: clientResponse.data.qualification || '',
            about: clientResponse.data.about || '',
            amount: clientResponse.data.amount || 50.0,
            spent: clientResponse.data.spent || 0,
            rating: clientResponse.data.rating || 0.0,
            totalReviews: clientResponse.data.totalReviews || 0
          });
        }
      } catch (err) {
        setError('Failed to fetch profile details');
        console.error('Error fetching profile details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.name === 'amount' || e.target.name === 'spent' || e.target.name === 'rating'
      ? parseFloat(e.target.value)
      : e.target.value;
      
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const endpoint = user.accType.toLowerCase() === 'freelancer'
        ? `http://localhost:4000/api/v1/freelancer/${user.userID}`
        : `http://localhost:4000/api/v1/client/${user.userID}`;

      await axios.put(endpoint, formData);
      setProfileData({ ...profileData, ...formData });
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
            <h1 className="text-3xl font-bold text-[#1abc9c]">
              {user.accType} Profile
            </h1>
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
                {user.accType.toLowerCase() === 'freelancer' ? (
                  <>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Niche</label>
                      <input
                        type="text"
                        name="niche"
                        value={formData.niche}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Hourly Rate ($)</label>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Qualification</label>
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Company Address</label>
                      <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#c1faff] mb-2">Qualification</label>
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#2c3e50] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
                      />
                    </div>
                  </>
                )}
              </div>
              <div>
                <label className="block text-[#c1faff] mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about}
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
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[#c1faff] mb-2">Name</h3>
                  <p className="text-white">{userData?.Name || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-[#c1faff] mb-2">Email</h3>
                  <p className="text-white">{userData?.email || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-[#c1faff] mb-2">Country</h3>
                  <p className="text-white">{userData?.Country || 'Not available'}</p>
                </div>
                <div>
                  <h3 className="text-[#c1faff] mb-2">Member Since</h3>
                  <p className="text-white">
                    {userData?.createdAt 
                      ? new Date(userData.createdAt).toLocaleDateString() 
                      : 'Not available'}
                  </p>
                </div>
              </div>

              {/* Role Specific Info */}
              <div className="pt-6 border-t border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.accType.toLowerCase() === 'freelancer' ? (
                  <>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Niche</h3>
                      <p className="text-white">{profileData?.niche || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Hourly Rate</h3>
                      <p className="text-white">${profileData?.hourlyRate || '0'}/hr</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Qualification</h3>
                      <p className="text-white">{profileData?.qualification || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Rating</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-xl mr-1">★</span>
                        <span className="text-white">{profileData?.rating || '0'}/5</span>
                        <span className="text-gray-400 ml-2">
                          ({profileData?.totalReviews || '0'} reviews)
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Company Name</h3>
                      <p className="text-white">{profileData?.companyName || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Company Address</h3>
                      <p className="text-white">{profileData?.companyAddress || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Qualification</h3>
                      <p className="text-white">{profileData?.qualification || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Rating</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-xl mr-1">★</span>
                        <span className="text-white">{profileData?.rating || '0'}/5</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Financial Info */}
              <div className="pt-6 border-t border-[#333] grid grid-cols-1 md:grid-cols-3 gap-6">
                {user.accType.toLowerCase() === 'freelancer' ? (
                  <>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Earned</h3>
                      <p className="text-white">${profileData?.earned || '0'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Available Balance</h3>
                      <p className="text-white">${profileData?.amount || '0'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Connects Available</h3>
                      <p className="text-white">{profileData?.totalConnects || '0'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Total Spent</h3>
                      <p className="text-white">${profileData?.spent || '0'}</p>
                    </div>
                    <div>
                      <h3 className="text-[#c1faff] mb-2">Available Balance</h3>
                      <p className="text-white">${profileData?.amount || '0'}</p>
                    </div>
                    
                  </>
                )}
              </div>

              {/* About Section */}
              <div className="pt-6 border-t border-[#333]">
                <h3 className="text-[#c1faff] mb-2">About</h3>
                <p className="text-white">{profileData?.about || 'No description provided'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 