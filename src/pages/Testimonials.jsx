// import { useEffect, useState } from "react";
// import {
//   getTest,
//   createTest,
//   updateTest,
//   deleteTest,
// } from "../services/testimonials.service";
// import { Eye, Pencil, Trash2, Plus } from "lucide-react";
// import "./bed.css";

// export default function Testimonials() {

//   // ================= STATE =================
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingTest, setEditingTest] = useState(null);
//   const [viewTest, setViewTest] = useState(null);

//   // category MUST exist in backend
//   const [formData, setFormData] = useState({
//     name: "",
//     review: "",
//     rating: 1,
//     category: 44,
//     image: null,
//   });

//   // ================= LOAD =================
//   useEffect(() => {
//     loadTests();
//   }, []);

//   const loadTests = async () => {
//     try {
//       setLoading(true);
//       const data = await getTest();
//       setTests(data);
//       setError("");
//     } catch {
//       setError("Failed to load testimonials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= FORM =================
//   const openAddForm = () => {
//     setFormData({
//       name: "",
//       review: "",
//       rating: 1,
//       category: 44,
//       image: null,
//     });
//     setEditingTest(null);
//     setViewTest(null);
//     setIsFormOpen(true);
//   };

//   const openEditForm = (test) => {
//     setFormData({
//       name: test.name,
//       review: test.review,
//       rating: test.rating,
//       category: test.category,
//       image: null, // optional re-upload
//     });
//     setEditingTest(test);
//     setIsFormOpen(true);
//   };

//   const closeForm = () => {
//     setIsFormOpen(false);
//     setEditingTest(null);
//     setError("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : type === "number" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       if (editingTest) {
//         await updateTest(editingTest.id, formData);
//       } else {
//         await createTest(formData);
//       }

//       closeForm();
//       loadTests();
//     } catch (err) {
//       console.log("BACKEND ERROR 👉", err.response?.data);
//       setError("Failed to save testimonial");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= VIEW & DELETE =================
//   const openView = (test) => {
//     setViewTest(test);
//     setIsFormOpen(false);
//   };

//   const deleteItem = async (id) => {
//     if (!window.confirm("Delete this testimonial?")) return;
//     try {
//       await deleteTest(id);
//       loadTests();
//     } catch {
//       setError("Delete failed");
//     }
//   };

//   // ================= UI =================
//   return (
//     <div className="p-6 max-w-6xl mx-auto">

//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Testimonials Management</h1>
//         <button
//           onClick={openAddForm}
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//         >
//           <Plus size={16} /> Add Testimonial
//         </button>
//       </div>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       {/* FORM */}
//       {isFormOpen && (
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6">

//           <input
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="border p-2 w-full mb-3"
//             required
//           />

//           <textarea
//             name="review"
//             placeholder="Review"
//             value={formData.review}
//             onChange={handleInputChange}
//             className="border p-2 w-full mb-3"
//             rows={4}
//             required
//           />

//           <input
//             type="number"
//             name="rating"
//             min="1"
//             max="5"
//             value={formData.rating}
//             onChange={handleInputChange}
//             className="border p-2 w-full mb-3"
//             required
//           />

//           <input
//             type="number"
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             className="border p-2 w-full mb-3"
//             required
//           />

//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleInputChange}
//             className="border p-2 w-full mb-3"
//           />

//           <div className="flex gap-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded">
//               {editingTest ? "Update" : "Save"}
//             </button>
//             <button
//               type="button"
//               onClick={closeForm}
//               className="px-4 py-2 border rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* VIEW */}
//       {viewTest && (
//         <div className="bg-white p-4 rounded mb-6">
//           <p><b>ID:</b> {viewTest.id}</p>
//           <p><b>Name:</b> {viewTest.name}</p>
//           <p><b>Review:</b> {viewTest.review}</p>
//           <p><b>Rating:</b> {viewTest.rating}</p>
//           <p><b>Category:</b> {viewTest.category}</p>
//           <p className="text-sm text-gray-500">
//             <b>Created:</b> {new Date(viewTest.created_at).toLocaleString()}
//           </p>

//           {viewTest.image && (
//             <img
//               src={viewTest.image}
//               alt="testimonial"
//               className="w-24 h-24 rounded mt-3 object-cover"
//             />
//           )}

