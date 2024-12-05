<script>
  import {onMount} from 'svelte'
  import { WebContainer } from '@webcontainer/api'

  onMount(async () => {
    const webcontainerInstance = await WebContainer.boot()
  })
</script>
