// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { LocalsUserType } from '$lib/utils/types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			user: LocalsUserType | undefined
		}
	}
}

export {};
