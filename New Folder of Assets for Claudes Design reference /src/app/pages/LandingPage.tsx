import { Link } from "react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import svgPaths from "@/imports/svg-lxwnzh4jnl";
import imgFrame2085653299 from "figma:asset/ea5cdb7bad9bf478c8a24de42ced6aab7e75cc7b.png";
import imgFrame2085653300 from "figma:asset/af3153b6279953107f4a09196cb9a534b6fb4365.png";
import imgFrame2085653301 from "figma:asset/e51a9a42a263f63117fae636544f17aad537f5ae.png";
import imgFrame2085653302 from "figma:asset/800024d41f059fbe5c9e7b052c250842379aff81.png";
import imgFrame2085653303 from "figma:asset/bfcac4afc0b147be20f98c5262909a6ac5324082.png";
import imgFrame2085653304 from "figma:asset/ae875c2f66d461d417176020682a46957f322a0f.png";
import imgFrame2085653305 from "figma:asset/cda9234b8b22b504bd95491d1997095b835dde5b.png";
import imgVmlLogoTransparent1 from "figma:asset/7e8574281a890f4bd2bc159d65801660ccd0f0d3.png";
import {
  AmazonStudiosLogo,
  NetflixLogo,
  MicrosoftLogo,
  NikeLogo,
  ShopifyLogo,
  PublicisLogo,
  McCannLogo,
  VMLLogo,
  ParamountLogo,
} from "@/app/components/CompanyLogos";

function BackgroundGrid() {
  return (
    <div className="absolute h-full left-0 top-0 w-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 893" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Group 905">
          <mask height="893" id="mask0_1_429" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="1440" x="0" y="0">
            <path d={svgPaths.p1dd9ec00} fill="var(--fill-0, #D9D9D9)" id="Exclude" />
          </mask>
          <g mask="url(#mask0_1_429)">
            <rect data-figma-bg-blur-radius="100" fill="url(#pattern0_1_429)" fillOpacity="0.24" height="893" id="Rectangle 12313896" width="1440" />
          </g>
        </g>
        <defs>
          <pattern height="1" id="pattern0_1_429" patternTransform="matrix(11 0 0 11 0 0)" patternUnits="userSpaceOnUse" preserveAspectRatio="none" viewBox="0 0 10 10" width="1">
            <g id="pattern0_1_429_inner">
              <path d={svgPaths.p3b08a800} id="Vector" stroke="var(--stroke-0, #A9A9A9)" strokeWidth="0.5" />
            </g>
          </pattern>
        </defs>
      </svg>
    </div>
  );
}

function FloatingImageCard({ images, className, rotation }: { images: string[], className?: string, rotation?: string }) {
  return (
    <div className={`${className} ${rotation || ''}`}>
      <div className="relative rounded-[14.189px] size-[170.214px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[14.189px]">
          {images.map((img, i) => (
            <img key={i} alt="" className="absolute max-w-none object-cover rounded-[14.189px] size-full" src={img} />
          ))}
          <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-[14.189px] to-[rgba(0,0,0,0.3)]" />
        </div>
      </div>
    </div>
  );
}

function FloatingImages() {
  return (
    <div className="absolute left-0 top-0 w-full h-[600px] overflow-hidden pointer-events-none">
      <div className="absolute left-[134.91px] top-[495.43px]">
        <div className="-rotate-15">
          <FloatingImageCard images={[imgFrame2085653299, imgFrame2085653300, imgFrame2085653301]} />
        </div>
      </div>
      <div className="absolute left-[-43px] top-[277.17px] h-[169.821px] w-[262.742px]">
        <div className="relative size-full rounded-[14.189px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[14.189px]">
            <img alt="" className="absolute max-w-none object-cover rounded-[14.189px] size-full" src={imgFrame2085653299} />
            <img alt="" className="absolute max-w-none object-cover rounded-[14.189px] size-full" src={imgFrame2085653302} />
            <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-[14.189px] to-[rgba(0,0,0,0.3)]" />
          </div>
        </div>
      </div>
      <div className="absolute right-[100px] top-[277.17px] h-[169.821px] w-[262.742px]">
        <div className="relative size-full rounded-[14.189px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[14.189px]">
            <img alt="" className="absolute max-w-none object-cover rounded-[14.189px] size-full" src={imgFrame2085653299} />
            <img alt="" className="absolute max-w-none object-cover rounded-[14.189px] size-full" src={imgFrame2085653302} />
            <img alt="" className="absolute max-w-none object-cover rounded-[14.189px] size-full" src={imgFrame2085653303} />
            <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-[14.189px] to-[rgba(0,0,0,0.3)]" />
          </div>
        </div>
      </div>
      <div className="absolute right-[200px] top-[494.78px]">
        <div className="rotate-15">
          <FloatingImageCard images={[imgFrame2085653299, imgFrame2085653300, imgFrame2085653304, imgFrame2085653305]} />
        </div>
      </div>
      <div className="absolute left-[57px] top-[11px]">
        <div className="rotate-15">
          <FloatingImageCard images={[imgFrame2085653299, imgFrame2085653300]} />
        </div>
      </div>
      <div className="absolute right-[100px] top-[11px]">
        <div className="-rotate-15">
          <FloatingImageCard images={[imgFrame2085653299, imgFrame2085653300, imgFrame2085653304]} />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-end px-16 z-10">
      <div className="flex gap-2 items-center">
        <div className="bg-black h-11 rounded-full w-44" />
        <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(0,0,0,0.15)] content-stretch flex h-11 items-center justify-center px-6 py-2 rounded-full">
          <p className="font-medium text-sm text-black">Login</p>
        </div>
      </div>
    </header>
  );
}

