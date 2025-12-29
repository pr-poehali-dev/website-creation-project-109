-- Создание таблиц для информационного сайта фитнес-клуба

-- Таблица тренеров
CREATE TABLE IF NOT EXISTS trainers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица тарифов/подписок
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price VARCHAR(50) NOT NULL,
    duration VARCHAR(50),
    features TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица видов занятий
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица расписания занятий
CREATE TABLE IF NOT EXISTS schedule (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(20) NOT NULL,
    time_start TIME NOT NULL,
    activity_id INTEGER REFERENCES activities(id),
    trainer_id INTEGER REFERENCES trainers(id),
    max_spots INTEGER DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тестовых данных

-- Тренеры
INSERT INTO trainers (name, specialization, experience, image_url, bio) VALUES
('Алексей Волков', 'Силовые тренировки', '8 лет опыта', 'https://images.unsplash.com/photo-1567013544450-38549c4b0290?w=400&h=400&fit=crop', 'Мастер спорта по пауэрлифтингу'),
('Мария Соколова', 'Йога и стретчинг', '6 лет опыта', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', 'Сертифицированный инструктор по хатха-йоге'),
('Дмитрий Петров', 'Функциональный тренинг', '10 лет опыта', 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop', 'Специалист по кроссфиту и функциональному тренингу'),
('Елена Новикова', 'Пилатес и кардио', '7 лет опыта', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', 'Инструктор по пилатесу и кардиотренировкам');

-- Тарифы
INSERT INTO subscriptions (title, description, price, duration, features) VALUES
('Базовый', 'Идеально для начинающих', '3 000 ₽', 'месяц', ARRAY['Доступ в тренажерный зал', 'Душевые и раздевалки', '1 пробное занятие с тренером']),
('Стандарт', 'Для регулярных тренировок', '5 000 ₽', 'месяц', ARRAY['Доступ в тренажерный зал', 'Безлимитные групповые занятия', 'Душевые и раздевалки', 'Заморозка до 7 дней']),
('Премиум', 'Максимум возможностей', '8 000 ₽', 'месяц', ARRAY['Доступ в тренажерный зал', 'Безлимитные групповые занятия', '4 персональные тренировки', 'Консультация нутрициолога', 'Заморозка до 14 дней', 'Гостевые визиты']);

-- Виды занятий
INSERT INTO activities (title, description, icon) VALUES
('Йога', 'Улучшение гибкости и баланса', 'Heart'),
('Силовая тренировка', 'Наращивание мышечной массы', 'Dumbbell'),
('Функциональный тренинг', 'Комплексное развитие тела', 'Zap'),
('Пилатес', 'Укрепление мышц кора', 'Smile'),
('Кардио', 'Жиросжигание и выносливость', 'Activity');

-- Расписание
INSERT INTO schedule (day_of_week, time_start, activity_id, trainer_id, max_spots) VALUES
('Понедельник', '09:00', 1, 2, 12),
('Понедельник', '11:00', 2, 1, 8),
('Понедельник', '18:00', 3, 3, 10),
('Вторник', '10:00', 4, 4, 15),
('Вторник', '19:00', 1, 2, 12),
('Среда', '09:00', 2, 1, 8),
('Среда', '17:00', 3, 3, 10),
('Четверг', '11:00', 4, 4, 15),
('Четверг', '18:30', 1, 2, 12),
('Пятница', '10:00', 2, 1, 8),
('Пятница', '19:00', 3, 3, 10);
