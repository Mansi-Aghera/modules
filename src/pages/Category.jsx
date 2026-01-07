import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category.service";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

const IMAGE_BASE_URL = "https://codingcloud.pythonanywhere.com";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

  const EMPTY_FORM = {
    name: "",
    text: "",
    image: null,
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data || []);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openView = (item) => {
    setViewCategory(item);
    setIsFormOpen(false);
  };

  const openEditForm = (item) => {
    setFormData({
      name: item.name || "",
      text: item.text || "",
      image: null, // do not preload file
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
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      if (editingItem) {
        await updateCategory(editingItem.id, payload);
      } else {
        await createCategory(payload);
      }
      closeForm();
      loadCategories();
    } catch (err) {
      console.error(err.response?.data);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 align-items-center"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

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

          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="col-span-2 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-2 rounded">
              {editingItem ? "Update Category" : "Save Category"}
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

      {/* ✅ FULL VIEW */}
      {viewCategory && (
        <div className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-4">
          <div>
            <b>Name:</b> {viewCategory.name}
          </div>

          <div className="col-span-2">
            <b>Description:</b> {viewCategory.text}
          </div>

          <div>
            <b>Image:</b>
            <br />
            {viewCategory.image && (
              <img
                src={`${IMAGE_BASE_URL}${viewCategory.image}`}
                className="w-20 mt-2 border img"
              />
            )}
          </div>

          <div className="col-span-2">
            <button
              onClick={() => setViewCategory(null)}
              className="mt-4 underline text-blue-600"
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
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td>{item.name}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${IMAGE_BASE_URL}${item.image}`}
                      className="w-10 mx-auto img"
                    />
                  )}
                </td>
                <td>{item.text}</td>
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
