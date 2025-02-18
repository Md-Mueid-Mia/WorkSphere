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
import { useTheme } from "../../../Provider/ThemeProvider";

const WorkSheet = () => {
  const { isDarkTheme } = useTheme();
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
  // console.log(workEntries);
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
      // console.log(updatedData);
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

  // return (
  //   <div className="container mx-auto px-4 md:p-6">
  //     {/* Work form */}
  //     <form
  //       onSubmit={handleSubmit(onSubmit)}
  //       className="flex flex-col sm:flex-row sm:space-x-4 mb-6 space-y-4 sm:space-y-0"
  //     >
  //       <select
  //         {...register("task", { required: "Task is required" })}
  //         className="border p-2 rounded-md w-full sm:w-auto"
  //       >
  //         <option value="">Select Task</option>
  //         {[
  //           "Sales",
  //           "Support",
  //           "Content Writing",
  //           "UI/UX Design",
  //           "Web Design",
  //           "Graphic Design",
  //           "Digital Marketing",
  //           "Video Editing",
  //         ].map((task, idx) => (
  //           <option key={idx} value={task}>
  //             {task}
  //           </option>
  //         ))}
  //       </select>

  //       <input
  //         {...register("hoursWorked", { required: "Hours Worked is required" })}
  //         type="number"
  //         placeholder="Hours Worked"
  //         className="border p-2 rounded-md w-full sm:w-auto"
  //       />

  //       <DatePicker
  //         selected={watch("date") || new Date()}
  //         onChange={(date) => setValue("date", date)}
  //         className="border p-2 rounded-md w-full sm:w-auto"
  //       />

  //       <button
  //         type="submit"
  //         className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto"
  //       >
  //         Add / Submit
  //       </button>
  //     </form>

  //     {/* Work entries table */}
  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border-collapse table-auto">
  //         <thead>
  //           <tr className="bg-gray-200">
  //             <th className="px-4 py-2">Task</th>
  //             <th className="px-4 py-2">Hours Worked</th>
  //             <th className="px-4 py-2">Date</th>
  //             <th className="px-4 py-2">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {workEntries.sort((a, b) => new Date(b.data?.date) - new Date(a.data?.date)).map((entry) => (
  //             <tr key={entry._id} className="border-t text-center">
  //               <td className="px-4 py-2">{entry.data?.task}</td>
  //               <td className="px-4 py-2">{entry.data?.hoursWorked}</td>
  //               <td className="px-4 py-2">
  //                 {format(parseISO(entry.data?.date), "MM/dd/yyyy")}
  //               </td>
  //               <td className="px-4 py-2 flex space-x-4 justify-center">
  //                 <button
  //                   onClick={() => openEditModal(entry)}
  //                   className="text-yellow-500"
  //                 >
  //                   <FaPen />
  //                 </button>
  //                 <button
  //                   onClick={() => handleDelete(entry)}
  //                   className="text-red-500"
  //                 >
  //                   <FaTrashAlt />
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>

  //     {/* Edit modal */}
  //     {isModalOpen && selectedEntry && (
  //       <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
  //         <div className="bg-white p-6 rounded-md w-96">
  //           <h2 className="text-xl mb-4">Edit Work Entry</h2>
  //           <form onSubmit={handleSubmit(handleUpdate)}>
  //             {/* Task Dropdown */}
  //             <select
  //               {...register("task", { required: "Task is required" })}
  //               defaultValue={selectedEntry.data?.task || ""}
  //               className="border p-2 rounded-md w-full"
  //             >
  //               <option value="">Select Task</option>
  //               {[
  //           "Sales",
  //           "Support",
  //           "Content Writing",
  //           "UI/UX Design",
  //           "Web Design",
  //           "Graphic Design",
  //           "Digital Marketing",
  //           "Video Editing",
  //         ].map(
  //                 (task, idx) => (
  //                   <option key={idx} value={task}>
  //                     {task}
  //                   </option>
  //                 )
  //               )}
  //             </select>

  //             {/* Hours Worked */}
  //             <input
  //               {...register("hoursWorked")}
  //               defaultValue={selectedEntry.data?.hoursWorked}
  //               type="number"
  //               className="border p-2 rounded-md w-full mt-2"
  //             />

  //             {/* DatePicker */}
  //             <DatePicker
  //               selected={watch("date") || new Date(selectedEntry.data?.date)}
  //               onChange={(date) => setValue("date", date)}
  //               className="border p-2 rounded-md w-full mt-2"
  //             />

  //             {/* Action Buttons */}
  //             <div className="flex justify-between mt-4">
  //               <button
  //                 type="submit"
  //                 className="bg-blue-500 text-white p-2 rounded-md"
  //               >
  //                 Update
  //               </button>
  //               <button
  //                 onClick={() => setIsModalOpen(false)}
  //                 className="bg-gray-500 text-white p-2 rounded-md"
  //               >
  //                 Cancel
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div
      className={`min-h-screen p-4 md:p-6 lg:p-8 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Work form */}
        <div
          className={`mb-8 p-6 rounded-xl shadow-lg ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Add Work Entry</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <select
              {...register("task", { required: "Task is required" })}
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Select Task</option>
              //{" "}
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
              {...register("hoursWorked", {
                required: "Hours Worked is required",
              })}
              type="number"
              placeholder="Hours Worked"
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />

            <DatePicker
              selected={watch("date") || new Date()}
              onChange={(date) => setValue("date", date)}
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />

            <button
              type="submit"
              className={`w-full p-3 rounded-lg font-semibold transition-all ${
                isDarkTheme
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Add Entry
            </button>
          </form>
        </div>

        {/* Work entries table */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkTheme ? "bg-gray-700" : "bg-gray-100"}>
                <tr>
                  <th className="px-6 py-4 text-left">Task</th>
                  <th className="px-6 py-4 text-left">Hours</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workEntries
                  .sort(
                    (a, b) => new Date(b.data?.date) - new Date(a.data?.date)
                  )
                  .map((entry) => (
                    <tr
                      key={entry._id}
                      className={`border-t ${
                        isDarkTheme
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">{entry.data?.task}</td>
                      <td className="px-6 py-4">{entry.data?.hoursWorked}</td>
                      <td className="px-6 py-4">
                        {format(parseISO(entry.data?.date), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => openEditModal(entry)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <FaPen className="text-yellow-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <FaTrashAlt className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit modal */}
        {isModalOpen && selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div
              className={`rounded-xl shadow-xl w-full max-w-md ${
                isDarkTheme ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Edit Work Entry</h2>
                <form
                  onSubmit={handleSubmit(handleUpdate)}
                  className="space-y-4"
                >
                  <select
                    {...register("task")}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkTheme
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="">Select Task</option>
                    //{" "}
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
                    {...register("hoursWorked")}
                    type="number"
                    className={`w-full p-3 rounded-lg border ${
                      isDarkTheme
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />

                  <DatePicker
                    selected={
                      watch("date") || new Date(selectedEntry.data?.date)
                    }
                    onChange={(date) => setValue("date", date)}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkTheme
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className={`px-4 py-2 rounded-lg ${
                        isDarkTheme
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSheet;
