import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { FaTrash, FaEdit, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

export default function EditEducation() {
  const [education, setEducation] = useState([]);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    currentlyEnrolled: false,
    description: '',
    icon: 'graduation-cap',
    link: '',
    order: 0
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      const querySnapshot = await getDocs(collection(db, 'education'));
      const educationData = [];
      querySnapshot.forEach((doc) => {
        educationData.push({ id: doc.id, ...doc.data() });
      });
      setEducation(educationData.sort((a, b) => a.order - b.order));
    };
    fetchEducation();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.currentlyEnrolled ? null : new Date(formData.endDate),
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, 'education', editingId), data);
      } else {
        await addDoc(collection(db, 'education'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      // Refresh list
      const querySnapshot = await getDocs(collection(db, 'education'));
      const educationData = [];
      querySnapshot.forEach((doc) => {
        educationData.push({ id: doc.id, ...doc.data() });
      });
      setEducation(educationData.sort((a, b) => a.order - b.order));
      resetForm();
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      currentlyEnrolled: false,
      description: '',
      icon: 'graduation-cap',
      link: '',
      order: education.length + 1
    });
    setEditingId(null);
  };

  const startEditing = (item) => {
    setFormData({
      ...item,
      startDate: format(item.startDate?.toDate(), 'yyyy-MM-dd'),
      endDate: item.endDate ? format(item.endDate?.toDate(), 'yyyy-MM-dd') : '',
      currentlyEnrolled: !item.endDate
    });
    setEditingId(item.id);
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteDoc(doc(db, 'education', id));
      setEducation(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Education & Certifications</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="graduation-cap">Degree/Diploma</option>
                <option value="certificate">Certification</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Certificate</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
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
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
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
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled={formData.currentlyEnrolled}
                  required={!formData.currentlyEnrolled}
                />
                <label className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="currentlyEnrolled"
                    checked={formData.currentlyEnrolled}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">Currently enrolled</span>
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification URL (optional)</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/verify"
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
                {editingId ? 'Update' : 'Add'} Entry
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
          <h2 className="text-xl font-semibold mb-4">Current Entries ({education.length})</h2>
          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {item.degree} in {item.field}
                    </h3>
                    <p className="text-sm text-gray-600">{item.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(item.startDate?.toDate(), 'MMM yyyy')} - 
                      {item.currentlyEnrolled ? ' Present' : format(item.endDate?.toDate(), 'MMM yyyy')}
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