"use client"

import { useTranslations } from '@/hooks/useTranslations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const teamMembers = [
  {
    name: "Viktor Krasnov",
    position: "Founder & Lead Contractor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "With over 15 years of experience in construction and renovation, Viktor founded VK Bouwmaster with a vision to deliver exceptional quality and customer service.",
    specialties: ["Project Management", "Construction", "Quality Control"],
    experience: "15+ years"
  },
  {
    name: "Maria Rodriguez",
    position: "Interior Design Specialist",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Maria brings creativity and expertise to every project, helping clients achieve their vision with innovative design solutions and attention to detail.",
    specialties: ["Interior Design", "Color Consultation", "Space Planning"],
    experience: "12+ years"
  },
  {
    name: "James Thompson",
    position: "Master Carpenter",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "James is a skilled craftsman with expertise in custom carpentry, cabinet making, and fine woodworking. His attention to detail is unmatched.",
    specialties: ["Custom Carpentry", "Cabinet Making", "Fine Woodworking"],
    experience: "18+ years"
  },
  {
    name: "Sarah Kim",
    position: "Flooring Specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Sarah specializes in all types of flooring installation and repair. Her precision and knowledge ensure perfect results every time.",
    specialties: ["Hardwood Installation", "Tile Work", "Floor Repair"],
    experience: "10+ years"
  },
  {
    name: "David Wilson",
    position: "Plumbing Expert",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "David is a licensed plumber with extensive experience in residential and commercial plumbing systems. He ensures everything works perfectly.",
    specialties: ["Plumbing Installation", "System Repair", "Emergency Services"],
    experience: "14+ years"
  },
  {
    name: "Lisa Chen",
    position: "Painting Professional",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    bio: "Lisa is a painting specialist with an eye for color and detail. She transforms spaces with beautiful, long-lasting finishes.",
    specialties: ["Interior Painting", "Exterior Painting", "Specialty Finishes"],
    experience: "8+ years"
  }
];

export default function TeamPage() {
  const { t, isInitialized } = useTranslations()
  const heroRef = useScrollAnimation()
  const teamRef = useScrollAnimation()
  const valuesRef = useScrollAnimation()

  if (!isInitialized) {
    return (
      <div className="unified-gradient-bg">
        <section className="text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="unified-gradient-bg">
      {/* Hero Section */}
      <section className="text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.team.hero.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">{t.team.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.team.intro.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.team.intro.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-300 mb-4 text-sm">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2 text-sm">{t.team.specialties}</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300">{t.team.experience} {member.experience}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.team.values.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.team.values.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.team.values.collaboration}</h3>
              <p className="text-gray-300">
                We work together as a unified team, sharing knowledge and supporting each other to deliver the best results.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.team.values.excellence}</h3>
              <p className="text-gray-300">
                We strive for excellence in everything we do, from the smallest detail to the overall project completion.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t.team.values.learning}</h3>
              <p className="text-gray-300">
                We stay updated with the latest techniques, materials, and industry standards to provide the best service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Training */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.team.certs.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our team maintains the highest professional standards through ongoing education and certification
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏅</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.team.certs.licensed}</h3>
              <p className="text-gray-300 text-sm">
                All team members hold appropriate licenses and certifications for their specialties
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.team.certs.training}</h3>
              <p className="text-gray-300 text-sm">
                Regular training sessions to stay current with industry best practices and new technologies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.team.certs.safety}</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive safety training and certification to ensure secure work environments
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.team.certs.quality}</h3>
              <p className="text-gray-300 text-sm">
                Regular quality assessments and peer reviews to maintain our high standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">{t.team.join.title}</h2>
          <p className="text-xl text-blue-100 mb-8">{t.team.join.subtitle}</p>
          <div className="flex gap-6 flex-col sm:flex-row justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              {t.common?.applyNow || 'Apply Now'}
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t.common?.learnMore || 'Learn More About Us'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
