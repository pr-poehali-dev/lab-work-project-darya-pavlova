import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: 'Дарья',
    lastName: 'Павлова',
    middleName: 'Алексеевна',
    age: '',
    gender: '',
    birthDate: '',
    favoriteColor: '#0EA5E9',
    seasons: [] as string[],
    favoriteAnimal: '',
    password: '',
    aboutMe: ''
  });

  const handleSeasonToggle = (season: string) => {
    setFormData(prev => ({
      ...prev,
      seasons: prev.seasons.includes(season)
        ? prev.seasons.filter(s => s !== season)
        : [...prev.seasons, season]
    }));
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      age: '',
      gender: '',
      birthDate: '',
      favoriteColor: '#0EA5E9',
      seasons: [],
      favoriteAnimal: '',
      password: '',
      aboutMe: ''
    });
    toast({
      title: 'Форма очищена',
      description: 'Все поля успешно очищены',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.yandexcloud.net/d4e5g6h7i8j9k0l1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: 'pavlova_dasha2006@mail.ru'
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно отправлено!',
          description: 'Данные отправлены на email',
        });
        handleClear();
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось отправить данные. Попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-primary">Анкета</CardTitle>
            <CardDescription>Заполните информацию о себе</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Возраст</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Дата рождения</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Пол</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Мужской</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Женский</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favoriteColor">Любимый цвет</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="favoriteColor"
                    type="color"
                    value={formData.favoriteColor}
                    onChange={(e) => setFormData({ ...formData, favoriteColor: e.target.value })}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground">{formData.favoriteColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Любимое время года</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['Зима', 'Весна', 'Лето', 'Осень'].map((season) => (
                    <div key={season} className="flex items-center space-x-2">
                      <Checkbox
                        id={season}
                        checked={formData.seasons.includes(season)}
                        onCheckedChange={() => handleSeasonToggle(season)}
                      />
                      <Label htmlFor={season} className="cursor-pointer">{season}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favoriteAnimal">Любимое животное</Label>
                <Select value={formData.favoriteAnimal} onValueChange={(value) => setFormData({ ...formData, favoriteAnimal: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите животное" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">🐕 Собака</SelectItem>
                    <SelectItem value="cat">🐈 Кошка</SelectItem>
                    <SelectItem value="bird">🐦 Птица</SelectItem>
                    <SelectItem value="fish">🐠 Рыба</SelectItem>
                    <SelectItem value="rabbit">🐰 Кролик</SelectItem>
                    <SelectItem value="hamster">🐹 Хомяк</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutMe">Немного о себе</Label>
                <Textarea
                  id="aboutMe"
                  value={formData.aboutMe}
                  onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                  rows={4}
                  placeholder="Расскажите о себе..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  <Icon name="Send" size={18} className="mr-2" />
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
                <Button type="button" variant="outline" onClick={handleClear} disabled={isSubmitting}>
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Очистить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
