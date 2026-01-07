
import { useEffect, useState } from "react";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../services/faqs.services";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import "./bed.css";

export default function Faqs() {

  // ================= STATE =================
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [viewFaq, setViewFaq] = useState(null);

  // 🔥 backend requires course
  const COURSE_ID = 23;

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  // ================= LOAD FAQS =================
  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      setLoading(true);

      const data = await getFaqs(); // 👈 ARRAY
      console.log("FAQS 👉", data);

      setFaqs(data);
      setError("");
    } catch {
      setError("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORM =================
  const openAddForm = () => {
    setFormData({ question: "", answer: "" });
    setEditingFaq(null);
    setViewFaq(null);
    setIsFormOpen(true);
  };

  const openEditForm = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setEditingFaq(faq);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingFaq(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        course: COURSE_ID, // 🔥 REQUIRED
        question: formData.question,
        answer: formData.answer,
      };

      if (editingFaq) {
        await updateFaq(editingFaq.id, payload);
      } else {
        await createFaq(payload);
      }

      closeForm();
      loadFaqs(); // 👈 UI refresh
    } catch (err) {
      console.log("FAQ SAVE ERROR 👉", err.response?.data);
      setError("Failed to save FAQ");
    } finally {
      setLoading(false);
    }
  };

  // ================= VIEW & DELETE =================
  const openView = (faq) => {
    setViewFaq(faq);
    setIsFormOpen(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await deleteFaq(id);
      loadFaqs();
    } catch {
      setError("Delete failed");
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">FAQ Management</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6">
          <input
            name="question"
            placeholder="Question"
            value={formData.question}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />

          <textarea
            name="answer"
            placeholder="Answer"
            value={formData.answer}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            rows={4}
            required
          />

          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editingFaq ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* VIEW */}
      {viewFaq && (
        <div className="bg-white p-4 rounded mb-6">
          <p><b>Question:</b> {viewFaq.question}</p>
          <p className="mt-2"><b>Answer:</b> {viewFaq.answer}</p>
          <button onClick={() => setViewFaq(null)} className="mt-3 underline">
            Back
          </button>
        </div>
      )}

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Question</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No FAQs found
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="border-t">
                  <td>{faq.question}</td>
                  <td className="flex gap-2">
                    <button onClick={() => openView(faq)}><Eye size={16} /></button>
                    <button onClick={() => openEditForm(faq)}><Pencil size={16} /></button>
                    <button onClick={() => deleteItem(faq.id)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
