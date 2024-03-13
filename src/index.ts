/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		/**
		 * Example someHost is set up to take in a JSON request
		 * Replace url with the host you wish to send requests to
		 * @param {string} someHost the host to send the request to
		 * @param {string} url the URL to send the request to
		 */
		const someHost = 'https://jsonplaceholder.typicode.com';
		const url = someHost + '/todos/2';

		/**
		 * gatherResponse awaits and returns a response body as a string.
		 * Use await gatherResponse(..) in an async function to get the response body
		 * @param {Response} response
		 */
		async function gatherResponse(response: Response) {
			const { headers } = response;
			const contentType = headers.get('content-type') || '';
			if (contentType.includes('application/json')) {
				return JSON.stringify(await response.json());
			}
			return response.text();
		}

		const init = {
			headers: {
				'content-type': 'application/json;charset=UTF-8',
			},
		};

		const response = await fetch(url, init);
		const results = await gatherResponse(response);
		return new Response(results, init);
	},

	async scheduled(event: Event, env: Env, ctx: ExecutionContext) {
		console.log('cron processed');
	},
};
