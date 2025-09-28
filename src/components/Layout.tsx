import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<string | null>(null);

  const cities = ['Москва', 'Санкт-Петербург', 'Казань'];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setUser('Пользователь');
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">CinemaHub</a>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="/movies" className="text-foreground hover:text-primary transition-colors">Фильмы</a>
              <a href="/schedule" className="text-foreground hover:text-primary transition-colors">Расписание</a>
              <a href="/cinemas" className="text-foreground hover:text-primary transition-colors">Кинотеатры</a>
              <a href="/promotions" className="text-foreground hover:text-primary transition-colors">Акции</a>
              <a href="/rules" className="text-foreground hover:text-primary transition-colors">Правила</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* City Selector */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-40">
                <Icon name="MapPin" className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <a href="/profile">
                  <Button variant="ghost" size="sm">
                    <Icon name="User" className="w-4 h-4 mr-2" />
                    {user}
                  </Button>
                </a>
                <a href="/employee">
                  <Button variant="ghost" size="sm">
                    <Icon name="Briefcase" className="w-4 h-4 mr-2" />
                    Рабочая
                  </Button>
                </a>
                <a href="/admin-dashboard">
                  <Button variant="ghost" size="sm">
                    <Icon name="Settings" className="w-4 h-4 mr-2" />
                    Админ
                  </Button>
                </a>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <Icon name="LogOut" className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="User" className="w-4 h-4 mr-2" />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input id="password" type="password" required />
                    </div>
                    
                    {authMode === 'register' && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" required />
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full">
                      {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      >
                        {authMode === 'login' 
                          ? 'Нет аккаунта? Зарегистрируйтесь' 
                          : 'Уже есть аккаунт? Войдите'
                        }
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">CinemaHub</h3>
              <p className="text-sm text-muted-foreground">
                Современная сеть кинотеатров с лучшими фильмами
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/movies" className="text-muted-foreground hover:text-primary">Фильмы</a></li>
                <li><a href="/schedule" className="text-muted-foreground hover:text-primary">Расписание</a></li>
                <li><a href="/cinemas" className="text-muted-foreground hover:text-primary">Кинотеатры</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/promotions" className="text-muted-foreground hover:text-primary">Акции</a></li>
                <li><a href="/rules" className="text-muted-foreground hover:text-primary">Правила</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>info@cinemahub.ru</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 CinemaHub. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;