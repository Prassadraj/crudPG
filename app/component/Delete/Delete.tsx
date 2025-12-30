import React from "react";
type DeleteProps = {
  setPopUp: () => void;
  confirmDelete: () => void;
};
function Delete({ setPopUp, confirmDelete }: DeleteProps) {
  return (
    <>
      {" "}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded shadow-md w-80">
          <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-4">
            Are you sure you want to delete <b></b>?
          </p>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded border" onClick={setPopUp}>
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Delete;
