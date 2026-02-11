import React, { useState, useEffect } from "react";
import axios from "axios";
import "mdbootstrap/css/bootstrap.css";
import "mdbootstrap/css/mdb.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_URLS = {
  students: "http://127.0.0.1:8000/students/",
  faculty: "http://127.0.0.1:8000/faculty/",
  batches: "http://127.0.0.1:8000/batches/",
  courses: "http://127.0.0.1:8000/courses/",
  breaks: "http://127.0.0.1:8000/breaks/",
  fees: "http://127.0.0.1:8000/fees/",
};

const DeleteStudent = () => {

  // 🔔 TOASTER
  const [toast, setToast] = useState({
    text: "",
    type: "", // success | error | warning | info
  });

  const showToast = (text, type = "success", timeout = 3000) => {
    setToast({ text, type });
    setTimeout(() => {
      setToast({ text: "", type: "" });
    }, timeout);
  };

  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await axios.get(API_URLS.students);
      setStudents(res.data || []);
    } catch (err) {
      console.error("Error loading students:", err);
    }
  };

  const handleQueryChange = (e) => {
    const value = e.target.value.trim();
    setQuery(value);

    if (!value) {
      setFiltered([]);
      return;
    }

    const match = students.filter((s) => {
      const regMatch = String(s.regno) === value; // exact regno
      const nameMatch =
        s.studentname && s.studentname.toLowerCase() === value.toLowerCase(); // exact name
      return regMatch || nameMatch;
    });

    setFiltered(match);
  };

  const openDeleteModal = (student, index) => {
    setSelectedStudent(student);
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      setLoading(true);

      await axios.delete(`${API_URLS.students}${selectedStudent.id}/`);

      showToast("Student deleted successfully", "success");


      setFiltered((prev) => prev.filter((item, i) => i !== selectedIndex));
      setStudents((prev) => prev.filter((item) => item.id !== selectedStudent.id));
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("Failed to delete student. Check API.", "error");

    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  return (
    <div className="container">

      {toast.text && (
        <div className={`app-toast ${toast.type}`}>
          <i
            className={`bi ${toast.type === "success"
                ? "bi-check-circle-fill"
                : toast.type === "error"
                  ? "bi-x-circle-fill"
                  : toast.type === "warning"
                    ? "bi-exclamation-triangle-fill"
                    : "bi-info-circle-fill"
              }`}
          />
          <span>{toast.text}</span>
          <button onClick={() => setToast({ text: "", type: "" })}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}

      <div className="card shadow-lg rounded-4">
        <div className="card-header bg-danger text-white text-center py-2 ">
          <h5 className="mb-0">Manage Students</h5>
        </div>

        <div className="card-body bg-light">


          <div className="mb-3 text-center d-flex justify-content-center">

            <input
              type="text"
              className="form-control w-50"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search by Reg No or Student Name"
            />
          </div>

          {filtered.length > 0 && (
            <div className="table-responsive my-3">
              <table className="table table-bordered align-middle rounded-3 table-sm text-center">
                <thead className="table-primary">
                  <tr>
                    <th>Reg No</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Date Of Joining</th>
                    <th>Contact</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={`${s.regno}-${i}`}>
                      <td>{s.regno}</td>
                      <td>{s.studentname}</td>
                      <td>{s.course}</td>
                      <td>{formatDate(s.date_of_joining)}</td>
                      <td>{s.contact}</td>

                      <td>
                        <i
                          className="text-danger mt-0 p-1 w-75 bi bi-trash-fill me-2"
                          onClick={() => openDeleteModal(s, i)}
                          disabled={loading}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <small className="text-muted">
                Click Delete next to the row you want to remove.
              </small>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered animated jackInTheBox w-25">
              <div className="modal-content shadow-lg rounded-4">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Confirm Delete
                  </h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
                </div>

                <div className="modal-body">
                  <p className="fw-semibold">Are you sure you want to delete:</p>
                  <p className="text-danger fs-5 fw-bold">{selectedStudent?.studentname}</p>
                </div>

                <div className="modal-footer">
                  <button className="custom-btn custom-btn-blue" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="custom-btn custom-btn-red"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default DeleteStudent;
