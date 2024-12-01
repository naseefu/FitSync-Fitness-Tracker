import React, { useState, useEffect } from "react";
import { FiArrowRight, FiCheckCircle, FiUser, FiActivity, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    type: "Professional Athlete",
    quote: "This platform transformed my training routine completely!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "Mike Chen",
    type: "Fitness Enthusiast",
    quote: "The AI-powered tracking makes everything so simple.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "Emma Davis",
    type: "Beginner",
    quote: "Found my rhythm with personalized workout plans!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  }
];

const FitnessLandingPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10">
      {Array.from({ length: 144 }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-4 bg-blue-500 rounded-sm animate-pulse"
          style={{
          animationDelay: `${i * 0.05}s`,
          }}
          />
      ))}
      </div>


      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 pt-32 pb-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Welcome to Your Fitness Hub
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transform your life with AI-powered fitness tracking and personalized workout plans.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2">
              Get Started <FiArrowRight />
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Fitness"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiActivity className="w-8 h-8" />,
                title: "AI-Powered Tracking",
                description: "Smart calorie and workout tracking powered by AI"
              },
              {
                icon: <FiHeart className="w-8 h-8" />,
                title: "Custom Plans",
                description: "Personalized workout plans tailored to your goals"
              },
              {
                icon: <FiCheckCircle className="w-8 h-8" />,
                title: "Progress Analytics",
                description: "Detailed insights into your fitness journey"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-700/50 p-8 rounded-xl backdrop-blur-sm hover:shadow-xl transition-all"
              >
                <div className="bg-blue-500/20 p-4 rounded-full w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
              />
              <p className="text-gray-300 text-center mb-4">"{testimonial.quote}"</p>
              <p className="text-center font-semibold">{testimonial.name}</p>
              <p className="text-center text-sm text-blue-400">{testimonial.type}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="text-4xl font-bold text-center mb-8">Join Us Today</h2>
          <div className="bg-gray-700/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="Your Fitness Goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full p-4 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
              />
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-lg font-semibold hover:shadow-lg transition-all">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Your ultimate fitness companion for a healthier lifestyle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {["twitter", "facebook", "instagram"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    <FiUser className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 Fitness Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FitnessLandingPage;
