import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { allowedHosts } from './config/environment.js';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts
	}
});
