import React, { useState, useEffect } from 'react';
import { CurrencyChart } from './Echarts/ReactECharts';
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";

function App() {
  // Состояние для хранения выбранной валюты
  const [currency, setCurrency] = useState('$');
  // Состояние для хранения данных из Api
  const [data, setData] = useState([]);

  useEffect(() => {
    // Функция для загрузки данных из API
    const fetchData = async () => {
      try {
        //Запрос api
        const response = await fetch('https://65d8f223c96fbb24c1bc890f.mockapi.io/gaz/data');
        //Преобразование в json
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Вызов функции загрузки данных
    fetchData();
  }, []);

  // Функция для получения символа валюты на основе выбранного значения
  const getCurrencySymbol = (value : string) => {
    switch (value) {
      case '$':
        return 'Курс доллара';
      case '€':
        return 'Курс евро';
      case '¥':
        return 'Курс юаня';
      default:
        return 'Курс доллара'; // Значение по умолчанию
    }
  };

  //Возвращает компонент с выбором валют и графиком
  return (
    <Theme preset={presetGpnDefault}>
      <div style={{ display: 'flex', backgroundColor: 'white', padding: '20px' }}>
        <CurrencyChart currency={getCurrencySymbol(currency)} data={data} />
        <div style={{ marginLeft: 'auto', marginRight: '0px' }}>
          <ChoiceGroup
            name="CurrencyChoice"
            value={currency}
            onChange={({ value }) => setCurrency(value)}
            items={['$', '€', '¥']}
            getItemLabel={(item) => item}
          />
        </div>
      </div>
    </Theme>
  );
}

export default App;