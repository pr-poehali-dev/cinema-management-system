import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const AdminPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isMovieDialogOpen, setIsMovieDialogOpen] = useState(false);
  const [isShowtimeDialogOpen, setIsShowtimeDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const movies = [
    {
      id: 1,
      title: 'Космический рейд',
      genre: 'Боевик',
      duration: 142,
      rating: 8.5,
      ageRating: '16+',
      status: 'active',
      director: 'Алексей Петров',
      country: 'Россия',
      year: 2024
    },
    {
      id: 2,
      title: 'Любовь в большом городе',
      genre: 'Романтика',
      duration: 108,
      rating: 7.8,
      ageRating: '12+',
      status: 'active',
      director: 'Елена Волкова',
      country: 'Россия',
      year: 2024
    }
  ];

  const showtimes = [
    {
      id: 1,
      movie: 'Космический рейд',
      cinema: 'CinemaHub Центр',
      hall: 'Зал 1',
      date: '2024-02-01',
      time: '19:00',
      price: 450,
      capacity: 60,
      booked: 18
    },
    {
      id: 2,
      movie: 'Любовь в большом городе',
      cinema: 'CinemaHub Мега',
      hall: 'Зал 2',
      date: '2024-02-01',
      time: '17:30',
      price: 350,
      capacity: 45,
      booked: 30
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Анна Иванова',
      email: 'anna@email.com',
      role: 'user',
      status: 'active',
      registrationDate: '2024-01-15',
      ordersCount: 5
    },
    {
      id: 2,
      name: 'Петр Сидоров',
      email: 'petr@email.com',
      role: 'employee',
      status: 'active',
      registrationDate: '2024-01-10',
      ordersCount: 0
    }
  ];

  const analytics = {
    totalUsers: 1250,
    totalOrders: 890,
    totalRevenue: 425000,
    popularMovies: [
      { title: 'Космический рейд', orders: 235 },
      { title: 'Любовь в большом городе', orders: 180 },
      { title: 'Тени прошлого', orders: 165 }
    ],
    revenueByMonth: [
      { month: 'Январь', revenue: 180000 },
      { month: 'Февраль', revenue: 245000 }
    ]
  };

  const promotions = [
    {
      id: 1,
      title: 'Скидка 30% по студенческим',
      description: 'Каждый понедельник и вторник',
      discount: 30,
      status: 'active',
      validUntil: '2024-03-01'
    },
    {
      id: 2,
      title: 'Семейные выходные',
      description: '2 взрослых + 2 детских = скидка 25%',
      discount: 25,
      status: 'active',
      validUntil: '2024-02-29'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge>Активный</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Неактивный</Badge>;
      case 'user':
        return <Badge variant="outline">Пользователь</Badge>;
      case 'employee':
        return <Badge>Сотрудник</Badge>;
      case 'admin':
        return <Badge variant="destructive">Администратор</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>
      
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="movies">Фильмы</TabsTrigger>
          <TabsTrigger value="showtimes">Сеансы</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="promotions">Акции</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Пользователи</p>
                    <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                  </div>
                  <Icon name="Users" className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Заказы</p>
                    <p className="text-2xl font-bold">{analytics.totalOrders}</p>
                  </div>
                  <Icon name="ShoppingCart" className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Выручка</p>
                    <p className="text-2xl font-bold">{analytics.totalRevenue.toLocaleString()}₽</p>
                  </div>
                  <Icon name="DollarSign" className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Активные фильмы</p>
                    <p className="text-2xl font-bold">{movies.filter(m => m.status === 'active').length}</p>
                  </div>
                  <Icon name="Film" className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Популярные фильмы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.popularMovies.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{movie.title}</span>
                      <Badge variant="outline">{movie.orders} заказов</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Выручка по месяцам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.revenueByMonth.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{item.month}</span>
                      <span className="font-semibold">{item.revenue.toLocaleString()}₽</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Movies Tab */}
        <TabsContent value="movies">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Управление фильмами</CardTitle>
                <Dialog open={isMovieDialogOpen} onOpenChange={setIsMovieDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Добавить фильм
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Добавить новый фильм</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Название</Label>
                        <Input placeholder="Название фильма" />
                      </div>
                      <div className="space-y-2">
                        <Label>Жанр</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите жанр" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="action">Боевик</SelectItem>
                            <SelectItem value="comedy">Комедия</SelectItem>
                            <SelectItem value="drama">Драма</SelectItem>
                            <SelectItem value="horror">Ужасы</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Длительность (мин)</Label>
                        <Input type="number" placeholder="120" />
                      </div>
                      <div className="space-y-2">
                        <Label>Возрастной рейтинг</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Рейтинг" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0+">0+</SelectItem>
                            <SelectItem value="6+">6+</SelectItem>
                            <SelectItem value="12+">12+</SelectItem>
                            <SelectItem value="16+">16+</SelectItem>
                            <SelectItem value="18+">18+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Описание</Label>
                        <Textarea placeholder="Описание фильма" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button>Сохранить</Button>
                      <Button variant="outline" onClick={() => setIsMovieDialogOpen(false)}>
                        Отменить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Жанр</TableHead>
                    <TableHead>Длительность</TableHead>
                    <TableHead>Рейтинг</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movies.map((movie) => (
                    <TableRow key={movie.id}>
                      <TableCell className="font-medium">{movie.title}</TableCell>
                      <TableCell>{movie.genre}</TableCell>
                      <TableCell>{movie.duration} мин</TableCell>
                      <TableCell>{movie.rating}</TableCell>
                      <TableCell>{getStatusBadge(movie.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Icon name="Trash" className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Showtimes Tab */}
        <TabsContent value="showtimes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Управление сеансами</CardTitle>
                <Dialog open={isShowtimeDialogOpen} onOpenChange={setIsShowtimeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Добавить сеанс
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить новый сеанс</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Фильм</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите фильм" />
                          </SelectTrigger>
                          <SelectContent>
                            {movies.map((movie) => (
                              <SelectItem key={movie.id} value={movie.id.toString()}>
                                {movie.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Дата</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Время</Label>
                          <Input type="time" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Цена билета</Label>
                        <Input type="number" placeholder="350" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button>Создать сеанс</Button>
                      <Button variant="outline" onClick={() => setIsShowtimeDialogOpen(false)}>
                        Отменить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Фильм</TableHead>
                    <TableHead>Кинотеатр</TableHead>
                    <TableHead>Зал</TableHead>
                    <TableHead>Дата и время</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Заполненность</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {showtimes.map((showtime) => (
                    <TableRow key={showtime.id}>
                      <TableCell className="font-medium">{showtime.movie}</TableCell>
                      <TableCell>{showtime.cinema}</TableCell>
                      <TableCell>{showtime.hall}</TableCell>
                      <TableCell>
                        {showtime.date} {showtime.time}
                      </TableCell>
                      <TableCell>{showtime.price}₽</TableCell>
                      <TableCell>
                        {showtime.booked}/{showtime.capacity}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(showtime.booked / showtime.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Icon name="Trash" className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Управление пользователями</CardTitle>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Добавить пользователя
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить пользователя</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Имя</Label>
                        <Input placeholder="Имя пользователя" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Роль</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите роль" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Пользователь</SelectItem>
                            <SelectItem value="employee">Сотрудник</SelectItem>
                            <SelectItem value="admin">Администратор</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button>Создать</Button>
                      <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                        Отменить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead>Заказы</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getStatusBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.registrationDate}</TableCell>
                      <TableCell>{user.ordersCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Icon name="Ban" className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Управление акциями</CardTitle>
                <Button>
                  <Icon name="Plus" className="w-4 h-4 mr-2" />
                  Создать акцию
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map((promo) => (
                  <Card key={promo.id} className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{promo.title}</h3>
                          <p className="text-muted-foreground">{promo.description}</p>
                        </div>
                        {getStatusBadge(promo.status)}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Скидка:</span>
                          <span className="font-medium">{promo.discount}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Действует до:</span>
                          <span>{promo.validUntil}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
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

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки кинотеатров</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Название сети</Label>
                  <Input defaultValue="CinemaHub" />
                </div>
                <div className="space-y-2">
                  <Label>Email для уведомлений</Label>
                  <Input defaultValue="admin@cinemahub.ru" />
                </div>
                <div className="space-y-2">
                  <Label>Телефон поддержки</Label>
                  <Input defaultValue="+7 (495) 123-45-67" />
                </div>
                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Правила кинотеатра</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Введите правила кинотеатра..."
                  rows={10}
                  defaultValue="1. Запрещается проносить еду и напитки
2. Мобильные телефоны должны быть отключены
3. Запрещается курение в помещении
4. Дети до 12 лет только в сопровождении взрослых"
                />
                <Button>Обновить правила</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;