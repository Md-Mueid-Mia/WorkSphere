import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { parseISO, format } from "date-fns";

const WorkSheet = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch work entries from the server
  const { data: workEntries = [], refetch } = useQuery({
    queryKey: ["work-progress", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/work-progress/${user?.email}`);
      return response.data;
    },
  });
console.log(workEntries);
  // Add new entry
  const onSubmit = async (data) => {
    try {
      const workData = { data, email: user?.email, name: user?.displayName };
      await axiosSecure.post(`/work-progress`, workData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Worksheet submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      refetch();
    } catch (error) {
      console.error("Error submitting worksheet:", error);
    }
  };

  // Open the edit modal with the selected entry's data
  const openEditModal = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);

    // Prefill the form with the entry's data
    setValue("task", entry.data?.task || "");
    setValue("hoursWorked", entry.data?.hoursWorked || "");
    setValue("date", entry.data?.date ? new Date(entry.data.date) : new Date());
  };

  // Update the selected entry
  const handleUpdate = async (data) => {
    try {
      const updatedData = { ...selectedEntry, data };
      console.log(updatedData);
      await axiosSecure.put(`/work-progress/${selectedEntry._id}`, updatedData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Entry updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      setSelectedEntry(null);
      refetch();
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  // Delete an entry
  const handleDelete = async (entry) => {
  try {
    // Confirm the delete action with Swal
    
      // Proceed with deleting the entry
      const res = await axiosSecure.delete(`/work-progress/${entry._id}`);
     
        // Re-fetch data after successful deletion
        refetch();

        // Show success confirmation
        Swal.fire({
          title: "Deleted!",
          text: "The item has been deleted.",
          icon: "success",
        });
      
    
  } catch (error) {
    console.error("Error deleting entry:", error);
    Swal.fire({
      title: "Error!",
      text: "There was an error while deleting the entry.",
      icon: "error",
    });
  }
};


  return (
    <div className="container mx-auto p-6">
      {/* Work form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row sm:space-x-4 mb-6 space-y-4 sm:space-y-0"
      >
        <select
          {...register("task", { required: "Task is required" })}
          className="border p-2 rounded-md w-full sm:w-auto"
        >
          <option value="">Select Task</option>
          {[
            "Sales",
            "Support",
            "Content Writing",
            "UI/UX Design",
            "Web Design",
            "Graphic Design",
            "Digital Marketing",
            "Video Editing",
          ].map((task, idx) => (
            <option key={idx} value={task}>
              {task}
            </option>
          ))}
        </select>

        <input
          {...register("hoursWorked", { required: "Hours Worked is required" })}
          type="number"
          placeholder="Hours Worked"
          className="border p-2 rounded-md w-full sm:w-auto"
        />

        <DatePicker
          selected={watch("date") || new Date()}
          onChange={(date) => setValue("date", date)}
          className="border p-2 rounded-md w-full sm:w-auto"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto"
        >
          Add / Submit
        </button>
      </form>

      {/* Work entries table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Hours Worked</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workEntries.sort((a, b) => new Date(b.data?.date) - new Date(a.data?.date)).map((entry) => (
              <tr key={entry._id} className="border-t text-center">
                <td className="px-4 py-2">{entry.data?.task}</td>
                <td className="px-4 py-2">{entry.data?.hoursWorked}</td>
                <td className="px-4 py-2">
                  {format(parseISO(entry.data?.date), "MM/dd/yyyy")}
                </td>
                <td className="px-4 py-2 flex space-x-4 justify-center">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="text-yellow-500"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDelete(entry)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {isModalOpen && selectedEntry && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl mb-4">Edit Work Entry</h2>
            <form onSubmit={handleSubmit(handleUpdate)}>
              {/* Task Dropdown */}
              <select
                {...register("task", { required: "Task is required" })}
                defaultValue={selectedEntry.data?.task || ""}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select Task</option>
                {[
            "Sales",
            "Support",
            "Content Writing",
            "UI/UX Design",
            "Web Design",
            "Graphic Design",
            "Digital Marketing",
            "Video Editing",
          ].map(
                  (task, idx) => (
                    <option key={idx} value={task}>
                      {task}
                    </option>
                  )
                )}
              </select>

              {/* Hours Worked */}
              <input
                {...register("hoursWorked")}
                defaultValue={selectedEntry.data?.hoursWorked}
                type="number"
                className="border p-2 rounded-md w-full mt-2"
              />

              {/* DatePicker */}
              <DatePicker
                selected={watch("date") || new Date(selectedEntry.data?.date)}
                onChange={(date) => setValue("date", date)}
                className="border p-2 rounded-md w-full mt-2"
              />

              {/* Action Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;
