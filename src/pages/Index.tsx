import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const trainers = [
  {
    id: 1,
    name: 'Алексей Волков',
    specialization: 'Силовые тренировки',
    experience: '8 лет опыта',
    image: 'https://images.unsplash.com/photo-1567013544450-38549c4b0290?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Мария Соколова',
    specialization: 'Йога и стретчинг',
    experience: '6 лет опыта',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    specialization: 'Функциональный тренинг',
    experience: '10 лет опыта',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Елена Новикова',
    specialization: 'Пилатес и кардио',
    experience: '7 лет опыта',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  }
];

const services = [
  {
    icon: 'Dumbbell',
    title: 'Персональные тренировки',
    description: 'Индивидуальные программы с тренером под ваши цели',
    price: 'от 2 500 ₽'
  },
  {
    icon: 'Users',
    title: 'Групповые занятия',
    description: 'Йога, пилатес, функциональный тренинг в мини-группах',
    price: 'от 800 ₽'
  },
  {
    icon: 'Heart',
    title: 'Фитнес-программы',
    description: 'Комплексные программы для похудения и набора массы',
    price: 'от 5 000 ₽'
  },
  {
    icon: 'Apple',
    title: 'Консультации по питанию',
    description: 'Индивидуальный план питания от нутрициолога',
    price: 'от 3 000 ₽'
  }
];

const schedule = [
  { day: 'Понедельник', time: '09:00', activity: 'Йога', trainer: 'Мария Соколова', spots: 12 },
  { day: 'Понедельник', time: '11:00', activity: 'Силовая тренировка', trainer: 'Алексей Волков', spots: 8 },
  { day: 'Понедельник', time: '18:00', activity: 'Функциональный тренинг', trainer: 'Дмитрий Петров', spots: 10 },
  { day: 'Вторник', time: '10:00', activity: 'Пилатес', trainer: 'Елена Новикова', spots: 15 },
  { day: 'Вторник', time: '19:00', activity: 'Йога', trainer: 'Мария Соколова', spots: 12 },
  { day: 'Среда', time: '09:00', activity: 'Силовая тренировка', trainer: 'Алексей Волков', spots: 8 },
  { day: 'Среда', time: '17:00', activity: 'Функциональный тренинг', trainer: 'Дмитрий Петров', spots: 10 },
  { day: 'Четверг', time: '11:00', activity: 'Пилатес', trainer: 'Елена Новикова', spots: 15 },
  { day: 'Четверг', time: '18:30', activity: 'Йога', trainer: 'Мария Соколова', spots: 12 },
  { day: 'Пятница', time: '10:00', activity: 'Силовая тренировка', trainer: 'Алексей Волков', spots: 8 },
  { day: 'Пятница', time: '19:00', activity: 'Функциональный тренинг', trainer: 'Дмитрий Петров', spots: 10 }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('trainers');
  const [selectedDay, setSelectedDay] = useState('Понедельник');

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const filteredSchedule = schedule.filter(item => item.day === selectedDay);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">FITCLUB</h1>
            <div className="flex gap-8">
              {[
                { id: 'trainers', label: 'Тренеры' },
                { id: 'services', label: 'Услуги' },
                { id: 'schedule', label: 'Расписание' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Преврати тело<br />в произведение искусства
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Современный фитнес-клуб с профессиональными тренерами и индивидуальным подходом к каждому клиенту
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto">
            Записаться на тренировку
          </Button>
        </div>
      </section>

      <section id="trainers" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Наши тренеры</h2>
            <p className="text-lg text-gray-600">Профессионалы с многолетним опытом</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{trainer.name}</h3>
                  <p className="text-primary font-medium mb-2">{trainer.specialization}</p>
                  <p className="text-sm text-gray-600">{trainer.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Услуги</h2>
            <p className="text-lg text-gray-600">Выбери программу под свои цели</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow p-8">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon as any} size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <Badge variant="secondary" className="text-base px-4 py-1">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Расписание</h2>
            <p className="text-lg text-gray-600">Выбери удобное время для тренировки</p>
          </div>
          
          <div className="flex gap-3 mb-8 flex-wrap">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'default' : 'outline'}
                onClick={() => setSelectedDay(day)}
                className="text-base"
              >
                {day}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredSchedule.map((item, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{item.time}</div>
                      </div>
                      <div className="h-12 w-px bg-gray-200"></div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{item.activity}</h4>
                        <p className="text-gray-600">{item.trainer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Icon name="Users" size={20} />
                          <span>{item.spots} мест</span>
                        </div>
                      </div>
                      <Button>Записаться</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">FITCLUB</h3>
          <p className="text-gray-400">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
