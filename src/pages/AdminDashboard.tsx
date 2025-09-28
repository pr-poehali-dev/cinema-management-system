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
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isCreateMovieOpen, setIsCreateMovieOpen] = useState(false);

  // Расширенная аналитика
  const analytics = {
    overview: {
      totalRevenue: 2100000,
      totalUsers: 1250,
      totalOrders: 890,
      averageTicket: 385,
      growthRevenue: '+15.2%',
      growthUsers: '+8.7%',
      growthOrders: '+12.3%',
      growthTicket: '+3.1%'
    },
    performance: {
      hallOccupancy: 73,
      customerSatisfaction: 8.4,
      employeeEfficiency: 91,
      systemUptime: 99.8
    },
    topMovies: [
      { title: 'Космический рейд', revenue: 485000, tickets: 1250, rating: 8.5 },
      { title: 'Любовь в большом городе', revenue: 420000, tickets: 1180, rating: 7.8 },
      { title: 'Тени прошлого', revenue: 315000, tickets: 890, rating: 7.2 }
    ],
    revenueByMonth: [
      { month: 'Янв', revenue: 1800000 },
      { month: 'Фев', revenue: 2100000 },
      { month: 'Мар', revenue: 1950000 }
    ]
  };

  // Управление пользователями
  const users = [
    {
      id: 1,
      name: 'Анна Иванова',
      email: 'anna@email.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-02-01',
      ordersCount: 12,
      totalSpent: 4620
    },
    {
      id: 2,
      name: 'Петр Сидоров',
      email: 'petr@email.com',
      role: 'employee',
      status: 'active',
      lastLogin: '2024-02-01',
      ordersCount: 0,
      totalSpent: 0
    },
    {
      id: 3,
      name: 'Мария Козлова',
      email: 'maria@email.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-02-01',
      ordersCount: 3,
      totalSpent: 1155
    }
  ];

  // Системные настройки
  const systemSettings = {
    siteName: 'CinemaHub',
    supportEmail: 'support@cinemahub.ru',
    supportPhone: '+7 (495) 123-45-67',
    maxBookingDays: 14,
    cancelHours: 2,
    loyaltyRate: 5,
    notifications: {
      emailMarketing: true,
      smsReminders: true,
      pushNotifications: false
    }
  };

  // Управление акциями
  const promotions = [
    {
      id: 1,
      title: 'Студенческие скидки',
      type: 'discount',
      value: 30,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      usageCount: 245,
      revenue: -18375
    },
    {
      id: 2,
      title: 'Семейные выходные',
      type: 'package',
      value: 25,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-29',
      usageCount: 89,
      revenue: -12460
    }
  ];

  // Отчеты и экспорт
  const reports = [
    { name: 'Ежедневная выручка', description: 'Детальный отчет по продажам за день', format: 'Excel' },
    { name: 'Популярность фильмов', description: 'Статистика просмотров и рейтингов', format: 'PDF' },
    { name: 'Эффективность сотрудников', description: 'KPI и метрики производительности', format: 'Excel' },
    { name: 'Анализ клиентской базы', description: 'Сегментация и поведение пользователей', format: 'PDF' }
  ];

  const handleCreateUser = () => {
    setIsCreateUserOpen(false);
    // API call to create user
  };

  const handleCreateMovie = () => {
    setIsCreateMovieOpen(false);
    // API call to create movie
  };

  const handleExportReport = (reportName: string) => {
    console.log(`Экспорт отчета: ${reportName}`);
    // Логика экспорта
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Панель администратора</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Сегодня</SelectItem>
              <SelectItem value="week">Эта неделя</SelectItem>
              <SelectItem value="month">Этот месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Icon name="Download" className="w-4 h-4 mr-2" />
            Экспорт данных
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="content">Контент</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="promotions">Акции</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Выручка</p>
                    <p className="text-2xl font-bold">{analytics.overview.totalRevenue.toLocaleString()}₽</p>
                    <p className="text-sm text-green-600">{analytics.overview.growthRevenue}</p>
                  </div>
                  <Icon name="TrendingUp" className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Пользователи</p>
                    <p className="text-2xl font-bold">{analytics.overview.totalUsers}</p>
                    <p className="text-sm text-green-600">{analytics.overview.growthUsers}</p>
                  </div>
                  <Icon name="Users" className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Заказы</p>
                    <p className="text-2xl font-bold">{analytics.overview.totalOrders}</p>
                    <p className="text-sm text-green-600">{analytics.overview.growthOrders}</p>
                  </div>
                  <Icon name="ShoppingCart" className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Средний чек</p>
                    <p className="text-2xl font-bold">{analytics.overview.averageTicket}₽</p>
                    <p className="text-sm text-green-600">{analytics.overview.growthTicket}</p>
                  </div>
                  <Icon name="Receipt" className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Ключевые показатели</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Загруженность залов</span>
                    <span>{analytics.performance.hallOccupancy}%</span>
                  </div>
                  <Progress value={analytics.performance.hallOccupancy} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Удовлетворенность клиентов</span>
                    <span>{analytics.performance.customerSatisfaction}/10</span>
                  </div>
                  <Progress value={analytics.performance.customerSatisfaction * 10} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Эффективность сотрудников</span>
                    <span>{analytics.performance.employeeEfficiency}%</span>
                  </div>
                  <Progress value={analytics.performance.employeeEfficiency} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Время работы системы</span>
                    <span>{analytics.performance.systemUptime}%</span>
                  </div>
                  <Progress value={analytics.performance.systemUptime} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Популярные фильмы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topMovies.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{movie.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {movie.tickets} билетов • ⭐ {movie.rating}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{movie.revenue.toLocaleString()}₽</p>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Icon name="User" className="w-5 h-5 text-blue-500" />
                  <div>
                    <p>Новый пользователь зарегистрировался</p>
                    <p className="text-sm text-muted-foreground">5 минут назад</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="Ticket" className="w-5 h-5 text-green-500" />
                  <div>
                    <p>Продан билет на "Космический рейд"</p>
                    <p className="text-sm text-muted-foreground">12 минут назад</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="Star" className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p>Новый отзыв к фильму "Любовь в большом городе"</p>
                    <p className="text-sm text-muted-foreground">25 минут назад</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление фильмами</CardTitle>
                  <Dialog open={isCreateMovieOpen} onOpenChange={setIsCreateMovieOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить фильм
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Создать новый фильм</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Название</Label>
                          <Input placeholder="Название фильма" />
                        </div>
                        <div className="space-y-2">
                          <Label>Режиссер</Label>
                          <Input placeholder="Имя режиссера" />
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
                        <div className="space-y-2">
                          <Label>Год выпуска</Label>
                          <Input type="number" placeholder="2024" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Описание</Label>
                          <Textarea placeholder="Описание фильма" rows={3} />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Актеры</Label>
                          <Input placeholder="Имена через запятую" />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleCreateMovie}>Создать фильм</Button>
                        <Button variant="outline" onClick={() => setIsCreateMovieOpen(false)}>
                          Отменить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Космический рейд</h4>
                      <p className="text-sm text-muted-foreground">Боевик • 142 мин • 16+</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Edit" className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Icon name="Trash" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">Любовь в большом городе</h4>
                      <p className="text-sm text-muted-foreground">Романтика • 108 мин • 12+</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Edit" className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Icon name="Trash" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Управление сеансами</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <Icon name="Calendar" className="w-4 h-4 mr-2" />
                    Создать расписание
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Icon name="Copy" className="w-4 h-4 mr-2" />
                    Копировать расписание
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Icon name="FileText" className="w-4 h-4 mr-2" />
                    Массовый импорт
                  </Button>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-3">Быстрые действия</h4>
                    <div className="space-y-2">
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        Отменить сеанс
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        Изменить цены
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start">
                        Добавить специальный показ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Управление пользователями</CardTitle>
                <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                      Добавить пользователя
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Создать нового пользователя</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Имя и фамилия</Label>
                        <Input placeholder="Иван Иванов" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="ivan@example.com" />
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
                      <div className="space-y-2">
                        <Label>Временный пароль</Label>
                        <Input type="password" placeholder="Будет отправлен на email" />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleCreateUser}>Создать пользователя</Button>
                      <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
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
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Последний вход</TableHead>
                    <TableHead>Заказов</TableHead>
                    <TableHead>Потрачено</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'employee' ? 'default' : 'secondary'}>
                          {user.role === 'admin' ? 'Админ' : user.role === 'employee' ? 'Сотрудник' : 'Пользователь'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status === 'active' ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.ordersCount}</TableCell>
                      <TableCell>{user.totalSpent.toLocaleString()}₽</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Активные акции</CardTitle>
                  <Button>
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Создать акцию
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions.map((promo) => (
                    <div key={promo.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{promo.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {promo.startDate} - {promo.endDate}
                          </p>
                        </div>
                        <Badge variant={promo.status === 'active' ? 'default' : 'secondary'}>
                          {promo.status === 'active' ? 'Активна' : 'Неактивна'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Использований</p>
                          <p className="font-medium">{promo.usageCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Влияние на выручку</p>
                          <p className={`font-medium ${promo.revenue < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {promo.revenue.toLocaleString()}₽
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" className="w-4 h-4 mr-1" />
                          Изменить
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Icon name="Pause" className="w-4 h-4 mr-1" />
                          Остановить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Программа лояльности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Процент начисления баллов</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                
                <div className="space-y-2">
                  <Label>Баллов за бесплатный билет</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Бонус в день рождения</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Автоматическое начисление</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label>Email уведомления</Label>
                </div>
                
                <Button className="w-full">
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Готовые отчеты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.format}</Badge>
                        <Button size="sm" onClick={() => handleExportReport(report.name)}>
                          <Icon name="Download" className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Конструктор отчетов</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Тип отчета</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Продажи</SelectItem>
                      <SelectItem value="customers">Клиенты</SelectItem>
                      <SelectItem value="movies">Фильмы</SelectItem>
                      <SelectItem value="employees">Сотрудники</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Период</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Сегодня</SelectItem>
                      <SelectItem value="week">Эта неделя</SelectItem>
                      <SelectItem value="month">Этот месяц</SelectItem>
                      <SelectItem value="custom">Произвольный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Формат экспорта</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите формат" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">
                  <Icon name="BarChart" className="w-4 h-4 mr-2" />
                  Создать отчет
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Основные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Название сайта</Label>
                  <Input defaultValue={systemSettings.siteName} />
                </div>
                
                <div className="space-y-2">
                  <Label>Email поддержки</Label>
                  <Input defaultValue={systemSettings.supportEmail} />
                </div>
                
                <div className="space-y-2">
                  <Label>Телефон поддержки</Label>
                  <Input defaultValue={systemSettings.supportPhone} />
                </div>
                
                <div className="space-y-2">
                  <Label>Дней для бронирования</Label>
                  <Input type="number" defaultValue={systemSettings.maxBookingDays} />
                </div>
                
                <div className="space-y-2">
                  <Label>Часов для отмены</Label>
                  <Input type="number" defaultValue={systemSettings.cancelHours} />
                </div>
                
                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email маркетинг</Label>
                  <Switch defaultChecked={systemSettings.notifications.emailMarketing} />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>SMS напоминания</Label>
                  <Switch defaultChecked={systemSettings.notifications.smsReminders} />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Push уведомления</Label>
                  <Switch defaultChecked={systemSettings.notifications.pushNotifications} />
                </div>
                
                <Button variant="outline" className="w-full">
                  <Icon name="Bell" className="w-4 h-4 mr-2" />
                  Настроить шаблоны
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Icon name="Database" className="w-4 h-4 mr-2" />
                  Резервное копирование
                </Button>
                
                <Button variant="destructive" className="w-full">
                  <Icon name="AlertTriangle" className="w-4 h-4 mr-2" />
                  Сброс к заводским
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;