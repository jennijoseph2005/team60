import React, { useState } from 'react';
import { FiUser, FiBook, FiCalendar, FiPieChart, FiClock, FiDownload } from 'react-icons/fi';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [facultyData] = useState({
    name: "Dr. Priya Sharma",
    department: "Computer Science",
    email: "priya.sharma@university.edu",
    phone: "+91 9876543210",
    joinDate: "15 March 2018",
    designation: "Associate Professor",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg"
  });

  const [researchData] = useState([
    { id: 1, title: "Machine Learning in Education", journal: "IEEE Transactions", year: 2023, status: "Published" },
    { id: 2, title: "AI for Social Good", journal: "ACM Journal", year: 2022, status: "Published" },
    { id: 3, title: "Neural Network Optimization", journal: "Springer", year: 2023, status: "Under Review" }
  ]);

  const [attendanceData] = useState({
    present: 42,
    absent: 3,
    leave: 2,
    percentage: 89.4
  });

  const [workloadData] = useState([
    { course: "CS-201: Data Structures", hours: 12, students: 45 },
    { course: "CS-305: Algorithm Design", hours: 8, students: 32 },
    { course: "CS-410: Machine Learning", hours: 6, students: 28 }
  ]);

  return (
    <div className="faculty-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
        <div className="header-actions">
          <button className="download-btn">
            <FiDownload /> Export Data
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <div className="profile-summary">
            <img src={facultyData.profilePic} alt="Profile" className="profile-pic" />
            <h3>{facultyData.name}</h3>
            <p>{facultyData.designation}</p>
            <p className="department">{facultyData.department}</p>
          </div>

          <ul className="nav-menu">
            <li 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser /> Profile Summary
            </li>
            <li 
              className={activeTab === 'research' ? 'active' : ''}
              onClick={() => setActiveTab('research')}
            >
              <FiBook /> Research
            </li>
            <li 
              className={activeTab === 'attendance' ? 'active' : ''}
              onClick={() => setActiveTab('attendance')}
            >
              <FiCalendar /> Attendance
            </li>
            <li 
              className={activeTab === 'workload' ? 'active' : ''}
              onClick={() => setActiveTab('workload')}
            >
              <FiClock /> Workload
            </li>
            <li 
              className={activeTab === 'analytics' ? 'active' : ''}
              onClick={() => setActiveTab('analytics')}
            >
              <FiPieChart /> Analytics
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Profile Summary</h2>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{facultyData.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Designation:</span>
                  <span className="detail-value">{facultyData.designation}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department:</span>
                  <span className="detail-value">{facultyData.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{facultyData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{facultyData.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Joining Date:</span>
                  <span className="detail-value">{facultyData.joinDate}</span>
                </div>
              </div>

              <div className="quick-stats">
                <div className="stat-card">
                  <h3>Research Papers</h3>
                  <p className="stat-value">{researchData.length}</p>
                  <p className="stat-label">Total Publications</p>
                </div>
                <div className="stat-card">
                  <h3>Attendance</h3>
                  <p className="stat-value">{attendanceData.percentage}%</p>
                  <p className="stat-label">This Semester</p>
                </div>
                <div className="stat-card">
                  <h3>Workload</h3>
                  <p className="stat-value">
                    {workloadData.reduce((sum, course) => sum + course.hours, 0)} hrs
                  </p>
                  <p className="stat-label">Weekly</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="research-section">
              <h2>Research Publications</h2>
              <div className="research-list">
                {researchData.map(paper => (
                  <div key={paper.id} className="research-item">
                    <h3 className="paper-title">{paper.title}</h3>
                    <div className="paper-meta">
                      <span className="journal">{paper.journal}</span>
                      <span className="year">{paper.year}</span>
                      <span className={`status ${paper.status.toLowerCase().replace(' ', '-')}`}>
                        {paper.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="add-publication">
                + Add New Publication
              </button>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="attendance-section">
              <h2>Attendance Record</h2>
              <div className="attendance-stats">
                <div className="attendance-card present">
                  <h3>Present</h3>
                  <p className="count">{attendanceData.present}</p>
                  <p className="label">Days</p>
                </div>
                <div className="attendance-card absent">
                  <h3>Absent</h3>
                  <p className="count">{attendanceData.absent}</p>
                  <p className="label">Days</p>
                </div>
                <div className="attendance-card leave">
                  <h3>Leave</h3>
                  <p className="count">{attendanceData.leave}</p>
                  <p className="label">Days</p>
                </div>
                <div className="attendance-card percentage">
                  <h3>Attendance %</h3>
                  <p className="count">{attendanceData.percentage}%</p>
                  <p className="label">This Semester</p>
                </div>
              </div>

              <div className="attendance-chart">
                <h3>Monthly Attendance Trend</h3>
                <div className="chart-placeholder">
                  {/* This would be replaced with an actual chart component */}
                  [Attendance Chart Visualization]
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workload' && (
            <div className="workload-section">
              <h2>Teaching Workload</h2>
              <div className="workload-summary">
                <div className="summary-card">
                  <h3>Total Courses</h3>
                  <p className="value">{workloadData.length}</p>
                </div>
                <div className="summary-card">
                  <h3>Weekly Hours</h3>
                  <p className="value">
                    {workloadData.reduce((sum, course) => sum + course.hours, 0)}
                  </p>
                </div>
                <div className="summary-card">
                  <h3>Total Students</h3>
                  <p className="value">
                    {workloadData.reduce((sum, course) => sum + course.students, 0)}
                  </p>
                </div>
              </div>

              <div className="course-list">
                <h3>Current Courses</h3>
                <div className="course-table">
                  <div className="table-header">
                    <div className="col course">Course</div>
                    <div className="col hours">Hours/Week</div>
                    <div className="col students">Students</div>
                  </div>
                  {workloadData.map((course, index) => (
                    <div key={index} className="table-row">
                      <div className="col course">{course.course}</div>
                      <div className="col hours">{course.hours}</div>
                      <div className="col students">{course.students}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <h2>Performance Analytics</h2>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Research Productivity</h3>
                  <div className="chart-placeholder">
                    [Research Chart]
                  </div>
                </div>
                <div className="analytics-card">
                  <h3>Teaching Workload Trend</h3>
                  <div className="chart-placeholder">
                    [Workload Chart]
                  </div>
                </div>
                <div className="analytics-card">
                  <h3>Student Feedback</h3>
                  <div className="chart-placeholder">
                    [Feedback Chart]
                  </div>
                </div>
                <div className="analytics-card">
                  <h3>Attendance History</h3>
                  <div className="chart-placeholder">
                    [Attendance History Chart]
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;