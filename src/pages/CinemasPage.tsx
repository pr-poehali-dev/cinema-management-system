import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const CinemasPage = () => {
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = [
    { value: 'all', label: 'Все города' },
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'kazan', label: 'Казань' }
  ];

  const cinemas = [
    {
      id: 1,
      name: 'CinemaHub Центр',
      city: 'moscow',
      cityName: 'Москва',
      address: 'ул. Тверская, 15',
      phone: '+7 (495) 123-45-67',
      email: 'center@cinemahub.ru',
      halls: 6,
      totalSeats: 420,
      features: ['IMAX', '4DX', 'VIP зал', 'Буфет', 'Парковка'],
      workingHours: '09:00 - 01:00',
      metro: 'Театральная',
      image: 'https://images.unsplash.com/photo-1489599807068-d3c4b1b0e7e6?w=400&h=250&fit=crop',
      description: 'Премиальный кинотеатр в центре Москвы с самыми современными технологиями.'
    },
    {
      id: 2,
      name: 'CinemaHub Мега',
      city: 'moscow',
      cityName: 'Москва',
      address: 'ТРЦ Мега, 2 этаж',
      phone: '+7 (495) 234-56-78',
      email: 'mega@cinemahub.ru',
      halls: 8,
      totalSeats: 600,
      features: ['Dolby Atmos', 'VIP зал', 'Детская комната', 'Буфет', 'Парковка'],
      workingHours: '10:00 - 24:00',
      metro: 'Теплый Стан',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=250&fit=crop',
      description: 'Большой современный кинотеатр в торговом центре с широким выбором фильмов.'
    },
    {
      id: 3,
      name: 'CinemaHub Парк',
      city: 'moscow',
      cityName: 'Москва',
      address: 'Парк Горького, 1',
      phone: '+7 (495) 345-67-89',
      email: 'park@cinemahub.ru',
      halls: 4,
      totalSeats: 280,
      features: ['Эко-зал', 'Летний кинотеатр', 'Буфет', 'Терраса'],
      workingHours: '11:00 - 23:00',
      metro: 'Парк Культуры',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=250&fit=crop',
      description: 'Уютный кинотеатр в парке с летней террасой и эко-залом.'
    },
    {
      id: 4,
      name: 'CinemaHub Невский',
      city: 'spb',
      cityName: 'Санкт-Петербург',
      address: 'Невский проспект, 45',
      phone: '+7 (812) 123-45-67',
      email: 'nevsky@cinemahub.ru',
      halls: 5,
      totalSeats: 350,
      features: ['Историческое здание', 'VIP зал', 'Буфет', 'Арт-галерея'],
      workingHours: '10:00 - 24:00',
      metro: 'Невский проспект',
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=250&fit=crop',
      description: 'Кинотеатр в историческом здании на главной улице Санкт-Петербурга.'
    },
    {
      id: 5,
      name: 'CinemaHub Казань',
      city: 'kazan',
      cityName: 'Казань',
      address: 'ул. Баумана, 28',
      phone: '+7 (843) 123-45-67',
      email: 'kazan@cinemahub.ru',
      halls: 6,
      totalSeats: 450,
      features: ['Национальный зал', 'IMAX', 'VIP зал', 'Буфет', 'Парковка'],
      workingHours: '09:00 - 01:00',
      metro: 'Кремлевская',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      description: 'Современный кинотеатр в центре Казани с национальным колоритом.'
    }
  ];

  const filteredCinemas = cinemas.filter(cinema => 
    selectedCity === 'all' || cinema.city === selectedCity
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Наши кинотеатры</h1>
        <p className="text-muted-foreground mb-6">
          Найдите ближайший кинотеатр CinemaHub в вашем городе
        </p>
        
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full md:w-48">
            <Icon name="MapPin" className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCinemas.map((cinema) => (
          <Card key={cinema.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={cinema.image}
                alt={cinema.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/80 text-white">
                  {cinema.cityName}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{cinema.name}</span>
                <Badge variant="outline">{cinema.halls} залов</Badge>
              </CardTitle>
              <p className="text-muted-foreground">{cinema.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{cinema.address}</p>
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Train" className="w-4 h-4 inline mr-1" />
                      м. {cinema.metro}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon name="Clock" className="w-5 h-5 text-muted-foreground" />
                  <span>{cinema.workingHours}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="w-5 h-5 text-muted-foreground" />
                  <a href={`tel:${cinema.phone}`} className="hover:text-primary">
                    {cinema.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="w-5 h-5 text-muted-foreground" />
                  <a href={`mailto:${cinema.email}`} className="hover:text-primary">
                    {cinema.email}
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{cinema.halls}</p>
                  <p className="text-sm text-muted-foreground">Залов</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{cinema.totalSeats}</p>
                  <p className="text-sm text-muted-foreground">Мест</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium mb-3">Особенности:</h4>
                <div className="flex flex-wrap gap-2">
                  {cinema.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Icon name="Calendar" className="w-4 h-4 mr-2" />
                  Посмотреть расписание
                </Button>
                <Button variant="outline">
                  <Icon name="Navigation" className="w-4 h-4 mr-2" />
                  Маршрут
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Icon name="Star" className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Премиальное качество</h3>
            <p className="text-muted-foreground">
              Все наши кинотеатры оснащены современным оборудованием и комфортными креслами
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Icon name="MapPin" className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Удобное расположение</h3>
            <p className="text-muted-foreground">
              Наши кинотеатры находятся в центре городов рядом с метро и парковками
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Icon name="Heart" className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Индивидуальный подход</h3>
            <p className="text-muted-foreground">
              Каждый кинотеатр имеет свои уникальные особенности и атмосферу
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CinemasPage;