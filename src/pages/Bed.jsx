// // src/Pages/Bed.jsx
// import { useEffect, useState } from "react";
// import { getBeds, createBed, updateBed, deleteBed } from "../services/bed.services";
// import { Eye, Pencil, Trash2, Plus } from "lucide-react";
// import './bed.css'

// export default function Bed() {
//   const [beds, setBeds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingBed, setEditingBed] = useState(null);
//   const [viewingBed, setViewingBed] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     bed_number: "",
//     status: "vacant",
//   });

//   useEffect(() => {
//     fetchBeds();
//   }, []);

//   const fetchBeds = async () => {
//     setLoading(true);
//     try {
//       const data = await getBeds();

//       let normalized = data;
//       if (!Array.isArray(normalized) && normalized) {
//         normalized = normalized.results || normalized.data || [];
//       }

//       setBeds(Array.isArray(normalized) ? normalized : []);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.detail || err.message || "Failed to fetch beds");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAddModal = () => {
//     setEditingBed(null);
//     setViewingBed(null);
//     setFormData({
//       name: "",
//       bed_number: "",
//       status: "vacant",
//     });
//     setIsModalOpen(true);
//   };

//   const openEditModal = (bed) => {
//     setEditingBed(bed);
//     setViewingBed(null);
//     setFormData({
//       name: bed.name || "",
//       bed_number: String(bed.bed_number ?? ""),
//       status: bed.status || "vacant",
//     });
//     setIsModalOpen(true);
//   };

//   const openView = (bed) => {
//     setViewingBed(bed);
//     setIsModalOpen(false);
//     setEditingBed(null);
//     setError("");
//   };

//   const closeView = () => {
//     setViewingBed(null);
//     setError("");
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingBed(null);
//     setError("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       if (editingBed) {
//         await updateBed(editingBed.id, formData);
//       } else {
//         await createBed(formData);
//       }

//       closeModal();
//       fetchBeds();
//     } catch (err) {
//       const msg =
//         err.response?.data?.detail ||
//         Object.values(err.response?.data || {})[0] ||
//         err.message ||
//         "Failed to save bed";
//       setError(Array.isArray(msg) ? msg.join(", ") : msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this bed?")) return;

//     setLoading(true);
//     try {
//       await deleteBed(id);
//       fetchBeds();
//     } catch (err) {
//       setError(err.response?.data?.detail || err.message || "Failed to delete");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusBadge = (status) => {
//     const normalized = String(status || "").toLowerCase();
//     if (normalized === "occupied") {
//       return "bg-red-100 text-red-700 border-red-200";
//     }
//     return "bg-green-100 text-green-700 border-green-200";
//   };

//   return (
//     <div className="hp-page">
//       <div className="hp-page-bg">
//         <div className="hp-blob hp-animate-float -top-24 -left-28 h-80 w-80 bg-gradient-to-br from-indigo-400/70 via-fuchsia-400/60 to-sky-400/60" />
//         <div
//           className="hp-blob hp-animate-float top-10 -right-24 h-72 w-72 bg-gradient-to-br from-emerald-400/60 via-cyan-400/60 to-indigo-400/50"
//           style={{ animationDelay: "-1.6s" }}
//         />
//       </div>

//       <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="min-w-0">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
//               Bed Management
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Manage ward/unit beds and availability.
//             </p>
//           </div>

//           <button
//             onClick={openAddModal}
//             className="hp-glow-btn hp-animate-pop inline-flex w-full sm:w-auto items-center justify-center gap-2
//            hp-btn-primary text-white px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300"
//           >
//             <Plus size={18} className="shrink-0" />
//             <span className="font-semibold">Add New Bed</span>
//           </button>
//         </div>

//         {/* Global error (not in view mode) */}
//         {error && !viewingBed && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
//             {error}
//           </div>
//         )}

//         {/* FORM PANEL */}
//         {isModalOpen ? (
//           <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 hp-animate-pop">
//             <div className="mb-5 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//                 {editingBed ? "Edit Bed" : "Add New Bed"}
//               </h2>
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="hp-action-btn hp-action-neutral hp-glow-btn w-full sm:w-auto px-3 py-2"
//               >
//                 Back to List
//               </button>
//             </div>

//             {error && (
//               <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
//                 <div className="min-w-0">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Ward/Unit Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="e.g. ICU"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>

//                 <div className="min-w-0">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Bed Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="bed_number"
//                     placeholder="e.g. 12"
//                     value={formData.bed_number}
//                     onChange={handleInputChange}
//                     required
//                     inputMode="numeric"
//                     className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>

