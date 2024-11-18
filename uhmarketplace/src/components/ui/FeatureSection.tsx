export default function FeatureSection() {
  const features = [
    {
      icon: "📦",
      title: "Find products around campus",
      description: "Find products around campus from classmates",
    },
    {
      icon: "💬",
      title: "Chat with Students",
      description: "Chat with other students at the University of Houston",
    },
    {
      icon: "📚",
      title: "Academic Services",
      description: "Struggling with exams? Find tutors, and other services",
    },
    {
      icon: "💰",
      title: "Sell Your Items",
      description: "Sell your products and services to get an extra buck",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center p-6">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
