import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useModalStore } from "../store";
import type { Ticket } from "../types";

const Dashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { updateModal } = useModalStore();
  const openCreateTicket = () =>
    updateModal({ modalType: "create", status: "open" });
  useEffect(() => {
    const loadTickets = () => {
      const saved = localStorage.getItem("tickets");
      if (saved) {
        try {
          const parsedTickets = JSON.parse(saved);
          setTickets(parsedTickets);
        } catch (error) {
          console.error("Error parsing tickets:", error);
          setTickets([]);
        }
      }
    };

    loadTickets();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "tickets") {
        loadTickets();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleTicketsUpdate = () => loadTickets();
    window.addEventListener("ticketsUpdated", handleTicketsUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("ticketsUpdated", handleTicketsUpdate);
    };
  }, []);

  useLayoutEffect(() => {
    document.title = "TicketFlow | Dashboard";
  }, []);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "Open").length;
    const closed = tickets.filter((t) => t.status === "Closed").length;

    return { total, open, closed };
  }, [tickets]);

  const recentTickets = useMemo(() => {
    return [...tickets]
      .sort((a, b) => {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return dateB - dateA;
      })
      .slice(0, 4);
  }, [tickets]);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins <= 1 ? "Just now" : `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "status-open";
      case "Closed":
        return "status-closed";
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
              <p className="stat-value">{stats.total}</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <p className="stat-label">Open Tickets</p>
                <span className="stat-icon stat-warning">📂</span>
              </div>
              <p className="stat-value stat-warning">{stats.open}</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <p className="stat-label">Resolved Tickets</p>
                <span className="stat-icon stat-success">✓</span>
              </div>
              <p className="stat-value stat-success">{stats.closed}</p>
            </div>
          </div>

          <div className="activity-section">
            <h3 className="section-title">Recent Activity</h3>
            <div className="table-wrapper">
              {recentTickets.length > 0 ? (
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
                    {recentTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td data-label="Ticket ID" className="ticket-id">
                          {ticket.uniqueNo}
                        </td>
                        <td data-label="Subject" className="ticket-subject">
                          <p>{ticket.title}</p>
                        </td>
                        <td data-label="Status">
                          <span
                            className={`status-badge ${getStatusClass(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td
                          data-label="Last Updated"
                          className="ticket-subject"
                        >
                          {getRelativeTime(ticket.lastUpdated)}
                        </td>
                        <td data-label="Action" style={{ textAlign: "right" }}>
                          <a className="view-link" href="#">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <span className="icon empty-icon">inbox</span>
                  <h3>No Tickets Found</h3>
                  <p>Create a new ticket.</p>
                  <button onClick={openCreateTicket} className="btn-primary">
                    <span className="icon">add</span>
                    <span>Create First Ticket</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
