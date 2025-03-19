// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// This must be set in consuming project:
	// future: {
	// 	compatibilityVersion: 4
	// },

	modules: [
		'@nuxt/eslint',
	],

	devtools: {
		// Devtools are always nice to have
		enabled: true,

		// https://nuxt.com/blog/nuxt-devtools-v1-0#timeline
		timeline: {
			enabled: true,
		},
	},

	vue: {
		// Enables `const { prop1, prop2 } = defineProps<...>()`
		propsDestructure: true,
	},

	experimental: {
		// Enables autocomplete for pages in links and typed params within a page by using `const route = useRoute('route-name')`
		typedPages: true,
	},

	typescript: {
		// Enables strict mode in the `tsconfig.json` that nuxt generates
		strict: true,
	},

	hooks: {
		// Makes sure @ and @@ are default when autocompleting imports
		'prepare:types'({ tsConfig }: { tsConfig: TSConfig }) {
			const aliasesToRemoveFromAutocomplete: (keyof typeof tsConfig.compilerOptions.paths)[] = [
				'~~',
				'~~/*',
				'~',
				'~/*',
			]

			for (const alias of aliasesToRemoveFromAutocomplete) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- it's alright, snippet comes from Nuxt developer
				delete tsConfig.compilerOptions.paths[alias]
			}
		},
	},

	// Configures @nuxt/eslint module
	eslint: {
		checker: false,
		config: {
			stylistic: true,
			formatters: {
				css: true,
				html: true,
				xml: false,
				svg: true,
				markdown: true,
				prettierOptions: {
					semi: false,
					singleQuote: true,
					trailingComma: 'es5',
					tabWidth: 2,
					printWidth: 120,
					useTabs: true,
					quoteProps: 'as-needed',
					jsxSingleQuote: true,
					bracketSpacing: true,
					bracketSameLine: false,
					arrowParens: 'avoid',
				},
			},
		},
	},
})

interface TSConfig {
	compilerOptions: {
		paths: Record<string, string[]>
	}
}

// Snippet for fixing module config types
// declare module 'nuxt/schema' {}
