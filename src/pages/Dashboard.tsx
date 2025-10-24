import React from "react";
import "../styles/dashboard.css";
import type { Ticket } from "../types";

const Dashboard: React.FC = () => {
  const tickets: Ticket[] = [
    {
      id: "#TKT-001",
      subject: "Login Issue",
      status: "Open",
      lastUpdated: "2 hours ago",
    },
    {
      id: "#TKT-002",
      subject: "Feature Request: Dark Mode",
      status: "Resolved",
      lastUpdated: "5 hours ago",
    },
    {
      id: "#TKT-003",
      subject: "Billing Inquiry",
      status: "In Progress",
      lastUpdated: "1 day ago",
    },
    {
      id: "#TKT-004",
      subject: "Unable to upload attachment",
      status: "Resolved",
      lastUpdated: "2 days ago",
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "status-open";
      case "Resolved":
        return "status-resolved";
      case "In Progress":
        return "status-progress";
      default:
        return "";
    }
  };

  return (
    <div className="light">
      <div className="container">
        <div className="content-wrapper">
          <div className="page-header">
            <p className="page-title">Dashboard</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <p className="stat-label">Total Tickets</p>
                <span
                  className="stat-icon"
                  style={{ color: "var(--text-secondary)" }}
                >
                  🎫
                </span>
              </div>
              <p className="stat-value">1,250</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <p className="stat-label">Open Tickets</p>
                <span className="stat-icon stat-warning">📂</span>
              </div>
              <p className="stat-value stat-warning">150</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <p className="stat-label">Resolved Tickets</p>
                <span className="stat-icon stat-success">✓</span>
              </div>
              <p className="stat-value stat-success">1,100</p>
            </div>
          </div>

          <div className="activity-section">
            <h3 className="section-title">Recent Activity</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Ticket ID</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last Updated</th>
                    <th scope="col">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="ticket-id">{ticket.id}</td>
                      <td className="ticket-subject">{ticket.subject}</td>
                      <td>
                        <span
                          className={`status-badge ${getStatusClass(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="ticket-subject">{ticket.lastUpdated}</td>
                      <td style={{ textAlign: "right" }}>
                        <a className="view-link" href="#">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
