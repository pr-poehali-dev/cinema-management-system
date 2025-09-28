import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCinema, setSelectedCinema] = useState('all');
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const cinemas = [
    { value: 'all', label: 'Все кинотеатры' },
    { value: 'center', label: 'CinemaHub Центр' },
    { value: 'mega', label: 'CinemaHub Мега' },
    { value: 'park', label: 'CinemaHub Парк' }
  ];

  const schedule = [
    {
      id: 1,
      movie: 'Космический рейд',
      poster: '/img/052c4272-f8c4-4b84-8d01-914dc7d41a0e.jpg',
      cinema: 'center',
      cinemaName: 'CinemaHub Центр',
      hall: 'Зал 1',
      duration: '142 мин',
      ageRating: '16+',
      showtimes: [
        { time: '12:00', price: 350, available: 45, total: 60 },
        { time: '15:30', price: 400, available: 32, total: 60 },
        { time: '19:00', price: 450, available: 18, total: 60 },
        { time: '22:15', price: 350, available: 52, total: 60 }
      ]
    },
    {
      id: 2,
      movie: 'Любовь в большом городе',
      poster: '/img/3a9c71b0-e67c-4974-8114-0d8a44331947.jpg',
      cinema: 'mega',
      cinemaName: 'CinemaHub Мега',
      hall: 'Зал 2',
      duration: '108 мин',
      ageRating: '12+',
      showtimes: [
        { time: '14:00', price: 300, available: 28, total: 45 },
        { time: '17:30', price: 350, available: 15, total: 45 },
        { time: '20:45', price: 400, available: 35, total: 45 }
      ]
    },
    {
      id: 3,
      movie: 'Тени прошлого',
      poster: '/img/b5536d6b-a197-4278-bc54-6c06f9218fc2.jpg',
      cinema: 'park',
      cinemaName: 'CinemaHub Парк',
      hall: 'Зал 3',
      duration: '95 мин',
      ageRating: '18+',
      showtimes: [
        { time: '18:00', price: 320, available: 22, total: 40 },
        { time: '21:30', price: 370, available: 38, total: 40 }
      ]
    }
  ];

  const filteredSchedule = schedule.filter(item => 
    selectedCinema === 'all' || item.cinema === selectedCinema
  );

  const generateSeats = (rows: number, seatsPerRow: number) => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        const isOccupied = Math.random() < 0.3; // 30% занятых мест
        seats.push({
          id: seatId,
          row,
          seat,
          isOccupied,
          isSelected: selectedSeats.includes(seatId)
        });
      }
    }
    return seats;
  };

  const seats = generateSeats(10, 12);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.isOccupied) return;

    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleShowtimeSelect = (scheduleItem: any, showtime: any) => {
    setSelectedShowtime({ ...scheduleItem, selectedTime: showtime });
    setSelectedSeats([]);
  };

  const calculateTotal = () => {
    if (!selectedShowtime) return 0;
    return selectedSeats.length * selectedShowtime.selectedTime.price;
  };

  if (selectedShowtime) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setSelectedShowtime(null)}
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Назад к расписанию
        </Button>

        {/* Movie Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <img 
                src={selectedShowtime.poster} 
                alt={selectedShowtime.movie}
                className="w-16 h-24 object-cover rounded"
              />
              <div>
                <h1 className="text-2xl font-bold">{selectedShowtime.movie}</h1>
                <p className="text-muted-foreground">{selectedShowtime.cinemaName} • {selectedShowtime.hall}</p>
                <p className="text-muted-foreground">
                  {format(selectedDate, 'dd MMMM yyyy', { locale: ru })} • {selectedShowtime.selectedTime.time}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seat Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Выберите места</h2>
            
            {/* Screen */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-full text-sm">
                ЭКРАН
              </div>
            </div>

            {/* Seats Grid */}
            <div className="space-y-2 mb-6">
              {Array.from({ length: 10 }, (_, rowIndex) => (
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
                          className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
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

            {/* Legend */}
            <div className="flex items-center gap-6 text-sm">
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
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Выбранные места:</h4>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedSeats.map(seatId => {
                        const [row, seat] = seatId.split('-');
                        return (
                          <Badge key={seatId} variant="outline">
                            Ряд {row}, место {seat}
                          </Badge>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Места не выбраны</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span>Билеты ({selectedSeats.length} шт.)</span>
                    <span>{calculateTotal()}₽</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Итого:</span>
                    <span>{calculateTotal()}₽</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={selectedSeats.length === 0}
                >
                  Оплатить билеты
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Расписание сеансов</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Icon name="Calendar" className="w-4 h-4 mr-2" />
              {format(selectedDate, 'dd MMMM yyyy', { locale: ru })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={selectedCinema} onValueChange={setSelectedCinema}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cinemas.map((cinema) => (
              <SelectItem key={cinema.value} value={cinema.value}>
                {cinema.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Schedule */}
      <div className="space-y-6">
        {filteredSchedule.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex gap-4">
                  <img
                    src={item.poster}
                    alt={item.movie}
                    className="w-20 h-28 object-cover rounded flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.movie}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{item.cinemaName} • {item.hall}</p>
                      <p>Длительность: {item.duration}</p>
                      <Badge variant="outline">{item.ageRating}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-medium mb-3">Сеансы:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {item.showtimes.map((showtime, index) => (
                      <Card 
                        key={index} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleShowtimeSelect(item, showtime)}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="font-semibold text-lg">{showtime.time}</div>
                          <div className="text-sm text-muted-foreground">{showtime.price}₽</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Свободно: {showtime.available}/{showtime.total}
                          </div>
                          <div className="mt-2">
                            {showtime.available < 10 ? (
                              <Badge variant="destructive" className="text-xs">Мало мест</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Есть места</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;