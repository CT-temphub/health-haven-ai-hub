
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { User, Brain, Plus, Check, ArrowDown } from 'lucide-react';

interface ProfileStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      email: '',
    },
    medicalHistory: {
      conditions: [],
      allergies: [],
      medications: [],
      surgeries: [],
    },
    lifestyle: {
      smokingStatus: '',
      alcoholConsumption: '',
      exerciseFrequency: '',
      dietaryRestrictions: [],
    },
  });

  const steps: ProfileStep[] = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Basic details about you',
      isCompleted: false,
      isActive: currentStep === 1,
    },
    {
      id: 2,
      title: 'Medical History',
      description: 'Your health background',
      isCompleted: false,
      isActive: currentStep === 2,
    },
    {
      id: 3,
      title: 'Lifestyle Factors',
      description: 'Habits that affect your health',
      isCompleted: false,
      isActive: currentStep === 3,
    },
    {
      id: 4,
      title: 'AI Analysis',
      description: 'Smart health insights',
      isCompleted: false,
      isActive: currentStep === 4,
    },
  ];

  const aiSuggestions = [
    {
      category: 'Health Conditions',
      suggestions: ['Hypertension', 'Diabetes Type 2', 'High Cholesterol', 'Asthma'],
    },
    {
      category: 'Common Allergies',
      suggestions: ['Peanuts', 'Shellfish', 'Penicillin', 'Latex', 'Dust Mites'],
    },
    {
      category: 'Medications',
      suggestions: ['Aspirin', 'Lisinopril', 'Metformin', 'Albuterol', 'Omeprazole'],
    },
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <Input 
                  placeholder="Enter your first name"
                  className="focus:border-medical-500 focus:ring-medical-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <Input 
                  placeholder="Enter your last name"
                  className="focus:border-medical-500 focus:ring-medical-500"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <Input 
                  type="date"
                  className="focus:border-medical-500 focus:ring-medical-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input 
                  placeholder="+1 (555) 123-4567"
                  className="focus:border-medical-500 focus:ring-medical-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input 
                  type="email"
                  placeholder="your.email@example.com"
                  className="focus:border-medical-500 focus:ring-medical-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {aiSuggestions.map((section, index) => (
              <div key={section.category} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{section.category}</h3>
                  <Badge variant="secondary" className="bg-gradient-to-r from-medical-100 to-health-100 text-medical-700">
                    <Brain className="h-3 w-3 mr-1" />
                    AI Suggestions
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="justify-start hover:bg-medical-50 hover:border-medical-300 hover:text-medical-600 transition-all duration-200"
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Textarea
                    placeholder={`Add your own ${section.category.toLowerCase()} or additional details...`}
                    className="focus:border-medical-500 focus:ring-medical-500"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Smoking Status
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Never', 'Former', 'Current', 'Occasional'].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    size="sm"
                    className="hover:bg-medical-50 hover:border-medical-300"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alcohol Consumption
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Never', 'Rarely', 'Socially', 'Regularly'].map((frequency) => (
                  <Button
                    key={frequency}
                    variant="outline"
                    size="sm"
                    className="hover:bg-medical-50 hover:border-medical-300"
                  >
                    {frequency}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise Frequency
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Sedentary (Little to no exercise)', 'Moderate (1-3 times/week)', 'Active (4+ times/week)'].map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    size="sm"
                    className="hover:bg-medical-50 hover:border-medical-300 text-left justify-start h-auto py-3"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Low-Sodium', 'Diabetic', 'Other'].map((diet) => (
                  <Button
                    key={diet}
                    variant="outline"
                    size="sm"
                    className="hover:bg-medical-50 hover:border-medical-300"
                  >
                    {diet}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-medical-500 to-health-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Health Analysis</h3>
              <p className="text-gray-600">Our AI is analyzing your profile to provide personalized health insights...</p>
            </div>

            <Card className="bg-gradient-to-r from-medical-50 to-health-50 border-0">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Preliminary Insights</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-health-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Based on your age and lifestyle, consider regular cardiovascular screenings.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-medical-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Your exercise frequency is excellent for maintaining good health.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-health-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Consider discussing vitamin D supplementation with your doctor.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0">
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Check className="h-5 w-5 text-health-500" />
                  <span className="text-sm">Schedule annual physical exam</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Check className="h-5 w-5 text-health-500" />
                  <span className="text-sm">Set up medication reminders</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Check className="h-5 w-5 text-health-500" />
                  <span className="text-sm">Connect with teleconsultation services</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-medical-600 to-health-600 bg-clip-text text-transparent">
              Smart Medical Profile Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create a comprehensive medical profile with AI-powered suggestions 
              and personalized health insights tailored just for you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        step.isActive 
                          ? 'bg-gradient-to-r from-medical-500 to-health-500 border-medical-500 text-white' 
                          : step.isCompleted 
                            ? 'bg-health-500 border-health-500 text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {step.isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <span className="font-semibold">{step.id}</span>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-sm font-medium ${
                          step.isActive ? 'text-medical-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-400">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        index < currentStep - 1 ? 'bg-health-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-medical-600" />
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="hover:bg-medical-50"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={currentStep === 4}
                className="bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600"
              >
                {currentStep === 4 ? 'Complete Profile' : 'Next Step'}
                <ArrowDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
