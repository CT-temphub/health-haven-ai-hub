
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Bell, Plus, Clock, Calendar, User, Check } from 'lucide-react';

interface Reminder {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
  takenToday: boolean;
  streak: number;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: ['08:00'],
      startDate: '2024-01-01',
      isActive: true,
      takenToday: true,
      streak: 15,
    },
    {
      id: 2,
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: ['08:00', '20:00'],
      startDate: '2024-01-01',
      isActive: true,
      takenToday: false,
      streak: 12,
    },
    {
      id: 3,
      medication: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: ['09:00'],
      startDate: '2024-01-15',
      isActive: true,
      takenToday: true,
      streak: 8,
    },
    {
      id: 4,
      medication: 'Omega-3',
      dosage: '1200mg',
      frequency: 'Once daily',
      time: ['09:00'],
      startDate: '2024-01-10',
      isActive: false,
      takenToday: false,
      streak: 0,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    time: [''],
    startDate: new Date().toISOString().split('T')[0],
  });

  const upcomingReminders = reminders
    .filter(r => r.isActive)
    .flatMap(reminder => 
      reminder.time.map(time => ({
        ...reminder,
        nextTime: time,
        isPastDue: new Date(`${new Date().toDateString()} ${time}`) < new Date() && !reminder.takenToday
      }))
    )
    .sort((a, b) => a.nextTime.localeCompare(b.nextTime));

  const markAsTaken = (reminderId: number) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, takenToday: true, streak: reminder.streak + 1 }
          : reminder
      )
    );
  };

  const toggleReminder = (reminderId: number) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, isActive: !reminder.isActive }
          : reminder
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-medical-600 to-health-600 bg-clip-text text-transparent">
              Prescription Reminder System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Never miss your medication again with smart reminders, progress tracking, 
              and personalized alerts to keep you on track with your health goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Overview */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-medical-600" />
                      <span>Today's Medications</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-medical-100 to-health-100 text-medical-700">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingReminders.map((reminder, index) => (
                      <div 
                        key={`${reminder.id}-${reminder.nextTime}`}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 animate-slide-up ${
                          reminder.isPastDue 
                            ? 'border-red-200 bg-red-50' 
                            : reminder.takenToday 
                              ? 'border-health-200 bg-health-50' 
                              : 'border-gray-200 bg-white hover:border-medical-300'
                        }`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            reminder.takenToday 
                              ? 'bg-health-500 text-white' 
                              : reminder.isPastDue 
                                ? 'bg-red-500 text-white' 
                                : 'bg-medical-100 text-medical-600'
                          }`}>
                            {reminder.takenToday ? (
                              <Check className="h-6 w-6" />
                            ) : (
                              <Bell className="h-6 w-6" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {reminder.medication} - {reminder.dosage}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {reminder.nextTime}
                              </div>
                              <div className="flex items-center">
                                <span>🔥 {reminder.streak} day streak</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!reminder.takenToday && (
                            <Button 
                              size="sm"
                              onClick={() => markAsTaken(reminder.id)}
                              className="bg-gradient-to-r from-health-500 to-health-600 hover:from-health-600 hover:to-health-700"
                            >
                              Mark Taken
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            Skip
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* All Medications */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-medical-600" />
                      <span>All Medications</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {showAddForm && (
                    <Card className="mb-6 border-2 border-dashed border-medical-300 bg-medical-50/50">
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input 
                            placeholder="Medication name"
                            value={newReminder.medication}
                            onChange={(e) => setNewReminder({...newReminder, medication: e.target.value})}
                            className="focus:border-medical-500 focus:ring-medical-500"
                          />
                          <Input 
                            placeholder="Dosage (e.g., 10mg)"
                            value={newReminder.dosage}
                            onChange={(e) => setNewReminder({...newReminder, dosage: e.target.value})}
                            className="focus:border-medical-500 focus:ring-medical-500"
                          />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          <select 
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                            value={newReminder.frequency}
                            onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value})}
                          >
                            <option value="">Select frequency</option>
                            <option value="Once daily">Once daily</option>
                            <option value="Twice daily">Twice daily</option>
                            <option value="Three times daily">Three times daily</option>
                            <option value="As needed">As needed</option>
                          </select>
                          <Input 
                            type="time"
                            className="focus:border-medical-500 focus:ring-medical-500"
                          />
                          <Input 
                            type="date"
                            value={newReminder.startDate}
                            onChange={(e) => setNewReminder({...newReminder, startDate: e.target.value})}
                            className="focus:border-medical-500 focus:ring-medical-500"
                          />
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-medical-500 to-health-500 hover:from-medical-600 hover:to-health-600"
                          >
                            Save Reminder
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setShowAddForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-4">
                    {reminders.map((reminder, index) => (
                      <div 
                        key={reminder.id}
                        className={`p-4 rounded-lg border transition-all duration-300 animate-slide-up ${
                          reminder.isActive 
                            ? 'border-gray-200 bg-white hover:border-medical-300' 
                            : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-800">
                                {reminder.medication}
                              </h3>
                              <Badge variant="outline">{reminder.dosage}</Badge>
                              <Badge 
                                variant={reminder.isActive ? "default" : "secondary"}
                                className={reminder.isActive ? "bg-health-500" : ""}
                              >
                                {reminder.isActive ? 'Active' : 'Paused'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <span>{reminder.frequency}</span>
                              <span>Times: {reminder.time.join(', ')}</span>
                              <span>🔥 {reminder.streak} days</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toggleReminder(reminder.id)}
                            >
                              {reminder.isActive ? 'Pause' : 'Resume'}
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card className="bg-gradient-to-r from-medical-500 to-health-500 text-white border-0">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">94%</div>
                      <div className="text-sm opacity-90">This month's adherence</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold">15</div>
                        <div className="text-xs opacity-90">Current streak</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">127</div>
                        <div className="text-xs opacity-90">Total doses</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-medical-50 to-health-50 text-medical-700 hover:from-medical-100 hover:to-health-100 border border-medical-200">
                    <Bell className="h-4 w-4 mr-2" />
                    Test Notifications
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-medical-50 to-health-50 text-medical-700 hover:from-medical-100 hover:to-health-100 border border-medical-200">
                    <Calendar className="h-4 w-4 mr-2" />
                    View History
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-medical-50 to-health-50 text-medical-700 hover:from-medical-100 hover:to-health-100 border border-medical-200">
                    <User className="h-4 w-4 mr-2" />
                    Share with Doctor
                  </Button>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>💡 Health Tips</Car

dTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Set reminders 30 minutes before meals for better absorption</p>
                    <p>• Keep a backup dose in your bag for emergencies</p>
                    <p>• Use a pill organizer for complex medication schedules</p>
                    <p>• Consult your doctor before stopping any medication</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
