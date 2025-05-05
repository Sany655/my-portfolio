import React from 'react';

const styles = {
  page: {
    maxWidth: 900,
    margin: '40px auto',
    background: '#fff',
    padding: '0 0 40px 0',
    fontFamily: "'Open Sans', Arial, sans-serif",
    color: '#222',
    borderRadius: 10,
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    minHeight: '1200px',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: 'linear-gradient(90deg, #2e86de 60%, #48dbfb 100%)',
    color: '#fff',
    padding: '32px 50px 24px 50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  name: {
    fontSize: 38,
    fontWeight: 800,
    letterSpacing: 1,
    marginBottom: 0,
    textAlign: 'left',
    lineHeight: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: 1,
    color: '#dff9fb',
    marginBottom: 0,
    textAlign: 'left',
    marginTop: 6
  },
  contactSection: {
    marginBottom: 32
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2e86de',
    marginBottom: 10,
    letterSpacing: 1,
    borderBottom: '2px solid #dfe6e9',
    paddingBottom: 4,
    textAlign: 'left'
  },
  contactRow: {
    marginTop: 10,
    textAlign: 'left'
  },
  contactItem: {
    fontSize: 14,
    color: '#222',
    marginBottom: 0,
    // textAlign: 'left'
  },
  socialRow: {
    marginTop: 10,
    textAlign: 'left'
  },
  socialLink: {
    fontSize: 14,
    color: '#2e86de',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    padding: '40px 50px 0 50px',
    flex: 1
  },
  leftCol: {
    flex: 2.2,
    paddingRight: 40,
    borderRight: '1.5px solid #dfe6e9'
  },
  rightCol: {
    flex: 1.2,
    paddingLeft: 40
  },
  section: {
    marginBottom: 32
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#2e86de',
    marginBottom: 12,
    letterSpacing: 1,
    borderBottom: '2px solid #dfe6e9',
    paddingBottom: 4,
    textAlign: 'left'
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    marginBottom: 8,
    marginTop: 18,
    letterSpacing: 0.5,
    textAlign: 'left',
    textDecoration: 'underline'
  },
  experience: {
    marginBottom: 18
  },
  experienceHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3
  },
  company: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    textAlign: 'left'
  },
  position: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: 600,
    textAlign: 'left'
  },
  date: {
    fontSize: 13,
    color: '#8395a7',
    fontWeight: 500,
    textAlign: 'left'
  },
  description: {
    fontSize: 13,
    marginBottom: 5,
    color: '#444',
    textAlign: 'left'
  },
  skillCategory: {
    fontWeight: 700,
    fontSize: 13,
    color: '#222',
    marginBottom: 2,
    textAlign: 'left'
  },
  skillItem: {
    fontSize: 13,
    marginBottom: 2,
    display: 'inline'
  },
  educationItem: {
    marginBottom: 16
  },
  institution: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    textAlign: 'left'
  },
  degree: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: 600,
    textAlign: 'left'
  },
  summary: {
    fontSize: 14,
    color: '#444',
    marginBottom: 18,
    lineHeight: 1.6,
    textAlign: 'left'
  },
  projectItem: {
    marginBottom: 16
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    textAlign: 'left'
  },
  projectDesc: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
    textAlign: 'left'
  },
  projectLink: {
    fontSize: 13,
    color: '#2e86de',
    textDecoration: 'underline'
  }
};

function formatDate(date) {
  if (!date) return '';
  let d = typeof date?.toDate === 'function' ? date.toDate() : new Date(date);
  if (isNaN(d)) return '';
  return d.toLocaleString('default', { month: 'short', year: 'numeric' });
}

// Split education into academic and courses
function splitEducation(education) {
  const academic = [];
  const courses = [];
  education.forEach((edu) => {
    if (edu.icon === 'certificate') {
      courses.push(edu);
    } else {
      academic.push(edu);
    }
  });
  return { academic, courses };

}

// contact is now passed as a prop
const ResumeTemplate = ({ about, experience, education, skills, projects, contact }) => {
  const { academic, courses } = splitEducation(education);

  return (
    <div style={styles.page}>
      {/* Header: Only name and title */}
      <div style={styles.header}>
        <div style={styles.name}>{about.name}</div>
        <div style={styles.title}>{about.title}</div>
      </div>
      {/* Main Content */}
      <div style={styles.main}>
        {/* Left Column */}
        <div style={styles.leftCol}>
          {/* Summary/About */}
          {about.summary && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>PROFILE</div>
              <div style={styles.summary}>{about.summary}</div>
            </div>
          )}
          {/* Experience */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</div>
            {experience.map((exp, index) => (
              <div key={index} style={styles.experience}>
                <div style={styles.experienceHeader}>
                  <div>
                    <div style={styles.company}>{exp.company}</div>
                    <div style={styles.position}>{exp.position}</div>
                  </div>
                  <div style={styles.date}>
                    {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && <div style={styles.description}>{exp.description}</div>}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} style={styles.description}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {/* Projects */}
          {projects && projects.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>PROJECTS</div>
              {projects.map((proj, idx) => (
                <div key={idx} style={styles.projectItem}>
                  <div style={styles.projectTitle}>{proj.title}</div>
                  {proj.description && <div style={styles.projectDesc}>{proj.description}</div>}
                  {proj.link && (
                    <div>
                      <a href={proj.link} style={styles.projectLink} target="_blank" rel="noopener noreferrer">
                        {proj.link}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right Column */}
        <div style={styles.rightCol}>
          {/* Contact Info */}
          {contact && (
            <div style={styles.contactSection}>
              <div style={styles.contactTitle}>CONTACT</div>
              <div style={styles.contactRow}>
                {contact.email && <p style={styles.contactItem}>{contact.email}</p>}
                {contact.phone && <p style={styles.contactItem}>{contact.phone}</p>}
                {contact.location && <p style={styles.contactItem}>{contact.location}</p>}
              </div>
              {contact.socialLinks && contact.socialLinks.length > 0 && (
                <div style={styles.socialRow}>
                  {contact.socialLinks.map((link, idx) => (
                    <div 
                    key={idx}>
                      <a
                        href={link.url}
                        style={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.platform}
                      </a>
                      <p>{link.url}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Skills */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>SKILLS</div>
            {skills.map((skillCategory, index) => (
              <div key={index}>
                <div style={styles.skillCategory}>
                  {skillCategory.skills.map((skill, i) => (
                    <span key={i} style={styles.skillItem}>
                      {skill.name}{i < skillCategory.skills.length - 1 ? ', ' : ''}
                    </span>
                  ))} in {skillCategory.category}
                </div>
              </div>
            ))}
          </div>
          {/* Education with sub headers */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>EDUCATION</div>
            {academic.length > 0 && (
              <>
                <div style={styles.subSectionTitle}>Academic</div>
                {academic.map((edu, index) => (
                  <div key={index} style={styles.educationItem}>
                    <div style={styles.institution}>{edu.institution}</div>
                    <div style={styles.degree}>{edu.degree} in {edu.field}</div>
                    <div style={styles.date}>
                      {formatDate(edu.startDate)} - {edu.currentlyEnrolled ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </>
            )}
            {courses.length > 0 && (
              <>
                <div style={styles.subSectionTitle}>Courses</div>
                {courses.map((edu, index) => (
                  <div key={index} style={styles.educationItem}>
                    <div style={styles.institution}>{edu.institution}</div>
                    <div style={styles.degree}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                    <div style={styles.date}>
                      {formatDate(edu.startDate)} - {edu.currentlyEnrolled ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;