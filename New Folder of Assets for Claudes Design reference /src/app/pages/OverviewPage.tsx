import { Link } from "react-router";
import { ArrowLeft, Users, Shield, Lightbulb, FileCheck } from "lucide-react";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-black hover:text-black/70 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to home</span>
        </Link>
        <div className="flex gap-3">
          <Link
            to="/"
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Schedule Workshop
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h1 className="text-5xl font-medium text-black mb-6 tracking-tight">
          Krea Workshop Overview
        </h1>
        <p className="text-xl text-black/70 leading-relaxed max-w-3xl mx-auto">
          A structured enablement program that helps teams move from "testing GenAI" to confidently using it in real, governed workflows.
        </p>
      </div>
    </section>
  );
}

function OverviewCard({ icon: Icon, title, description, bullets }: {
  icon: React.ElementType;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium text-black mb-2">{title}</h3>
          <p className="text-black/70 leading-relaxed">{description}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
            <span className="text-black/70 text-sm leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhatYouGet() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-black mb-4">What You Get</h2>
          <p className="text-black/70 max-w-2xl mx-auto">
            The workshop provides hands-on training, expert support, and tangible outputs that your team can use immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <OverviewCard
            icon={Users}
            title="Team enablement and upskilling"
            description="The workshop is designed around your actual use cases (e.g., content and creative, text‑to‑video, asset editing)."
            bullets={[
              "Editors and creators get practical, scenario-based training",
              "Apply Krea directly to day-to-day work instead of generic demos",
              "Build confidence through hands-on practice with real workflows",
              "Create a core group of power users who can train others"
            ]}
          />

          <OverviewCard
            icon={Shield}
            title="Safe, governed GenAI experimentation"
            description="The sessions take place within a secure, policy‑aligned environment."
            bullets={[
              "Align with your legal and security requirements",
              "No training on your data - maintain full data privacy",
              "Commercial license for all generated outputs",
              "AI addendum for Enterprise with clear governance guardrails",
              "Stakeholders have confidence in controlled experimentation"
            ]}
          />

          <OverviewCard
            icon={Lightbulb}
            title="Hands-on expert support"
            description="During live sessions, Krea specialists work directly with your team."
            bullets={[
              "Walk through core features with your specific workflows",
              "Review prompts and outputs in real-time",
              "Troubleshoot real scenarios as they arise",
              "Advise on credit usage and efficiency optimization",
              "Applied support, not theoretical training"
            ]}
          />

          <OverviewCard
            icon={FileCheck}
            title="Custom assets and workflows as tangible outputs"
            description="By the end of the workshop, your team walks away with ready-to-use resources."
            bullets={[
              "Reusable prompts and styles aligned to your brand",
              "Example projects for images, video, and asset editing",
              "Custom-built Nodes workflows that automate common tasks",
              "Documentation and reference material for ongoing use",
              "Resources that non-experts can leverage immediately"
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "We meet with your team to understand your use cases, workflows, and goals. Together we identify the specific scenarios to focus on during the workshop."
    },
    {
      step: "2",
      title: "Workshop Sessions",
      description: "Live, hands-on training sessions where your team works with Krea specialists. Sessions are tailored to your actual projects and creative processes."
    },
    {
      step: "3",
      title: "Implementation Support",
      description: "Post-workshop support to help integrate custom workflows into your production pipeline. Includes documentation and follow-up consultations."
    },
    {
      step: "4",
      title: "Ongoing Enablement",
      description: "Access to resources, best practices, and continued guidance as your team scales AI adoption across the organization."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-black mb-4">How It Works</h2>
          <p className="text-black/70 max-w-2xl mx-auto">
            A structured approach to ensure your team gets maximum value from the workshop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">{item.title}</h3>
                  <p className="text-black/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-black mb-4">The Value</h2>
          <p className="text-black/70 max-w-2xl mx-auto">
            Transform how your team approaches creative work with AI.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl font-medium mb-8 leading-relaxed">
              Together, this gives you a secure way to pilot GenAI, a trained core group of power users, and a set of ready-to-use workflows and assets that make Krea an immediate, practical part of your content production process.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold mb-2">Secure</div>
                <p className="text-white/90">Pilot GenAI with confidence in a governed environment</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Skilled</div>
                <p className="text-white/90">Build a trained core group of power users</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Ready</div>
                <p className="text-white/90">Get workflows and assets you can use immediately</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-medium mb-6">Ready to get started?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Schedule a workshop with our team to see how Krea can transform your creative workflows.
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-lg"
        >
          Schedule Your Workshop
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-medium text-sm text-black mb-4">Krea</h3>
          <ul className="space-y-2 text-sm text-black/60">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">Video</a></li>
            <li><a href="#" className="hover:text-black">Realtime</a></li>
            <li><a href="#" className="hover:text-black">Studio</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-sm text-black mb-4">Features</h3>
          <ul className="space-y-2 text-sm text-black/60">
            <li><a href="#" className="hover:text-black">Tuner</a></li>
            <li><a href="#" className="hover:text-black">Enhance</a></li>
            <li><a href="#" className="hover:text-black">Upscale</a></li>
            <li><a href="#" className="hover:text-black">Remove BG</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-sm text-black mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-black/60">
            <li><a href="#" className="hover:text-black">Guides</a></li>
            <li><a href="#" className="hover:text-black">Docs</a></li>
            <li><a href="#" className="hover:text-black">Enterprise</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-sm text-black mb-4">About</h3>
          <ul className="space-y-2 text-sm text-black/60">
            <li><a href="#" className="hover:text-black">Blog</a></li>
            <li><a href="#" className="hover:text-black">Press</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-black/50">© 2025 Krea</p>
        <div className="flex gap-4 text-black/50">
          <a href="#" className="hover:text-black">𝕏</a>
          <a href="#" className="hover:text-black">in</a>
          <a href="#" className="hover:text-black">IG</a>
        </div>
      </div>
    </footer>
  );
}

export function OverviewPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhatYouGet />
      <Process />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}
