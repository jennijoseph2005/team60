import React from 'react';
import { FiUsers, FiTrendingUp, FiFileText, FiClock, FiBarChart2 } from 'react-icons/fi';
import './HODDashboard.css';

const HODDashboard = () => {
  // Sample data
  const departmentStats = {
    totalFaculty: 24,
    newHires: 3,
    vacancies: 2,
    avgPerformance: 4.2
  };

  const recruitmentData = [
    { id: 1, position: 'Assistant Professor - AI', status: 'Interview Stage', applicants: 12 },
    { id: 2, position: 'Associate Professor - Data Science', status: 'Application Review', applicants: 8 },
    { id: 3, position: 'Professor - Cybersecurity', status: 'Position Open', applicants: 5 }
  ];

  const performanceData = [
    { name: 'Dr. Anita Sharma', teaching: 4.5, research: 4.2, service: 3.8, overall: 4.2 },
    { name: 'Prof. Rajiv Verma', teaching: 4.1, research: 4.5, service: 4.0, overall: 4.2 },
    { name: 'Dr. Sunita Patel', teaching: 4.3, research: 3.9, service: 4.5, overall: 4.2 },
    { name: 'Dr. Arjun Kumar', teaching: 3.9, research: 4.1, service: 3.7, overall: 3.9 }
  ];

  return (
    <div className="hod-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>HOD Dashboard</h1>
          <p>Computer Science Department</p>
        </div>
        <div className="header-right">
          <button className="action-button">
            <FiBarChart2 /> Generate Report
          </button>
        </div>
      </header>

      {/* Department Overview */}
      <section className="department-overview">
        <div className="stats-card">
          <FiUsers className="stat-icon" />
          <div>
            <h3>Total Faculty</h3>
            <p className="stat-value">{departmentStats.totalFaculty}</p>
          </div>
        </div>
        <div className="stats-card">
          <FiTrendingUp className="stat-icon" />
          <div>
            <h3>New Hires (This Year)</h3>
            <p className="stat-value">{departmentStats.newHires}</p>
          </div>
        </div>
        <div className="stats-card">
          <FiFileText className="stat-icon" />
          <div>
            <h3>Current Vacancies</h3>
            <p className="stat-value">{departmentStats.vacancies}</p>
          </div>
        </div>
        <div className="stats-card">
          <FiClock className="stat-icon" />
          <div>
            <h3>Avg. Performance</h3>
            <p className="stat-value">{departmentStats.avgPerformance}/5.0</p>
          </div>
        </div>
      </section>

      {/* Recruitment Section */}
      <section className="recruitment-section">
        <h2>
          <FiUsers /> Recruitment Pipeline
        </h2>
        <div className="recruitment-table">
          <div className="table-header">
            <div className="col position">Position</div>
            <div className="col status">Status</div>
            <div className="col applicants">Applicants</div>
            <div className="col actions">Actions</div>
          </div>
          {recruitmentData.map((position) => (
            <div className="table-row" key={position.id}>
              <div className="col position">{position.position}</div>
              <div className="col status">
                <span className={`status-badge ${position.status.replace(' ', '-').toLowerCase()}`}>
                  {position.status}
                </span>
              </div>
              <div className="col applicants">{position.applicants}</div>
              <div className="col actions">
                <button className="view-button">View</button>
                <button className="manage-button">Manage</button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-position-button">
          + Add New Position
        </button>
      </section>

      {/* Faculty Performance Analytics */}
      <section className="performance-section">
        <h2>
          <FiTrendingUp /> Faculty Performance Analytics
        </h2>
        <div className="performance-table">
          <div className="table-header">
            <div className="col faculty">Faculty Member</div>
            <div className="col metric">Teaching</div>
            <div className="col metric">Research</div>
            <div className="col metric">Service</div>
            <div className="col metric">Overall</div>
          </div>
          {performanceData.map((faculty, index) => (
            <div className="table-row" key={index}>
              <div className="col faculty">{faculty.name}</div>
              <div className="col metric">
                <div className="metric-bar" style={{ width: `${faculty.teaching * 20}%` }}></div>
                <span>{faculty.teaching}</span>
              </div>
              <div className="col metric">
                <div className="metric-bar" style={{ width: `${faculty.research * 20}%` }}></div>
                <span>{faculty.research}</span>
              </div>
              <div className="col metric">
                <div className="metric-bar" style={{ width: `${faculty.service * 20}%` }}></div>
                <span>{faculty.service}</span>
              </div>
              <div className="col metric">
                <div className="metric-bar overall" style={{ width: `${faculty.overall * 20}%` }}></div>
                <span>{faculty.overall}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="performance-filters">
          <select className="filter-select">
            <option>All Faculty</option>
            <option>Professors</option>
            <option>Associate Professors</option>
            <option>Assistant Professors</option>
          </select>
          <select className="filter-select">
            <option>Current Semester</option>
            <option>Last Semester</option>
            <option>This Academic Year</option>
          </select>
        </div>
      </section>
    </div>
  );
};

export default HODDashboard;
