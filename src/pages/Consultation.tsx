
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Calendar, Clock, User, Star, Video } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  price: number;
  avatar: string;
  availability: string[];
}

const Consultation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      rating: 4.9,
      experience: '15 years',
      price: 75,
      avatar: '👩‍⚕️',
      availability: ['09:00', '10:30', '14:00', '15:30'],
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      rating: 4.8,
      experience: '12 years',
      price: 120,
      avatar: '👨‍⚕️',
      availability: ['11:00', '13:00', '16:00'],
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      rating: 4.9,
      experience: '10 years',
      price: 95,
      avatar: '👩‍⚕️',
      availability: ['09:30', '12:00', '14:30', '17:00'],
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Pediatrics',
      rating: 4.7,
      experience: '18 years',
      price: 85,
      avatar: '👨‍⚕️',
      availability: ['10:00', '11:30', '15:00'],
    },
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleBooking = () => {
    if (selectedDoctor && selectedTime) {
      alert(`Consultation booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
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
              Book a Teleconsultation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with qualified doctors from the comfort of your home. 
              Choose your preferred time and specialist for a personalized consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar and Time Selection */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-medical-600" />
                    <span>Select Date & Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Times
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isAvailable = selectedDoctor ? selectedDoctor.availability.includes(time) : true;
                        return (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => setSelectedTime(time)}
                            className={`text-xs ${
                              selectedTime === time 
                                ? 'bg-gradient-to-r from-medical-500 to-health-500' 
                                : isAvailable ? 'hover:bg-medical-50' : 'opacity-50'
                            }`}
                          >
                            {time}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDoctor && selectedTime && (
                    <div className="p-4 bg-gradient-to-r from-medical-50 to-health-50 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
                      <p className="text-sm text-gray-600">
                        <strong>Doctor:</strong> {selectedDoctor.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Time:</strong> {selectedTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Fee:</strong> ${selectedDoctor.price}
                      </p>
                      <Button 
                        onClick={handleBooking}
                        className="w-full mt-4 bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Book Consultation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Doctors List */}
            <div className="lg:col-span-2">
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <User className="h-6 w-6 mr-2 text-medical-600" />
                  Available Doctors
                </h2>
                
                {doctors.map((doctor, index) => (
                  <Card 
                    key={doctor.id} 
                    className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-up ${
                      selectedDoctor?.id === doctor.id ? 'ring-2 ring-medical-500 bg-medical-50/80' : ''
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-4xl">{doctor.avatar}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              {doctor.name}
                            </h3>
                            <Badge variant="secondary" className="mb-2">
                              {doctor.specialty}
                            </Badge>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span>{doctor.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                <span>{doctor.experience}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {doctor.availability.map((time) => (
                                <Badge key={time} variant="outline" className="text-xs">
                                  {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-medical-600">
                            ${doctor.price}
                          </div>
                          <div className="text-sm text-gray-500">per session</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
