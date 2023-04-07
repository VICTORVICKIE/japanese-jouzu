<script lang="ts">
    import type { State } from '$lib/utils'

    export let show_about = false
    export let state: State

    let checked = true
    $: state.stroke_order = checked ? 'visible' : 'hidden'
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="dropdown dropdown-left dropdown-end absolute bottom-8 right-8">
    <button tabindex="0" class="w-6 h-6"
        ><iconify-icon width="24" height="24" icon="ic:twotone-settings" /></button
    >
    <ul tabindex="0" class="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-32">
        <li>
            <label for="stroke-order" class="label px-1 gap-0 cursor-pointer">
                <label for="stroke-order" class="text-xs">Stroke Order</label>
                <input
                    id="stroke-order"
                    type="checkbox"
                    class="toggle toggle-xs toggle-primary"
                    bind:checked
                />
            </label>
        </li>
        <li>
            <button class="label px-1 gap-0 cursor-pointer" on:click={() => (show_about = true)}>
                <span class="text-xs">About Us</span>
                <iconify-icon width="18" height="18" icon="ic:twotone-info" />
            </button>
        </li>
    </ul>
</div>
