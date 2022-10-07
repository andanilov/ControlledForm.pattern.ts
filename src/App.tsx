import React from 'react';
import './App.css';
import TextField from './app/components/ControlledForm/fields/Text';
import ControlledForm from './app/components/ControlledForm';
import Button from './app/components/ControlledForm/Button';
import { HandleSubmit } from './app/components/ControlledForm/types';
import SelectField from './app/components/ControlledForm/fields/Select';

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
            rules={{ isRequired: 'Нужен логин!' }}
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
            rules={{ isRequired: 'Нужно выбрать!' }}
          />
          <Button type="submit">Отправить</Button>
        </ControlledForm>
      </section>

    </div>
  );
}

export default App;