//                 <div className="min-w-0 md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                     className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   >
//                     <option value="vacant">vacant</option>
//                     <option value="occupied">occupied</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl
//            hover:bg-primary transition-all duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl
//            hover:bg-success transition-all duration-200"
//                 >
//                   {loading ? "Saving..." : editingBed ? "Update Bed" : "Add Bed"}
//                 </button>
//               </div>
//             </form>
//           </div>

//         /* VIEW PANEL */
//         ) : viewingBed ? (
//           <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 hp-animate-pop">
//             <div className="mb-5 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Bed Details</h2>
//               <button
//                 type="button"
//                 onClick={closeView}
//                 className="hp-action-btn hp-action-neutral hp-glow-btn w-full sm:w-auto px-3 py-2"
//               >
//                 Back to List
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//               <div className="rounded-xl border border-gray-100 bg-white p-4">
//                 <div className="text-xs text-gray-500">Ward/Unit</div>
//                 <div className="mt-1 text-sm sm:text-base font-semibold text-gray-900 break-words">
//                   {viewingBed.name || "-"}
//                 </div>
//               </div>

//               <div className="rounded-xl border border-gray-100 bg-white p-4">
//                 <div className="text-xs text-gray-500">Bed Number</div>
//                 <div className="mt-1 text-sm sm:text-base font-semibold text-gray-900 break-words">
//                   {viewingBed.bed_number ?? "-"}
//                 </div>
//               </div>

