// src/components/Admin/EditSkills.jsx
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

export default function EditSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    skills: [{ name: '', level: 50 }]
  });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'skills'));
        const skillsData = [];
        querySnapshot.forEach((doc) => {
          skillsData.push({ id: doc.id, ...doc.data() });
        });
        setSkills(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleSkillChange = (index, e) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { ...newSkill }]
      });
      setNewSkill({ name: '', level: 50 });
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const startEditing = (skillCategory) => {
    setEditingId(skillCategory.id);
    setFormData({
      category: skillCategory.category,
      skills: [...skillCategory.skills]
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({
      category: '',
      skills: [{ name: '', level: 50 }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing skill category
        const docRef = doc(db, 'skills', editingId);
        await updateDoc(docRef, formData);
      } else {
        // Add new skill category
        await addDoc(collection(db, 'skills'), formData);
      }

      // Refresh skills list
      const querySnapshot = await getDocs(collection(db, 'skills'));
      const skillsData = [];
      querySnapshot.forEach((doc) => {
        skillsData.push({ id: doc.id, ...doc.data() });
      });
      setSkills(skillsData);

      // Reset form
      cancelEditing();
    } catch (error) {
      console.error("Error saving skill category:", error);
    }
  };

  const deleteSkillCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill category?")) {
      try {
        await deleteDoc(doc(db, 'skills', id));
        setSkills(prev => prev.filter(skill => skill.id !== id));
      } catch (error) {
        console.error("Error deleting skill category:", error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading skills...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Skills</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Skill Category' : 'Add New Skill Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="mb-4 p-3 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Skill #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-600 mb-1">Skill Name</label>
                    <input
                      type="text"
                      name="name"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, e)}
                      required
                      className="w-full px-3 py-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Skill Level: {skill.level}%</label>
                    <input
                      type="range"
                      name="level"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleSkillChange(index, e)}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Add New Skill</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="w-full px-3 py-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Level: {newSkill.level}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
                >
                  Add Skill to Category
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {editingId ? 'Update Category' : 'Add Category'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Skill Categories ({skills.length})</h2>
          <div className="space-y-4">
            {skills.map((skillCategory) => (
              <div key={skillCategory.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{skillCategory.category}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(skillCategory)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkillCategory(skillCategory.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {skillCategory.skills?.length > 0 && skillCategory.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}