<script>
  export let data;
</script>

<style>
  .clamp {
    -webkit-line-clamp: 5;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
</style>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
    {#each data.rows as doc (doc.id)}
      <div class="rounded-lg border border-gray-300 group relative bg-white shadow-sm p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
        <div>
          <span class="inline-flex rounded-lg p-3 bg-sky-50 text-sky-700 ring-4 ring-white">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </span>
        </div>
        <div class="mt-6">
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            <a href="/documents/{doc.id}" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              {doc.title}
            </a>
          </h3>
          <p class="mt-2 text-sm text-gray-500 clamp">{doc.body}</p>
        </div>
        <a href="{doc.url}" target="_blanc" class="absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </a>
      </div>
    {/each}
  </div>
</div>
