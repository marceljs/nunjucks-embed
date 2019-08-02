class Embed {
	constructor(options) {
		this.tags = ['embed'];
	}

	parse(parser, nodes, lexer) {
		var start = parser.tokens.index;
	    var tok = parser.nextToken();
	    let with_ctx = parser.parseWithContext();
	    var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);
	    parser.tokens.backN(2);
	    parser.peeked = tok;
	    parser.tokens.in_code = true;
	    var content = parser.parseRaw('embed');

	    // TODO find way to pass this flag
	    this.with_ctx = with_ctx;

	    return new nodes.CallExtension(this, 'run', args, [content]);
	}

	run(context, template, content, callback) {
	    return context.env.renderString(
	    	`{% extends "${template}" %}${content()}`,
	    	this.with_ctx ? context.ctx : {}
	    );
	}
}

module.exports = Embed;