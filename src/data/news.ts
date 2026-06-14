export interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string | null;
  featured: boolean;
  diggs: number;
  content?: string[];
}

export const CATEGORIES = ["Все", "Технологии", "Наука", "Бизнес", "Культура", "Спорт"];

export const CATEGORY_COLORS: Record<string, string> = {
  "Технологии": "bg-blue-50 text-blue-700",
  "Наука": "bg-emerald-50 text-emerald-700",
  "Бизнес": "bg-amber-50 text-amber-700",
  "Культура": "bg-purple-50 text-purple-700",
  "Спорт": "bg-red-50 text-red-700",
};

const LOREM = [
  "Это ключевое событие в индустрии, которое привлекло внимание экспертов по всему миру. Аналитики отмечают, что подобные изменения происходят раз в десятилетие и могут переопределить весь ландшафт отрасли на годы вперёд.",
  "По словам ведущих специалистов, технология открывает принципиально новые возможности. Первые тесты показали впечатляющие результаты, превзошедшие даже самые оптимистичные прогнозы исследовательских групп.",
  "Реакция профессионального сообщества оказалась неоднозначной. Одни видят в этом долгожданный прорыв, другие предостерегают от поспешных выводов и призывают к дополнительной проверке полученных данных.",
  "В ближайшие месяцы ожидается публикация подробного отчёта с полной методологией. Это позволит независимым экспертам воспроизвести результаты и оценить реальное влияние нововведения на рынок.",
];

export const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "Технологии",
    title: "Новый стандарт искусственного интеллекта меняет правила игры в индустрии",
    excerpt: "Исследователи представили прорывную архитектуру нейронных сетей, способную обучаться в 10 раз быстрее предыдущих моделей при меньшем потреблении ресурсов.",
    author: "Иван Петров",
    date: "14 июня 2026",
    readTime: "4 мин",
    image: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/81ca01a0-b330-4482-851a-793e8a8da74a.jpg",
    featured: true,
    diggs: 1247,
    content: LOREM,
  },
  {
    id: 2,
    category: "Наука",
    title: "Учёные обнаружили новый тип квантовой запутанности",
    excerpt: "Открытие открывает путь к созданию квантовых компьютеров нового поколения с неограниченными вычислительными возможностями.",
    author: "Мария Соколова",
    date: "13 июня 2026",
    readTime: "6 мин",
    image: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/b905cbf4-117a-4f9b-81c5-2c939dc28205.jpg",
    featured: false,
    diggs: 892,
    content: LOREM,
  },
  {
    id: 3,
    category: "Бизнес",
    title: "Крупнейшее слияние в истории tech-сектора завершено",
    excerpt: "Сделка стоимостью $180 млрд объединила двух ключевых игроков рынка облачных технологий и изменит расстановку сил в отрасли.",
    author: "Алексей Громов",
    date: "13 июня 2026",
    readTime: "3 мин",
    image: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/237c7acc-a631-4d25-b5b5-cb1293be1800.jpg",
    featured: false,
    diggs: 634,
    content: LOREM,
  },
  {
    id: 4,
    category: "Технологии",
    title: "Операционная система нового поколения вышла в открытый доступ",
    excerpt: "После пяти лет разработки команда опубликовала исходный код ОС, переосмысливающей подход к безопасности и производительности.",
    author: "Светлана Ким",
    date: "12 июня 2026",
    readTime: "5 мин",
    image: null,
    featured: false,
    diggs: 521,
    content: LOREM,
  },
  {
    id: 5,
    category: "Культура",
    title: "Художники и ИИ: новое творческое партнёрство или угроза?",
    excerpt: "Документальный проект исследует, как современные художники адаптируют генеративный ИИ в качестве инструмента для создания уникальных произведений.",
    author: "Ольга Смирнова",
    date: "12 июня 2026",
    readTime: "7 мин",
    image: null,
    featured: false,
    diggs: 489,
    content: LOREM,
  },
  {
    id: 6,
    category: "Наука",
    title: "Марсоход передал первые данные о составе грунта",
    excerpt: "Анализ образцов показал неожиданно высокое содержание органических соединений в нескольких точках плато Элизий.",
    author: "Дмитрий Волков",
    date: "11 июня 2026",
    readTime: "4 мин",
    image: null,
    featured: false,
    diggs: 1103,
    content: LOREM,
  },
  {
    id: 7,
    category: "Бизнес",
    title: "Стартапы в сфере климатических технологий привлекли рекордные инвестиции",
    excerpt: "Объём вложений в cleantech превысил $50 млрд за первые шесть месяцев года, что вдвое больше показателей прошлого года.",
    author: "Наталья Борисова",
    date: "11 июня 2026",
    readTime: "3 мин",
    image: null,
    featured: false,
    diggs: 378,
    content: LOREM,
  },
  {
    id: 8,
    category: "Технологии",
    title: "Браузер без JavaScript: эксперимент или будущее веба?",
    excerpt: "Новая концепция браузера возвращает к истокам веба, предлагая молниеносную скорость загрузки и полную конфиденциальность без скриптов.",
    author: "Антон Лебедев",
    date: "10 июня 2026",
    readTime: "5 мин",
    image: null,
    featured: false,
    diggs: 712,
    content: LOREM,
  },
];

