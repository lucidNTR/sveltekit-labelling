<script>
	import '../app.css';
</script>

<header>
	<nav class="border-gray-200 bg-white px-4 py-3 shadow lg:px-6">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
			<a href="/" class="flex items-center">
				<svg
					class="mr-3 h-6 fill-sky-300 stroke-sky-700 sm:h-8"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
					/>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
				</svg>

				<span class="self-center whitespace-nowrap text-xl font-semibold">Labelling</span>
			</a>
		</div>
	</nav>
</header>

<slot />
