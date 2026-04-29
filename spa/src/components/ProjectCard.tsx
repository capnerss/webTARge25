import React, { useState } from 'react';
import { Heart, Trash2, Edit3, Check, X } from 'lucide-react';
import type {Project} from '../types';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onToggleLike: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDesc: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, onToggleLike, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDesc, setEditDesc] = useState(project.description);

  const handleSave = () => {
    onEdit(project.id, editTitle, editDesc);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <div className="edit-mode">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input-field"
            placeholder="Projekti pealkiri..."
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="input-field textarea-field"
            placeholder="Projekti kirjeldus..."
            rows={3}
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="action-btn success-btn" title="Сохранить">
              <Check size={20} />
            </button>
            <button onClick={() => setIsEditing(false)} className="action-btn cancel-btn" title="Отменить">
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className="card-actions">
            <button
              onClick={() => onToggleLike(project.id)}
              className={`action-btn like-btn ${project.isLiked ? 'liked' : ''}`}
              title={project.isLiked ? "Kustuta" : "Lemik"}
            >
              <Heart size={20} fill={project.isLiked ? "currentColor" : "none"} />
            </button>
            <div className="right-actions">
              <button onClick={() => setIsEditing(true)} className="action-btn edit-btn" title="Muuda">
                <Edit3 size={20} />
              </button>
              <button onClick={() => onDelete(project.id)} className="action-btn delete-btn" title="Kustuta">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCard;