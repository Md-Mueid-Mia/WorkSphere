import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const WorkSheet = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [tasks] = useState(['Sales', 'Support', 'Content', 'Paper-work']);
  const [workEntries, setWorkEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const onSubmit = (data) => {
    if (!data.task || !data.hoursWorked || !data.date) return;

    const newEntry = { ...data };
    setWorkEntries([newEntry, ...workEntries]);
    clg

    // Here, you can send `newEntry` to the backend DB via API

    // Reset form after submission
    setValue('task', '');
    setValue('hoursWorked', '');
    setValue('date', new Date());
  };

  const openEditModal = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
    setValue('task', entry.task);
    setValue('hoursWorked', entry.hoursWorked);
    setValue('date', new Date(entry.date));
  };

  const handleUpdate = () => {
    if (!selectedEntry) return;

    const updatedEntries = workEntries.map(entry =>
      entry === selectedEntry ? {
        ...selectedEntry,
        task: selectedEntry.task,
        hoursWorked: selectedEntry.hoursWorked,
        date: selectedEntry.date,
      } : entry
    );
    setWorkEntries(updatedEntries);
    setIsModalOpen(false);

    // Here, you can send the updated data to the backend DB via API
  };

  const handleDelete = (entry) => {
    const updatedEntries = workEntries.filter(item => item !== entry);
    setWorkEntries(updatedEntries);

    // Here, you can send the delete request to the backend DB via API
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Work form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row sm:space-x-4 mb-6 space-y-4 sm:space-y-0">
        <select
          {...register('task', { required: 'Task is required' })}
          className="border p-2 rounded-md w-full sm:w-auto"
        >
          <option value="">Select Task</option>
          {tasks.map((taskOption, idx) => (
            <option key={idx} value={taskOption}>{taskOption}</option>
          ))}
        </select>
        {errors.task && <p className="text-red-500">{errors.task.message}</p>}

        <input
          {...register('hoursWorked', { required: 'Hours Worked is required' })}
          type="number"
          placeholder="Hours Worked"
          className="border p-2 rounded-md w-full sm:w-auto"
        />
        {errors.hoursWorked && <p className="text-red-500">{errors.hoursWorked.message}</p>}

        <DatePicker
          {...register('date', { required: 'Date is required' })}
          selected={new Date()}
          onChange={(date) => setValue('date', date)}
          className="border p-2 rounded-md w-full sm:w-auto"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto">
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
            {workEntries.map((entry, idx) => (
              <tr key={idx} className="border-t text-center">
                <td className="px-4 py-2">{entry.task}</td>
                <td className="px-4 py-2">{entry.hoursWorked}</td>
                <td className="px-4 py-2">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="md:pl-20 ml-4 py-2 flex space-x-5 md:space-x-10">
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

            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              <select
                {...register('task', { required: 'Task is required' })}
                className="border p-2 rounded-md w-full"
              >
                <option value="">Select Task</option>
                {tasks.map((taskOption, idx) => (
                  <option key={idx} value={taskOption}>{taskOption}</option>
                ))}
              </select>
              {errors.task && <p className="text-red-500">{errors.task.message}</p>}

              <input
                {...register('hoursWorked', { required: 'Hours Worked is required' })}
                type="number"
                placeholder="Hours Worked"
                className="border p-2 rounded-md w-full"
              />
              {errors.hoursWorked && <p className="text-red-500">{errors.hoursWorked.message}</p>}

              <DatePicker
                {...register('date', { required: 'Date is required' })}
                selected={new Date(selectedEntry.date)}
                onChange={(date) => setValue('date', date)}
                className="border p-2 rounded-md w-full"
              />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}

              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Close
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
