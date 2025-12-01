
export default function About() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">WHO IS CAMRY?</h1>
                <p className="text-lg text-gray-700 mb-4">
                    BLENDING THE DIGITAL AND PHYSICAL WORLD.
                </p>

                <div className="mt-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Background</h2>
                        <p className="text-gray-600">
                            MOBILE AND WEB APPLICATIONS, GAME DEVELOPMENT
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Next.js', 'React', 'C#', 'HTML/CSS', 'Python', 'C++'].map((skill) => (
                                <span key={skill} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}