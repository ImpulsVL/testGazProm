                                                                                
Мой репозиторий - https://github.com/ImpulsVL/testGazProm.git

МОЙ ТЕКСТ О РАБОТЕ

Свою работу я начал с реализации графика, то есть я сначала подключил библиотеку echarts.js и далее манипулировал с графиком, чтобы настроить его как в видео. После прописал интерфесы и подключил данные из файла data.ts, были проблемы с корректным отображением того, что мне нужно, но я быстро исправл это. Далее взялся за среднее число периода каждой из валют, прописал строчку кода, где вычисляется среднее значение и далее добавил свои обычные кнопки чтобы проверить, как это работает. После среднего значения я начал подключать Consta UI Kit, и переделывал в файле app, код таким образом чтобы все работало с ChoiceGroup. Далее сделал динамическую надпись с курсом определенной валюты. Подчистил код, и захотел подключить Api с помощью указанного вами сервиса mockapi.io. Я сохранил данные и сохранив ссылку на api, прописал код для работы api в app и теперь данные динамически подгружаются.
Так же хотел бы сказать о своих стилях, я не стал создавать отедльный файл style.css, так как посчитал, что стилей не так много и попросту прописал их в stylе'ах div, h1 и других.
Я не пользовался предоставленной ссылкой на Figma, так как в видео присутствовал немного другой график и я придерживался именно графику с видео, единственное, чем помог макет это подобрать стили для текста.

ОПИСАНИЕ

Привет, тебя приветствует команда разрабоки аналитических бизнес-приложений Практики бизнес и продвинутой аналитики [**Газпромнефть-ЦР**](https://ds.gazprom-neft.ru/)!

В рамках данного тестового задания тебе необходимо будет реализовать небольшое React-приложение с использованием библиотеки [**echarts.js**](https://echarts.apache.org/en/index.html) и библиотеки компонентов [**Consta UI Kit**](https://consta.design/libs/uikit)

- Макет дешборда ты можешь увидеть здесь: [**Figma**](https://www.figma.com/file/CppcOcor3NP1BfrppRgd4a/Test?node-id=0%3A1&mode=dev). Не ждем от тебя pixel perfect, но от макета сильно отступать не стоит.

- Пример того, как должна выглядеть готовая реализация вот здесь: [**Видео**](./assets/video.mp4)

- В папке проекта создан шаблон React-приложения, который можно использовать для работы

- В файле [**package.json**](./package.json) указаны минимально-необходимые для работы библиотеки

- В файле [**ReactECharts.ts**](./src/Echarts/ReactECharts.tsx) реализован компонент ReactECharts, который можно использовать для отрисовки элементов из библиотеки [**echarts.js**](https://echarts.apache.org/en/index.html)

Пример использования:

```
<ReactECharts option={option}/>
```

- В файле [**data.ts**](./src/data/data.ts) представлен массив данных, который необходимо использовать для отрисовки визуализации в рамках разработки

- Будет преимуществом реализации запроса к данным по api. В качестве эндпоинта можно использовать сервис [**mockAPI**](https://mockapi.io/) или любой другой аналогичный сервис, куда необходимо будет внести данные, представленные в файле [**data.ts**](./src/data/data.ts)

- Дополнительно большим преимуществом будет отформатированный, структурированный и типизированный код с комментариями, а так же заполненный README, где кратко описано что и как ты делал (можно удалить содержимое этого файла и написать сюда)

В качестве итогого результата должно быть реализовано приложение, обрабатывающее предоставленные данные по курсам валют и отрисовывающее визуализацию, представленную в [**макете**](https://www.figma.com/file/CppcOcor3NP1BfrppRgd4a/Test?node-id=0%3A1&mode=dev0). В приложении должны присутствовать:

1. Тултипы, отображающиеся при наведении на график и показывающие значение в данной точке
2. Среднее значение за период
3. Переключение курсов валют
4. Компоненты из библиотеки Consta UI Kit

Написанный код нужно залить на Github и в обратном письме выслать ссылку на репозиторий (обязательное проверьте, чтобы репозиторий был открытым).

Желаем удачи и с нетерпением ждем тебя в нашей команде!

<p align="left">
 <img width="250" src="./assets/coter.jpg" alt="jpg"/>
</p>