test: node_modules
	node_modules/.bin/mocha

docs: undersc_rext.js node_modules README.md
	node_modules/.bin/docco $<

README.md: undersc_rext.js
	grep '^[[:space:]]*\/\/' < $< | sed -E 's/^[[:space:]]*\/\/ ?//' > $@

node_modules:
	npm install

repo:
	cp bin/*commit .git/hooks/

.PHONY: test