function CompanyLogos() {
  return (
    <div className="relative py-16">
      <p className="text-center text-sm text-black/75 mb-8">Trusted by the world's leading companies</p>
      <div className="grid grid-cols-5 gap-6 max-w-6xl mx-auto">
        {/* Amazon Studios */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <AmazonStudiosLogo className="text-2xl font-bold" />
        </div>
        {/* Netflix */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <NetflixLogo className="text-2xl font-bold" />
        </div>
        {/* Microsoft */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <MicrosoftLogo className="text-2xl font-bold" />
        </div>
        {/* Nike */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <NikeLogo className="text-3xl font-bold italic" />
        </div>
        {/* Samsung */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <div className="text-2xl font-bold">SAMSUNG</div>
        </div>
        {/* Shopify */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <ShopifyLogo className="text-xl font-medium" />
        </div>
        {/* Publicis */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <PublicisLogo className="text-xl font-bold" />
        </div>
        {/* McCann */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <McCannLogo className="text-xl font-bold" />
        </div>
        {/* VML */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <VMLLogo className="h-[90px] w-auto opacity-90" />
        </div>
        {/* Paramount */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <ParamountLogo className="text-xl font-bold" />
        </div>
        {/* Gensler */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <div className="text-xl font-bold">Gensler</div>
        </div>
        {/* Superside */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <div className="text-xl font-medium">Superside</div>
        </div>
        {/* Shine & Co */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <div className="text-xl font-bold">SHINE&CO</div>
        </div>
        {/* Perkins & Will */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <div className="text-lg font-bold">Perkins&Will</div>
        </div>
        {/* Pattern */}
        <div className="bg-[#f2f2f2] h-[121px] rounded-md flex items-center justify-center border border-[rgba(38,37,30,0.03)]">
          <div className="text-2xl font-bold">✶</div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: "🔒",
      title: "Secure",
      description: "SOC 2 Type II compliant with zero data training"
    },
    {
      icon: "📊",
      title: "Scalable",
      description: "Volume licenses, tiered seats & BYOK options for AI & ML models"
    },
    {
      icon: "🎨",
      title: "Customizable",
      description: "Custom model training through prompt and workflow optimization"
    },
    {
      icon: "⚖️",
      title: "Legal protection",
      description: "Full IP indemnity. Commercial indemnification. Enterprise data SLA-MLAs"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto py-12">
      {features.map((feature, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="font-medium text-base mb-2 text-black">{feature.title}</h3>
          <p className="text-sm text-black/75 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-blue-600/40" />
      </div>
      
      <div className="relative max-w-2xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium text-white mb-4">
            Ready to transform your enterprise with AI?
          </h2>
          <p className="text-white/90 text-base">
            Schedule a workshop with our team to see how Krea can empower your creative workflows with governed AI tools.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-xl">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-black/60 mb-2">First name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm text-black/60 mb-2">Last name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black/60 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="john@company.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black/60 mb-2">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Company name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-black/60 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Tell us about your use case..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I integrate BlenderLabs Conversational AI into my own app?",
      answer: "Yes, our API allows you to integrate Conversational AI into your existing applications seamlessly."
    },
    {
      question: "How many agents can I create?",
      answer: "The number of agents depends on your plan. Enterprise plans offer unlimited agents."
    },
    {
      question: "Krea powers millions of creatives, enterprises, and everyday?",
      answer: "Krea serves a wide range of users from individual creators to large enterprises, providing AI-powered creative tools."
    },
    {
      question: "What LLMs can I use with my robot agents?",
      answer: "You can use various LLMs including GPT-4, Claude, and other leading models depending on your requirements."
    },
    {
      question: "Can my agent make API calls to external services?",
      answer: "Yes, agents can be configured to make API calls to external services with proper authentication."
    },
    {
      question: "How can I make and receive phone calls with Conversational AI?",
      answer: "Our platform integrates with telephony services to enable voice-based interactions with your AI agents."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-8">
      <h2 className="text-3xl font-medium text-black mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-4 text-left hover:text-black/70 transition-colors"
            >
              <span className="font-medium text-base text-black pr-8">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-black/50 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4 text-black/75 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
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

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <BackgroundGrid />
        <FloatingImages />
        
        <div className="relative z-10 text-center px-8 py-20">
          <h1 className="text-6xl font-medium text-black tracking-tight mb-4">
            Krea Studio Workshop
          </h1>
          <p className="text-base text-black/75 mb-8 max-w-xl mx-auto">
            Enable your team with hands-on GenAI training in a secure, governed environment
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
              Contact sales
            </button>
            <Link
              to="/overview"
              className="bg-white border border-black/20 text-black px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <CompanyLogos />
      <Features />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
}