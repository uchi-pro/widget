# Виджет с курсами для клиентких сайтов.

## Установка
```
npm install
```

### Сборка для продакшена
```
npm run build
```

### Код виджета

```
<div id="uchi-widget">Загрузка...</div>

<script type="text/javascript">
  (function (d, w) {
    w.uchiWidget = {
      baseUrl: "https://pvmezencev.uchi.red",
      token: "410a2ed5-ac7c-4fca-9856-d375fb60120a",
      cdnBaseUrl: "https://cdn.uchi.pro/widget/v1"
    };

    var n = d.getElementsByTagName("script")[0],
      s = d.createElement("script"),
      f = function () { n.parentNode.insertBefore(s, n); };
      s.type = "text/javascript";
      s.async = true;
      s.onerror = function() { d.getElementById("uchi-widget").innerHTML = "Ошибка при получении курсов. Попробуйте зайти позже." }
      s.src = w.uchiWidget.cdnBaseUrl + "/uchi-widget.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
  })(document, window);
</script>
```
