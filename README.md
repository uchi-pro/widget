# Витрина курсов для клиентских сайтов

## Установка

```sh
npm install
```

### Сборка

```sh
npm run build
```

### Внедрение в сайт

```html
<div id="uchi-widget">Загрузка…</div>
<script>
  (function (d, w) {
    w.uchiWidget = {
      baseUrl: "https://gl.upft.ru",
      cdnBaseUrl: "https://cdn.uchi.pro/widget/v2",
      searchEnabled: true, // Нужно ли показывать форму поиска курсов по их названию
    };

    d.addEventListener("DOMContentLoaded", function () {
      var s = d.body.appendChild(d.createElement("script"));
      s.async = true;
      s.addEventListener("error", function () {
        d.getElementById("uchi-widget").textContent = "Ошибка при получении курсов.";
      });
      s.src = w.uchiWidget.cdnBaseUrl + "/uchi-widget.js";
    });
  })(document, window);
</script>
```
