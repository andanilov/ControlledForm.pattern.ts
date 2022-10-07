import React from 'react';
import './App.css';
import TextField from './app/components/ControlledForm/fields/Text';
import ControlledForm from './app/components/ControlledForm';
import Button from './app/components/ControlledForm/Button';
import { HandleSubmit } from './app/components/ControlledForm/types';

function App() {
  const handleSubmit : HandleSubmit = (data) => console.log('!!!', data);

  return (
    <div className="body">
      <section className="form">
        <ControlledForm handleSubmit={handleSubmit}>
          <TextField
            name="login"
            label="Логин"
            placeholder="Мой логин!"
            value="значение по умолчанию"
            rules={{ isRequired: 'Нужен логин!' }}
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            rules={{ isRequired: 'Нужен пароль!' }}
          />
          <span>Тестовый SPAN</span>
          <Button type="submit">Отправить!</Button>
          <Button>Обычная кнопка</Button>

        </ControlledForm>
      </section>

      <section className="form">
        <ControlledForm handleSubmit={handleSubmit}>
          <div>Вторая форма</div>
          <TextField
            name="login"
            label="Логин"
            placeholder="Мой логин!"
            value=""
            rules={{ isRequired: 'Нужен логин!' }}
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            rules={{ isRequired: 'Нужен пароль!' }}
          />
          <Button type="submit">Отправить</Button>
        </ControlledForm>
      </section>

    </div>
  );
}

export default App;
