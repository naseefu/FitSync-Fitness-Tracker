import React, { useState, useEffect } from "react";
import { FaDumbbell, FaApple, FaChartLine, FaUser, FaArrowRight, FaFacebook, FaTwitter, FaInstagram, FaHeart, FaCheck, FaClock, FaVideo } from "react-icons/fa";
import { IoFitness, IoNutrition, IoTrophy } from "react-icons/io5";
import phone1 from '../images/phone1.png'
import phone2 from '../images/phone21.png'
import phone3 from '../images/phone3.png'

const Feature = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      level: "Advanced",
      text: "This platform completely transformed my fitness journey. The AI-powered recommendations are spot-on!",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      level: "Intermediate",
      text: "I've never felt better! The personalized workout plans keep me motivated every day.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
    },
    {
      id: 3,
      name: "Michael Chen",
      level: "Beginner",
      text: "The community support and AI guidance have made my fitness journey enjoyable and effective!",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
    }
  ];

  const features = [
    {
      icon: <FaDumbbell />,
      title: "AI Workout Plans",
      description: "Personalized fitness routines adapted to your goals"
    },
    {
      icon: <FaApple />,
      title: "Nutrition Tracking",
      description: "Smart meal planning and calorie monitoring"
    },
    {
      icon: <FaChartLine />,
      title: "Progress Analytics",
      description: "Detailed insights into your fitness journey"
    },
    {
      icon: <IoTrophy />,
      title: "Achievement System",
      description: "Earn rewards and track your milestones"
    },
    {
      icon: <FaHeart />,
      title: "Health Monitoring",
      description: "Track vital signs and wellness metrics"
    }
  ];

  const faqs = [
    {
      question: "How does the AI training work?",
      answer: "Our AI analyzes your fitness goals, current level, and preferences to create personalized workout plans."
    },
    {
      question: "Can I track my nutrition?",
      answer: "Yes! Our platform includes comprehensive nutrition tracking with detailed insights."
    },
    {
      question: "Are the workouts suitable for beginners?",
      answer: "Absolutely! Our AI adapts workouts to your fitness level and gradually increases intensity."
    },
    {
      question: "How often are new workouts added?",
      answer: "We add new workouts weekly and update our AI models monthly for optimal performance."
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Workouts Completed", value: "1M+" },
    { label: "Calories Tracked", value: "500M+" },
    { label: "Success Stories", value: "5K+" }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      features: [
        "AI Workout Plans",
        "Basic Analytics",
        "Community Access",
        "Mobile App Access"
      ]
    },
    {
      name: "Pro",
      price: "$19.99",
      features: [
        "Everything in Basic",
        "Advanced Analytics",
        "Nutrition Tracking",
        "Live Training Sessions",
        "Priority Support"
      ]
    },
    {
      name: "Elite",
      price: "$29.99",
      features: [
        "Everything in Pro",
        "Personal Coach",
        "Custom Meal Plans",
        "Exclusive Content",
        "24/7 Support"
      ]
    }
  ];

  const steps=[
    {
      step:1,
      title:'Track Your Intake',
      image:phone1,
      description:'Log your daily meals effortlessly with AI-powered analysis, get instant calorie breakdowns, and monitor your nutritional intake to make better choices',
      zindex:1
    },
    {
      step:2,
      title:'Follow a Tailored Plan',
      image:phone2,
      description:'Receive personalized meal and workout plans tailored to your calorie surplus/deficit and fitness goals, and stay on track with weekly progress reports',
      zindex:2
    },
    {
      step:3,
      title:'Stay Consistent',
      image:phone3,
      description:'Set achievable goals, track milestones, participate in daily challenges with gamified rewards, and stay motivated with reminders, tips, and a supportive fitness community',
      zindex:3
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [pos,setPos] = useState(0)

  useEffect(()=>{

  })

  return (
    // from-gray-900 to-black 
    <div className="min-h-screen bg-gradient-to-b 
    bg-[#151824]
    text-white">

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen max-h-[fit-content]">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="flex gap-8 items-start min-h-[380px] justify-start overflow-y-auto scrollbar-hide" style={{zIndex:'2'}}>
            {features.map((feature, index) => (
              <div key={index} style={{zIndex:'3',transformOrigin:'center'}} className="px-5 mt-5 py-10 min-w-[230px] min-h-[150px] md:min-w-[400px] md:min-h-[300px] max-h-[350px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:scale-105 transition-transform">
                <div className="text-3xl text-[#0066ee] mb-4">{feature.icon}</div>
                <div className="flex flex-col items-center justify-center min-h-[150px]">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white text-black flex flex-col items-center pb-14">
        <div>
          <h1 className="text-[25px] lg:text-[3.2vw] py-14">Hit your health goals in 3 steps</h1>
        </div>
        <div className="flex flex-col gap-4 items-end justify-center mx-auto">
          {steps.map((s,index)=>(<div className={`flex flex-col gap-10 items-center justify-center text-left md:flex-row ${index===1&&'md:flex-row-reverse'}`} style={{display:'flex',textAlign:index===1&&'right'}}>
            <img className={`w-[200px] md:w-[300px] max-w-[700px] ${index!=0&&'border'}`} src={s.image} style={{borderRadius:'28px'}} alt="phone1"/>
            <div className={`md:w-[30%] w-[80%] text-center mb-14 md:text-left ${index===1&&'md:text-right'}`}>
              <h1 className="text-[50px] text-[#0066ee]">{s.step}</h1>
              <h1 className="text-[25px] font-bold lg:text-[2vw]">{s.title}</h1>
              <p className="mt-3 text-gray-600">{s.description}</p>
            </div>
          </div>))}
        </div>

      </div>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-[#0066ee]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="p-8 rounded-xl bg-gradient-to-br bg-[white] text-black hover:scale-105 transition-transform">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold text-[#0066ee] mb-6">{plan.price}<span className="text-sm text-gray-400">/month</span></p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 px-6 py-3 bg-[#0066ee] text-white rounded-lg hover:bg-purple-600 transition-colors transition duration-[0.5s] ease">
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="p-14 bg-white text-black h-[fit-content]">
        <h1 className="text-[14px] lg:text-[20px] text-gray-400">Get Results</h1>
        <h1 className="text-[20px] lg:text-[2vw]">Nutrition tracking works, here's the proof</h1>
        <div>
          <div className="min-h-[250px] flex flex-col justify-center items-center">
              <p className="md:w-[30%] mx-auto p-10 pb-5 text-[18px]">"{testimonials[pos].text}"</p>
              <p className="text-gray-400">{testimonials[pos].name}</p>
              <div className="flex gap-4 items-center justify-center mt-10">{
                Array.from({length:testimonials.length}).map((index,i)=>(
                  <p className={`min-w-[10px] max-w-[10px] min-h-[10px] max-h-[10px] rounded-xl ${i===pos?'bg-gray-400':'bg-gray-300'}`}></p>
                ))
              }</div>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-gray-900 min-h-[400px] flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:w-[300px] p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                <h3 className="text-4xl font-bold text-[#0066ee] mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white text-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} style={{border:'1px solid rgba(0,0,0,0.1)'}} className="rounded-lg overflow-hidden">
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {faq.question}
                  <FaArrowRight className={`transform transition-transform ${activeFaq === index ? "rotate-90" : ""}`} />
                </button>
                <div className={`transition-all duration-300 ${activeFaq === index ? "max-h-40 p-4" : "max-h-0"}`}>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-14 bg-gray-900 border-t border-gray-800 text-left">
        <div className="max-w-7xl mx-auto justify-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fitness Universe</h3>
            <p className="text-gray-400">Transform your life with AI-powered fitness solutions.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-500">About Us</a></li>
              <li><a href="#" className="hover:text-purple-500">Features</a></li>
              <li><a href="#" className="hover:text-purple-500">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <FaFacebook className="text-2xl hover:text-purple-500 cursor-pointer" />
              <FaTwitter className="text-2xl hover:text-purple-500 cursor-pointer" />
              <FaInstagram className="text-2xl hover:text-purple-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-4 py-2 bg-purple-500 rounded-r-lg hover:bg-purple-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[100px] text-center text-gray-400">
          <p>© 2024 Fitness Universe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Feature;