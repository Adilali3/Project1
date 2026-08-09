import SkillCard from "./SkillCard";

function SkillList({ skills, onEdit, onDelete }) {
  if (skills.length === 0) {
    return (
      <p className="text-slate-400 text-sm text-center py-8">
        No skills yet. Add your first one to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default SkillList;