import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserById from '../utils/api/UserById';
import AddOrUpdateUser from '../utils/api/AddOrUpdateUser';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    mobile_no: '',
    password_hash:'',
    address: '',
    profile_picture: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const loadUserDetails = async () => {
    const result = await UserById(user.userId);
    if (result) {
      setUserData(result);
      // Initialize form data with user data
      setFormData({
        id: result.id || '',
        name: result.name || '',
        email: result.email || '',
        mobile_no: result.mobile_no || '',
        password_hash: result.password_hash || '',
        address: result.address || '',
        profile_picture: result.profile_picture || user.profileImage || ''
      });
      setImagePreview(result.profile_picture || user.profileImage || '');
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      loadUserDetails();
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL);
      //setFormData({ ...formData, profile_picture: imgURL });
    }
  };

  const openEditModal = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await AddOrUpdateUser(formData);
      if(response){

      setUserData({
        ...userData,
        ...formData
      });
      
      const updatedUser = {
        ...user,
        profileImage: formData.profile_picture
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Close modal and reset editing state
      setIsModalOpen(false);
      setIsEditing(false);
      
      toast.success("Profile updated successfully!");

      }
      
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full flex flex-col sm:flex-row items-center sm:items-start gap-8 border border-gray-100">
        <div className="relative group">
          <img
            src={userData.profile_picture || user.profileImage || 'https://via.placeholder.com/150'} 
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-amber-500 shadow-md"
          />
          <button 
            onClick={openEditModal}
            className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full shadow-md hover:bg-amber-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
          <h2 className="text-3xl font-bold text-amber-700">{userData.name}</h2>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Mobile No:</span> {userData.mobile_no}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Address:</span> {userData.address}
          </p>
          
          <button
            className="mt-4 bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition font-medium"
            onClick={openEditModal}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-white-10 backdrop-blur-md bg-opacity-25 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-xl relative">
            <div className="border-b pb-4 mb-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-amber-700">Edit Profile</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile_no"
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    value={formData.mobile_no}
                    onChange={handleFormChange}
                  />
                </div>
              

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="text"
                    name="password_hash"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    value={formData.password_hash}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    placeholder="Enter your address"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                    value={formData.address || ''}
                    onChange={handleFormChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {imagePreview && (
                      <div className="flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="h-20 w-20 object-cover rounded-full border-2 border-amber-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;