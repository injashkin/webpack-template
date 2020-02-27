---
title: Подготовка Gatsby сайта к публикации
date: "2020-01-20T22:40:32.169Z"
description:
---

Вы изучили следующее:

- создание новых сайтов Gatsby
- создание страниц и компонентов
- компоненты стиля
- добавление плагинов на сайт
- данные source и transform
- использование GraphQL для запроса данных
- программное создание страниц из ваших данных

В этом заключительном разделе вы пройдете через некоторые общие шаги по подготовке сайта к работе, изучите мощный инструмент диагностики сайта под названием [Lighthouse](https://developers.google.com/web/tools/lighthouse/). Попутно мы представим еще несколько плагинов, которые вы часто будете использовать на своих сайтах Gatsby.

## Выполнение теста с помощью Lighthouse

Цитата с [сайта Lighthouse](https://developers.google.com/web/tools/lighthouse/):

> Lighthouse - это автоматизированный инструмент с открытым исходным кодом для улучшения качества веб-страниц. Вы можете запустить его на любой веб-странице, общедоступной или требующей аутентификации. Lighthouse может проверять производительность, доступность, PWA, и многое другое.

Lighthouse включен в инструменты разработчика Chrome. Проведение аудита, а затем устранение обнаруженных ошибок и внедрение предложенных улучшений -- отличный способ подготовить ваш сайт к работе. Это даст вам уверенность, что ваш сайт будет максимально быстрым и доступным.

Во-первых, вам нужно создать продакшен сборку вашего Gatsby сайта. Сервер разработки Gatsby оптимизирован для ускорения разработки, но сайт, который он создает, хотя и очень похож на рабочую версию сайта, не совсем оптимизирован.

### Создание продакшен сборки

1. Остановите сервер разработки (если он все еще работает) и выполните следующую команду:

```shell
gatsby build
```

Эта команда делает продакшен сборку вашего сайта и выводит статические файлы в каталог `public`.

2. Чтобы просмотреть продакшен сайт локально, выполните:

```shell
gatsby serve
```

После ввода этой команды, вы можете просмотреть свой сайт по адресу http://localhost:9000.

### Выполнение теста с помощью Lighthouse

Теперь вы можете выполнить тест с помощью Lighthouse.

1. Откройте сайт с помощью браузера Chrome в режиме Инкогнито, чтобы никакие расширения не мешали тесту. Затем, откройте в Хроме инструменты разработчика (DevTools).

2. Нажмите на вкладку "Audits", где вы увидите экран, который выглядит следующим образом:

![Запуск теста на Lighthouse](lighthouse-audit.png)

3. Нажмите кнопку "Generate report" (по умолчанию должны быть выбраны все доступные типы теста). Затем потребуется минута или около того, чтобы выполнить тест. После завершения теста вы должны увидеть результаты, которые выглядят следующим образом:

![Результаты теста Lighthouse](lighthouse-audit-results.png)

Как видите, производительность Gatsby из коробки превосходная, но вам не хватает некоторых вещей для PWA, Accessibility, Best Practices и SEO, которые улучшат ваши результаты (и в дальнейшем сделают ваш сайт намного более дружелюбным для посетителей и поисковых систем).

## Добавление файла манифеста

Похоже, у вас довольно скромная оценка в категории “Progressive Web App”. Давайте разберемся с этим.

Но для начала, что такое PWA?

Это обычные веб-сайты, которые используют функциональность современных браузеров, чтобы улучшить работу веб с помощью особенностей и эффектов, которые присущи обычным приложениям. Ознакомьтесь с [обзором в Google](https://developers.google.com/web/progressive-web-apps/) о том, что определяет работу PWA.

Включение манифеста веб-приложения является одним из трех общепринятых [базовых требований для PWA](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa#section1).

Цитата от [Google](https://developers.google.com/web/fundamentals/web-app-manifest/):

> Манифест веб-приложения - это простой JSON-файл, который сообщает браузеру о вашем веб-приложении и о том, как оно должно вести себя при "установке" на пользовательском мобильном устройстве или компьютере.

[Плагин манифеста Gatsby](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/) настраивает Gatsby для создания файла `manifest.webmanifest` для каждой сборки сайта.

### Использование gatsby-plugin-manifest

1. Установите плагин:

```shell
npm install --save gatsby-plugin-manifest
```

2. Добавьте фавиконку для вашего приложения в `src/images/icon.png`. Еси у вас нет своей иконки, то для данного урока вы можете воспользоваться [этой иконкой](https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/tutorial/part-eight/icon.png). Икона необходима для построения всех изображений для манифеста. Для получения дополнительной информации обратитесь к документации по [`gatsby-plugin-manifest`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-manifest/README.md)

3. Добавьте плагин в массив `plugins` файла `gatsby-config.js`.

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ]
}
```

Это все, что вам необходимо, чтобы начать работу с добавлением веб-манифеста на Gatsby сайт. Приведенный пример отражает лишь базовую конфигурацию.  Про дополнительные возможности читайте [справку о плагине](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode).

## Добавление офлайн поддержки

Еще одно требование к веб-сайту, чтобы квалифицироваться как PWA, - это использование [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). Service Worker работает в фоновом режиме и, в зависимости от подключения к сети, решает, обслуживать сетевое или кэшированное содержимое, что обеспечивает бесперебойную управляемую автономную работу.

[Gatsby плагин офлайн](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/) делает Gatsby сайт автономным и более устойчивым к плохим сетевым условиям, создавая Service Worker для вашего сайта.

### Использование gatsby-plugin-offline

1. Установите плагин:

```shell
npm install --save gatsby-plugin-offline
```

2. Добавьте плагин в массив `plugins` файла `gatsby-config.js`.

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // highlight-next-line
    `gatsby-plugin-offline`,
  ]
}
```

Это все, что вам нужно, для работы с Service Worker с помощью Gatsby.

Офлайн плагин должен быть указан после плагина манифеста, чтобы офлайн плагин мог кэшировать созданный `manifest.webmanifest`.

## Добавление метаданных страницы

Добавление метаданных на страницы (таких как заголовок или описание) является ключевым фактором, помогающим поисковым системам, таким как Google, понять ваш контент и решить, когда его следует отображать в результатах поиска.

[React Helmet](https://github.com/nfl/react-helmet) - это пакет, который содержит интерфейс React компонента, чтобы управлять [заголовком документа](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head).

Gatsby обеспечивает поддержку [плагина react helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/) для отображения данных сервера, добавленных с помощью React Helmet. С помощью плагина атрибуты, которые вы добавляете в React Helmet, будут добавлены к статическим HTML-страницам, которые создает Gatsby.

###  Использование `React Helmet` и `gatsby-plugin-react-helmet`

1. Установите оба пакета:

```shell
npm install --save gatsby-plugin-react-helmet react-helmet
```

2. Добавьте плагин в массив 'plugins` файла `gatsby-config.js`

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    // highlight-next-line
    `gatsby-plugin-react-helmet`,
  ]
}
```

3. Используйте `React Helmet` на стрранице:

```jsx
import React from "react"
import { Helmet } from "react-helmet"

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        {/* highlight-start */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        ...
        {/* highlight-end */}
      </div>
    )
  }
}
```

Приведенный выше пример взят из [React Helmet docs](https://github.com/nfl/react-helmet#example).

## Дальнейшие действия

### Официальная документация

- [Официальная документация](https://www.gatsbyjs.org/docs/): просмотрите нашу официальную документацию по _[Быстрый старт](https://www.gatsbyjs.org/docs/quick-start/)_, _[Подробные руководства](https://www.gatsbyjs.org/docs/preparing-your-environment/)_, _[ссылки на API](https://www.gatsbyjs.org/docs/gatsby-link/)_, и многое другое.

### Официальные Плагины

- [Официальные Плагины](https://github.com/gatsbyjs/gatsby/tree/master/packages): Полный список всех официальных плагинов, поддерживаемых Gatsby.

### Официальные Стартеры

1.  [Gatsby Стартер по умолчанию](https://github.com/gatsbyjs/gatsby-starter-default): Начните свой проект с этого стандартного шаблона. Этот скелетный стартер поставляется с основными конфигурационными файлами Gatsby, которые вам могут понадобиться. _[рабочий пример](https://gatsbyjs.github.io/gatsby-starter-default/)_
2.  [Gatsby Стартер блога](https://github.com/gatsbyjs/gatsby-starter-blog): Gatsby стартер для создания классного и быстрого блога. _[рабочий пример](https://gatsbyjs.github.io/gatsby-starter-blog/)_
3.  [Gatsby Стартер "Hello-World"](https://github.com/gatsbyjs/gatsby-starter-hello-world): Gatsby стартер с голыми предметами первой необходимости, необходимыми для сайта Gatsby. _[рабочий пример](https://gatsby-starter-hello-world-demo.netlify.com/)_

[Дополнительные руководства] (/tutorial/ additional-tutorials/)

- Ты построил что-нибудь классное? Поделитесь им в Twitter, тег [#buildwithgatsby](https://twitter.com/search?q=%23buildwithgatsby), и [@упомянуть нас](https://twitter.com/gatsbyjs)!

- Внести свой вклад! Прогуляйтесь по [открытым вопросам](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) на репо Гэтсби и [стать вкладчиком] (/contributing/how-to-contribute/).

Проверьте ["как внести свой вклад"] (/contributing/how-to-contribute/) документы для еще большего количества идей.

Для написания данной статьи использованы следующие материалы:

- https://www.gatsbyjs.org/tutorial/part-eight/