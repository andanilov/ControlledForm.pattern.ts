import React from 'react';
import './App.css';
import ControlledForm, {
  TextField,
  SelectField,
  Button,
  HandleSubmit,
} from './app/components/ControlledForm';

function App() {
  const handleSubmit1: HandleSubmit = async (data) => await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });

  const handleSubmit2: HandleSubmit = (data, setError) => {
    setError((prevErrors: Record<string, unknown>) => ({ ...prevErrors, login: 'error after submit' }));
  };

  return (
    <div className="body">
      <section className="form">
        <ControlledForm handleSubmit={handleSubmit1}>
          <TextField
            name="login"
            label="Логин"
            placeholder="Мой логин!"
            value="значение по умолчанию"
            rules={{
              isRequired: { msg: 'Нужен логин!' },
              min: { len: 5, msg: 'Слишком короткий логин!' },
            }}
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            rules={{ isRequired: { msg: 'Нужен пароль!' } }}
          />
          <TextField
            name="password2"
            label="Повтор пароля"
            type="password"
            rules={{ isSimilar: { original: 'password', msg: 'Пароли не совпадают!' } }}
          />
          <span>Тестовый SPAN</span>
          <Button type="submit">Отправить!</Button>
          <Button>Обычная кнопка</Button>

        </ControlledForm>
      </section>

      <section className="form">
        <ControlledForm handleSubmit={handleSubmit2}>
          <div>Вторая форма</div>
          <TextField
            name="login"
            label="Логин"
            placeholder="Мой логин!"
            rules={{ isRequired: { msg: 'Нужен логин!' } }}
          />
          <SelectField
            name="list"
            label="Список"
            placeholder="--- выбор ---"
            value="val3"
            options={[
              { title: 'Опция 1', value: 'val1' },
              { title: 'Опция 2', value: 'val2' },
              { title: 'Опция 3', value: 'val3' },
              { title: 'Опция 4', value: 'val4' },
            ]}
            rules={{ isRequired: { msg: 'Нужно выбрать!' } }}
          />
          <Button type="submit">Отправить</Button>
        </ControlledForm>
      </section>

    </div>
  );
}

export default App;
