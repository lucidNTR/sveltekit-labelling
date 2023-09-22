<script>
  import { beforeNavigate, afterNavigate } from '$app/navigation'
  import StatusIcon from '$lib/components/status-icon.svelte'
  import ui from '$lib/ui-store.js'
  export let data
  const { ayu } = data

  $: max = $ui.pageLength

  let navigating = ''
  beforeNavigate(({to}) => {
    if (to?.params?.id) {
      navigating = to.params.id
    } else {
      navigating = ''
    }
  })

  afterNavigate(({from}) => {
    if (from?.params?.id) {
      navigating = from?.params?.id
    } else {
      navigating = ''
    }
  })
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
		{#each $ayu.rows.slice(0, max) as doc (doc.$key)}
      <div
        class="{doc._id$not ? 'hidden': ''} group relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"

        style="{navigating === doc._id$ ? 'view-transition-name: article;' : ''}; transition: max-height 200ms ease-in; {doc._id$loading ? 'max-height: 292px': 'max-height: 500px'}"
      >
        <div>
          <StatusIcon loading={doc._id$loading} approved={doc.approved$} />
        </div>
        <div class="mt-6">
          {#if doc._id$loading}
            <div role="status" class="max-w-sm animate-pulse">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-45 mb-4"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[360px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[330px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[300px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[300px] mb-2.5"></div>
              <span class="sr-only">Loading...</span>
            </div>
          {:else}
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              <a href="/documents/{doc._id$}" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                {doc._id$}: {doc.title$}
              </a>
            </h3>

            <p class="clamp mt-2 text-sm text-gray-500">{doc.body$}</p>
          {/if}
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

  <div class="m-4">
    {#if !$ayu.rows.length$loading}
      {Math.min(max, $ayu.rows.length)} of {$ayu.rows.length}

      {#if $ayu.rows.length > max}
        <button on:click={() => { $ui.pageLength = max + 8}} class="bg-transparent hover:bg-gray-400 text-gray-500 font-semibold hover:text-white ml-3 py-1 px-3 border border-gray-500 hover:border-transparent rounded">Show more</button>
      {/if}
    {/if}
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
