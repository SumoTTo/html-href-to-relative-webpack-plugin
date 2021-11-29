const { RawSource } = require( 'webpack-sources' );

class HtmlHrefToRelativePlugin {
	constructor() {
		this.pluginName = 'SumoTTo HTML Href To Relative Plugin';
	}

	apply( compiler ) {
		const stage = compiler.createCompilation().constructor.PROCESS_ASSETS_STAGE_OPTIMIZE;

		if ( stage ) {
			compiler.hooks.compilation.tap( this.pluginName, ( compilation ) => {
				const stageSettings = { name: this.pluginName, stage };
				compilation.hooks.processAssets.tapPromise( stageSettings, () => this.run( compilation ) );
			} );
		} else {
			compiler.hooks.emit.tapPromise( this.pluginName, ( compilation ) => this.run( compilation ) );
		}
	}

	run( compilation ) {
		const { assets } = compilation;

		return Promise.all( Object.keys( assets ).reduce( ( result, assetName ) => {
			if ( /\.html$/.test( assetName ) ) {
				const normalName = assetName.replace( /\\/g, '/' );
				let replacePath;

				if ( normalName.includes( '/' ) ) {
					replacePath = '../'.repeat( normalName.split( '/' ).length - 1 );
				} else {
					replacePath = './';
				}

				assets[ assetName ] = new RawSource(
					assets[ assetName ]
						.buffer()
						.toString()
						.replace( /(<a[^>]+href=['"]?)(\/)([^\/])/g, '$1' + replacePath + '$3' )
				);
			}

			return result;
		}, [] ) );
	}
}

module.exports = HtmlHrefToRelativePlugin;
