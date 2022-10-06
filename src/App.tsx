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
            value="999"
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
    </div>
  );
}

export default App;
