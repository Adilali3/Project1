import { STATUS_COLORS } from "../../utils/constants";

function SkillCard({ skill, onEdit, onDelete }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-white font-medium">{skill.name}</p>
        <p className="text-slate-400 text-sm">{skill.category}</p>
        {skill.link && (
          <a
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xs hover:underline"
          >
            View resource
          </a>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs px-3 py-1 rounded ${STATUS_COLORS[skill.status]}`}>
          {skill.status}
        </span>
        <button
          onClick={() => onEdit(skill)}
          className="text-slate-400 hover:text-white text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(skill.id)}
          className="text-slate-400 hover:text-red-400 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SkillCard;