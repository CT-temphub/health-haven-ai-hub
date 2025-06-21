
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import FloatingChatButton from '@/components/FloatingChatButton';
import { ArrowDown, Chat, Calendar, MapPin, User, Bell, Plus } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Chat,
      title: 'AI Medical Chatbot',
      description: 'Get instant medical advice from our AI-powered assistant',
      path: '/chat',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Calendar,
      title: 'Teleconsultation',
      description: 'Book appointments with qualified doctors online',
      path: '/consultation',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      title: 'Pharmacy Locator',
      description: 'Find and order from nearby pharmacies',
      path: '/pharmacy',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: User,
      title: 'Medical Profile',
      description: 'Create smart medical profiles with AI assistance',
      path: '/profile',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Bell,
      title: 'Prescription Reminders',
      description: 'Never miss your medication with smart reminders',
      path: '/reminders',
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <FloatingChatButton />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-medical-500/10 to-health-500/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-medical-600 to-health-600 bg-clip-text text-transparent">
                Your Health,
              </span>
              <br />
              <span className="text-gray-800">Our Priority</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up">
              Experience the future of healthcare with AI-powered medical assistance, 
              teleconsultations, and smart health management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button size="lg" className="bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600 text-lg px-8 py-4">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-10 w-20 h-20 bg-gradient-to-r from-medical-400 to-health-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-48 right-16 w-32 h-32 bg-gradient-to-r from-health-400 to-medical-400 rounded-full opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 left-1/4 w-16 h-16 bg-gradient-to-r from-medical-500 to-health-500 rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered consultations to smart medication reminders, 
              we've got all your healthcare needs covered in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.path}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up border-0 bg-white/80 backdrop-blur-sm" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-medical-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center text-medical-600 group-hover:text-health-600 transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowDown className="ml-2 h-4 w-4 rotate-[-45deg] group-hover:translate-x-1 group-hover:translate-y-[-2px] transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-medical-500 to-health-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Happy Patients' },
              { number: '500+', label: 'Doctors Available' },
              { number: '24/7', label: 'AI Support' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <div key={stat.label} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust MediCare AI for their health needs. 
            Start your journey to better health today.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600 text-lg px-12 py-4">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
