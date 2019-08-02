# nunjucks-embed

A [Twig-like `embed`](https://twig.symfony.com/doc/2.x/tags/embed.html) custom tag for Nunjucks.

## Usage

```bash
yarn add nunjucks-embed
```

```js
let EmbedTag = require('nunjucks-embed');
env.addExtension('EmbedTag', new EmbedTag({ /* options */ }));
```

__my-template.njk__
```njk
{% embed 'note.njk' %}
	{% block content %}
	Hello world!
	{% endblock %}
{% endembed %}
```

__note.njk__
```njk
<div class='note'>
	{% block content %}
	<!-- content here -->
	{% endblock %}
</div>
```

Results in:

```html
<div class='note'>
	Hello world!
</div>
```

### Context

By default, the embedded template will have access to the current context. To explicitly pass or ingore it, use `with context` and `without context`:

```njk
{% embed with context 'note.njk' %}
	...
{% endembed %}
```

## Options

* `sync`: `boolean`, default `true` — whether to register it as a synchronous or asynchronous custom tag
