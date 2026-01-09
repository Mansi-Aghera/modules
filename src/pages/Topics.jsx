// import { useEffect, useState } from "react";
// import {
//   getTopics,
//   createTopic,
//   updateTopic,
//   deleteTopic,
// } from "../services/topics.service";
// import { Plus, Pencil, Trash2, Eye } from "lucide-react";

// export default function Topics() {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [viewItem, setViewItem] = useState(null);

//   const [name, setName] = useState("");

//   useEffect(() => {
//     loadTopics();
//   }, []);

//   const loadTopics = async () => {
//     setLoading(true);
//     const data = await getTopics();
//     setTopics(data || []);
//     setLoading(false);
//   };

//   const openAddForm = () => {
//     setName("");
//     setEditingItem(null);
//     setIsFormOpen(true);
//   };

//   const openEditForm = (item) => {
//     setName(item.name);
//     setEditingItem(item);
//     setIsFormOpen(true);
//   };

//   const openView = (item) => {
//     setViewItem(item);
//     setIsFormOpen(false);
//   };

//   const closeView = () => {
//     setViewItem(null);
//   };

//   const closeForm = () => {
//     setIsFormOpen(false);
//     setEditingItem(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { name };

//     if (editingItem) {
//       await updateTopic(editingItem.id, payload);
//     } else {
//       await createTopic(payload);
//     }

//     closeForm();
//     loadTopics();
//   };

//   const deleteItem = async (id) => {
//     if (!window.confirm("Delete topic?")) return;
//     await deleteTopic(id);
//     loadTopics();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Topics</h1>
//         <button
//           onClick={openAddForm}
//           className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 items-center"
//         >
//           <Plus size={16} /> Add Topic
//         </button>
//       </div>

//       {/* FORM */}
//       {isFormOpen && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-6"
//         >
//           <div className="col-span-2">
//             <label className="block mb-1 font-medium">Name</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter topic name"
//               required
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div className="col-span-2 flex gap-3">
//             <button className="bg-green-600 text-white px-6 py-2 rounded">
//               {editingItem ? "Update Topic" : "Save Topic"}
//             </button>

//             <button
//               type="button"
//               onClick={closeForm}
//               className="border px-6 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* VIEW */}
//       {viewItem && (
//         <div className="bg-white p-6 rounded mb-6 max-w-md">
//           <p>
//             <b>ID:</b> {viewItem.id}
//           </p>
//           <p className="mt-2">
//             <b>Name:</b> {viewItem.name}
//           </p>

//           <button onClick={closeView} className="underline text-blue-600 mt-4">
//             Back
//           </button>
//         </div>
//       )}

//       {/* TABLE */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th>ID</th>
//               <th>Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {topics.map((t) => (
//               <tr key={t.id} className="border-t text-center">
//                 <td>{t.id}</td>
//                 <td>{t.name}</td>
//                 <td className="flex gap-2 justify-center">
//                   <button onClick={() => openView(t)}>
//                     <Eye size={16} />
//                   </button>
//                   <button onClick={() => openEditForm(t)}>
//                     <Pencil size={16} />
//                   </button>
//                   <button onClick={() => deleteItem(t.id)}>
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../services/topics.service";
import { getModules } from "../services/modules.service";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

export default function Topics() {
  const [data, setData] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const [name, setName] = useState("");
  const [moduleId, setModuleId] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const topicsData = await getTopics();
    const modulesData = await getModules();
    setData(topicsData || []);
    setModules(modulesData || []);
    setLoading(false);
  };

  const openAddForm = () => {
    setName("");
    setModuleId("");
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (topic, module) => {
    setName(topic.name);
    setModuleId(module.module_id);
    setEditingItem({ ...topic, module_id: module.module_id });
    setIsFormOpen(true);
  };

  const openView = (topic, module) => {
    setViewItem({ ...topic, module });
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

    const payload = {
      name,
      module: moduleId,
    };

    if (editingItem) {
      await updateTopic(editingItem.id, payload);
    } else {
      await createTopic(payload);
    }

    closeForm();
    loadAll();
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete topic?")) return;
    await deleteTopic(id);
    loadAll();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Topics</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 flex align-items-center"
        >
          <Plus size={16} /> Add Topic
        </button>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-6"
        >
          {/* MODULE */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Module</label>
            <select
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Module</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* NAME */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Topic Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* ACTIONS */}
          <div className="col-span-2 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-2 rounded">
              {editingItem ? "Update Topic" : "Save Topic"}
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
        <div className="bg-white p-6 rounded mb-6 max-w-md shadow">
          <p>
            <b>ID:</b> {viewItem.id}
          </p>

          <p className="mt-2">
            <b>Name:</b> {viewItem.name}
          </p>

          <p className="mt-2">
            <b>Module:</b> {viewItem.module.module_name}
          </p>

          <button onClick={closeView} className="mt-4 underline text-blue-600">
            Back
          </button>
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((module) => (
          <div key={module.module_id} className="mb-6">
            <h5 className="font-bold mb-2">{module.module_name}</h5>

            <table className="w-full border">
              <thead>
                <tr>
                  <th style={{ width: "33%" }}>ID</th>
                  <th style={{ width: "33%" }}>Name</th>
                  <th style={{ width: "34%" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {module.topics.map((t) => (
                  <tr key={t.id} className="border-t text-center">
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td className="flex gap-2 justify-center">
                      <button onClick={() => openView(t, module)}>
                        <Eye size={16} />
                      </button>
                      <button onClick={() => openEditForm(t, module)}>
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteItem(t.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
