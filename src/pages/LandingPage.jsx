import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Star,
  Rocket,
  Play,
  CheckCircle,
  Shield,
  Brain,
  ChartLine,
  Gamepad2,
  Users,
  Headphones,
  ArrowRight,
  Calendar,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { PageMetadata } from "../components/PageMetadata";
import Logo from "../assets/logo.svg";

const LandingPage = () => {
  return (
    <>
      <PageMetadata
        title="SkillSeed - Empower Your Child's Future Through Learning"
        description="Transform your child's learning journey with personalized education, safe environment, and expert support. Join 10,000+ happy families."
      />

      <main className="bg-[#F5F7FA] relative overflow-hidden">
        {/* Enhanced Floating Bubbles Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="bubble absolute top-10 left-10 w-20 h-20 bg-[#FFC107]/20 rounded-full"></div>
          <div className="bubble absolute top-32 right-20 w-16 h-16 bg-[#1A73E8]/20 rounded-full"></div>
          <div className="bubble absolute top-64 left-1/4 w-24 h-24 bg-[#FF4081]/15 rounded-full"></div>
          <div className="bubble absolute bottom-32 right-10 w-18 h-18 bg-[#4CAF50]/20 rounded-full"></div>
          <div className="bubble absolute bottom-64 left-16 w-22 h-22 bg-[#FFC107]/15 rounded-full"></div>
          <div className="bubble absolute top-1/2 right-1/3 w-12 h-12 bg-[#FF4081]/25 rounded-full"></div>
          <div className="bubble absolute top-20 right-1/4 w-14 h-14 bg-[#1A73E8]/15 rounded-full"></div>
          <div className="bubble absolute bottom-20 left-1/3 w-16 h-16 bg-[#4CAF50]/15 rounded-full"></div>
        </div>

        {/* Header */}
        <header className="bg-[#0A1F44] text-white py-4 relative overflow-hidden z-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="bubble w-16 h-16 bg-white/10 rounded-full absolute top-4 left-1/4"></div>
            <div className="bubble w-12 h-12 bg-white/5 rounded-full absolute top-8 right-1/3"></div>
          </div>

          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-16 rounded-full flex items-center justify-center shadow-lg">
                  <img src={Logo} />
                </div>
                <span className="text-2xl font-bold">SkillSeed</span>
              </div>

              {/* <nav className="hidden md:flex items-center gap-8">
                <span className="hover:text-[#FFC107] transition-colors cursor-pointer">
                  Home
                </span>
                <span className="hover:text-[#FFC107] transition-colors cursor-pointer">
                  About
                </span>
                <span className="hover:text-[#FFC107] transition-colors cursor-pointer">
                  Features
                </span>
                <span className="hover:text-[#FFC107] transition-colors cursor-pointer">
                  Reviews
                </span>
                <span className="hover:text-[#FFC107] transition-colors cursor-pointer">
                  Contact
                </span>
              </nav> */}

              <div className="flex items-center gap-4">
                <Link
                  to="/signin"
                  className="hidden md:block bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0A1F44] px-4 py-2 rounded-full font-semibold transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#FFC107] hover:bg-[#E6AC00] text-[#0A1F44] px-4 py-2 rounded-full font-semibold transition-all"
                >
                  Get Started
                </Link>
                {/* <button className="md:hidden text-white">
                  <Menu className="w-6 h-6" />
                </button> */}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 h-full flex items-center">
          <div className="container mx-auto p-4 2xl:p-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#FFC107]/20 text-[#1A73E8] px-6 py-3 rounded-full mb-6">
                  <Star className="w-5 h-5 text-[#FFC107]" />
                  <span className="font-semibold">
                    Trusted by 100+ Parents
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-[#212121]">
                  Give Your Child the
                  <span className="gradient-text"> Future </span>
                  They Deserve
                </h1>

                <p className="text-lg text-gray-600 my-3 max-w-lg leading-8">
                  SkillSeed transforms learning into an exciting adventure.
                  Watch your child discover their unique talents and build
                  skills for tomorrow's world.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Link
                    to="/signin"
                    className="bg-[#1A73E8] hover:bg-[#1557B0] text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 glow-pulse flex items-center justify-center py-4 md:px-4 md:py-0"
                  >
                    <Rocket className="w-5 h-5 mr-3 inline" />
                    Start Your Child's Journey
                  </Link>
                  {/* <button className="bg-white border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
                    <Play className="w-5 h-5 mr-3 inline" />
                    Watch Demo
                  </button> */}
                  <a
                    href="https://quiz.wekraft.co"
                    target="_blank"
                    className="bg-white border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
                  >
                    {/* <button className="bg-white border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all"> */}
                    <Rocket className="w-5 h-5 mr-2 inline" />
                    Start Free Assessment
                    {/* </button> */}
                  </a>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#4CAF50]" />
                    <span>100% Safe for kids</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <img
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/afe2d69ef0-6d488ef2a493b63eac85.png"
                    alt="happy diverse children using tablets and learning together in colorful classroom, cartoon illustration style"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFC107]/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1A73E8]/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 bg-white relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#1A73E8] mb-2">
                  700+
                </div>
                <div className="text-gray-600">Happy Children</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#4CAF50] mb-2">
                  98%
                </div>
                <div className="text-gray-600">Parent Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFC107] mb-2">
                  50+
                </div>
                <div className="text-gray-600">Learning Modules</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF4081] mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-6">
                Why Parents Choose{" "}
                <span className="gradient-text">SkillSeed</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is designed with your child's safety, growth, and
                happiness in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1A73E8]/10 rounded-full flex items-center justify-center mb-6">
                  <Brain className="text-[#1A73E8] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">
                  Personalized Learning
                </h3>
                <p className="text-gray-600 mb-6">
                  AI-powered system adapts to your child's learning style and
                  pace for optimal growth.
                </p>
                {/* <div className="flex items-center gap-2 text-[#1A73E8] font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-[#4CAF50] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">
                  100% Safe Environment
                </h3>
                <p className="text-gray-600 mb-6">
                  COPPA compliant platform with advanced parental controls and
                  content filtering.
                </p>
                {/* <div className="flex items-center gap-2 text-[#4CAF50] font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-[#FFC107]/10 rounded-full flex items-center justify-center mb-6">
                  <ChartLine className="text-[#FFC107] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">
                  Real-Time Progress
                </h3>
                <p className="text-gray-600 mb-6">
                  Track your child's learning journey with detailed insights and
                  milestone celebrations.
                </p>
                {/* <div className="flex items-center gap-2 text-[#FFC107] font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-[#FF4081]/10 rounded-full flex items-center justify-center mb-6">
                  <Gamepad2 className="text-[#FF4081] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">
                  Gamified Learning
                </h3>
                <p className="text-gray-600 mb-6">
                  Interactive games, rewards, and challenges that make learning
                  irresistibly fun.
                </p>
                {/* <div className="flex items-center gap-2 text-[#FF4081] font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-[#9C27B0]/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="text-[#9C27B0] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">
                  Social Learning
                </h3>
                <p className="text-gray-600 mb-6">
                  Safe peer interaction and collaborative projects that build
                  social skills.
                </p>
                {/* <div className="flex items-center gap-2 text-[#9C27B0] font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                  <Headphones className="text-[#FF5722] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">
                  Expert Support
                </h3>
                <p className="text-gray-600 mb-6">
                  24/7 support from child development experts and educational
                  specialists.
                </p>
                {/* <div className="flex items-center gap-2 text-[#FF5722] font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-10 bg-white relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-6">
                What Parents Are Saying
              </h2>
              <p className="text-xl text-gray-600">
                Real stories from families who've transformed their children's
                learning
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-[#1A73E8]/5 to-[#4CAF50]/5 rounded-3xl p-8 border-2 border-[#1A73E8]/10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="Parent testimonial"
                  />
                  <div>
                    <h4 className="font-bold text-[#212121]">Sarah Johnson</h4>
                    <p className="text-gray-600">Mother of Emma, 8</p>
                  </div>
                </div>
                <div className="flex text-[#FFC107] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "Emma went from struggling with math to loving it! The
                  personalized approach really works. She's more confident and
                  excited about learning every day."
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFC107]/5 to-[#FF4081]/5 rounded-3xl p-8 border-2 border-[#FFC107]/10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                    alt="Parent testimonial"
                  />
                  <div>
                    <h4 className="font-bold text-[#212121]">Michael Chen</h4>
                    <p className="text-gray-600">Father of Alex, 12</p>
                  </div>
                </div>
                <div className="flex text-[#FFC107] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "As a busy parent, I love the progress tracking. I can see
                  exactly how Alex is doing and celebrate his achievements. The
                  platform is incredibly user-friendly."
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#4CAF50]/5 to-[#1A73E8]/5 rounded-3xl p-8 border-2 border-[#4CAF50]/10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                    alt="Parent testimonial"
                  />
                  <div>
                    <h4 className="font-bold text-[#212121]">Amara Okafor</h4>
                    <p className="text-gray-600">Mother of twins, 10</p>
                  </div>
                </div>
                <div className="flex text-[#FFC107] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">
                  "My twins have different learning styles, and SkillSeed adapts
                  perfectly to both. They're learning together but at their own
                  pace. It's amazing to watch!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-gradient-to-r from-[#1A73E8] to-[#4CAF50] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div
              className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Unlock Your Child's Potential?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of parents who have discovered their children's
              hidden talents. Start your free assessment today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://quiz.wekraft.co"
                target="_blank"
                className="bg-white text-[#1A73E8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Rocket className="w-5 h-5 mr-2 inline" />
                Start Free Assessment
              </a>

              {/* <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#1A73E8] transition-colors">
                <Calendar className="w-5 h-5 mr-2 inline" />
                Schedule Demo
              </button> */}
            </div>

            <div className="mt-8 text-white/80">
              <Shield className="w-5 h-5 mr-2 inline" />
              No credit card required • 100% secure • Instant access
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0A1F44] text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-14 rounded-full flex items-center justify-center">
                    <img src={Logo} />
                  </div>
                  <span className="text-2xl font-bold">SkillSeed</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Empowering African children to discover their potential
                  through innovative edtech solutions.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-2 text-sm">
                  <span className="text-gray-300 hover:text-[#FFC107] transition-colors block cursor-pointer">
                    Features
                  </span>
                  <span className="text-gray-300 hover:text-[#FFC107] transition-colors block cursor-pointer">
                    Pricing
                  </span>
                  <span className="text-gray-300 hover:text-[#FFC107] transition-colors block cursor-pointer">
                    Demo
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2 text-sm">
                  <span className="text-gray-300 hover:text-[#FFC107] transition-colors block cursor-pointer">
                    Help Center
                  </span>
                  <span className="text-gray-300 hover:text-[#FFC107] transition-colors block cursor-pointer">
                    Contact Us
                  </span>
                  <span className="text-gray-300 hover:text-[#FFC107] transition-colors block cursor-pointer">
                    Privacy Policy
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                  <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-colors cursor-pointer">
                    <Facebook className="w-4 h-4" />
                  </span>
                  <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-colors cursor-pointer">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-colors cursor-pointer">
                    <Instagram className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 text-center text-gray-300 text-sm">
              <p>
                &copy; 2025 SkillSeed by WeKraft Limited. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
