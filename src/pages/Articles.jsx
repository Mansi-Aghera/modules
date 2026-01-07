

import { useEffect, useState } from "react";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../services/articles.service";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import "./bed.css";
import { getCourses } from "../services/courses.service";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [courses, setCourses] = useState([]);

  const EMPTY_FORM = {
    name: "",
    description: "",
    text: "",
    tag: "",
    course: "",
    image: null,
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    loadArticles();
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data || []);
    } catch {
      console.log("Course load failed");
    }
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data || []);
    } catch {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setEditingItem(null);
    setIsFormOpen(true);
    setViewItem(null);
  };

  const openEditForm = (item) => {
    setFormData({
      name: item.text || "",
      description: item.description || "",
      text: item.text || "",
      tag: item.tag || "",
      course: item.course || "",
      image: null,
    });
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, image: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === "") return;

      if (key === "course") {
        payload.append("course", Number(value));
      } else {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      if (editingItem) {
        await updateArticle(editingItem.id, payload);
      } else {
        await createArticle(payload);
      }
      closeForm();
      loadArticles();
    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data, null, 2));
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const openView = (item) => {
    setViewItem(item);
    setIsFormOpen(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    await deleteArticle(id);
    loadArticles();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Article Management</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 d-flex align-items-center"
        >
          <Plus size={16} /> Add Article
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Text</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Tag</label>
            <input
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="col-span-2 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-2 rounded">
              {editingItem ? "Update Article" : "Save Article"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* VIEW */}
      {viewItem && (
        <div className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-4">
          <div>
            <b>Name:</b> {viewItem.description}
          </div>

          <div>
            <b>Course:</b> {viewItem.course_data?.name}
          </div>

          <div>
            <b>Tag:</b> {viewItem.tag}
          </div>

          <div className="col-span-2">
            <b>Description:</b>
            <p>{viewItem.description}</p>
          </div>

          <div className="col-span-2">
            <b>Text:</b>
            <p>{viewItem.text}</p>
          </div>

          {viewItem.image && (
            <div className="col-span-2">
              <b>Image:</b>
              <img
                src={`https://codingcloud.pythonanywhere.com${viewItem.image}`}
                className="w-32 border mt-2 img"
              />
            </div>
          )}

          <div className="col-span-2">
            <button
              onClick={() => setViewItem(null)}
              className="underline text-blue-600"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Description</th>
              <th>Text</th>
              <th>Tag</th>
              <th>Course</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((item) => (
              <tr key={item.id} className="border-t text-center">
                {/* NAME */}
                <td>{item.description}</td>

                {/* DESCRIPTION */}
                <td className="max-w-xs truncate">{item.description}</td>

                {/* TEXT */}
                <td className="max-w-xs truncate">{item.text}</td>

                {/* TAG */}
                <td>{item.tag}</td>

                {/* COURSE */}
                <td>{item.course_data?.name}</td>

                {/* IMAGE */}
                <td>
                  {item.image && (
                    <img
                      src={`https://codingcloud.pythonanywhere.com${item.image}`}
                      className="img"
                    />
                  )}
                </td>

                {/* ACTIONS */}
                <td className="flex gap-2 justify-center">
                  <button onClick={() => openView(item)}>
                    <Eye size={16} />
                  </button>
                  <button onClick={() => openEditForm(item)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => deleteItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
