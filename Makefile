.SILENT:
.POSIX:

VERSION = $(shell jq -r '.version' package.json)

.PHONY: all lint build serve clean

all: build

lint:
	npm run lint

build: lint
	npm run build && mkdir -p ../cdn/widgets/catalog/v$(VERSION) && cp dist/js/app*.js ../cdn/widgets/catalog/v$(VERSION)/uchi-widget.js && cp dist/css/app*.css ../cdn/widgets/catalog/v$(VERSION)/uchi-widget.css && ln -sfn v$(VERSION) ../cdn/widgets/catalog/v2

serve:
	npm run serve

clean:
	rm -rf ./dist
