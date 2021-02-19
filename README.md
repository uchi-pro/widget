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
<div id="uchi-widget">Загрузка...</div>

<script type="text/javascript">
  (function (d, w) {
    w.uchiWidget = {
      baseUrl: "https://foo.uchi.red",
      token: "410a2ed5-ac7c-4fca-9856-d375fb60120a",
      cdnBaseUrl: "https://cdn.uchi.pro/widget/v1"
    };

    var s = d.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.onerror = function() {
      d.getElementById("uchi-widget").textContent = "Ошибка при получении курсов. Попробуйте зайти позже.";
    };
    s.src = w.uchiWidget.cdnBaseUrl + "/uchi-widget.js";

    var n = d.getElementsByTagName("script")[0];
    n.parentNode.insertBefore(s, n);
  }(document, window));
</script>
```
