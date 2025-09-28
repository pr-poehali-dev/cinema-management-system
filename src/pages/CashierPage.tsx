import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const CashierPage = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    discountType: 'none'
  });

  // Доступные фильмы и сеансы
  const movies = [
    {
      id: 1,
      title: 'Космический рейд',
      poster: '/img/052c4272-f8c4-4b84-8d01-914dc7d41a0e.jpg',
      ageRating: '16+',
      showtimes: [
        { id: 1, time: '12:00', hall: 'Зал 1', price: 350, available: 45 },
        { id: 2, time: '15:30', hall: 'Зал 1', price: 400, available: 32 },
        { id: 3, time: '19:00', hall: 'Зал 1', price: 450, available: 18 },
        { id: 4, time: '22:15', hall: 'Зал 1', price: 350, available: 52 }
      ]
    },
    {
      id: 2,
      title: 'Любовь в большом городе',
      poster: '/img/3a9c71b0-e67c-4974-8114-0d8a44331947.jpg',
      ageRating: '12+',
      showtimes: [
        { id: 5, time: '14:00', hall: 'Зал 2', price: 300, available: 28 },
        { id: 6, time: '17:30', hall: 'Зал 2', price: 350, available: 15 },
        { id: 7, time: '20:45', hall: 'Зал 2', price: 400, available: 35 }
      ]
    }
  ];

  // Типы скидок
  const discountTypes = [
    { value: 'none', label: 'Без скидки', discount: 0 },
    { value: 'student', label: 'Студенческая (-30%)', discount: 30 },
    { value: 'senior', label: 'Пенсионная (-50%)', discount: 50 },
    { value: 'family', label: 'Семейная (-25%)', discount: 25 },
    { value: 'birthday', label: 'День рождения (-20%)', discount: 20 }
  ];

  // Генерация схемы зала
  const generateSeats = (rows: number, seatsPerRow: number) => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        const isOccupied = Math.random() < 0.3;
        seats.push({
          id: seatId,
          row,
          seat,
          isOccupied,
          isSelected: selectedSeats.includes(seatId),
          price: selectedShowtime?.price || 0
        });
      }
    }
    return seats;
  };

  const seats = selectedShowtime ? generateSeats(8, 10) : [];

  // Расчет стоимости
  const calculateTotal = () => {
    if (!selectedShowtime || selectedSeats.length === 0) return 0;
    
    const basePrice = selectedSeats.length * selectedShowtime.price;
    const selectedDiscount = discountTypes.find(d => d.value === customerInfo.discountType);
    const discount = selectedDiscount ? (basePrice * selectedDiscount.discount) / 100 : 0;
    
    return basePrice - discount;
  };

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.isOccupied) return;

    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleCompleteSale = () => {
    const total = calculateTotal();
    console.log('Продажа завершена:', {
      movie: selectedMovie?.title,
      showtime: selectedShowtime?.time,
      seats: selectedSeats,
      customer: customerInfo,
      total
    });
    
    // Сброс формы
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setCustomerInfo({
      name: '',
      phone: '',
      email: '',
      discountType: 'none'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Касса - Продажа билетов</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Выбор фильма и сеанса */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>1. Выберите фильм</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {movies.map((movie) => (
                <Card 
                  key={movie.id} 
                  className={`cursor-pointer transition-all ${
                    selectedMovie?.id === movie.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{movie.title}</h3>
                        <Badge variant="outline">{movie.ageRating}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {selectedMovie && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>2. Выберите сеанс</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedMovie.showtimes.map((showtime: any) => (
                  <Card 
                    key={showtime.id}
                    className={`cursor-pointer transition-all ${
                      selectedShowtime?.id === showtime.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedShowtime(showtime)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{showtime.time}</p>
                          <p className="text-sm text-muted-foreground">{showtime.hall}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{showtime.price}₽</p>
                          <p className="text-sm text-muted-foreground">
                            {showtime.available} мест
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Выбор мест */}
        <div className="lg:col-span-1">
          {selectedShowtime && (
            <Card>
              <CardHeader>
                <CardTitle>3. Выберите места</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Экран */}
                <div className="text-center mb-6">
                  <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-full text-sm">
                    ЭКРАН
                  </div>
                </div>

                {/* Места */}
                <div className="space-y-2 mb-6">
                  {Array.from({ length: 8 }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      <span className="w-6 text-center text-sm font-medium">
                        {rowIndex + 1}
                      </span>
                      <div className="flex gap-1">
                        {seats
                          .filter(seat => seat.row === rowIndex + 1)
                          .map(seat => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat.id)}
                              disabled={seat.isOccupied}
                              className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                                seat.isOccupied
                                  ? 'bg-red-500 text-white cursor-not-allowed'
                                  : seat.isSelected
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                            >
                              {seat.seat}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Легенда */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span>Свободно</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Выбрано</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Занято</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Оформление заказа */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>4. Оформление заказа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Информация о покупателе */}
              <div className="space-y-4">
                <h4 className="font-medium">Данные покупателя (необязательно)</h4>
                
                <div className="space-y-2">
                  <Label>Имя</Label>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Имя покупателя"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <Separator />

              {/* Скидки */}
              <div className="space-y-4">
                <h4 className="font-medium">Льготы и скидки</h4>
                
                <Select
                  value={customerInfo.discountType}
                  onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, discountType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {discountTypes.map((discount) => (
                      <SelectItem key={discount.value} value={discount.value}>
                        {discount.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Итоговая информация */}
              <div className="space-y-4">
                <h4 className="font-medium">Детали заказа</h4>
                
                {selectedMovie && (
                  <div className="text-sm">
                    <p><span className="text-muted-foreground">Фильм:</span> {selectedMovie.title}</p>
                  </div>
                )}
                
                {selectedShowtime && (
                  <div className="text-sm">
                    <p><span className="text-muted-foreground">Сеанс:</span> {selectedShowtime.time} ({selectedShowtime.hall})</p>
                  </div>
                )}
                
                {selectedSeats.length > 0 && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">Выбранные места:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedSeats.map(seatId => {
                        const [row, seat] = seatId.split('-');
                        return (
                          <Badge key={seatId} variant="outline">
                            Ряд {row}, место {seat}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Separator />
                
                {/* Расчет стоимости */}
                <div className="space-y-2">
                  {selectedSeats.length > 0 && selectedShowtime && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Билеты ({selectedSeats.length} шт.)</span>
                        <span>{(selectedSeats.length * selectedShowtime.price).toLocaleString()}₽</span>
                      </div>
                      
                      {customerInfo.discountType !== 'none' && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Скидка ({discountTypes.find(d => d.value === customerInfo.discountType)?.discount}%)</span>
                          <span>-{((selectedSeats.length * selectedShowtime.price * (discountTypes.find(d => d.value === customerInfo.discountType)?.discount || 0)) / 100).toLocaleString()}₽</span>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold text-lg">
                        <span>К оплате:</span>
                        <span>{calculateTotal().toLocaleString()}₽</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  disabled={selectedSeats.length === 0}
                  onClick={handleCompleteSale}
                >
                  <Icon name="CreditCard" className="w-4 h-4 mr-2" />
                  Оплата наличными
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={selectedSeats.length === 0}
                >
                  <Icon name="Smartphone" className="w-4 h-4 mr-2" />
                  Оплата картой
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => {
                    setSelectedSeats([]);
                    setCustomerInfo({
                      name: '',
                      phone: '',
                      email: '',
                      discountType: 'none'
                    });
                  }}
                >
                  <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                  Сбросить выбор
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <Icon name="RefreshCw" className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-sm">Обмен билета</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <Icon name="ArrowLeft" className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-sm">Возврат билета</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <Icon name="Gift" className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-sm">Подарочный билет</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-16">
                <div className="text-center">
                  <Icon name="Printer" className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-sm">Печать билета</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashierPage;