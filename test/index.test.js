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
env.addFilter('dummy', function(str){
	console.log(str, this.ctx);
});

const expected = template => readFileSync(join('test/fixtures/expected', template), 'utf8');
const m = html => minify(html, { collapseWhitespace: true });

tape('embed', t => {
	t.equal(
		m(env.render('basic.html')), 
		m(expected('basic.html')), 
		'basic.html'
	);
	sync('embed-*.html', { cwd: 'test/fixtures/source' }).forEach(src => {
		t.equal(m(env.render(src)), m(expected(src)), src);
	});
	t.end();
});

tape('posts', t => {
	let posts = [{
		title: 'Post 1',
		excerpt: 'Excerpt 1'
	}, {
		title: 'Post 2',
		excerpt: 'Excerpt 2'
	}, {
		title: 'Post 3',
		excerpt: 'Excerpt 3'
	}];
	t.equal(m(env.render('posts.html', { posts })), m(expected('posts.html')), 'posts.html');
	t.end();
})