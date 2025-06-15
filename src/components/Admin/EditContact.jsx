// src/components/Admin/EditContact.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditContact() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    availability: '',
    socialLinks: [{ platform: '', url: '' }]
  });
  const [loading, setLoading] = useState(true);
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, 'contact', 'info');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [name]: value };
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const addSocialLink = () => {
    if (newSocialLink.platform.trim() && newSocialLink.url.trim()) {
      setFormData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, newSocialLink]
      }));
      setNewSocialLink({ platform: '', url: '' });
    }
  };

  const removeSocialLink = (index) => {
    const updatedLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'contact', 'info');
      await updateDoc(docRef, formData);
      alert('Contact information updated successfully!');
    } catch (error) {
      console.error("Error updating contact info:", error);
      alert('Error updating contact information');
    }
  };

  if (loading) return <div className="text-center py-8">Loading contact information...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Contact Information</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g., Available for freelance work"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
          <div className="space-y-3 mb-4">
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  name="platform"
                  placeholder="Platform"
                  value={link.platform}
                  onChange={(e) => handleSocialLinkChange(index, e)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md"
                />
                <input
                  type="url"
                  name="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, e)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Platform</label>
              <input
                type="text"
                value={newSocialLink.platform}
                onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
                className="w-full px-3 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">URL</label>
              <input
                type="url"
                value={newSocialLink.url}
                onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                className="w-full px-3 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addSocialLink}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
          >
            Add Social Link
          </button>
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}