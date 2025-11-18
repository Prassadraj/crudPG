"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
function page() {
  type Customer = {
    id: string;
    name: string;
    email: string;
    password: string;
    isDeleted: number;
  };
  const [data, setData] = useState<Customer[]>([]);
  const [popUp, setPopUp] = useState("");
  const [filteredData, setFilteredData] = useState<Customer | null>(null);
  const [customerId, setCustomerId] = useState("");
  const [createCustomer, setCreateCustomer] = useState<Customer | null>({
    id: "",
    name: "",
    email: "",
    password: "",
    isDeleted: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin");

        setData(res.data.data);
      } catch (error) {
        alert("");
      }
    };
    fetchData();
  }, []);

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin?id=${customerId}`);
      setData((prev) =>
        prev.map((val) =>
          val.id == customerId ? { ...val, isDeleted: 1 } : val
        )
      );
      setPopUp("");
    } catch (error) {
      alert(error);
    }
  };
  // for update

  //   handleEdit
  const handleEdit = async () => {
    if (!filteredData) {
      return;
    }
    try {
      await axios.put(`/api/admin?id=${customerId}`, filteredData);
      setData((prev) =>
        prev.map((val) => (val.id == filteredData.id ? filteredData : val))
      );

      setPopUp("");
    } catch (error) {
      alert(error);
    }
  };
  const handleCreate = async () => {
    try {
      await axios.post("/api/admin", createCustomer);
      const res = await axios.get("/api/admin");
      setData(res.data.data);
      setCreateCustomer({
        id: "",
        name: "",
        password: "",
        email: "",
        isDeleted: 0,
      });
      setPopUp("");
    } catch (error) {
      alert(error);
    }
  };

  // get the customer data
  useEffect(() => {
    const filtered = data.filter((val) => val.id == customerId);
    setFilteredData(filtered[0] || null);
  }, [customerId, data]);
  return (
    <div className="h-full w-full flex flex-col justify-start items-center pt-10 gap-2 md:gap-6">
      <div className="md:text-3xl ">Welcome Admin,</div>
      <div
        className="fixed z-20 top-20 right-20 cursor-pointer"
        onClick={() => setPopUp("create")}
      >
        Create Customer
      </div>
      <div>
        <table className="min-w-full border text-xs md:text-base">
          <thead className="">
            <tr>
              <th className="border px-2 py-1 md:px-4 md:py-2 ">No.</th>
              <th className="border px-2 py-1 md:px-4 md:py-2">Name</th>
              <th className="border px-2 py-1 md:px-4 md:py-2">Email</th>
              <th className="border px-2 py-1 md:px-4 md:py-2">Status</th>
              <th className="border px-2 py-1 md:px-4 md:py-2">Modify</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer, i) => (
              <tr
                key={customer.id}
                className={customer.isDeleted ? "bg-red-700" : ""}
              >
                <td className="border px-2 py-1 md:px-4 md:py-2">{i + 1}</td>
                <td className="border px-2 py-1 md:px-4 md:py-2">
                  {customer.name}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2">
                  {customer.email}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2">
                  {customer.isDeleted === 0 ? "Active" : "Deleted"}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 flex gap-2">
                  <p
                    className="cursor-pointer hover:scale-90 transition-all ease-in-out duration-500"
                    onClick={() => {
                      setPopUp("edit");
                      setCustomerId(customer.id);
                    }}
                  >
                    Edit
                  </p>
                  <p
                    className={`${
                      customer.isDeleted === 1
                        ? "opacity-60 pointer-events-none"
                        : "cursor-pointer"
                    } hover:scale-90 transition-all ease-in-out duration-500`}
                    onClick={() => {
                      setPopUp("delete");
                      setCustomerId(customer.id);
                    }}
                  >
                    Delete
                  </p>
                  <p
                    className="cursor-pointer hover:scale-90 transition-all ease-in-out duration-500"
                    onClick={() => {
                      setPopUp("info");
                      setCustomerId(customer.id);
                    }}
                  >
                    Info
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* delete */}
        {popUp == "delete" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded shadow-md w-80">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-4">
                Are you sure you want to delete <b></b>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded border"
                  onClick={() => {
                    setPopUp("");
                  }}
                >
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
        )}
        {/* edit  */}
        {popUp == "edit" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded shadow-md w-80 flex gap-2 flex-col">
              <h1 className="text-center">Edit Info</h1>
              <label htmlFor="">Name</label>
              <input
                value={filteredData?.name || ""}
                type="text"
                onChange={(e) =>
                  setFilteredData((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                className="bg-white text-black p-2"
              />
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={filteredData?.email || ""}
                onChange={(e) =>
                  setFilteredData((prev) =>
                    prev ? { ...prev, email: e.target.value } : null
                  )
                }
                className="bg-white text-black p-2"
              />
              <label htmlFor="">Password</label>
              <input
                type="text"
                value={filteredData?.password || ""}
                onChange={(e) =>
                  setFilteredData((prev) =>
                    prev ? { ...prev, password: e.target.value } : null
                  )
                }
                className="bg-white text-black p-2"
              />
              <div className="flex gap-2 items-center">
                <label htmlFor="" id="check">
                  Active
                </label>
                <input
                  type="checkbox"
                  id="active"
                  onChange={() =>
                    setFilteredData((prev) =>
                      prev
                        ? { ...prev, isDeleted: prev.isDeleted === 0 ? 1 : 0 }
                        : null
                    )
                  }
                  checked={filteredData?.isDeleted === 0} // checked if Active
                  name="check"
                  className="w-4 h-4"
                />
              </div>
              <div
                className="text-center bg-green-500 p-2 text-black cursor-pointer"
                onClick={handleEdit}
              >
                Done
              </div>
              <div
                className="text-center bg-red-500 p-2 text-white cursor-pointer"
                onClick={() => setPopUp("")}
              >
                Cancel
              </div>
            </div>
          </div>
        )}
        {/* create  */}
        {popUp == "create" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded shadow-md w-80 flex gap-2 flex-col">
              <h1 className="text-center">Edit Info</h1>
              <label htmlFor="">Name</label>
              <input
                value={createCustomer?.name || ""}
                type="text"
                onChange={(e) =>
                  setCreateCustomer((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                className="bg-white text-black p-2"
              />
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={createCustomer?.email}
                onChange={(e) =>
                  setCreateCustomer((prev) =>
                    prev ? { ...prev, email: e.target.value } : null
                  )
                }
                className="bg-white text-black p-2"
              />
              <label htmlFor="">Password</label>
              <input
                type="text"
                value={createCustomer?.password}
                onChange={(e) =>
                  setCreateCustomer((prev) =>
                    prev ? { ...prev, password: e.target.value } : null
                  )
                }
                className="bg-white text-black p-2"
              />
              <div className="flex gap-2 items-center">
                <label htmlFor="" id="check">
                  Active
                </label>
                <input
                  type="checkbox"
                  id="active"
                  onChange={() =>
                    setCreateCustomer((prev) =>
                      prev
                        ? { ...prev, isDeleted: prev.isDeleted === 0 ? 1 : 0 }
                        : null
                    )
                  }
                  checked={createCustomer?.isDeleted === 0} // checked if Active
                  name="check"
                  className="w-4 h-4"
                />
              </div>
              <div
                className="text-center bg-green-500 p-2 text-black cursor-pointer"
                onClick={handleCreate}
              >
                Create
              </div>
              <div
                className="text-center bg-red-500 p-2 text-white cursor-pointer"
                onClick={() => setPopUp("")}
              >
                Cancel
              </div>
            </div>
          </div>
        )}
        {/* info  */}
        {popUp == "info" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6  rounded shadow-md w-80 flex gap-2 flex-col">
              <div>
                <label htmlFor="">Name</label>
                <p>{filteredData?.name}</p>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <p>{filteredData?.email}</p>
              </div>
              <div>
                <label htmlFor="">Password</label>
                <p>{filteredData?.password}</p>
              </div>

              <div
                onClick={() => setPopUp("")}
                className="w-full text-center bg-red-400"
              >
                Back
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
