import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import cssString from "rollup-plugin-import-css";
import { string } from "rollup-plugin-string";
import { getVariantsFoldersNames, getCampaignName } from './rollup.script';
const production = !process.env.ROLLUP_WATCH;
const campaignName = `lc-${getCampaignName(__dirname)}`;
console.log(campaignName)
let liveReloadServer;
let devServer;

let liveReloadServe = (folder) => {
	if(liveReloadServer){
		return liveReloadServer;
	}

	liveReloadServer = !production && livereload(folder);
	return null;
};

function serve() {
	function toExit() {
		if (devServer) devServer.kill(0);
	}

	return {
		writeBundle() {
			if (devServer) return;
			devServer = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});
			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

function getVariantConfig(variantName){
	return [{
		input: `src/variants/${variantName}/main.js`,
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: `public/${variantName}/build/bundle.js`
		},
		plugins: [
			replace({
				include: ['src/**/*.(sa|sc|c)ss', 'src/**/*.svelte', 'src/**/*.js'],
				_CNAME_: campaignName,
				_VARIANT_: variantName,
				preventAssignment: true
			}),
			svelte({
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				}
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			liveReloadServe("public"),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	}, {
		input: `src/variants/${variantName}/webcomponent.js`,
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: `public/${variantName}/webcomponent.js`
		},
		plugins: [
			replace({
				include: ['src/**/*.(sa|sc|c)ss', 'src/**/*.svelte', 'src/**/*.js'],
				_CNAME_: campaignName,
				_VARIANT_: variantName,
				preventAssignment: true
			}),
			resolve({browser: true}),
			cssString(),
			string({
				include: "**/bundle.js",
			}),
			production && terser()
		]
	}]
}

function getVariantsConfigs(campaignVariants) {
	let configs = [];
	for(let i=0;i<campaignVariants.length;i++){
		configs = configs.concat(getVariantConfig(campaignVariants[i]))
	}
	return configs
}

let variantConfigs = () => getVariantsFoldersNames().then((variants) => getVariantsConfigs(variants));

export default variantConfigs;