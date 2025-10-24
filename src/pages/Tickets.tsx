import { useEffect, useMemo, useState } from "react";
import TicketCard from "../components/ticket-page/TicketCard";
import { useModalStore } from "../store";
import type { Ticket } from "../types";

export default function ManageTickets() {
  const { updateModal } = useModalStore();

  const sampleTickets = useMemo<Ticket[]>(
    () => [
      {
        id: "6f4d5e22-8baf-4b1f-b9e8-24cf29a71b13",
        uniqueNo: "TKT-001",
        title: "Login issue with new update",
        description:
          "User is unable to log in after the most recent application update on their mobile device.",
        status: "Open",
        assignee: "Jane Smith",
        priority: "High",
        date: "Oct 27",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuArShpw6PWEaDouaw3iHOM6Sw3K1OKcwMiHDDSp6WQUOpFJktwpvXf0zeklYgpZbt0K9XdP-QPTCh_D6Ec555VePeeJAPtLqsbVprpBQ4Vk1RSWM92eK0VsY3o4xgc9RcBsPi-cEfGfDUTpDKa7qpaTgsKao4iVDxxmujBs6JCC6rfYgUdm8PY6PTLTPBDSVJ6eZUxXSZYcXSC97LmboylPvQ1Sq59rPiZYZIup0r31qeehSI0ZKUOyRfBBUYrpOM2PbMthNFGqueed",
        lastUpdated: "2025-10-24T19:42:15.312Z",
      },
      {
        id: "9c1f1d7a-2348-4cc6-84e5-9a8d7b6297ef",
        uniqueNo: "TKT-002",
        title: "Billing inquiry for invoice #INV-12345",
        description:
          "Customer has questions about charges on their latest invoice and needs clarification.",
        status: "In Progress",
        assignee: "John Doe",
        priority: "Medium",
        date: "Oct 26",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC7WmZ3NXZ0ZNmZvI-yPmh5KI7aoa4suo0fBTuZOeHsG-ZrR1fiOoih8MH7OrJt1YO6TkPoPfmeP0OZHF_HaEtd7Va1mqiYZEU5AOYvKTEgeoBc3f3yQwXjIs0yeKdC47fJKSFVxFLyZkA-6ncjmhLZEzQEZd97I-mNFFvflptmptRU3--c57VozJHBS0B5gxTnGVr5A2QoSOOt4aH0yGyjnYG39yaOX4EaYBdyt7x8DsLQBCh9TxpQFtr9FH0cpSU1n5pNnnaM46s6",
        lastUpdated: "2025-10-23T16:28:47.904Z",
      },
      {
        id: "34c2a10d-6a2f-47a4-8c4c-98126b7e7cb3",
        uniqueNo: "TKT-003",
        title: "Feature request: Dark mode",
        description:
          "User is requesting the implementation of a dark mode theme for better usability in low-light conditions.",
        status: "Open",
        assignee: "Alice Johnson",
        priority: "Low",
        date: "Oct 25",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD-7meYACmVV_nk6UcoAVM2t68i4vLGCEFGliosDSG6SAK8VA24LG5YBcktn6GQNNbVRA7zARfbkTCvTztLokEgyFilTA7dBN1g20ZzoObV87tcKgJoxvd0rQXV-B3lZYOu6e6RSE19ARvGQI-HuFdUjwhnKyVe0bSuycwxm7eFQ8Lrw5JZ7vLH15SN4-ZAysEnPkWaA129G9xT_eAlRyb0IpYNBpgCGsWjStjUTUHKQbmdUPNi1-_OwnBaRdQ3l9LNOD8FpPMarr_w",
        lastUpdated: "2025-10-22T08:55:03.671Z",
      },
    ],
    []
  );

  const [tickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem("tickets");
    return saved ? JSON.parse(saved) : sampleTickets;
  });

  useEffect(() => {
    const saved = localStorage.getItem("tickets");
    if (!saved) {
      localStorage.setItem("tickets", JSON.stringify(sampleTickets));
    }
  }, [sampleTickets]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const openCreateTicket = () =>
    updateModal({ modalType: "create", status: "open" });

  const openEditModal = (ticket: Ticket) =>
    updateModal({ modalType: "update", status: "open", data: ticket });

  const openDeleteModal = (ticket: Ticket) =>
    updateModal({ modalType: "delete", status: "open", data: ticket });

  const uniqueStatuses = useMemo(
    () => [...new Set(tickets.map((t) => t.status))],
    [tickets]
  );
  const uniqueAssignees = useMemo(
    () => [...new Set(tickets.map((t) => t.assignee))],
    [tickets]
  );
  const uniquePriorities = useMemo(
    () => [...new Set(tickets.map((t) => t.priority))],
    [tickets]
  );

  const toggleFilter = (filterType: string, value: string) => {
    if (filterType === "status") {
      setStatusFilter((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else if (filterType === "assignee") {
      setAssigneeFilter((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else if (filterType === "priority") {
      setPriorityFilter((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(ticket.status);
    const matchesAssignee =
      assigneeFilter.length === 0 || assigneeFilter.includes(ticket.assignee);
    const matchesPriority =
      priorityFilter.length === 0 || priorityFilter.includes(ticket.priority);

    return matchesSearch && matchesStatus && matchesAssignee && matchesPriority;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".filter-dropdown")) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <div className="app-container">
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Tickets</h1>
            <p className="page-description">
              Manage and track all customer support tickets.
            </p>
          </div>
          <button onClick={openCreateTicket} className="btn-primary create-btn">
            <span className="icon">add</span>
            <span>Create Ticket</span>
          </button>
        </div>

        <div className="filters-section">
          <div className="search-wrapper">
            <span className="icon search-icon">search</span>
            <input
              type="text"
              placeholder="Search by ticket ID or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() =>
                  setOpenDropdown(openDropdown === "status" ? null : "status")
                }
              >
                <span>
                  Status {statusFilter.length > 0 && `(${statusFilter.length})`}
                </span>
                <span className="icon">expand_more</span>
              </button>
              {openDropdown === "status" && (
                <div className="dropdown-menu">
                  {uniqueStatuses.map((status) => (
                    <label key={status} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(status)}
                        onChange={() => toggleFilter("status", status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "assignee" ? null : "assignee"
                  )
                }
              >
                <span>
                  Assignee{" "}
                  {assigneeFilter.length > 0 && `(${assigneeFilter.length})`}
                </span>
                <span className="icon">expand_more</span>
              </button>
              {openDropdown === "assignee" && (
                <div className="dropdown-menu">
                  {uniqueAssignees.map((assignee) => (
                    <label key={assignee} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={assigneeFilter.includes(assignee)}
                        onChange={() => toggleFilter("assignee", assignee)}
                      />
                      <span>{assignee}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "priority" ? null : "priority"
                  )
                }
              >
                <span>
                  Priority{" "}
                  {priorityFilter.length > 0 && `(${priorityFilter.length})`}
                </span>
                <span className="icon">expand_more</span>
              </button>
              {openDropdown === "priority" && (
                <div className="dropdown-menu">
                  {uniquePriorities.map((priority) => (
                    <label key={priority} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={priorityFilter.includes(priority)}
                        onChange={() => toggleFilter("priority", priority)}
                      />
                      <span>{priority}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="tickets-grid">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={() => openEditModal(ticket)}
              onDelete={() => openDeleteModal(ticket)}
            />
          ))}

          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <span className="icon empty-icon">inbox</span>
              <h3>No Tickets Found</h3>
              <p>
                There are no tickets matching your current filters.
                <br />
                Try adjusting your search or create a new ticket.
              </p>
              <button onClick={openCreateTicket} className="btn-primary">
                <span className="icon">add</span>
                <span>Create First Ticket</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
