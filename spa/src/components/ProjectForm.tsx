import React, { useState, type KeyboardEvent } from 'react';

interface ProjectFormProps {
  onAdd: (title: string, description: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="form-card">
      <input
        type="text"
        placeholder="Projekti pealkiri..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Lühike kirjeldus..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-field"
      />
      <button onClick={handleAdd} className="primary-btn">Lisa projekt</button>
    </div>
  );
};

export default ProjectForm;