//               <div className="rounded-xl border border-gray-100 bg-white p-4 sm:col-span-2">
//                 <div className="text-xs text-gray-500">Status</div>
//                 <div className="mt-2">
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${statusBadge(
//                       viewingBed.status
//                     )}`}
//                   >
//                     {(viewingBed.status || "vacant").toString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//         /* LIST VIEW */
//         ) : loading && beds.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">Loading beds…</div>
//         ) : (
//           <div className="hp-animate-pop space-y-4" style={{ animationDelay: "120ms" }}>
//             {/* Desktop/Tablet table (md and up) */}
//             <div className="hidden md:block hp-table-wrap">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-white/40 backdrop-blur">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
//                         Ward/Unit
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
//                         Bed Number
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
//                         Status
//                       </th>
//                       <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {beds.length === 0 ? (
//                       <tr>
//                         <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
//                           No beds found.
//                         </td>
//                       </tr>
//                     ) : (
//                       beds.map((bed) => (
//                         <tr key={bed.id} className="hover:bg-slate-50/80 transition-colors">
//                           <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
//                             {bed.name || "-"}
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
//                             {bed.bed_number ?? "-"}
//                           </td>
//                           <td className="px-6 py-4 text-sm whitespace-nowrap">
//                             <span
//                               className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${statusBadge(
//                                 bed.status
//                               )}`}
//                             >
//                               {(bed.status || "vacant").toString()}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex justify-end items-center gap-2 whitespace-nowrap">
//                               <button
//                                 onClick={() => openView(bed)}
//                                 className="hp-action-btn hp-action-neutral hp-glow-btn px-3 py-2"
//                                 title="View"
//                               >
//                                 <Eye size={14} className="shrink-0" />
//                                 <span className="hidden lg:inline">View</span>
//                               </button>
//                               <button
//                                 onClick={() => openEditModal(bed)}
//                                 className="hp-action-btn hp-action-edit hp-glow-btn px-3 py-2"
//                                 title="Edit"
//                               >
//                                 <Pencil size={14} className="shrink-0" />
//                                 <span className="hidden lg:inline">Edit</span>
//                               </button>
//                               <button
//                                 onClick={() => handleDelete(bed.id)}
//                                 className="hp-action-btn hp-action-danger hp-glow-btn px-3 py-2"
//                                 title="Delete"
//                               >
//                                 <Trash2 size={14} className="shrink-0" />
//                                 <span className="hidden lg:inline">Delete</span>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Mobile cards (below md) */}
//             <div className="md:hidden">
//               {beds.length === 0 ? (
//                 <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-gray-500">
//                   No beds found.
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-3">
//                   {beds.map((bed) => (
//                     <div
//                       key={bed.id}
//                       className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
//                     >
//                       <div className="flex items-start justify-between gap-3">
//                         <div className="min-w-0">
//                           <div className="text-xs text-gray-500">Ward/Unit</div>
//                           <div className="mt-1 text-base font-semibold text-gray-900 break-words">
//                             {bed.name || "-"}
//                           </div>

//                           <div className="mt-3 grid grid-cols-2 gap-3">
//                             <div className="min-w-0">
//                               <div className="text-xs text-gray-500">Bed #</div>
//                               <div className="mt-1 text-sm font-medium text-gray-800 break-words">
//                                 {bed.bed_number ?? "-"}
//                               </div>
//                             </div>
//                             <div className="min-w-0">
//                               <div className="text-xs text-gray-500">Status</div>
//                               <div className="mt-2">
//                                 <span
//                                   className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${statusBadge(
//                                     bed.status
//                                   )}`}
//                                 >
//                                   {(bed.status || "vacant").toString()}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Quick actions */}
//                         <div className="flex flex-col gap-2 shrink-0">
//                           <button
//                             onClick={() => openView(bed)}
//                             className="hp-action-btn hp-action-neutral hp-glow-btn px-3 py-2"
//                             title="View"
//                           >
//                             <Eye size={16} className="shrink-0" />
//                             <span>View</span>
//                           </button>
//                           <button
//                             onClick={() => openEditModal(bed)}
//                             className="hp-action-btn hp-action-edit hp-glow-btn px-3 py-2"
//                             title="Edit"
//                           >
//                             <Pencil size={16} className="shrink-0" />
//                             <span>Edit</span>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(bed.id)}
//                             className="hp-action-btn hp-action-danger hp-glow-btn px-3 py-2"
//                             title="Delete"
//                           >
//                             <Trash2 size={16} className="shrink-0" />
//                             <span>Delete</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { getBeds, createBed, updateBed, deleteBed } from "../services/bed.services";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import "./bed.css";

export default function Bed() {

   // STATE (Component Memory)

  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBed, setEditingBed] = useState(null);
  const [viewBed, setViewBed] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bed_number: "",
    status: "vacant",
  });

     // LOAD DATA ON PAGE LOAD

  useEffect(() => {
    loadBeds();
  }, []);

  const loadBeds = async () => {
    try {
      setLoading(true);
      const data = await getBeds();
      setBeds(data);
      setError("");
    } catch (err) {
      setError("Failed to load beds");
    } finally {
      setLoading(false);
    }
  };

     // FORM HANDLING

  const openAddForm = () => {
    setFormData({ name: "", bed_number: "", status: "vacant" });
    setEditingBed(null);
    setViewBed(null);
    setIsFormOpen(true);
  };

  const openEditForm = (bed) => {
    setFormData({
      name: bed.name,
      bed_number: bed.bed_number,
      status: bed.status,
    });
    setEditingBed(bed);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingBed(null);
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

      if (editingBed) {
        await updateBed(editingBed.id, formData);
      } else {
        await createBed(formData);
      }

      closeForm();
      loadBeds();
    } catch (err) {
      setError("Failed to save bed");
    } finally {
      setLoading(false);
    }
  };

    // VIEW & DELETE

  const openView = (bed) => {
    setViewBed(bed);
    setIsFormOpen(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this bed?")) return;

    try {
      await deleteBed(id);
      loadBeds();
    } catch {
      setError("Delete failed");
    }
  };

     // UI HELPERS

  const statusClass = (status) =>
    status === "occupied"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

    // UI RENDERING

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Bed Management</h1>
        <button onClick={openAddForm} className="bg-indigo-600 text-white px-4 py-2 rounded">
          <Plus size={16} /> Add Bed
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6">
          <input
            name="name"
            placeholder="Ward Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            name="bed_number"
            placeholder="Bed Number"
            value={formData.bed_number}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
          >
            <option value="vacant">Vacant</option>
            <option value="occupied">Occupied</option>
          </select>

          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editingBed ? "Update" : "Save"}
            </button>
            <button type="button" onClick={closeForm} className="px-4 py-2 border rounded">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* VIEW */}
      {viewBed && (
        <div className="bg-white p-4 rounded mb-6">
          <p><b>Ward:</b> {viewBed.name}</p>
          <p><b>Bed #:</b> {viewBed.bed_number}</p>
          <p className={`inline-block px-3 py-1 rounded ${statusClass(viewBed.status)}`}>
            {viewBed.status}
          </p>
          <br />
          <button onClick={() => setViewBed(null)} className="mt-3 underline">
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
              <th>Ward</th>
              <th>Bed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beds.map((bed) => (
              <tr key={bed.id} className="border-t">
                <td>{bed.name}</td>
                <td>{bed.bed_number}</td>
                <td>
                  <span className={`px-2 py-1 rounded ${statusClass(bed.status)}`}>
                    {bed.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button onClick={() => openView(bed)}><Eye size={16} /></button>
                  <button onClick={() => openEditForm(bed)}><Pencil size={16} /></button>
                  <button onClick={() => deleteItem(bed.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
