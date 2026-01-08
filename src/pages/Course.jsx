import { useEffect, useState } from "react";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courses.service";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import "./bed.css";
import { getCategories } from "../services/category.service";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [categories, setCategories] = useState([]);

  const EMPTY_FORM = {
    name: "",
    category: "",
    text: "",
    duration: "",
    lecture: "",
    students: "",
    level: "",
    language: "",
    certificate: "No",
    image: null,
    banner_img: null,
    pdf_file: null,
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    loadCourses();
    loadCategories();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data || []);
    } catch {
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setFormData({
      name: item.name || "",
      category: item.category || "", // ✅ IMPORTANT
      text: item.text || "",
      duration: item.duration || "",
      lecture: item.lecture || "",
      students: item.students || "",
      level: item.level || "",
      language: item.language || "",
      certificate: item.certificate || "No",
      image: null,
      banner_img: null,
      pdf_file: null,
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
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // 🔥 DO NOT SEND empty / null values
      if (value === null) return;

      if (key === "certificate") {
        payload.append("certificate", value === "Yes");
      } else if (["duration", "lecture", "students"].includes(key)) {
        payload.append(key, Number(value));
      } else {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      if (editingItem) {
        await updateCourse(editingItem.id, payload);
      } else {
        await createCourse(payload);
      }
      closeForm();
      loadCourses();
    } catch (err) {
      setError("Save failed");

      console.log("FULL ERROR:", err);
      console.log("BACKEND RESPONSE:", err.response?.data);
      alert(JSON.stringify(err.response?.data, null, 2));
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const openView = (course) => {
    setViewCourse(course);
    setIsFormOpen(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await deleteCourse(id);
    loadCourses();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button
          onClick={openAddForm}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 align-items-center"
        >
          <Plus size={16} className="d-flex align-item-center" /> Add Course
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* FORM */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-6"
        >
          {/* NAME */}
          <div>
            <label className="block mb-1 font-medium">Course Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter course name"
              required
            />
          </div>

          {/* DURATION */}
          <div>
            <label className="block mb-1 font-medium">Duration</label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 10 hours"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Course description"
            />
          </div>

          {/* LECTURES */}
          <div>
            <label className="block mb-1 font-medium">Lectures</label>
            <input
              name="lecture"
              value={formData.lecture}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Total lectures"
            />
          </div>

          {/* STUDENTS */}
          <div>
            <label className="block mb-1 font-medium">Students</label>
            <input
              name="students"
              value={formData.students}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Total students"
            />
          </div>

          {/* LEVEL */}
          <div>
            <label className="block mb-1 font-medium">Level</label>
            <input
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Beginner / Advanced"
            />
          </div>

          {/* LANGUAGE */}
          <div>
            <label className="block mb-1 font-medium">Language</label>
            <input
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Course language"
            />
          </div>

          {/* categorgy */}
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* CERTIFICATE */}
          <div>
            <label className="block mb-1 font-medium">Certificate</label>
            <select
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-1 font-medium">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload thumbnail image</p>
          </div>

          {/* BANNER IMAGE */}
          <div>
            <label className="block mb-1 font-medium">Banner Image</label>
            <input
              type="file"
              name="banner_img"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Upload banner image</p>
          </div>

          {/* PDF */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Course PDF</label>
            <input
              type="file"
              name="pdf_file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload course material PDF
            </p>
          </div>

          {/* ACTIONS */}
          <div className="col-span-2 flex gap-3">
            <button className="bg-green-600 text-white px-6 py-2 rounded">
              {editingItem ? "Update Course" : "Save Course"}
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
      {viewCourse && (
        <div className="bg-white p-6 rounded mb-6 grid grid-cols-2 gap-4">
          <div>
            <b>Name:</b> {viewCourse.name}
          </div>

          <div>
            <b>Category:</b> {viewCourse.category_details?.name}
          </div>

          <div className="col-span-2">
            <b>Description:</b> {viewCourse.text}
          </div>

          <div>
            <b>Duration:</b> {viewCourse.duration}
          </div>
          <div>
            <b>Lectures:</b> {viewCourse.lecture}
          </div>

          <div>
            <b>Students:</b> {viewCourse.students}
          </div>
          <div>
            <b>Level:</b> {viewCourse.level}
          </div>

          <div>
            <b>Language:</b> {viewCourse.language}
          </div>
          <div>
            <b>Certificate:</b> {viewCourse.certificate}
          </div>

          {/* IMAGE */}
          <div>
            <b>Course Image:</b>
            <br />
            {viewCourse.image && (
              <img
                src={viewCourse.image}
                alt="course"
                className="w-10 mt-2 border img"
              />
            )}
          </div>
          {/* BANNER IMAGE */}
          {viewCourse.banner_img && (
            <div className="col-span-2">
              <b>Banner Image:</b>
              <br />
              <img
                src={viewCourse.banner_img}
                alt="banner"
                className="w-full max-w-md mt-2 border img"
              />
            </div>
          )}

          {/* PDF */}
          <div className="col-span-2">
            <b>PDF:</b>{" "}
            {viewCourse.pdf_file ? (
              <a
                href={viewCourse.pdf_file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View PDF
              </a>
            ) : (
              "No PDF"
            )}
          </div>

          <div className="col-span-2">
            <button
              onClick={() => setViewCourse(null)}
              className="mt-4 underline text-blue-600"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* TABLE (UNCHANGED) */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Image</th>
              <th>Banner</th>
              <th>PDF</th>
              <th>Duration</th>
              <th>Lectures</th>
              <th>Students</th>
              <th>Level</th>
              <th>Language</th>
              <th>Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td>{item.name}</td>
                <td>
                  {item.image && <img src={item.image} className="img" />}
                </td>
                <td>
                  {item.banner_img ? (
                    <img src={item.banner_img} className="img" />
                  ) : (
                    <span className="text-gray-400 text-xs">No Banner</span>
                  )}
                </td>
                <td>
                  {item.pdf_file && (
                    <a
                      href={item.pdf_file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  )}
                </td>
                <td>{item.duration}</td>
                <td>{item.lecture}</td>
                <td>{item.students}</td>
                <td>{item.level}</td>
                <td>{item.language}</td>
                <td>{item.certificate}</td>
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
