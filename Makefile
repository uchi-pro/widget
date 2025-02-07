.SILENT:
.POSIX:

VERSION = $(shell jq -r '.version' package.json)

.PHONY: all build serve clean

all: build

serve:
	npm run dev

build:
	npm run build && mkdir -p ../cdn/widgets/catalog/v$(VERSION) && cp dist/assets/index*.js ../cdn/widgets/catalog/v$(VERSION)/uchi-widget.js && cp dist/assets/index*.css ../cdn/widgets/catalog/v$(VERSION)/uchi-widget.css && ln -sfn v$(VERSION) ../cdn/widgets/catalog/v2

deploy: build
	mkdir -p ../cdn/widgets/catalog/v$(VERSION) && cp dist/assets/index*.js ../cdn/widgets/catalog/v$(VERSION)/uchi-widget.js && cp dist/assets/index*.css ../cdn/widgets/catalog/v$(VERSION)/uchi-widget.css && ln -sfn v$(VERSION) ../cdn/widgets/catalog/v2

clean:
	rm -rf ./dist
