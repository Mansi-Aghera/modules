// /* 
// states
// load data
// form 
// submit
// view
// delete
// */

// import React from 'react'
// import { Eye, Pencil, Trash2, Plus } from "lucide-react";
// import "./bed.css";
// import { useState, useEffect } from 'react';
// import {
//   getCounsellor,
//   createCounsellor,
//   updateCounsellor,
//   deleteCounsellor,
// } from "../services/counsellor.service";


// const counsellor = () => {

//   // pela list aavse api thi pachi load thase ane agar loading ma problem aavse to error batavse 
//   const [counsellor, setCounsellor] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
  
//   // pachi add kariye atle form open thase add thya pachi aapde edit ane view kari saksu
//   const [isFormOpen, setIsFormOpen] = useState(false)
//   const [isEditing, setEditing] = useState(null)
//   const [view, setView] = useState(null)
  
//   // api ma thi shu joye che form ma 
//   const [formData, setFormData] = useState({
//             full_name: "",
//             mobile: "",
//             email: "",
//             password: "",
//   })


//   // api loading 
//   useEffect(() => {
//   loadCounsellor();
//   }, [])


//   // data loading na criteria
//   const loadCounsellor = async ()  => {
//     try {
//       setLoading(true);
//       const data = await getAll();
//       setCounsellor(data);
//     }
//     catch{
//       setError("Loading failed")
//     }
//     finally{
//       setLoading(false)
//     }
//   };

//   // hve pela to form ne handle karvanu 
   
//   const openAddForm = () => {
//     setFormData({  full_name: "",
//             mobile: "",
//             email: "",
//           }),
//     setIsFormOpen(true),
//     setEditing(null),
//     setView(null)
//   }
//   const openEDitForm = (counsellor) => {
//      setFormData({
//       full_name: counsellor.full_name,
//       mobile: counsellor.mobile,
//       email: counsellor.email,
//     });
//     setEditing(counsellor);
//     setIsFormOpen(true);
//   }
//   const closeForm = () => {
//     setIsFormOpen(false);
//     setEditing(null);
//     setError("");
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((old) => ({ ...old, [name]: value }));
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//         try {
//           setLoading(true);
    
//           const payload = {
//             full_name: formData.full_name,
//             mobile: formData.mobile,
//             email: formData.email,
//           };
    
//           if (isEditing) {
//             await updateCounsellor(isEditing.id, payload);
//           } else {
//             await createCounsellor(payload);
//           }
    
//           closeForm();
//           loadCounsellor(); // 👈 UI refresh
//         } catch (err) {
//           console.log("Counsellor SAVE ERROR 👉", err.response?.data);
//           setError("Failed to save FAQ");
//         } finally {
//           setLoading(false);
//         }
//   }

//   // view ane delete 
//   const openView = (counsellor) => {
//       setView(counsellor);
//     setIsFormOpen(false);
//   };
//   const deleteItem = async (id) => {
//     if (!window.confirm("Delete this counsellor?")) return;
//         try {
//           await deleteCounsellor(id);
//           loadCounsellor();
//         } catch {
//           setError("Delete failed");
//         }
//   };

//   /* 
//   header
//   error
//   form 
//   view 
//   list
//   */

//   return (
//     <div>
//     <div className="p-6 max-w-6xl mx-auto">

//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Counsellor Management</h1>
//         <button
//           onClick={openAddForm}
//           className="bg-indigo-600 text-white px-4 py-2 rounded"
//         >
//           <Plus size={16} /> Add Counsellor
//         </button>
//       </div>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       {/* FORM */}
//       {isFormOpen && (
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6">
//           <input
//             name="Full Name"
//             placeholder="Full Name"
//             value={formData.full_name}
//             onChange={handleChange}
//             className="border p-2 w-full mb-3"
//             required
//           />

//           <input
//             name="Mobile"
//             placeholder="Mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             className="border p-2 w-full mb-3"
//             required
//           />

//           <input
//             name="Email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border p-2 w-full mb-3"
//             required
//           />
          
