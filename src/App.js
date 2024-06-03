import React, { useState, useEffect } from "react";
import {
  getCubes,
  createCube,
  updateCube,
  deleteCube,
} from "./services/CubeService";
import Cube from "./components/Cube";
import "./App.css";

const App = () => {
  const [zLock, setZLock] = useState(false);
  const [cubes, setCubes] = useState([]);
  const [form, setForm] = useState({ width: "", length: "", height: "" });
  const [editForm, setEditForm] = useState({
    id: null,
    width: "",
    length: "",
    height: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCubes();
  }, []);

  const fetchCubes = async () => {
    const data = await getCubes();
    if (data.length === 0) {
      const dummyData = [
        { id: 1, width: 3, length: 3, height: 3 },
        { id: 2, width: 4, length: 4, height: 4 },
        { id: 3, width: 5, length: 5, height: 5 },
      ];
      setCubes(dummyData);
      console.log("Using dummy data:", dummyData);
    } else {
      setCubes(data);
    }
    console.log("Fetched cubes:", data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", form);
    await createCube(form);
    fetchCubes();
    setForm({ width: "", length: "", height: "" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting edit form data:", editForm);
    await updateCube(editForm.id, editForm);
    fetchCubes();
    setIsEditing(false);
    setEditForm({ id: null, width: "", length: "", height: "" });
  };

  const handleDelete = async (id) => {
    console.log("Deleting cube with ID:", id);
    await deleteCube(id);
    fetchCubes();
  };

  const startEdit = (cube) => {
    setIsEditing(true);
    setEditForm(cube);
  };

  return (
    <div className="app-container">
      <h1>3D Cube with Z-Lock</h1>
      <button className="z-lock-button" onClick={() => setZLock(!zLock)}>
        {zLock ? "Unlock Z-Axis" : "Lock Z-Axis"}
      </button>
      <Cube zLock={zLock} />
      <div className="form-container">
        <h2>Create Cube</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="width"
            placeholder="Width"
            value={form.width}
            onChange={handleChange}
          />
          <input
            type="number"
            name="length"
            placeholder="Length"
            value={form.length}
            onChange={handleChange}
          />
          <input
            type="number"
            name="height"
            placeholder="Height"
            value={form.height}
            onChange={handleChange}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      {isEditing && (
        <div className="form-container">
          <h2>Edit Cube</h2>
          <form onSubmit={handleEditSubmit}>
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={editForm.width}
              onChange={handleEditChange}
            />
            <input
              type="number"
              name="length"
              placeholder="Length"
              value={editForm.length}
              onChange={handleEditChange}
            />
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={editForm.height}
              onChange={handleEditChange}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
      <div className="cube-list">
        <h2>Cube List</h2>
        <ul>
          {cubes.map((cube) => (
            <li key={cube.id}>
              {cube.width} x {cube.length} x {cube.height}
              <button onClick={() => startEdit(cube)}>Edit</button>
              <button onClick={() => handleDelete(cube.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
