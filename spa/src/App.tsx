import React, { useState, useEffect } from 'react';
import type {Project} from './types';
import { Sun, Moon } from 'lucide-react';
import ProjectForm from './components/ProjectForm';
import ProjectCard from './components/ProjectCard';
import './App.css';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('my_portfolio_projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme_mode') === 'dark';
  });

  const [filterActive, setFilterActive] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('my_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme_mode', 'light');
    }
  }, [isDarkMode]);

  const addProject = (title: string, description: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title,
      description,
      isLiked: false,
    };
    setProjects([newProject, ...projects]);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const toggleLike = (id: string) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, isLiked: !project.isLiked } : project
    ));
  };

  const editProject = (id: string, newTitle: string, newDescription: string) => {
    setProjects(projects.map(project =>
      project.id === id ? { ...project, title: newTitle, description: newDescription } : project
    ));
  };

  const displayedProjects = filterActive
    ? projects.filter(p => p.isLiked)
    : projects;

  return (
      <div className="app-container">
      <div className="top-bar">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="theme-toggle-btn"
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      <header className="hero-section">
        <h1>Projektide ideepank</h1>
        <p>Salvesta ja halda oma parimaid ideid</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Lisa uus projekti idee</h2>
          <ProjectForm onAdd={addProject} />
        </section>

        <section className="projects-section">
          <div className="section-header">
  <h2>Minu Projektid / Ideed</h2>
  <button
    className={`filter-btn ${filterActive ? 'active' : ''}`}
    onClick={() => setFilterActive(!filterActive)}
  >
    {filterActive ? 'Näita kõiki' : 'Näita ainult lemmikuid'}
  </button>
</div>


          {displayedProjects.length === 0 ? (
            <div className="empty-state">
              <p>Hetkel andmed puuduvad. Lisa oma esimene projekt!</p>
            </div>
          ) : (
            <div className="projects-grid">
              {displayedProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={deleteProject}
                  onToggleLike={toggleLike}
                  onEdit={editProject}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;