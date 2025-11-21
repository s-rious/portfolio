// app/projects/page.tsx - Update to use JSON data
import projects from '@/data/projects.json';

export default function Projects() {
    // Sort by date, newest first
    const sortedProjects = [...projects].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Projects</h1>
                <p className="text-lg text-gray-700 mb-8">
                    MY WORK
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedProjects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            {project.featured && (
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                  Featured
                </span>
                            )}
                            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {tag}
                  </span>
                                ))}
                            </div>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    View Project →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}