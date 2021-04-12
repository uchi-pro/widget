.SILENT:
.POSIX:

.PHONY: all lint build serve clean

all: build

lint:
	npm run lint

build: lint
	npm run build

serve:
	npm run serve

clean:
	rm -rf ./dist
