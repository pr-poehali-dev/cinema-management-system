import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(5);

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
      description: 'Захватывающий космический боевик о команде исследователей, столкнувшихся с неизвестной угрозой в далекой галактике. Эпические битвы, потрясающие визуальные эффекты и неожиданные повороты сюжета.',
      director: 'Алексей Петров',
      cast: ['Иван Иванов', 'Мария Смирнова', 'Петр Сидоров'],
      year: 2024,
      country: 'Россия',
      showtimes: ['12:00', '15:30', '19:00', '22:15'],
      ageRating: '16+',
      reviews: [
        { id: 1, author: 'Анна К.', rating: 9, text: 'Потрясающий фильм! Визуальные эффекты на высшем уровне.', date: '2024-01-15' },
        { id: 2, author: 'Михаил П.', rating: 8, text: 'Отличный боевик, держит в напряжении до конца.', date: '2024-01-14' }
      ]
    },
    {
      id: 2,
      title: 'Любовь в большом городе',
      genre: 'romance',
      rating: 7.8,
      duration: '108 мин',
      poster: '/img/3a9c71b0-e67c-4974-8114-0d8a44331947.jpg',
      description: 'Романтическая комедия о двух противоположностях, которые находят друг друга в шумном мегаполисе. История о том, что настоящая любовь преодолевает все препятствия.',
      director: 'Елена Волкова',
      cast: ['Анна Петрова', 'Дмитрий Козлов', 'Ольга Васильева'],
      year: 2024,
      country: 'Россия',
      showtimes: ['14:00', '17:30', '20:45'],
      ageRating: '12+',
      reviews: [
        { id: 3, author: 'Светлана В.', rating: 8, text: 'Очень милая и добрая комедия, смотрела с удовольствием.', date: '2024-01-13' }
      ]
    },
    {
      id: 3,
      title: 'Тени прошлого',
      genre: 'horror',
      rating: 7.2,
      duration: '95 мин',
      poster: '/img/b5536d6b-a197-4278-bc54-6c06f9218fc2.jpg',
      description: 'Мистический триллер о секретах старого особняка, которые лучше было бы не раскрывать. Атмосферный хоррор с неожиданной развязкой.',
      director: 'Андрей Темный',
      cast: ['Елена Темная', 'Игорь Мрачный', 'Ольга Страшная'],
      year: 2024,
      country: 'Россия',
      showtimes: ['18:00', '21:30'],
      ageRating: '18+',
      reviews: [
        { id: 4, author: 'Владимир С.', rating: 7, text: 'Неплохой хоррор, есть несколько действительно страшных моментов.', date: '2024-01-12' }
      ]
    }
  ];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handleReviewSubmit = () => {
    if (!selectedMovie || !userReview.trim()) return;
    
    // В реальном приложении здесь будет API вызов
    console.log('Добавляем отзыв:', {
      movieId: selectedMovie.id,
      rating: userRating,
      text: userReview
    });
    
    setUserReview('');
    setUserRating(5);
    setIsReviewDialogOpen(false);
  };

  if (selectedMovie) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setSelectedMovie(null)}
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Button>

        {/* Movie Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">{selectedMovie.title}</h1>
                <Badge>{selectedMovie.ageRating}</Badge>
              </div>
              
              <div className="flex items-center gap-6 text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Icon name="Star" className="w-5 h-5 text-yellow-500 mr-1 fill-current" />
                  {selectedMovie.rating}
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" className="w-5 h-5 mr-1" />
                  {selectedMovie.duration}
                </div>
                <span>{selectedMovie.year}</span>
                <span>{selectedMovie.country}</span>
              </div>
              
              <p className="text-lg mb-6">{selectedMovie.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Режиссер</h3>
                  <p>{selectedMovie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">В ролях</h3>
                  <p>{selectedMovie.cast.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Showtimes */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Сеансы сегодня</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedMovie.showtimes.map((time: string) => (
                  <Button
                    key={time}
                    className="text-lg px-6 py-3"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Отзывы ({selectedMovie.reviews.length})</h3>
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Написать отзыв
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Оставить отзыв</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Оценка</label>
                        <Select value={userRating.toString()} onValueChange={(value) => setUserRating(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {rating} из 10
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Отзыв</label>
                        <Textarea
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                          placeholder="Поделитесь впечатлениями о фильме..."
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleReviewSubmit} className="w-full">
                        Опубликовать отзыв
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {selectedMovie.reviews.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author}</span>
                          <div className="flex items-center">
                            <Icon name="Star" className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                            {review.rating}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p>{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Все фильмы</h1>
      
      {/* Search and Filters */}
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

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <Card 
            key={movie.id} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={() => handleMovieClick(movie)}
          >
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
              
              <Button className="w-full">
                Подробнее
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;