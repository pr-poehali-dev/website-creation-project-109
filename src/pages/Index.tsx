import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Trainer {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  image_url: string;
  bio: string;
}

interface Subscription {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

interface Activity {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ScheduleItem {
  id: number;
  day_of_week: string;
  time_start: string;
  activity_title: string;
  trainer_name: string;
  max_spots: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('trainers');
  const [selectedDay, setSelectedDay] = useState('Понедельник');
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = 'https://functions.poehali.dev/050f9cdb-68db-4000-9fac-e1d4caf1ae0b';
        
        const [trainersRes, subsRes, activitiesRes, scheduleRes] = await Promise.all([
          fetch(`${API_URL}?type=trainers`).then(r => r.json()),
          fetch(`${API_URL}?type=subscriptions`).then(r => r.json()),
          fetch(`${API_URL}?type=activities`).then(r => r.json()),
          fetch(`${API_URL}?type=schedule`).then(r => r.json())
        ]);

        setTrainers(trainersRes);
        setSubscriptions(subsRes);
        setActivities(activitiesRes);
        setSchedule(scheduleRes);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSchedule = schedule.filter(item => item.day_of_week === selectedDay);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto bg-card rounded-md shadow-sm p-5 mt-5">
        <nav className="mb-4 pb-2 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-semibold text-foreground">FITCLUB</h1>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { id: 'trainers', label: 'Тренеры' },
              { id: 'subscriptions', label: 'Тарифы' },
              { id: 'activities', label: 'Занятия' },
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

        <section className="py-8">
          <h2 className="text-3xl font-semibold text-foreground mb-3 text-center">
            Добро пожаловать в FITCLUB
          </h2>
          <p className="text-sm text-muted-foreground mb-2 text-center max-w-2xl mx-auto">
            Современный фитнес-клуб с профессиональными тренерами и индивидуальным подходом.
          </p>
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            Для записи на занятия обратитесь к администратору клуба.
          </p>
        </section>

        <section id="trainers" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Наши тренеры</h2>
          <p className="text-sm text-muted-foreground mb-5">Профессионалы с многолетним опытом</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="overflow-hidden shadow-sm border border-border">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={trainer.image_url} 
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-foreground mb-1">{trainer.name}</h3>
                  <p className="text-sm text-primary mb-1">{trainer.specialization}</p>
                  <p className="text-xs text-muted-foreground mb-2">{trainer.experience}</p>
                  {trainer.bio && <p className="text-xs text-muted-foreground">{trainer.bio}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="subscriptions" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Тарифы и подписки</h2>
          <p className="text-sm text-muted-foreground mb-5">Выберите подходящий тариф</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptions.map((sub) => (
              <Card key={sub.id} className="shadow-sm border border-border p-4">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{sub.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{sub.description}</p>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-primary">{sub.price}</span>
                    {sub.duration && <span className="text-xs text-muted-foreground ml-1">/ {sub.duration}</span>}
                  </div>
                  <ul className="space-y-2">
                    {sub.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="activities" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Виды занятий</h2>
          <p className="text-sm text-muted-foreground mb-5">Разнообразные программы тренировок</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="shadow-sm border border-border p-4">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded bg-accent flex items-center justify-center flex-shrink-0">
                      <Icon name={activity.icon as any} size={24} className="text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground mb-2">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="schedule" className="py-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Расписание занятий</h2>
          <p className="text-sm text-muted-foreground mb-5">Выберите день недели</p>
          
          <div className="flex gap-2 mb-4 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  selectedDay === day 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item) => (
                <Card key={item.id} className="shadow-sm border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                          <div className="text-xl font-semibold text-foreground">{item.time_start}</div>
                        </div>
                        <div className="h-10 w-px bg-border"></div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-0.5">{item.activity_title}</h4>
                          <p className="text-xs text-muted-foreground">{item.trainer_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Icon name="Users" size={14} />
                          <span>До {item.max_spots} человек</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">На этот день занятий не запланировано</p>
            )}
          </div>
        </section>

        <section className="py-6 mt-4 border-t border-border">
          <div className="text-center">
            <h3 className="text-base font-semibold text-foreground mb-2">Как получить доступ?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Посетите наш фитнес-клуб, и администратор оформит вам карту клиента
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded text-sm">
              <Icon name="MapPin" size={16} className="text-accent-foreground" />
              <span className="text-accent-foreground">ул. Спортивная, 15 • пн-вс 7:00-23:00</span>
            </div>
          </div>
        </section>

        <footer className="mt-8 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">© 2024 FITCLUB. Все права защищены</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;