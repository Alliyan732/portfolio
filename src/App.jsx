import "./App.css";
import Hero from "./components/Hero";
import information from "./content/information";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import Heading from "./components/Heading";
import projects from "./content/projects";
import Skill from "./components/Skill";
import skills from "./content/skills";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import blogPosts from "./content/blogPosts";
import ContactForm from "./components/ContactForm";
import BlogPost from "./components/BlogPost";
import Modal from 'react-modal';

function App() {
  // react modal
  const customStyles = {
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1F2945',
      height: '600px', // Corrected property name
      width: '600px',
    },
  };
  
  let subtitle;
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // Your existing code
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsOpen(false);
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Navbar
        firstName={information.userData.firstName}
        lastName={information.userData.lastName}
      />
      <Hero
        img={information.userData.img}
        description={information.userData.description}
        title={information.userData.title}
      />
      <div className="hr"></div>

      <section id="projects">
        <Heading firstWord="My" secondWord="Projects" />
        <motion.div
          className="project-map"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <div onClick={() => openModal(project)} key={index}>
              <ProjectCard
                name={project.name}
                img={project.img}
                description={project.description}
                source={project.sourceCode}
                preview={project.preview}
              />
            </div>
          ))}
          <div className="modal-div">
            {selectedProject && (
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Project Modal"
              >
                <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                  <button
                    onClick={closeModal}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="modal-img-div"  >
                <img className=" modal-img object-contain " src={selectedProject.img} alt="" />
                </div>
                <p className="mt-4">{selectedProject.description}</p>
                <p className="mt-2">
                  <span className="text-gray-600">Video Link: </span>{" "}
                  <a href={selectedProject.sourceCode} className="text-blue-500">
                    {selectedProject.sourceCode}
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">GitHub (Web): </span>{" "}
                  <a href={selectedProject.sourceCode} className="text-blue-500">
                    {selectedProject.sourceCode}
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">GitHub (Mobile): </span>{" "}
                  <a href={selectedProject.sourceCode} className="text-blue-500">
                    {selectedProject.sourceCode}
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">GitHub (Backend): </span>{" "}
                  <a href={selectedProject.sourceCode} className="text-blue-500">
                    {selectedProject.sourceCode}
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">Figma Design (Web): </span>{" "}
                  <a href={selectedProject.sourceCode} className="text-blue-500">
                    {selectedProject.sourceCode}
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-gray-600">Figma Design (Mobile): </span>{" "}
                  <a href={selectedProject.sourceCode} className="text-blue-500">
                    {selectedProject.sourceCode}
                  </a>
                </p>

              </Modal>

            )}
          </div>
        </motion.div>
        <div className="viewMoreBtn">
          <a className="cyber-scourge" href="https://github.com/Alliyan732?tab=repositories">
            View More Posts
          </a>
        </div>
      </section>
      <section id="skills">
        <Heading firstWord="Skills" secondWord="&Tools" />
        <motion.div
          className="skill-map"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={skillVariants}>
              <Skill skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section id="blog">
        <Heading firstWord="My" secondWord="Certificates" />
        <div className="posts">
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              image={post.image}
              read={post.link}
              date={post.pubDate}
            />
          ))}
        </div>
      </section>
      <section id="contact">
        <Heading firstWord="Contact" secondWord="Me" />
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}

export default App;
