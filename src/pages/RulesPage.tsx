import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const RulesPage = () => {
  const generalRules = [
    {
      title: 'Режим работы',
      content: 'Кинотеатры CinemaHub работают ежедневно. Время работы может отличаться в зависимости от кинотеатра и расписания сеансов. Последний сеанс может начинаться в 23:30.',
      icon: 'Clock'
    },
    {
      title: 'Возрастные ограничения',
      content: 'Мы строго соблюдаем возрастные рейтинги фильмов. Дети до 16 лет могут посещать фильмы с рейтингом 16+ только в сопровождении взрослых. Документ, подтверждающий возраст, может быть запрошен.',
      icon: 'Shield'
    },
    {
      title: 'Билеты и места',
      content: 'Билет действителен только на указанный сеанс, дату и место. Опоздавшие зрители допускаются в зал только в случае, если это не мешает другим посетителям. Обмен и возврат билетов возможен не позднее чем за 2 часа до начала сеанса.',
      icon: 'Ticket'
    },
    {
      title: 'Безопасность',
      content: 'В целях безопасности в кинотеатре ведется видеонаблюдение. Запрещается проносить оружие, взрывчатые вещества и другие опасные предметы. При возникновении чрезвычайных ситуаций следуйте указаниям персонала.',
      icon: 'ShieldCheck'
    }
  ];

  const behaviorRules = [
    {
      id: 1,
      rule: 'Мобильные телефоны должны быть переведены в беззвучный режим',
      description: 'Разговоры по телефону во время сеанса запрещены'
    },
    {
      id: 2,
      rule: 'Запрещается курение и употребление алкоголя',
      description: 'Курение разрешено только в специально отведенных местах'
    },
    {
      id: 3,
      rule: 'Не разрешается проносить еду и напитки извне',
      description: 'В кинотеатре работает буфет с широким ассортиментом'
    },
    {
      id: 4,
      rule: 'Запрещается фото- и видеосъемка во время сеанса',
      description: 'Это нарушение авторских прав и мешает другим зрителям'
    },
    {
      id: 5,
      rule: 'Соблюдайте тишину во время просмотра',
      description: 'Громкие разговоры и комментарии мешают другим посетителям'
    },
    {
      id: 6,
      rule: 'Не ставьте ноги на спинки кресел',
      description: 'Берегите имущество кинотеатра и комфорт других зрителей'
    }
  ];

  const childrenRules = [
    {
      age: '0-3 года',
      rules: [
        'Бесплатный вход без предоставления отдельного места',
        'Обязательное сопровождение взрослыми',
        'При беспокойном поведении просьба покинуть зал'
      ]
    },
    {
      age: '4-12 лет',
      rules: [
        'Необходимо приобретение детского билета',
        'Фильмы с рейтингом 12+ только с сопровождением',
        'Документы для подтверждения возраста по требованию'
      ]
    },
    {
      age: '13-17 лет',
      rules: [
        'Фильмы 16+ только с письменного согласия родителей',
        'Фильмы 18+ категорически запрещены',
        'Документ удостоверяющий личность обязателен'
      ]
    }
  ];

  const discountRules = [
    {
      category: 'Студенческие скидки',
      conditions: [
        'Действительный студенческий билет',
        'Скидка действует в будние дни до 18:00',
        'Не распространяется на премьеры и VIP места',
        'Один билет на один студенческий билет'
      ]
    },
    {
      category: 'Льготные билеты',
      conditions: [
        'Пенсионеры, инвалиды, ветераны',
        'Необходим документ, подтверждающий льготу',
        'Скидка 50% в будние дни до 16:00',
        'Сопровождающий инвалида I группы - бесплатно'
      ]
    },
    {
      category: 'Семейные скидки',
      conditions: [
        'Минимум 2 взрослых + 2 детских билета',
        'Дети до 12 лет включительно',
        'Скидка действует в выходные на семейные фильмы',
        'Документы детей для подтверждения возраста'
      ]
    }
  ];

  const faqItems = [
    {
      question: 'Можно ли вернуть или обменять билет?',
      answer: 'Да, билеты можно вернуть или обменять не позднее чем за 2 часа до начала сеанса. Возврат осуществляется в полном объеме за вычетом комиссии 10%. Обмен возможен на любой другой сеанс при доплате разности в стоимости.'
    },
    {
      question: 'Что делать если опоздал на сеанс?',
      answer: 'Опоздавшие зрители допускаются в зал только если это не мешает другим посетителям и не нарушает ход просмотра. В некоторых случаях может потребоваться дождаться подходящего момента в фильме.'
    },
    {
      question: 'Можно ли приносить свою еду?',
      answer: 'Проносить еду и напитки извне запрещено. В наших кинотеатрах работают буфеты с широким ассортиментом закусок и напитков по доступным ценам.'
    },
    {
      question: 'Как получить льготную скидку?',
      answer: 'Для получения льготной скидки необходимо предъявить соответствующий документ при покупке билета. Льготы распространяются на пенсионеров, студентов, инвалидов и ветеранов согласно действующему законодательству.'
    },
    {
      question: 'Что делать при технических проблемах?',
      answer: 'При любых технических проблемах (звук, изображение, кондиционер) немедленно обратитесь к персоналу кинотеатра. В случае серьезных неполадок сеанс может быть перенесен или билеты возвращены в полном объеме.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Правила кинотеатра</h1>
        <p className="text-muted-foreground">
          Ознакомьтесь с правилами посещения кинотеатров CinemaHub для комфортного просмотра фильмов
        </p>
      </div>

      {/* General Rules */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Общие правила</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generalRules.map((rule, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={rule.icon as any} className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{rule.title}</h3>
                    <p className="text-muted-foreground">{rule.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Behavior Rules */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Правила поведения в зале</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {behaviorRules.map((rule) => (
                <div key={rule.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="X" className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{rule.rule}</h4>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Children Rules */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Правила для детей</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {childrenRules.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Baby" className="w-5 h-5 text-primary" />
                  {category.age}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Discount Rules */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Правила предоставления скидок</h2>
        <div className="space-y-6">
          {discountRules.map((discount, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Percent" className="w-5 h-5 text-primary" />
                  {discount.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discount.conditions.map((condition, condIndex) => (
                    <div key={condIndex} className="flex items-start gap-2">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{condition}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Часто задаваемые вопросы</h2>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Emergency Info */}
      <section className="mb-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Icon name="AlertTriangle" className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-red-800">Экстренные ситуации</h3>
                <div className="space-y-2 text-red-700">
                  <p>В случае возникновения чрезвычайных ситуаций:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Сохраняйте спокойствие и не паникуйте</li>
                    <li>Следуйте указаниям персонала кинотеатра</li>
                    <li>Используйте ближайший эвакуационный выход</li>
                    <li>Не пользуйтесь лифтом во время эвакуации</li>
                    <li>Обратитесь к администратору при любых проблемах</li>
                  </ul>
                  <div className="flex items-center gap-4 mt-4">
                    <Badge variant="destructive">Служба безопасности: 112</Badge>
                    <Badge variant="destructive">Администрация: +7 (495) 123-45-67</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section>
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="MessageCircle" className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Есть вопросы?</h3>
            <p className="text-muted-foreground mb-6">
              Если у вас остались вопросы по правилам кинотеатра, обратитесь к нашей службе поддержки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <Icon name="Phone" className="w-4 h-4 mr-2" />
                Позвонить: +7 (495) 123-45-67
              </Button>
              <Button variant="outline">
                <Icon name="Mail" className="w-4 h-4 mr-2" />
                Написать: info@cinemahub.ru
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default RulesPage;