//           <button onClick={() => setViewTest(null)} className="mt-3 underline">
//             Back
//           </button>
//         </div>
//       )}

//       {/* LIST */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th>ID</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Rating</th>
//               <th>Category</th>
//               <th>Created</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tests.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-4">
//                   No testimonials found
//                 </td>
//               </tr>
//             ) : (
//               tests.map((test) => (
//                 <tr key={test.id} className="border-t">
//                   <td>{test.id}</td>
//                   <td>
//                     {test.image && (
//                       <img
//                         src={test.image}
//                         alt=""
//                         className="w-10 h-10 object-cover rounded"
//                       />
//                     )}
//                   </td>
//                   <td>{test.name}</td>
//                   <td>{test.rating}</td>
//                   <td>{test.category}</td>
//                   <td>{new Date(test.created_at).toLocaleDateString()}</td>
//                   <td className="flex gap-2">
//                     <button onClick={() => openView(test)}><Eye size={16} /></button>
//                     <button onClick={() => openEditForm(test)}><Pencil size={16} /></button>
//                     <button onClick={() => deleteItem(test.id)}><Trash2 size={16} /></button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import {
  getTest,
  createTest,
  updateTest,
  deleteTest,
} from "../services/testimonials.service";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import "./bed.css";


const BASE_URL = "https://codingcloud.pythonanywhere.com";

// 🔥 IMAGE URL FIX (handles absolute + relative)
const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${BASE_URL}${image}`;
};

export default function Testimonials() {

  // ================= STATE =================
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [viewTest, setViewTest] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 1,
    category: 44,
    image: null,
  });

  // ================= LOAD =================
  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      const data = await getTest();
      setTests(data);
      setError("");
    } catch {
      setError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORM =================
  const openAddForm = () => {
    setFormData({
      name: "",
      review: "",
      rating: 1,
      category: 44,
      image: null,
    });
    setEditingTest(null);
    setViewTest(null);
    setIsFormOpen(true);
  };

  const openEditForm = (test) => {
    setFormData({
      name: test.name,
      review: test.review,
      rating: test.rating,
      category: test.category,
      image: null,
    });
    setEditingTest(test);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTest(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files[0]
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editingTest) {
        await updateTest(editingTest.id, formData);
      } else {
        await createTest(formData);
      }

      closeForm();
      loadTests();
    } catch (err) {
      console.log("BACKEND ERROR 👉", err.response?.data);
      setError("Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  // ================= VIEW & DELETE =================
  const openView = (test) => {
    setViewTest(test);
    setIsFormOpen(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteTest(id);
      loadTests();
    } catch {
      setError("Delete failed");
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6">

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />

          <textarea
            name="review"
            placeholder="Review"
            value={formData.review}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            rows={4}
            required
          />

          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />

          <input
            type="number"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
          />

          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editingTest ? "Update" : "Save"}
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
      {viewTest && (
        <div className="bg-white p-4 rounded mb-6">
          <p><b>ID:</b> {viewTest.id}</p>
          <p><b>Name:</b> {viewTest.name}</p>
          <p><b>Review:</b> {viewTest.review}</p>
          <p><b>Rating:</b> {viewTest.rating}</p>
          <p><b>Category:</b> {viewTest.category}</p>
          <p className="text-sm text-gray-500">
            <b>Created:</b> {new Date(viewTest.created_at).toLocaleString()}
          </p>

          {viewTest.image && (
            <img
              src={getImageUrl(viewTest.image)}
              alt="testimonial"
              className="w-24 h-24 rounded mt-3 object-cover"
            />
          )}

          <button onClick={() => setViewTest(null)} className="mt-3 underline">
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
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No testimonials found
                </td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id} className="border-t">
                  <td>{test.id}</td>
                  <td>
                    {test.image && (
                      <img
                        src={getImageUrl(test.image)}
                        alt=""
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                  </td>
                  <td>{test.name}</td>
                  <td>{test.rating}</td>
                  <td>{test.category}</td>
                  <td>{new Date(test.created_at).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button onClick={() => openView(test)}>
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openEditForm(test)}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => deleteItem(test.id)}>
                      <Trash2 size={16} />
                    </button>
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
