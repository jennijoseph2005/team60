import React, { useState, useEffect } from 'react';
import { FiUsers, FiFileText, FiLogOut, FiPlus, FiDownload } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [publications, setPublications] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyRes = await fetch('http://localhost:5000/faculty');
        const facultyJson = await facultyRes.json();
        setFacultyData(Array.isArray(facultyJson) ? facultyJson : facultyJson.data || []);

        const pubRes = await fetch('http://localhost:5000/publications');
        const pubJson = await pubRes.json();
        setPublications(Array.isArray(pubJson) ? pubJson : pubJson.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wireframe-container">
      <header className="top-nav">
        <div className="nav-left">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="nav-right">
          <button className="nav-btn active">
            <FiUsers /> Faculty List
          </button>
          <button className="nav-btn">
            <FiFileText /> Reports
          </button>
          <button className="nav-btn logout">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Faculty Summary</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-value">{facultyData?.length || 0}</span>
                <span className="stat-label">Total Faculty</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">92%</span>
                <span className="stat-label">Avg Attendance</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Recent Publications</h3>
            <div className="publications-list">
              {Array.isArray(publications) && publications.slice(0, 3).map((pub, index) => (
                <div key={pub._id || index} className="publication-item">
                  <div className="pub-title">{pub.title}</div>
                  <div className="pub-meta">{pub.author}, {pub.year}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="quick-actions">
            <button className="action-btn">
              <FiPlus /> Add Faculty
            </button>
            <button className="action-btn">
              <FiDownload /> Generate Reports
            </button>
          </div>

          {/* 🚀 FULL FACULTY LIST */}
          <div className="faculty-table">
            <h2>All Faculty</h2>
            <div className="table-header">
              <div className="col name">Name</div>
              <div className="col dept">Department</div>
              <div className="col designation">Designation</div>
              <div className="col email">Email</div>
              <div className="col actions">Actions</div>
            </div>
            {Array.isArray(facultyData) && facultyData.length > 0 ? (
              facultyData.map((faculty) => (
                <div className="table-row" key={faculty._id}>
                  <div className="col name">{faculty.first_name} {faculty.last_name}</div>
                  <div className="col dept">{faculty.department || '—'}</div>
                  <div className="col designation">{faculty.designation || '—'}</div>
                  <div className="col email">{faculty.email_address || 'N/A'}</div>
                  <div className="col actions">
                    <button className="view-btn" onClick={() => setSelectedFaculty(faculty)}>View</button>
                    <button className="edit-btn">Edit</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-row">
                <div className="col" colSpan={5}>No faculty data available.</div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 🔍 FACULTY DETAILS MODAL */}
      {selectedFaculty && (
        <div className="modal-overlay" onClick={() => setSelectedFaculty(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Faculty Details</h2>
            <div className="modal-body">
              {Object.entries(selectedFaculty).map(([key, value]) => (
                <div key={key} className="field-row">
                  <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> <span>{value || 'N/A'}</span>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setSelectedFaculty(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
