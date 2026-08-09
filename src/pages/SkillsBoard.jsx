import { useState } from "react";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import SkillList from "../components/skills/SkillList";
import SkillForm from "../components/skills/SkillForm";
import FilterBar from "../components/skills/FilterBar";
import Modal from "../components/ui/Modal";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

function SkillsBoard() {
  const { data: skills, loading, addItem, updateItem, deleteItem } =
    useFirestoreCollection("skills");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  function handleAddClick() {
    setEditingSkill(null);
    setIsModalOpen(true);
  }

  function handleEditClick(skill) {
    setEditingSkill(skill);
    setIsModalOpen(true);
  }

  async function handleFormSubmit(formData) {
    if (editingSkill) {
      await updateItem(editingSkill.id, formData);
    } else {
      await addItem(formData);
    }
    setIsModalOpen(false);
  }

  async function handleDelete(id) {
    await deleteItem(id);
  }

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || skill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-950 to-black">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-white text-sm hover:underline">
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-white">Skills Board</h1>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-white/5 text-white px-4 py-2 rounded hover:border-white/20"
          >
            + Add Skill
          </button>
        </div>

        <FilterBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <SkillList skills={filteredSkills} onEdit={handleEditClick} onDelete={handleDelete} />

        {isModalOpen && (
          <Modal
            title={editingSkill ? "Edit Skill" : "Add Skill"}
            onClose={() => setIsModalOpen(false)}
          >
            <SkillForm
              initialData={editingSkill}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SkillsBoard;