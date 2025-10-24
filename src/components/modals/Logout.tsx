export default function LogoutModal() {
  return (
    <div
      className="modal-content delete-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="delete-modal-content">
        <div className="delete-icon-wrapper">
          <span className="icon delete-icon">warning</span>
        </div>
        <h3>Logout Now?</h3>
        <p>Are you sure you want to log out? You might have unsave</p>
      </div>
      <div className="delete-modal-footer">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-delete">Confirm</button>
      </div>
    </div>
  );
}
