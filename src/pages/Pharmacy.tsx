
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { MapPin, Search, Clock, Star, Phone, Plus } from 'lucide-react';

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  hours: string;
  phone: string;
  services: string[];
}

const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      address: '123 Main Street, Downtown',
      distance: '0.5 miles',
      rating: 4.8,
      isOpen: true,
      hours: '8:00 AM - 10:00 PM',
      phone: '+1 (555) 123-4567',
      services: ['Prescription', 'OTC', 'Consultation', 'Home Delivery'],
    },
    {
      id: 2,
      name: 'MediCare Express',
      address: '456 Oak Avenue, Midtown',
      distance: '1.2 miles',
      rating: 4.6,
      isOpen: true,
      hours: '24/7',
      phone: '+1 (555) 987-6543',
      services: ['Prescription', 'Emergency', 'Insurance', 'Vaccinations'],
    },
    {
      id: 3,
      name: 'Community Health Pharmacy',
      address: '789 Pine Road, Westside',
      distance: '2.1 miles',
      rating: 4.7,
      isOpen: false,
      hours: '9:00 AM - 8:00 PM',
      phone: '+1 (555) 456-7890',
      services: ['Prescription', 'OTC', 'Health Screening', 'Consultation'],
    },
    {
      id: 4,
      name: 'QuickMeds Pharmacy',
      address: '321 Elm Street, Eastside',
      distance: '2.8 miles',
      rating: 4.5,
      isOpen: true,
      hours: '7:00 AM - 11:00 PM',
      phone: '+1 (555) 321-9876',
      services: ['Prescription', 'OTC', 'Home Delivery', 'Mobile App'],
    },
  ];

  const medications = [
    { name: 'Paracetamol 500mg', category: 'Pain Relief', price: '$8.99' },
    { name: 'Ibuprofen 200mg', category: 'Anti-inflammatory', price: '$12.50' },
    { name: 'Vitamin D3', category: 'Supplements', price: '$15.99' },
    { name: 'Antihistamine', category: 'Allergy', price: '$9.75' },
  ];

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-medical-600 to-health-600 bg-clip-text text-transparent">
              Pharmacy Locator & Ordering
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find nearby pharmacies, check availability, and order your medications 
              with convenient home delivery options.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for pharmacy or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg rounded-full border-gray-300 focus:border-medical-500 focus:ring-medical-500"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-medical-600" />
                    <span>Nearby Pharmacies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-medical-100 to-health-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center z-10">
                      <MapPin className="h-12 w-12 text-medical-500 mx-auto mb-2" />
                      <p className="text-gray-600">Interactive Map</p>
                      <p className="text-sm text-gray-500">Pharmacies near you</p>
                    </div>
                    {/* Animated map pins */}
                    <div className="absolute top-4 left-8 w-4 h-4 bg-medical-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 right-12 w-4 h-4 bg-health-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute bottom-8 left-16 w-4 h-4 bg-medical-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-4 right-8 w-4 h-4 bg-health-600 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  </div>
                </CardContent>
              </Card>

              {/* Pharmacy List */}
              <div className="space-y-4">
                {filteredPharmacies.map((pharmacy, index) => (
                  <Card 
                    key={pharmacy.id}
                    className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-up ${
                      selectedPharmacy?.id === pharmacy.id ? 'ring-2 ring-medical-500' : ''
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {pharmacy.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{pharmacy.address}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              <span>{pharmacy.distance}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{pharmacy.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-1" />
                              <span>{pharmacy.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={pharmacy.isOpen ? "default" : "secondary"}
                            className={pharmacy.isOpen ? "bg-health-500" : ""}
                          >
                            {pharmacy.isOpen ? 'Open' : 'Closed'}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {pharmacy.hours}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pharmacy.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600"
                        >
                          Order Now
                        </Button>
                        <Button size="sm" variant="outline">
                          Get Directions
                        </Button>
                        <Button size="sm" variant="outline">
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Order Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-medical-600" />
                    <span>Quick Order</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Medication
                    </label>
                    <Input 
                      placeholder="Enter medication name..." 
                      className="focus:border-medical-500 focus:ring-medical-500"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Popular Medications</h4>
                    <div className="space-y-3">
                      {medications.map((med, index) => (
                        <div 
                          key={med.name} 
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer animate-fade-in"
                          style={{animationDelay: `${index * 0.1}s`}}
                        >
                          <div>
                            <p className="font-medium text-gray-800">{med.name}</p>
                            <p className="text-sm text-gray-500">{med.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-medical-600">{med.price}</p>
                            <Button size="sm" variant="outline" className="mt-1">
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600">
                    Upload Prescription
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
