import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			'@components/*': 'src/components/*',
			'@icons/*': 'src/icons/*',
			'@types': 'src/types.ts',
			'@stores': 'src/stores.ts',
		},
	},
};

export default config;