//           <div className="flex gap-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded">
//               {isEditing ? "Update" : "Save"}
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
//       {view && (
//         <div className="bg-white p-4 rounded mb-6">
//           <p><b>Question:</b> {view.question}</p>
//           <p className="mt-2"><b>Answer:</b> {view.answer}</p>
//           <button onClick={() => setView(null)} className="mt-3 underline">
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
//               <th>Full Name</th>
//               <th>Mobile</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {counsellor.length === 0 ? (
//               <tr>
//                 <td colSpan="2" className="text-center py-4">
//                   No Counsellor found
//                 </td>
//               </tr>
//             ) : (
//               faqs.map((counsellor) => (
//                 <tr key={counsellor.id} className="border-t">
//                   <td>{counsellor.full_name}</td>
//                   <td className="flex gap-2">
//                     <button onClick={() => openView(faq)}><Eye size={16} /></button>
//                     <button onClick={() => openEditForm(faq)}><Pencil size={16} /></button>
//                     <button onClick={() => deleteItem(faq.id)}><Trash2 size={16} /></button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//     </div>
//   )
// }

// export default counsellor

import { useEffect, useState } from "react";
import {
  getCounsellor,
  createCounsellor,
  updateCounsellor,
  deleteCounsellor,
} from "../services/counsellor.service";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import "./bed.css";

export default function Counsellor() {

  // ================= STATE =================
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCounsellor, setEditingCounsellor] = useState(null);
  const [viewCounsellor, setViewCounsellor] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
  });

  // ================= LOAD COUNSELLORS =================
  useEffect(() => {
    loadCounsellors();
  }, []);

  const loadCounsellors = async () => {
    try {
      setLoading(true);
      const data = await getCounsellor(); // 👈 ARRAY
      console.log("COUNSELLORS 👉", data);
      setCounsellors(data);
      setError("");
    } catch {
      setError("Failed to load counsellors");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORM =================
  const openAddForm = () => {
    setFormData({ full_name: "", mobile: "", email: "" });
    setEditingCounsellor(null);
    setViewCounsellor(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setFormData({
      full_name: item.full_name,
      mobile: item.mobile,
      email: item.email,
    });
    setEditingCounsellor(item);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCounsellor(null);
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

      if (editingCounsellor) {
        await updateCounsellor(editingCounsellor.id, formData);
      } else {
        await createCounsellor(formData);
      }

      closeForm();
      loadCounsellors(); // 👈 UI refresh
    } catch (err) {
      console.log("COUNSELLOR SAVE ERROR 👉", err.response?.data);
      setError("Failed to save counsellor");
    } finally {
      setLoading(false);
    }
  };

  // ================= VIEW & DELETE =================
  const openView = (item) => {
    setViewCounsellor(item);
    setIsFormOpen(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this counsellor?")) return;
    try {
      await deleteCounsellor(id);
      loadCounsellors();
    } catch {
      setError("Delete failed");
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Counsellor Management</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          <Plus size={16} /> Add Counsellor
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded mb-6">
          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3"
            required
          />

          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editingCounsellor ? "Update" : "Save"}
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
      {viewCounsellor && (
        <div className="bg-white p-4 rounded mb-6">
          <p><b>Name:</b> {viewCounsellor.full_name}</p>
          <p><b>Mobile:</b> {viewCounsellor.mobile}</p>
          <p><b>Email:</b> {viewCounsellor.email}</p>
          <button onClick={() => setViewCounsellor(null)} className="mt-3 underline">
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
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {counsellors.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No counsellors found
                </td>
              </tr>
            ) : (
              counsellors.map((item) => (
                <tr key={item.id} className="border-t">
                  <td>{item.full_name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td className="flex gap-2">
                    <button onClick={() => openView(item)}><Eye size={16} /></button>
                    <button onClick={() => openEditForm(item)}><Pencil size={16} /></button>
                    <button onClick={() => deleteItem(item.id)}><Trash2 size={16} /></button>
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
