import { useEffect, useState } from "react";
import {
  getModules,
  createModule,
  updateModule,
  deleteModule,
} from "../services/modules.service";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const [name, setName] = useState("");

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    setLoading(true);
    const data = await getModules();
    setModules(data || []);
    setLoading(false);
  };

  const openAddForm = () => {
    setName("");
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setName(item.name);
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const openView = (item) => {
    setViewItem(item);
    setIsFormOpen(false);
  };

  const closeView = () => {
    setViewItem(null);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name };

    if (editingItem) {
      await updateModule(editingItem.id, payload);
    } else {
      await createModule(payload);
    }

    closeForm();
    loadModules();
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete module?")) return;
    await deleteModule(id);
    loadModules();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Modules</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 align-items-center"
        >
          <Plus size={16} /> Add Module
        </button>
      </div>

      {/* FORM */}
      {/* FORM */}
{isFormOpen && (
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-6"
  >
    {/* NAME */}
    <div className="col-span-2">
      <label className="block mb-1 font-medium">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
        className="w-full border rounded px-3 py-2"
      />
    </div>

    {/* ACTIONS */}
    <div className="col-span-2 flex gap-3">
      <button className="bg-green-600 text-white px-6 py-2 rounded">
        {editingItem ? "Update Module" : "Save Module"}
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
        <div className="bg-white p-6 rounded mb-6 max-w-md">
         

          <p>
            <b>ID:</b> {viewItem.id}
          </p>
          <p className="mt-2">
            <b>Name:</b> {viewItem.name}
          </p>

          <button onClick={closeView} className="underline text-blue-600 mt-4">
            Back
          </button>
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {modules.map((m) => (
              <tr key={m.id} className="border-t text-center">
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td className="flex gap-2 justify-center">
                  <button onClick={() => openView(m)}>
                    <Eye size={16} />
                  </button>
                  <button onClick={() => openEditForm(m)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => deleteItem(m.id)}>
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
