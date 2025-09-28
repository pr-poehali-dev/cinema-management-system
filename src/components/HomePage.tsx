import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [
    { value: 'all', label: 'Все жанры' },
    { value: 'action', label: 'Боевик' },
    { value: 'comedy', label: 'Комедия' },
    { value: 'drama', label: 'Драма' },
    { value: 'horror', label: 'Ужасы' },
    { value: 'romance', label: 'Романтика' },
    { value: 'sci-fi', label: 'Фантастика' }
  ];

  const movies = [
    {
      id: 1,
      title: 'Космический рейд',
      genre: 'action',
      rating: 8.5,
      duration: '142 мин',
      poster: '/img/052c4272-f8c4-4b84-8d01-914dc7d41a0e.jpg',
      description: 'Захватывающий космический боевик о команде исследователей, столкнувшихся с неизвестной угрозой.',
      showtimes: ['12:00', '15:30', '19:00', '22:15'],
      ageRating: '16+'
    },
    {
      id: 2,
      title: 'Любовь в большом городе',
      genre: 'romance',
      rating: 7.8,
      duration: '108 мин',
      poster: '/img/3a9c71b0-e67c-4974-8114-0d8a44331947.jpg',
      description: 'Романтическая комедия о двух противоположностях, которые находят друг друга в шумном мегаполисе.',
      showtimes: ['14:00', '17:30', '20:45'],
      ageRating: '12+'
    },
    {
      id: 3,
      title: 'Тени прошлого',
      genre: 'horror',
      rating: 7.2,
      duration: '95 мин',
      poster: '/img/b5536d6b-a197-4278-bc54-6c06f9218fc2.jpg',
      description: 'Мистический триллер о секретах старого особняка, которые лучше было бы не раскрывать.',
      showtimes: ['18:00', '21:30'],
      ageRating: '18+'
    }
  ];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const promotions = [
    {
      title: 'Скидка 30% по студенческим',
      description: 'Каждый понедельник и вторник',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Семейные выходные',
      description: '2 взрослых + 2 детских = скидка 25%',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Ночные сеансы',
      description: 'После 23:00 билеты от 250₽',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Лучшие фильмы
              <br />
              <span className="text-blue-200">в вашем городе</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Современные кинотеатры с передовой техникой и комфортными залами
            </p>
            <Button size="lg" variant="secondary" className="text-primary">
              <Icon name="Ticket" className="w-5 h-5 mr-2" />
              Купить билеты
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Поиск фильмов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Сейчас в кино</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-2 right-2 bg-black/80 text-white">
                  {movie.ageRating}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{movie.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Icon name="Star" className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                    {movie.rating}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" className="w-4 h-4 mr-1" />
                    {movie.duration}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {movie.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Сеансы сегодня:</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-primary hover:text-white"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full">
                  <Icon name="Ticket" className="w-4 h-4 mr-2" />
                  Купить билет
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Акции и скидки</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <Card key={index} className="border-l-4 border-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
                    <p className="text-muted-foreground">{promo.description}</p>
                  </div>
                  <Badge className={promo.color}>Акция</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cinema Info */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Почему выбирают нас?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Современное оборудование</h3>
                    <p className="text-muted-foreground">4K проекторы и системы объемного звука</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Комфортные кресла</h3>
                    <p className="text-muted-foreground">Эргономичные кресла с возможностью регулировки</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Удобное расположение</h3>
                    <p className="text-muted-foreground">Кинотеатры в центре города с парковкой</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Наши кинотеатры</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium">CinemaHub Центр</h4>
                    <p className="text-sm text-muted-foreground">ул. Тверская, 15</p>
                  </div>
                  <Badge variant="outline">6 залов</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium">CinemaHub Мега</h4>
                    <p className="text-sm text-muted-foreground">ТРЦ Мега, 2 этаж</p>
                  </div>
                  <Badge variant="outline">8 залов</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-medium">CinemaHub Парк</h4>
                    <p className="text-sm text-muted-foreground">Парк Горького, 1</p>
                  </div>
                  <Badge variant="outline">4 зала</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;