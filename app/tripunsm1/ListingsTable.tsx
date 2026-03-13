"use client";

import { useState } from "react";
import type { AdminListing } from "../../types/listing";

const STATUS_LABEL: Record<string, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
};

const TYPE_LABEL: Record<string, string> = {
  "house-villa": "House / Villa",
  "apartment": "Apartment",
  "land": "Land",
  "business": "Business",
  "hotel": "Hotel",
  "investments": "Investments",
  "off-plan": "Off Plan",
  "new-build": "New Build",
  "luxury": "Luxury",
};

function formatPrice(n: number) {
  return "€" + n.toLocaleString("en-EU");
}

interface Props {
  listings: AdminListing[];
  onEdit: (listing: AdminListing) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function ListingsTable({ listings, onEdit, onDelete }: Props) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => setConfirmId(id);
  const handleCancelDelete = () => setConfirmId(null);

  const handleConfirmDelete = async (id: string) => {
    setDeletingId(id);
    setConfirmId(null);
    await onDelete(id);
    setDeletingId(null);
  };

  if (listings.length === 0) {
    return (
      <div className="adm-empty-table">
        <p className="adm-empty-table-icon">🏠</p>
        <p className="adm-empty-table-text">No listings yet.</p>
        <p className="adm-empty-table-sub">Use the &quot;Add Listing&quot; tab to create your first one.</p>
      </div>
    );
  }

  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>City</th>
            <th>Price</th>
            <th>Type</th>
            <th>Status</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._sanityId} className={deletingId === listing._sanityId ? "adm-row-deleting" : ""}>
              <td>
                {listing.imageUrl ? (
                  <img
                    src={listing.imageUrl + "?w=80&h=60&fit=crop&auto=format"}
                    alt={listing.title}
                    className="adm-table-thumb"
                  />
                ) : (
                  <div className="adm-table-thumb adm-table-thumb-empty">—</div>
                )}
              </td>
              <td className="adm-table-title">{listing.title}</td>
              <td>{listing.city}</td>
              <td className="adm-table-price">{formatPrice(listing.priceEUR)}</td>
              <td>{TYPE_LABEL[listing.propertyType] ?? listing.propertyType}</td>
              <td>
                <span className={`adm-badge ${listing.status === "for-sale" ? "adm-badge-sale" : "adm-badge-rent"}`}>
                  {STATUS_LABEL[listing.status] ?? listing.status}
                </span>
              </td>
              <td>
                <span className={`adm-badge ${listing.isPublished ? "adm-badge-live" : "adm-badge-draft"}`}>
                  {listing.isPublished ? "Live" : "Draft"}
                </span>
              </td>
              <td className="adm-table-actions">
                {confirmId === listing._sanityId ? (
                  <span className="adm-confirm">
                    <span className="adm-confirm-text">Delete?</span>
                    <button
                      className="adm-confirm-yes"
                      onClick={() => handleConfirmDelete(listing._sanityId)}
                    >
                      Yes
                    </button>
                    <button className="adm-confirm-no" onClick={handleCancelDelete}>
                      No
                    </button>
                  </span>
                ) : (
                  <>
                    <button
                      className="adm-edit-btn"
                      onClick={() => onEdit(listing)}
                      disabled={deletingId === listing._sanityId}
                    >
                      Edit
                    </button>
                    <button
                      className="adm-delete-btn"
                      onClick={() => handleDeleteClick(listing._sanityId)}
                      disabled={deletingId === listing._sanityId}
                    >
                      {deletingId === listing._sanityId ? "…" : "Delete"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
