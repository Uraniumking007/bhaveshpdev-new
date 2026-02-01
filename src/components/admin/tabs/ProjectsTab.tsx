import { useState } from 'react';
import { Plus, Award, CheckCircle2, Github, Globe, Trash2, Folder, Tags, Calendar, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../SectionHeader';
import { EmptyState } from '../EmptyState';
import { FormInput } from '../FormInput';
import { FormTextarea } from '../FormTextarea';
import { FormCheckbox } from '../FormCheckbox';
import { MultiSelect } from '../MultiSelect';
import { FormDatePicker } from '../FormDatePicker';
import { ImageUrlArray } from '../ImageUrlArray';
import type { StaticData, Project } from '../types';

interface ProjectsTabProps {
  data: StaticData;
  setData: (data: StaticData) => void;
  setUnsavedChanges: (val: boolean) => void;
}

export function ProjectsTab({ data, setData, setUnsavedChanges }: ProjectsTabProps) {
  const addProject = () => {
    setData({
      ...data,
      projects: [
        {
          id: crypto.randomUUID(),
          name: '',
          description: '',
          image: '',
          link: null,
          github: null,
          technologies: [],
          categories: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          projectInitiated: null,
          projectCompleted: null,
          isCompleted: false,
          endDate: null,
          isFeatured: false,
          images: [],
        },
        ...data.projects,
      ],
    });
    setUnsavedChanges(true);
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], ...updates, updatedAt: new Date().toISOString() };
    setData({ ...data, projects: newProjects });
    setUnsavedChanges(true);
  };

  const deleteProject = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const newProjects = data.projects.filter((_, i) => i !== index);
      setData({ ...data, projects: newProjects });
      setUnsavedChanges(true);
    }
  };

  return (
    <div>
      <SectionHeader title="Projects" count={data.projects.length} onAdd={addProject} addLabel="Add Project" />

      {data.projects.length === 0 ? (
        <EmptyState message="No projects yet. Create your first project!" onAdd={addProject} addLabel="Add Project" />
      ) : (
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              data={data}
              onUpdate={(updates) => updateProject(index, updates)} 
              onDelete={() => deleteProject(index)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ 
  project, 
  data,
  onUpdate, 
  onDelete 
}: { 
  project: Project; 
  data: StaticData;
  onUpdate: (updates: Partial<Project>) => void; 
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(!project.name);

  const technologyOptions = data.technologies.map(tech => ({
    value: tech.id,
    label: tech.name,
  }));

  const categoryOptions = data.categories.map(cat => ({
    value: cat.id,
    label: cat.name,
  }));

  const selectedTechnologyIds = project.technologies.map(t => t.technologyId);
  const selectedCategoryIds = project.categories.map(c => c.categoryId);

  const handleTechnologiesChange = (values: string[]) => {
    onUpdate({
      technologies: values.map(techId => ({
        projectId: project.id,
        technologyId: techId,
      })),
    });
  };

  const handleCategoriesChange = (values: string[]) => {
    onUpdate({
      categories: values.map(catId => ({
        projectId: project.id,
        categoryId: catId,
      })),
    });
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 ${isExpanded ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{project.name || 'Untitled Project'}</h3>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                <Award size={12} />
                Featured
              </span>
            )}
            {project.isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <CheckCircle2 size={12} />
                Completed
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{project.description || 'No description'}</p>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            {project.technologies.length > 0 && (
              <span className="flex items-center gap-1">
                <Tags size={12} />
                {project.technologies.length} tech
              </span>
            )}
            {project.categories.length > 0 && (
              <span className="flex items-center gap-1">
                <Folder size={12} />
                {project.categories.length} categories
              </span>
            )}
            {project.images.length > 0 && (
              <span className="flex items-center gap-1">
                <ImageIcon size={12} />
                {project.images.length} images
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Project Name" value={project.name} onChange={val => onUpdate({ name: val })} placeholder="Enter project name" />

              <FormInput label="Main Image URL" value={project.image} onChange={val => onUpdate({ image: val })} placeholder="https://..." type="url" />
            </div>

            <FormTextarea label="Description" value={project.description} onChange={val => onUpdate({ description: val })} placeholder="Describe your project..." rows={3} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="GitHub URL" value={project.github || ''} onChange={val => onUpdate({ github: val || null })} placeholder="https://github.com/..." type="url" icon={<Github size={18} />} />

              <FormInput label="Live URL" value={project.link || ''} onChange={val => onUpdate({ link: val || null })} placeholder="https://..." type="url" icon={<Globe size={18} />} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultiSelect
                label="Technologies"
                options={technologyOptions}
                selected={selectedTechnologyIds}
                onChange={handleTechnologiesChange}
                placeholder="Select technologies..."
              />

              <MultiSelect
                label="Categories"
                options={categoryOptions}
                selected={selectedCategoryIds}
                onChange={handleCategoriesChange}
                placeholder="Select categories..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormDatePicker
                label="Project Initiated"
                value={project.projectInitiated}
                onChange={(val) => onUpdate({ projectInitiated: val })}
              />

              <FormDatePicker
                label="Project Completed"
                value={project.projectCompleted}
                onChange={(val) => onUpdate({ projectCompleted: val })}
              />

              <FormDatePicker
                label="End Date"
                value={project.endDate}
                onChange={(val) => onUpdate({ endDate: val })}
              />
            </div>

            <ImageUrlArray
              label="Gallery Images"
              images={project.images}
              onChange={(images) => onUpdate({ images })}
            />

            <div className="flex flex-wrap gap-4 pt-2">
              <FormCheckbox label="Featured Project" checked={project.isFeatured} onChange={val => onUpdate({ isFeatured: val })} />

              <FormCheckbox label="Completed" checked={project.isCompleted} onChange={val => onUpdate({ isCompleted: val })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
