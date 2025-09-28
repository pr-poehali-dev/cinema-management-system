import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PromotionsPage = () => {
  const activePromotions = [
    {
      id: 1,
      title: 'Скидка 30% по студенческим',
      description: 'Каждый понедельник и вторник студенты получают скидку 30% на все сеансы при предъявлении студенческого билета.',
      discount: '30%',
      validUntil: '31 марта 2024',
      conditions: [
        'Действует только в понедельник и вторник',
        'Необходимо предъявить действующий студенческий билет',
        'Скидка действует на все фильмы',
        'Не суммируется с другими акциями'
      ],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop',
      category: 'Студенческая',
      isPopular: true
    },
    {
      id: 2,
      title: 'Семейные выходные',
      description: 'Семейное предложение: 2 взрослых + 2 детских билета со скидкой 25%. Идеально для семейного похода в кино!',
      discount: '25%',
      validUntil: '29 февраля 2024',
      conditions: [
        'Действует только в выходные дни',
        'Минимум 2 взрослых и 2 детских билета',
        'Дети до 12 лет',
        'Скидка на семейные фильмы'
      ],
      image: 'https://images.unsplash.com/photo-1489599807068-d3c4b1b0e7e6?w=400&h=200&fit=crop',
      category: 'Семейная',
      isPopular: true
    },
    {
      id: 3,
      title: 'Ночные сеансы',
      description: 'Специальные цены на поздние сеансы после 23:00. Билеты от 250₽ на все фильмы.',
      discount: 'от 250₽',
      validUntil: '31 марта 2024',
      conditions: [
        'Действует на сеансы после 23:00',
        'Распространяется на все фильмы',
        'Ограниченное количество мест',
        'Только для лиц старше 18 лет'
      ],
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop',
      category: 'Ночная',
      isPopular: false
    },
    {
      id: 4,
      title: 'VIP среда',
      description: 'По средам VIP места по цене обычных! Насладитесь премиальным комфортом за стандартную стоимость.',
      discount: '50%',
      validUntil: '31 марта 2024',
      conditions: [
        'Действует только по средам',
        'Только на VIP места',
        'Ограниченное количество мест',
        'Необходимо бронирование заранее'
      ],
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=200&fit=crop',
      category: 'VIP',
      isPopular: false
    },
    {
      id: 5,
      title: 'Именинникам скидка',
      description: 'В день рождения и в течение недели после получите скидку 20% на билеты. Отпразднуйте с нами!',
      discount: '20%',
      validUntil: 'Постоянная акция',
      conditions: [
        'Действует в день рождения ±7 дней',
        'Необходимо предъявить документ',
        'На все сеансы и фильмы',
        'Один раз в год'
      ],
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=200&fit=crop',
      category: 'Персональная',
      isPopular: false
    },
    {
      id: 6,
      title: 'Киномарафон',
      description: 'Купите билеты на 3 фильма в один день и получите 4-й билет бесплатно! Идеально для настоящих киноманов.',
      discount: '25%',
      validUntil: '15 февраля 2024',
      conditions: [
        'Минимум 3 фильма в один день',
        '4-й билет самый дешевый',
        'Все фильмы в одном кинотеатре',
        'Ограниченное время действия'
      ],
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=200&fit=crop',
      category: 'Специальная',
      isPopular: true
    }
  ];

  const pastPromotions = [
    {
      id: 7,
      title: 'Новогодняя магия',
      description: 'Скидка 40% на все новогодние фильмы в период с 25 декабря по 8 января.',
      validUntil: '8 января 2024',
      category: 'Праздничная'
    },
    {
      id: 8,
      title: 'Премьера месяца',
      description: 'Специальные цены на премьерные показы в январе.',
      validUntil: '31 января 2024',
      category: 'Премьера'
    }
  ];

  const loyaltyProgram = {
    title: 'Программа лояльности CinemaHub',
    description: 'Накапливайте баллы за каждый просмотр и получайте эксклюзивные скидки и подарки.',
    benefits: [
      'Начисление 5% с каждой покупки',
      'Бесплатный билет за 1000 баллов',
      'Эксклюзивные предпремьерные показы',
      'Скидки в кафе кинотеатра',
      'Подарок в день рождения'
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Акции и скидки</h1>
        <p className="text-muted-foreground">
          Не упустите возможность сэкономить на походе в кино! Актуальные предложения и специальные цены.
        </p>
      </div>

      {/* Active Promotions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Действующие акции</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePromotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-primary/90 text-white">
                    {promo.discount}
                  </Badge>
                  {promo.isPopular && (
                    <Badge className="bg-red-500/90 text-white">
                      Популярная
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 right-3 bg-white/90 text-gray-800"
                >
                  {promo.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{promo.title}</CardTitle>
                <p className="text-muted-foreground">{promo.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                    <span>До {promo.validUntil}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Tag" className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-primary">{promo.discount}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Условия акции:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {promo.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="Check" className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full">
                  <Icon name="Ticket" className="w-4 h-4 mr-2" />
                  Воспользоваться акцией
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Loyalty Program */}
      <section className="mb-12">
        <Card className="bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">{loyaltyProgram.title}</h2>
                <p className="text-muted-foreground mb-6">{loyaltyProgram.description}</p>
                
                <div className="space-y-3">
                  {loyaltyProgram.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Star" className="w-3 h-3 text-white fill-current" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <Button size="lg" className="mt-6">
                  <Icon name="CreditCard" className="w-5 h-5 mr-2" />
                  Присоединиться к программе
                </Button>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm mx-auto">
                  <Icon name="Gift" className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Карта лояльности</h3>
                  <p className="text-muted-foreground mb-4">
                    Получите карту бесплатно уже сегодня
                  </p>
                  <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-4">
                    <p className="text-lg font-bold">Бонус при регистрации</p>
                    <p className="text-2xl font-bold">100 баллов</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Past Promotions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Завершенные акции</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastPromotions.map((promo) => (
            <Card key={promo.id} className="opacity-60">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{promo.title}</h3>
                  <Badge variant="secondary">{promo.category}</Badge>
                </div>
                <p className="text-muted-foreground mb-3">{promo.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" className="w-4 h-4" />
                  <span>Действовала до {promo.validUntil}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="mt-16 text-center">
        <Card>
          <CardContent className="p-8">
            <Icon name="MessageCircle" className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Есть вопросы по акциям?</h3>
            <p className="text-muted-foreground mb-6">
              Наша служба поддержки готова помочь вам разобраться с условиями любой акции
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Icon name="Phone" className="w-4 h-4 mr-2" />
                +7 (495) 123-45-67
              </Button>
              <Button variant="outline">
                <Icon name="Mail" className="w-4 h-4 mr-2" />
                promo@cinemahub.ru
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PromotionsPage;