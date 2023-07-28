<script>
  import { page } from '$app/stores';

  const doc = $page.data.rows[$page.params.id];
</script>

<div class="bg-gray-100">
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="font-semibold">{doc.title}</h2>

        <a href="{doc.url}" target="_blanc" class="absolute right-8 top-8 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
          </svg>
        </a>
      </div>

      <div class="px-4 py-5 sm:p-6">
        {doc.body}
      </div>
    </div>
  </div>
</div>