// ===== Видеоролики =====
export interface VideoItem {
  id: number;
  title: string;
  channel: string;
  duration: string;
  views: string;
  date: string;
  thumb: string;
  tag: string;
  description?: string;
}

export const VIDEO_DESC = "В этом выпуске мы детально разбираем тему, показываем реальные примеры и делимся выводами. Полная версия материала с таймкодами и ссылками — в описании под плеером.";

export const VIDEOS: VideoItem[] = [
  { id: 1, title: "Обзор нейросети нового поколения: тест на реальных задачах", channel: "TechReview", duration: "12:48", views: "248K", date: "2 дня назад", tag: "Обзоры", thumb: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/2b0136ea-0d0c-477f-9292-35ee9bdb61ee.jpg" },
  { id: 2, title: "Как собрать ПК мечты в 2026 году — полный гайд", channel: "Hardware Lab", duration: "24:15", views: "512K", date: "5 дней назад", tag: "Гайды", thumb: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/2b0136ea-0d0c-477f-9292-35ee9bdb61ee.jpg" },
  { id: 3, title: "Интервью с основателем стартапа года", channel: "Бизнес+", duration: "08:32", views: "97K", date: "неделю назад", tag: "Интервью", thumb: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/81ca01a0-b330-4482-851a-793e8a8da74a.jpg" },
  { id: 4, title: "Первый полёт нового марсохода — кадры с орбиты", channel: "Космос ТВ", duration: "15:07", views: "1.2M", date: "3 дня назад", tag: "Новости", thumb: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/b905cbf4-117a-4f9b-81c5-2c939dc28205.jpg" },
  { id: 5, title: "Топ-10 технологий, которые изменят будущее", channel: "Futurology", duration: "18:44", views: "356K", date: "4 дня назад", tag: "Подборки", thumb: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/2b0136ea-0d0c-477f-9292-35ee9bdb61ee.jpg" },
  { id: 6, title: "Разбор архитектуры квантового компьютера", channel: "SciDeep", duration: "31:20", views: "184K", date: "6 дней назад", tag: "Обзоры", thumb: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/b905cbf4-117a-4f9b-81c5-2c939dc28205.jpg" },
];

// ===== Видеоигры =====
export interface GameItem {
  id: number;
  title: string;
  genre: string;
  platform: string;
  rating: number;
  date: string;
  cover: string;
  developer?: string;
  description?: string;
  pros?: string[];
  cons?: string[];
}

export const GAME_DESC = "Амбициозный проект с проработанным открытым миром, глубокой боевой системой и захватывающим сюжетом. Графика и атмосфера держат планку ААА-уровня, а реиграбельность обеспечивают десятки часов контента.";

export const GAMES: GameItem[] = [
  { id: 1, title: "Neon Horizon", genre: "Экшен / RPG", platform: "PC, PS5, Xbox", rating: 9.4, date: "Релиз: июнь 2026", cover: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/287febea-448b-464e-922c-90bf890f1fdd.jpg", developer: "Aurora Studios", description: GAME_DESC, pros: ["Огромный детализированный мир", "Отличная боевая система", "Сильный сюжет"], cons: ["Высокие системные требования"] },
  { id: 2, title: "Quantum Drift", genre: "Гонки", platform: "PC, PS5", rating: 8.7, date: "Релиз: май 2026", cover: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/287febea-448b-464e-922c-90bf890f1fdd.jpg" },
  { id: 3, title: "Echoes of Mars", genre: "Стратегия", platform: "PC", rating: 9.1, date: "Релиз: июль 2026", cover: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/287febea-448b-464e-922c-90bf890f1fdd.jpg" },
  { id: 4, title: "Cyber Nexus", genre: "Шутер", platform: "PC, Xbox", rating: 8.2, date: "Релиз: апрель 2026", cover: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/287febea-448b-464e-922c-90bf890f1fdd.jpg" },
  { id: 5, title: "Pixel Kingdom", genre: "Платформер", platform: "Switch, PC", rating: 8.9, date: "Релиз: июнь 2026", cover: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/287febea-448b-464e-922c-90bf890f1fdd.jpg" },
  { id: 6, title: "Void Protocol", genre: "Хоррор", platform: "PC, PS5", rating: 7.8, date: "Релиз: октябрь 2026", cover: "https://cdn.poehali.dev/projects/edb0e44a-043b-481f-848d-cc2ac7283a6c/files/287febea-448b-464e-922c-90bf890f1fdd.jpg" },
];

export interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  likes: number;
}

export const COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Екатерина М.",
    date: "2 часа назад",
    text: "Отличный материал, спасибо! Давно ждала подробного разбора этой темы. Особенно интересна часть про методологию.",
    likes: 24,
  },
  {
    id: 2,
    author: "Сергей К.",
    date: "4 часа назад",
    text: "Не уверен, что результаты воспроизводимы. Хотелось бы увидеть независимую проверку, прежде чем делать громкие заявления.",
    likes: 12,
  },
  {
    id: 3,
    author: "Андрей П.",
    date: "5 часов назад",
    text: "Работаю в смежной области — могу подтвердить, что направление действительно перспективное. Следим за развитием.",
    likes: 38,
  },
];