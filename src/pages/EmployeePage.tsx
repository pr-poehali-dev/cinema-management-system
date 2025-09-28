import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const EmployeePage = () => {
  const [selectedHall, setSelectedHall] = useState('hall-1');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [ticketCode, setTicketCode] = useState('');

  // Статистика смены
  const shiftStats = {
    startTime: '14:00',
    endTime: '22:00',
    ticketsSold: 156,
    revenue: 67800,
    activeShowtimes: 8,
    currentHour: '18:30'
  };

  // Текущие сеансы
  const currentShowtimes = [
    {
      id: 1,
      movie: 'Космический рейд',
      hall: 'Зал 1',
      time: '19:00',
      capacity: 60,
      sold: 45,
      available: 15,
      status: 'selling',
      revenue: 20250
    },
    {
      id: 2,
      movie: 'Любовь в большом городе',
      hall: 'Зал 2',
      time: '19:30',
      capacity: 45,
      sold: 42,
      available: 3,
      status: 'almost_full',
      revenue: 14700
    },
    {
      id: 3,
      movie: 'Тени прошлого',
      hall: 'Зал 3',
      time: '21:30',
      capacity: 40,
      sold: 8,
      available: 32,
      status: 'low_sales',
      revenue: 2960
    }
  ];

  // Схема зала (упрощенная)
  const generateHallSeats = (capacity: number, sold: number) => {
    const seats = [];
    const rows = Math.ceil(capacity / 10);
    const seatsPerRow = Math.ceil(capacity / rows);
    
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow && seats.length < capacity; seat++) {
        seats.push({
          id: `${row}-${seat}`,
          row,
          seat,
          status: seats.length < sold ? 'sold' : 'available'
        });
      }
    }
    return seats;
  };

  const hallSeats = generateHallSeats(60, 45);

  // Отзывы для модерации
  const pendingReviews = [
    {
      id: 1,
      movie: 'Космический рейд',
      author: 'Анна К.',
      text: 'Отличный фильм! Рекомендую всем любителям фантастики.',
      rating: 9,
      date: '2024-02-01 18:45',
      flagged: false
    },
    {
      id: 2,
      movie: 'Тени прошлого',
      author: 'Игорь С.',
      text: 'Полная ерунда, зря потратил время и деньги!!!',
      rating: 2,
      date: '2024-02-01 17:30',
      flagged: true
    },
    {
      id: 3,
      movie: 'Любовь в большом городе',
      author: 'Мария П.',
      text: 'Очень милая комедия, посмотрела с удовольствием.',
      rating: 8,
      date: '2024-02-01 16:20',
      flagged: false
    }
  ];

  const handleTicketScan = () => {
    if (ticketCode.trim()) {
      // Симуляция сканирования
      setScanResult(ticketCode.includes('VALID') ? 'valid' : 'invalid');
      setTimeout(() => setScanResult(null), 3000);
    }
  };

  const handleReviewAction = (reviewId: number, action: 'approve' | 'delete') => {
    console.log(`${action} review ${reviewId}`);
    // В реальном приложении здесь будет API вызов
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'selling':
        return <Badge className="bg-green-500">Идут продажи</Badge>;
      case 'almost_full':
        return <Badge className="bg-yellow-500">Мало мест</Badge>;
      case 'low_sales':
        return <Badge variant="destructive">Низкие продажи</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Рабочее место сотрудника</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="Clock" className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Смена</p>
              <p className="font-bold">{shiftStats.startTime} - {shiftStats.endTime}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="Ticket" className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Билетов продано</p>
              <p className="font-bold">{shiftStats.ticketsSold}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="DollarSign" className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Выручка</p>
              <p className="font-bold">{shiftStats.revenue.toLocaleString()}₽</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Icon name="Film" className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Активных сеансов</p>
              <p className="font-bold">{shiftStats.activeShowtimes}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="hall-control" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hall-control">Контроль залов</TabsTrigger>
          <TabsTrigger value="ticket-sales">Продажа билетов</TabsTrigger>
          <TabsTrigger value="ticket-check">Проверка билетов</TabsTrigger>
          <TabsTrigger value="moderation">Модерация</TabsTrigger>
        </TabsList>

        {/* Hall Control Tab */}
        <TabsContent value="hall-control">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Схема зала в реальном времени</CardTitle>
                  <Select value={selectedHall} onValueChange={setSelectedHall}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hall-1">Зал 1 - Космический рейд</SelectItem>
                      <SelectItem value="hall-2">Зал 2 - Любовь в городе</SelectItem>
                      <SelectItem value="hall-3">Зал 3 - Тени прошлого</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  {/* Screen */}
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-full text-sm">
                      ЭКРАН
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="space-y-2 mb-6">
                    {Array.from({ length: 6 }, (_, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-2">
                        <span className="w-6 text-center text-sm font-medium">
                          {rowIndex + 1}
                        </span>
                        <div className="flex gap-1">
                          {hallSeats
                            .filter(seat => seat.row === rowIndex + 1)
                            .map(seat => (
                              <div
                                key={seat.id}
                                className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                                  seat.status === 'sold'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-green-200 text-green-800'
                                }`}
                              >
                                {seat.seat}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-200 rounded"></div>
                      <span>Свободно</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Продано</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Текущие сеансы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentShowtimes.map((showtime) => (
                      <div key={showtime.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{showtime.movie}</h4>
                          {getStatusBadge(showtime.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {showtime.hall} • {showtime.time}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Продано:</span>
                            <span>{showtime.sold}/{showtime.capacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Выручка:</span>
                            <span>{showtime.revenue.toLocaleString()}₽</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(showtime.sold / showtime.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Ticket Sales Tab */}
        <TabsContent value="ticket-sales">
          <Card>
            <CardHeader>
              <CardTitle>Продажа билетов на кассе</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Выберите сеанс</h3>
                  <div className="space-y-3">
                    {currentShowtimes.map((showtime) => (
                      <Card key={showtime.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{showtime.movie}</h4>
                              <p className="text-sm text-muted-foreground">
                                {showtime.hall} • {showtime.time}
                              </p>
                              <p className="text-sm">
                                Свободно: {showtime.available} мест
                              </p>
                            </div>
                            <Button size="sm">Выбрать</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Icon name="Percent" className="w-4 h-4 mr-2" />
                      Применить льготную скидку
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Icon name="Users" className="w-4 h-4 mr-2" />
                      Семейная скидка
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Icon name="GraduationCap" className="w-4 h-4 mr-2" />
                      Студенческая скидка
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Icon name="Gift" className="w-4 h-4 mr-2" />
                      Промокод
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">💡 Совет дня</h4>
                    <p className="text-sm text-muted-foreground">
                      Предлагайте VIP места для романтических комедий - конверсия выше на 23%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ticket Check Tab */}
        <TabsContent value="ticket-check">
          <Card>
            <CardHeader>
              <CardTitle>Проверка билетов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Сканирование QR-кода</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Введите код билета или отсканируйте QR"
                      value={ticketCode}
                      onChange={(e) => setTicketCode(e.target.value)}
                    />
                    <Button onClick={handleTicketScan} className="w-full">
                      <Icon name="ScanLine" className="w-4 h-4 mr-2" />
                      Проверить билет
                    </Button>
                  </div>

                  {scanResult && (
                    <Alert className={`mt-4 ${scanResult === 'valid' ? 'border-green-500' : 'border-red-500'}`}>
                      <Icon 
                        name={scanResult === 'valid' ? 'CheckCircle' : 'XCircle'} 
                        className={`w-4 h-4 ${scanResult === 'valid' ? 'text-green-600' : 'text-red-600'}`} 
                      />
                      <AlertDescription>
                        {scanResult === 'valid' 
                          ? '✅ Билет действителен. Проход разрешен.' 
                          : '❌ Билет недействителен или уже использован.'
                        }
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Быстрые проверки</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Clock" className="w-4 h-4 mr-2" />
                      Опоздавшие зрители
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
                      Обмен билетов
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                      Возврат билетов
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="AlertTriangle" className="w-4 h-4 mr-2" />
                      Спорные ситуации
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Статистика проверок</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">142</p>
                    <p className="text-sm text-muted-foreground">Успешных проверок</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-sm text-muted-foreground">Недействительных</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">8</p>
                    <p className="text-sm text-muted-foreground">Опоздавших</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">2</p>
                    <p className="text-sm text-muted-foreground">Обменов</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation Tab */}
        <TabsContent value="moderation">
          <Card>
            <CardHeader>
              <CardTitle>Модерация отзывов</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Фильм</TableHead>
                    <TableHead>Автор</TableHead>
                    <TableHead>Отзыв</TableHead>
                    <TableHead>Рейтинг</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.movie}</TableCell>
                      <TableCell>{review.author}</TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{review.text}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Icon name="Star" className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                          {review.rating}
                        </div>
                      </TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        {review.flagged ? (
                          <Badge variant="destructive">Требует внимания</Badge>
                        ) : (
                          <Badge variant="secondary">На модерации</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleReviewAction(review.id, 'approve')}
                          >
                            <Icon name="Check" className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleReviewAction(review.id, 'delete')}
                          >
                            <Icon name="X" className="w-4 h-4" />
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
      </Tabs>
    </div>
  );
};

export default EmployeePage;