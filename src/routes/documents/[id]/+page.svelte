<script>
  import StatusIcon from '$lib/components/status-icon.svelte'
  import { tick } from 'svelte';
  import { goto } from '$app/navigation';
	import { page } from '$app/stores';
  import { browser } from '$app/environment';

  export let data;
  $: docId = $page.params.id;
  $: docIndex = data.rows.findIndex(doc => doc.id === docId);
  $: doc = data.rows[docIndex]

  const labelStyles = [
    'border-blue-400 bg-blue-100 text-blue-800',
    'text-red-800 border-red-400 bg-red-100',
    'border-green-400 bg-green-100 text-green-800',
    'text-indigo-800 border-indigo-400 bg-indigo-100',
    'text-purple-800 border-purple-400 bg-purple-100',
    'text-pink-800 border-pink-400 bg-pink-100',
    'bg-yellow-100 text-yellow-800 border-yellow-300'
  ]

  // auto advance toggle is hidden on ssr side where we set it to null
  let autoAdvance = browser ? (JSON.parse(localStorage?.getItem('autoAdvance')) || false) : null
  function toggleAutoAdvance () {
    autoAdvance = !autoAdvance
    localStorage?.setItem('autoAdvance', autoAdvance)
  }

  async function handleUpdate (response) {
    if (response.ok) {
      const newDoc = await response.json()
      doc = newDoc
      data.rows[docIndex] = doc
    } else {
      alert('unknown error occurred, please reload the app')
    }
  }

  /** @type null | string */
  let loading = null
  async function execute (action) {
    loading = action
    const response = await fetch(`/documents/${docId}`, {
      method: 'POST',
      body: JSON.stringify({ action }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await handleUpdate(response);
    loading = null

    if ((action === 'approve' || action === 'reject') && autoAdvance) {
      // We first handle all open documents, if those are handled we go through the rejected ones
      let next = data.rows.find(doc => (!doc.approved && doc.approved !== false));
      if (!next) {
        next = data.rows.find(doc => doc.approved === false);
      }

      if (next) {
        goto('/documents/' + next.id);
      } else {
        goto('/');
      }
    }
  }

  async function remove (toRemove, i) {
    if (toRemove === '') {
      doc.labels = doc.labels.filter(label => label !== '');
      return
    }
    const response = await fetch(`/documents/${docId}`, {
      method: 'POST',
      body: JSON.stringify({ action: 'removeLabel', label: toRemove, index: i }),
      headers: { 'Content-Type': 'application/json' }
    });

    handleUpdate (response);
  }

  async function updateLabel (e, i) {
    if (e.key === 'Enter') {
      e.preventDefault()
    } else if (e.type === 'keydown') {
      return
    }

    if (!e.target.innerText) {
      return
    }

    const response = await fetch(`/documents/${docId}`, {
      method: 'POST',
      body: JSON.stringify({ action: 'updateLabel', label: e.target.innerText, index: i }),
      headers: { 'Content-Type': 'application/json' }
    });

    handleUpdate (response)
  }

  async function addLabel () {
    doc.labels = (doc.labels || []).filter(label => (label !== ''))
    doc.labels.push('');
    await tick();
    window[`label-${doc.labels.length - 1}`].focus();
  }
</script>

<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
  <div class="inline-flex rounded-md mb-4" role="group">
    <button disabled={loading || doc.approved || !doc.labels?.length} on:click={() => execute('approve')} type="button" class="inline-flex disabled:bg-gray-200 stroke-green-600 fill-green-400 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-50 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:indigo-600 ">
      {#if loading === 'approve'}
        <svg class="animate-spin w-4 h-4 mr-2 text-purple-500 stroke-purple-500 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" class="w-4 h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      {/if}
      Approve Labels
    </button>

    <button disabled={loading || doc.approved === false || !doc.labels?.length} on:click={() => execute('reject')} type="button" class="inline-flex stroke-red-400 items-center px-4 py-2 text-sm font-medium disabled:bg-gray-200 text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-50 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:indigo-600 ">
      {#if loading === 'reject'}
        <svg class="animate-spin w-4 h-4 mr-2 text-purple-500 stroke-purple-500 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" class="w-4 h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      {/if}

      Reject Labels
    </button>

    <button disabled={loading} on:click={() => execute('suggest')} type="button" class="inline-flex items-center stroke-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 disabled:bg-gray-200 bg-white border border-gray-200 rounded-r-md hover:bg-gray-50 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:indigo-600 ">
      {#if loading === 'suggest'}
        <svg class="animate-spin w-4 h-4 mr-2 text-purple-500 stroke-purple-500 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="w-4 h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      {/if}

      Suggest Labels
    </button>

    {#if autoAdvance !== null}
      <div class="flex items-center ml-4">
        <button on:click={toggleAutoAdvance} type="button" class="{autoAdvance ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false" aria-labelledby="annual-billing-label">
          <span aria-hidden="true" class=" {autoAdvance ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
        </button>
        <span class="ml-3 text-sm" id="annual-billing-label">
          <span class="font-medium text-gray-900">Auto advance</span>
        </span>
      </div>
    {/if}
  </div>

	<div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow border border-gray-300">
		<div class="px-5 py-5">
			<StatusIcon approved={doc.approved}/>

      <h2 class="inline-block font-semibold ml-2">{doc.title}</h2>

			<a
				href={doc.url}
				target="_blanc"
				class="float-right m-1 inline-block text-gray-300 group-hover:text-gray-400"
				aria-hidden="true"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
					/>
				</svg>
			</a>
		</div>

		<div class="px-5 py-2">
      {#each doc?.labels || [] as label, i (label)}
        <span class="inline-flex items-center my-2 mr-2 text-sm font-medium rounded {labelStyles[i % labelStyles.length]}">
          <span id="label-{i}" role="textbox" tabindex={i} on:keydown={(e) => updateLabel(e, i)} on:blur={(e) => updateLabel(e, i)} contenteditable="plaintext-only" class="mr-1 px-2 py-1 min-w-[30px]">
            {label}
          </span>

          <button on:click={() => remove(label, i)} type="button" class="inline-flex items-center p-1 mr-1.5 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-100 hover:text-gray-900 " data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Remove Label</span>
          </button>
        </span>
      {/each}

      <button on:click={addLabel} class="my-2 inline-flex items-center text-sm font-medium rounded bg-gray-100 text-gray-600 {doc?.labels?.length ? 'ml-10' : ''}">
        <span class="px-2 py-1 min-w-[30px]">
          + Add
        </span>
      </button>
		</div>

		<div class="px-5 py-5">
			{doc.body}
		</div>
	</div>
</div>
