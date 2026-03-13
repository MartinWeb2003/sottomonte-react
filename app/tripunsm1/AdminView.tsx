"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { AdminListing } from "../../types/listing";
import ListingsTable from "./ListingsTable";
import AdminForm from "./AdminForm";

type View = "table" | "add" | "edit";

interface Props {
  initialListings: AdminListing[];
}

export default function AdminView({ initialListings }: Props) {
  const router = useRouter();
  const [listings, setListings] = useState<AdminListing[]>(initialListings);
  const [view, setView] = useState<View>("table");
  const [editingListing, setEditingListing] = useState<AdminListing | null>(null);

  const refreshListings = useCallback(async () => {
    const res = await fetch("/api/admin/listing");
    if (res.ok) {
      const data = await res.json();
      setListings(data);
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  };

  const handleEdit = (listing: AdminListing) => {
    setEditingListing(listing);
    setView("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/admin/listing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setListings((prev) => prev.filter((l) => l._sanityId !== id));
    }
  };

  const handleFormSuccess = useCallback(
    async (_slug: string) => {
      await refreshListings();
      setView("table");
      setEditingListing(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [refreshListings]
  );

  const handleCancel = () => {
    setView("table");
    setEditingListing(null);
  };

  const headerSubtitle =
    view === "add" ? "Add Listing"
    : view === "edit" ? "Edit Listing"
    : "All Listings";

  return (
    <div className="adm-wrap">
      {/* Header */}
      <header className="adm-header">
        <div className="adm-header-inner">
          <div className="adm-header-brand">
            <span className="adm-header-logo">S</span>
            <span className="adm-header-title">
              Sottomonte <span>— {headerSubtitle}</span>
            </span>
          </div>
          <button className="adm-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="adm-nav">
        <button
          className={`adm-nav-btn ${view === "table" ? "adm-nav-btn-active" : ""}`}
          onClick={() => { setView("table"); setEditingListing(null); }}
        >
          All Listings
          <span className="adm-nav-count">{listings.length}</span>
        </button>
        <button
          className={`adm-nav-btn ${view === "add" ? "adm-nav-btn-active" : ""}`}
          onClick={() => { setView("add"); setEditingListing(null); }}
        >
          + Add Listing
        </button>
        {view === "edit" && editingListing && (
          <span className="adm-nav-edit-label">
            Editing: {editingListing.title}
          </span>
        )}
      </nav>

      {/* Content */}
      {view === "table" && (
        <div className="adm-content">
          <ListingsTable
            listings={listings}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {(view === "add" || view === "edit") && (
        <AdminForm
          key={editingListing?._sanityId ?? "new"}
          editingListing={view === "edit" ? editingListing ?? undefined : undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
