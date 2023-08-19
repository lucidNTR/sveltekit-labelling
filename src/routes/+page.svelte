<script>
  import StatusIcon from '$lib/components/status-icon.svelte'
  import { getContext } from 'svelte'
  const { data } = getContext('ayu')
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
		{#each $data.rows as doc (doc.$key)}
      <div
				class="group relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
			>
				<div>
					<StatusIcon approved={doc.approved$}/>
				</div>
				<div class="mt-6">
					<h3 class="text-base font-semibold leading-6 text-gray-900">
						<a href="/documents/{doc.id$}" class="focus:outline-none">
							<span class="absolute inset-0" aria-hidden="true" />
							{doc.title$}
						</a>
					</h3>
					<p class="clamp mt-2 text-sm text-gray-500">{doc.body$}</p>
				</div>
				<a
					href={doc.url$}
					target="_blanc"
					class="absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
					aria-hidden="true"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
						/>
					</svg>
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.clamp {
		-webkit-line-clamp: 5;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}
</style>
