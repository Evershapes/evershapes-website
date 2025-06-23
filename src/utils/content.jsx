// Import the single JSON file
import allContent from '../content/all-content.json';

// Get all categories
export const getCategories = () => {
  return Object.keys(allContent).sort();
};

// Get all projects across all categories
export const getAllProjects = () => {
  let allProjects = [];
  
  Object.entries(allContent).forEach(([category, projects]) => {
    projects.forEach(project => {
      allProjects.push({
        ...project,
        category: category
      });
    });
  });
  
  return allProjects.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date();
    const dateB = b.date ? new Date(b.date) : new Date();
    return dateB - dateA;
  });
};

// Get projects by category
export const getProjectsByCategory = (category) => {
  return allContent[category] || [];
};

// Get single project by ID
export const getProjectById = (id) => {
  for (const [category, projects] of Object.entries(allContent)) {
    const project = projects.find(p => p.id === id);
    if (project) {
      return { ...project, category };
    }
  }
  return null;
};

// Get featured projects
export const getFeaturedProjects = () => {
  return getAllProjects().filter(project => project.featured);
};

// Format category name for display
export const formatCategoryName = (category) => {
  return category.replace(/-/g, ' ');
};