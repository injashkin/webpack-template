---
title: Подготовка Gatsby сайта к публикации
---

Ты изучил следующее:

- создание новых сайтов Gatsby
- создание страниц и компонентов
- компоненты стиля
- добавление плагинов на сайт
- данные source и transform
- использование GraphQL для запроса данных
- программное создание страниц из ваших данных

В этом заключительном разделе вы пройдете через некоторые общие шаги по подготовке сайта к работе, представив мощный инструмент диагностики сайта под названием [Lighthouse](https://developers.google.com/web/tools/lighthouse/). Попутно мы представим еще несколько плагинов, которые вы часто будете использовать на своих сайтах Gatsby.

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

That's all you need to get started with adding a web manifest to a Gatsby site. The example given reflects a base configuration -- Check out the [plugin reference](/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode) for more options.

## Add offline support

Another requirement for a website to qualify as a PWA is the use of a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). A service worker runs in the background, deciding to serve network or cached content based on connectivity, allowing for a seamless, managed offline experience.

[Gatsby's offline plugin](/packages/gatsby-plugin-offline/) makes a Gatsby site work offline and more resistant to bad network conditions by creating a service worker for your site.

### ✋ Using `gatsby-plugin-offline`

1.  Install the plugin:

```shell
npm install --save gatsby-plugin-offline
```

2.  Add the plugin to the `plugins` array in your `gatsby-config.js` file.

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

That's all you need to get started with service workers with Gatsby.

> 💡 The offline plugin should be listed _after_ the manifest plugin so that the offline plugin can cache the created `manifest.webmanifest`.

## Add page metadata

Adding metadata to pages (such as a title or description) is key in helping search engines like Google understand your content and decide when to surface it in search results.

[React Helmet](https://github.com/nfl/react-helmet) is a package that provides a React component interface for you to manage your [document head](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head).

Gatsby's [react helmet plugin](/packages/gatsby-plugin-react-helmet/) provides drop-in support for server rendering data added with React Helmet. Using the plugin, attributes you add to React Helmet will be added to the static HTML pages that Gatsby builds.

### ✋ Using `React Helmet` and `gatsby-plugin-react-helmet`

1.  Install both packages:

```shell
npm install --save gatsby-plugin-react-helmet react-helmet
```

2.  Add the plugin to the `plugins` array in your `gatsby-config.js` file.

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

3.  Use `React Helmet` in your pages:

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

> 💡 The above example is from the [React Helmet docs](https://github.com/nfl/react-helmet#example). Check those out for more!

## Keep making it better

In this section, we've shown you a few Gatsby-specific tools to improve your site's performance and prepare to go live.

Lighthouse is a great tool for site improvements and learning -- Continue looking through the detailed feedback it provides and keep making your site better!

## Next Steps

### Official Documentation

- [Official Documentation](https://www.gatsbyjs.org/docs/): View our Official Documentation for _[Quick Start](https://www.gatsbyjs.org/docs/quick-start/)_, _[Detailed Guides](https://www.gatsbyjs.org/docs/preparing-your-environment/)_, _[API References](https://www.gatsbyjs.org/docs/gatsby-link/)_, and much more.

### Official Plugins

- [Official Plugins](https://github.com/gatsbyjs/gatsby/tree/master/packages): The complete list of all the Official Plugins maintained by Gatsby.

### Official Starters

1.  [Gatsby's Default Starter](https://github.com/gatsbyjs/gatsby-starter-default): Kick off your project with this default boilerplate. This barebones starter ships with the main Gatsby configuration files you might need. _[working example](https://gatsbyjs.github.io/gatsby-starter-default/)_
2.  [Gatsby's Blog Starter](https://github.com/gatsbyjs/gatsby-starter-blog): Gatsby starter for creating an awesome and blazing-fast blog. _[working example](https://gatsbyjs.github.io/gatsby-starter-blog/)_
3.  [Gatsby's Hello-World Starter](https://github.com/gatsbyjs/gatsby-starter-hello-world): Gatsby Starter with the bare essentials needed for a Gatsby site. _[working example](https://gatsby-starter-hello-world-demo.netlify.com/)_

## That's all, folks

Well, not quite; just for this tutorial. There are [Additional Tutorials](/tutorial/additional-tutorials/) to check out for more guided use cases.

This is just the beginning. Keep going!

- Did you build something cool? Share it on Twitter, tag [#buildwithgatsby](https://twitter.com/search?q=%23buildwithgatsby), and [@mention us](https://twitter.com/gatsbyjs)!
- Did you write a cool blog post about what you learned? Share that, too!
- Contribute! Take a stroll through [open issues](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) on the gatsby repo and [become a contributor](/contributing/how-to-contribute/).

Check out the ["how to contribute"](/contributing/how-to-contribute/) docs for even more ideas.

We can't wait to see what you do 😄.