.SILENT:
.POSIX:

.PHONY: all lint build serve

all: build

lint:
	npm run lint

build: lint
	npm run build

serve:
	npm run serve
