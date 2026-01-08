
// import { useEffect, useState } from "react";
// import { getDashboardStats } from "../services/dashboard.service";
// import {
//   Folder,
//   BookOpen,
//   Layers,
//   FileText,
//   HelpCircle,
//   MessageSquare,
// } from "lucide-react";


// export default function Dashboard() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const data = await getDashboardStats();
//       setStats(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   const StatCard = ({ title, value, icon, color }) => (
//   <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
//     <div className="card h-100">
//       <div className="card-body d-flex justify-content-between align-items-center">
//         <div>
//           <h6 className="text-uppercase text-muted mb-2">{title}</h6>
//           <h2 className="mb-0 fw-bold">{value}</h2>
//         </div>

//         <div
//           style={{
//             width: 56,
//             height: 56,
//             borderRadius: 14,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             background: color,
//           }}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   </div>
// );


//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* PAGE HEADER */}
//       <div className="page-header mb-4">
//         <h1>Dashboard</h1>
//       </div>

//       {/* STATS GRID */}
//       <div className="row">
//         <StatCard
//           title="Categories"
//           value={stats.categories}
//           color="linear-gradient(135deg, #6366f1, #4338ca)"
//           icon={<Folder size={28} color="#fff" />}
//         />

//         <StatCard
//           title="Courses"
//           value={stats.courses}
//           color="linear-gradient(135deg, #16a34a, #15803d)"
//           icon={<BookOpen size={28} color="#fff" />}
//         />

//         <StatCard
//           title="Modules"
//           value={stats.modules}
//           color="linear-gradient(135deg, #f59e0b, #b45309)"
//           icon={<Layers size={28} color="#fff" />}
//         />

//         <StatCard
//           title="Topics"
//           value={stats.topics}
//           color="linear-gradient(135deg, #0ea5e9, #0369a1)"
//           icon={<Layers size={28} color="#fff" />}
//         />

//         <StatCard
//           title="Articles"
//           value={stats.articles}
//           color="linear-gradient(135deg, #ef4444, #b91c1c)"
//           icon={<FileText size={28} color="#fff" />}
//         />

//         <StatCard
//           title="FAQs"
//           value={stats.faqs}
//           color="linear-gradient(135deg, #6b7280, #374151)"
//           icon={<HelpCircle size={28} color="#fff" />}
//         />

//         <StatCard
//           title="Testimonials"
//           value={stats.testimonials}
//           color="linear-gradient(135deg, #8b5cf6, #6d28d9)"
//           icon={<MessageSquare size={28} color="#fff" />}
//         />
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboard.service";
import {
  Folder,
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ navigation hook

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // ✅ CLICKABLE STAT CARD
  const StatCard = ({ title, value, icon, color, to }) => (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
      <div
        className="card h-100"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(to)}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-uppercase text-muted mb-2">{title}</h6>
            <h2 className="mb-0 fw-bold">{value}</h2>
          </div>

          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: color,
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* PAGE HEADER */}
      <div className="page-header mb-4">
        <h1>Dashboard</h1>
      </div>

      {/* STATS GRID */}
      <div className="row">
        <StatCard
          title="Categories"
          value={stats.categories}
          to="/categorgy"
          color="linear-gradient(135deg, #6366f1, #4338ca)"
          icon={<Folder size={28} color="#fff" />}
        />

        <StatCard
          title="Courses"
          value={stats.courses}
          to="/course"
          color="linear-gradient(135deg, #16a34a, #15803d)"
          icon={<BookOpen size={28} color="#fff" />}
        />

        <StatCard
          title="Modules"
          value={stats.modules}
          to="/modules"
          color="linear-gradient(135deg, #f59e0b, #b45309)"
          icon={<Layers size={28} color="#fff" />}
        />

        <StatCard
          title="Topics"
          value={stats.topics}
          to="/topics"
          color="linear-gradient(135deg, #0ea5e9, #0369a1)"
          icon={<Layers size={28} color="#fff" />}
        />

        <StatCard
          title="Articles"
          value={stats.articles}
          to="/articles"
          color="linear-gradient(135deg, #ef4444, #b91c1c)"
          icon={<FileText size={28} color="#fff" />}
        />

        <StatCard
          title="FAQs"
          value={stats.faqs}
          to="/faqs"
          color="linear-gradient(135deg, #6b7280, #374151)"
          icon={<HelpCircle size={28} color="#fff" />}
        />

        <StatCard
          title="Testimonials"
          value={stats.testimonials}
          to="/testimonials"
          color="linear-gradient(135deg, #8b5cf6, #6d28d9)"
          icon={<MessageSquare size={28} color="#fff" />}
        />
      </div>
    </div>
  );
}
