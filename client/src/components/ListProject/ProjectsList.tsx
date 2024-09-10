import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectList.module.css';

export default function ProjectsList({ projects, setProjects }) {
  return (
    <div className={styles.list}>
      {projects.length
        ? projects.map((el) => (
            <ProjectCard key={el.id} el={el} setEntries={setProjects} />
          ))
        : null}
    </div>
  );
}
