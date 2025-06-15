// src/components/Admin/EditProjects.jsx
import { useEffect, useRef, useState } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function EditProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [imageUploading, setImageUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        tags: [],
        link: '',
        github: ''
    });
    const [newTag, setNewTag] = useState('');
    const imgRef = useRef(null)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const projectsData = [];
                querySnapshot.forEach((doc) => {
                    projectsData.push({ id: doc.id, ...doc.data() });
                });
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        setImageUploading(true);
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (formData.imageUrl) {
                const oldImageRef = ref(storage, formData.imageUrl);
                try {
                    await deleteObject(oldImageRef);
                } catch (error) {
                    console.error("Error deleting old image:", error);
                }
            }
            const storageRef = ref(storage, `projects/${uuidv4()}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
            setImageUploading(false);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const startEditing = (project) => {
        setEditingId(project.id);
        setFormData({
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            tags: [...project.tags],
            link: project.link || '',
            github: project.github || ''
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            tags: [],
            link: '',
            github: ''
        });

        if (imgRef.current) {
            imgRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageUploading) {
            alert("Image is still uploading. Please wait.");
            return;
        }

        try {
            if (editingId) {
                const docRef = doc(db, 'projects', editingId);
                await updateDoc(docRef, formData);
            } else {
                await addDoc(collection(db, 'projects'), formData);
            }
            const querySnapshot = await getDocs(collection(db, 'projects'));
            const projectsData = [];
            querySnapshot.forEach((doc) => {
                projectsData.push({ id: doc.id, ...doc.data() });
            });
            setProjects(projectsData);

            // Reset form
            cancelEditing();
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    const deleteProject = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteDoc(doc(db, 'projects', id));
                setProjects(prev => prev.filter(project => project.id !== id));
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }
    };

    if (loading) return <div className="text-center py-8">Loading projects...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        {editingId ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full"
                                ref={imgRef}
                            />
                            {imageUploading && (
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-indigo-600 h-2.5 rounded-full"
                                            style={{ width: '0%' }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Uploading image...</p>
                                </div>
                            )}
                            {formData.imageUrl && (
                                <div className="mt-2">
                                    <img
                                        ref={imgRef}
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="h-32 object-contain"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                                    placeholder="Add a tag"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <div key={tag} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 text-gray-600 hover:text-gray-900"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                            <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                {editingId ? 'Update Project' : 'Add Project'}
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
                    <h2 className="text-xl font-semibold mb-4">Your Projects ({projects.length})</h2>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id} className="border rounded-md p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-medium">{project.title}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditing(project)}
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {project.imageUrl && (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="h-20 object-contain mt-2"
                                    />
                                )}
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                                            {tag}
                                        </span>
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