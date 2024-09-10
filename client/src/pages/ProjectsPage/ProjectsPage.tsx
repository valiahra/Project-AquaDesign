import React, { useEffect, useState } from 'react';
import styles from './ProjectsPage.module.css';
import axiosInstance from '../../axiosInstance';
import PaginationProject from './PaginateProject';
import ProjectsList from '../../components/ListProject/ProjectsList';


export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [fountainsPerPage] = useState(10);

  const lastFountainsIndex = currentPage * fountainsPerPage;
  const firstFountainsIndex = lastFountainsIndex - fountainsPerPage;
  const currentFountains = projects.slice(
    firstFountainsIndex,
    lastFountainsIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/fountains/view/2`)
      .then((res) => {
        // console.log(res.data)
        setProjects(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* <ProjecDrawer /> */}
      <h1 className={styles.project}>Проекты фонтанов</h1>

      <ProjectsList projects={currentFountains} setProjects={setProjects} />
      <PaginationProject
        fountainsPerPage={fountainsPerPage}
        totalFoutains={projects.length}
        paginate={paginate}
      />
    </div>
  );
}
