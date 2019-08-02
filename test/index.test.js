let nunjucks = require('nunjucks');
let Embed = require('../index');
let tape = require('tape');
let { readFileSync } = require('fs');
let { join } = require('path');
let { minify } = require('html-minifier');
let { sync } = require('fast-glob');

let env = nunjucks.configure('test/fixtures/source', {
	autoescape: false
});

env.addExtension('EmbedTag', new Embed());

let sources = sync('*.html', { cwd: 'test/fixtures/source' });

const expected = template => readFileSync(join('test/fixtures/expected', template), 'utf8');

tape('embed', t => {
	sources.forEach(src => {
		t.equal(
			minify(env.render(src), {
				collapseWhitespace: true
			}),
			minify(expected(src), {
				collapseWhitespace: true
			}), src);
	});
	t.end();
});