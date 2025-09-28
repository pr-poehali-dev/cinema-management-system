import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Анна Иванова',
    email: 'anna.ivanova@email.com',
    phone: '+7 (925) 123-45-67',
    birthDate: '1990-05-15',
    city: 'Москва'
  });

  const [isEditing, setIsEditing] = useState(false);

  const ticketHistory = [
    {
      id: 'T-2024-001',
      movie: 'Космический рейд',
      cinema: 'CinemaHub Центр',
      date: '2024-01-20',
      time: '19:00',
      seats: ['Ряд 5, место 8', 'Ряд 5, место 9'],
      total: 900,
      status: 'completed'
    },
    {
      id: 'T-2024-002',
      movie: 'Любовь в большом городе',
      cinema: 'CinemaHub Мега',
      date: '2024-01-15',
      time: '17:30',
      seats: ['Ряд 3, место 12'],
      total: 350,
      status: 'completed'
    },
    {
      id: 'T-2024-003',
      movie: 'Тени прошлого',
      cinema: 'CinemaHub Парк',
      date: '2024-02-01',
      time: '21:30',
      seats: ['Ряд 7, место 15', 'Ряд 7, место 16'],
      total: 740,
      status: 'upcoming'
    }
  ];

  const reviews = [
    {
      id: 1,
      movie: 'Космический рейд',
      rating: 9,
      text: 'Потрясающий фильм! Визуальные эффекты на высшем уровне, сюжет держит в напряжении.',
      date: '2024-01-21'
    },
    {
      id: 2,
      movie: 'Любовь в большом городе',
      rating: 8,
      text: 'Очень милая и добрая комедия, смотрела с удовольствием. Отличная игра актеров.',
      date: '2024-01-16'
    }
  ];

  const favoriteMovies = [
    {
      id: 1,
      title: 'Космический рейд',
      poster: '/img/052c4272-f8c4-4b84-8d01-914dc7d41a0e.jpg',
      rating: 8.5,
      year: 2024
    },
    {
      id: 2,
      title: 'Любовь в большом городе',
      poster: '/img/3a9c71b0-e67c-4974-8114-0d8a44331947.jpg',
      rating: 7.8,
      year: 2024
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // В реальном приложении здесь будет API вызов
    console.log('Сохраняем профиль:', userInfo);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary">Просмотрен</Badge>;
      case 'upcoming':
        return <Badge>Предстоящий</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="tickets">Мои билеты</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          <TabsTrigger value="favorites">Избранное</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Информация о профиле</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  <Icon name={isEditing ? "Save" : "Edit"} className="w-4 h-4 mr-2" />
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя и фамилия</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Дата рождения</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={userInfo.birthDate}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, birthDate: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Input
                    id="city"
                    value={userInfo.city}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveProfile}>
                    <Icon name="Save" className="w-4 h-4 mr-2" />
                    Сохранить изменения
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Отменить
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>История заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Номер заказа</TableHead>
                    <TableHead>Фильм</TableHead>
                    <TableHead>Кинотеатр</TableHead>
                    <TableHead>Дата и время</TableHead>
                    <TableHead>Места</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketHistory.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.movie}</TableCell>
                      <TableCell>{ticket.cinema}</TableCell>
                      <TableCell>
                        {ticket.date} {ticket.time}
                      </TableCell>
                      <TableCell>
                        {ticket.seats.join(', ')}
                      </TableCell>
                      <TableCell>{ticket.total}₽</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Download" className="w-4 h-4" />
                          </Button>
                          {ticket.status === 'upcoming' && (
                            <Button variant="destructive" size="sm">
                              <Icon name="X" className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Мои отзывы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{review.movie}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Icon name="Star" className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                            {review.rating}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" className="w-4 h-4 mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Icon name="Trash" className="w-4 h-4 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Избранные фильмы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteMovies.map((movie) => (
                  <Card key={movie.id} className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
                    <div className="relative">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="Heart" className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{movie.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{movie.year}</span>
                        <div className="flex items-center">
                          <Icon name="Star" className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                          {movie.rating}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;