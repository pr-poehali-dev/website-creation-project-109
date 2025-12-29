import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedTrainerForSchedule, setSelectedTrainerForSchedule] = useState<string | null>(null);

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const filteredSchedule = schedule.filter(item => item.day === selectedDay);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto bg-card rounded-md shadow-sm p-5 mt-5">
        <nav className="mb-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold text-foreground">FITCLUB</h1>
          </div>
          <div className="flex gap-3">
            {[
              { id: 'trainers', label: 'Тренеры' },
              { id: 'services', label: 'Услуги' },
              { id: 'schedule', label: 'Расписание' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  activeSection === item.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-primary hover:bg-accent/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <section className="py-8 text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-3">
            Преврати тело в произведение искусства
          </h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-2xl mx-auto">
            Современный фитнес-клуб с профессиональными тренерами и индивидуальным подходом к каждому клиенту
          </p>
          <Button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="text-sm"
          >
            Записаться на тренировку
          </Button>
        </section>

        <section id="trainers" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Наши тренеры</h2>
          <p className="text-sm text-muted-foreground mb-5">Профессионалы с многолетним опытом</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="overflow-hidden shadow-sm border border-border">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-foreground mb-1">{trainer.name}</h3>
                  <p className="text-sm text-primary mb-1">{trainer.specialization}</p>
                  <p className="text-xs text-muted-foreground">{trainer.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="services" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Услуги</h2>
          <p className="text-sm text-muted-foreground mb-5">Выбери программу под свои цели</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="shadow-sm border border-border p-4">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-accent flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon as any} size={24} className="text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <div className="inline-block px-3 py-1 bg-secondary rounded text-xs text-secondary-foreground font-medium">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="schedule" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Расписание</h2>
          <p className="text-sm text-muted-foreground mb-5">Выбери удобное время для тренировки</p>
          
          <div className="flex gap-2 mb-4 flex-wrap">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'default' : 'outline'}
                onClick={() => setSelectedDay(day)}
                size="sm"
                className="text-xs"
              >
                {day}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredSchedule.map((item, index) => (
              <Card key={index} className="shadow-sm border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-xl font-semibold text-foreground">{item.time}</div>
                      </div>
                      <div className="h-10 w-px bg-border"></div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-0.5">{item.activity}</h4>
                        <p className="text-xs text-muted-foreground">{item.trainer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Icon name="Users" size={16} />
                          <span>{item.spots} мест</span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedTrainerForSchedule(item.trainer);
                          setIsScheduleModalOpen(true);
                        }}
                      >
                        Записаться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-8 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">© 2024 FITCLUB. Все права защищены</p>
        </footer>
      </div>

      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Расписание</DialogTitle>
            <p className="text-xs text-muted-foreground">Свободные и занятые окошки</p>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {[
              { date: '27 дек.', day: 'Сб', time: '13:00', spots: 0, total: 1 },
              { date: '30 дек.', day: 'Вт', time: '14:00', spots: 0, total: 1 }
            ].map((slot, index) => (
              <Card key={index} className="bg-muted border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-base font-semibold text-foreground">{slot.date}</div>
                      <div className="text-xs text-muted-foreground">{slot.day}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-green-600">{slot.spots} свободно</div>
                      <div className="text-xs text-muted-foreground">из {slot.total}</div>
                    </div>
                  </div>
                  <div className="text-sm text-foreground">{slot.time}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
