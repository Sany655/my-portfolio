import { useEffect, useState } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaEdit, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export default function EditExperience() {
  const [experience, setExperience] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
    responsibilities: [''],
    skills: [''],
    logo: '',
    website: '',
    order: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [logoUploading, setLogoUploading] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      const querySnapshot = await getDocs(collection(db, 'experience'));
      const experienceData = [];
      querySnapshot.forEach((doc) => {
        experienceData.push({ id: doc.id, ...doc.data() });
      });
      setExperience(experienceData.sort((a, b) => a.order - b.order));
    };
    fetchExperience();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      const storageRef = ref(storage, `company-logos/${uuidv4()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, logo: downloadURL }));
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.currentlyWorking ? null : new Date(formData.endDate),
        responsibilities: formData.responsibilities.filter(item => item.trim() !== ''),
        skills: formData.skills.filter(item => item.trim() !== ''),
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, 'experience', editingId), data);
      } else {
        await addDoc(collection(db, 'experience'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }

      // Refresh list
      const querySnapshot = await getDocs(collection(db, 'experience'));
      const experienceData = [];
      querySnapshot.forEach((doc) => {
        experienceData.push({ id: doc.id, ...doc.data() });
      });
      setExperience(experienceData.sort((a, b) => a.order - b.order));
      resetForm();
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
      responsibilities: [''],
      skills: [''],
      logo: '',
      website: '',
      order: experience.length + 1
    });
    setEditingId(null);
  };

  const startEditing = (item) => {
    setFormData({
      ...item,
      startDate: format(item.startDate?.toDate(), 'yyyy-MM-dd'),
      endDate: item.endDate ? format(item.endDate?.toDate(), 'yyyy-MM-dd') : '',
      currentlyWorking: !item.endDate,
      responsibilities: item.responsibilities?.length > 0 
        ? [...item.responsibilities] 
        : [''],
      skills: item.skills?.length > 0 
        ? [...item.skills] 
        : ['']
    });
    setEditingId(item.id);
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience entry?")) {
      await deleteDoc(doc(db, 'experience', id));
      setExperience(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Work Experience</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={formData.currentlyWorking}
                  required={!formData.currentlyWorking}
                />
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="currentlyWorking"
                    checked={formData.currentlyWorking}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">I currently work here</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
              {formData.responsibilities.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Responsibility"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('responsibilities', index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('responsibilities')}
                className="mt-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
              >
                <FaPlus className="inline mr-1" /> Add Responsibility
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills Used</label>
              {formData.skills.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Skill"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills', index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills')}
                className="mt-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
              >
                <FaPlus className="inline mr-1" /> Add Skill
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (optional)</label>
              {formData.logo && (
                <div className="mb-2">
                  <img 
                    src={formData.logo} 
                    alt="Company logo preview" 
                    className="h-16 object-contain"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full"
                disabled={logoUploading}
              />
              {logoUploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website (optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="https://company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min="1"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {editingId ? 'Update' : 'Add'} Experience
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Experience ({experience.length})</h2>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.position}</h3>
                    <p className="text-sm text-gray-600">{item.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(item.startDate?.toDate(), 'MMM yyyy')} - 
                      {item.currentlyWorking ? ' Present' : format(item.endDate?.toDate(), 'MMM yyyy')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(item)}
                      className="text-indigo-600 hover:text-indigo-800 p-1"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}