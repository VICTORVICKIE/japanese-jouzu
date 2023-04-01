<script lang="ts">
    import type { State } from '$lib/utils'

    export let idx: number
    export let play_moji_pronunciation: () => void
    export let state: State

    const tooltip_hover_none = 'hover:before:opacity-0 hover:after:opacity-0'

    const total_moji = 152
    const icon_opts = {
        class: 'text-base-content',
        width: '24',
        height: '24'
    }
    async function change_moji(i: number) {
        idx = ((idx - 1 + i + total_moji) % total_moji) + 1
        state.auto_play = true
    }

    async function replay_moji_animation() {
        state.replay = true
        setTimeout(() => (state.replay = false))
    }
</script>

<button class="w-6 h-6" on:click={() => change_moji(-1)}>
    <iconify-icon icon="ic:twotone-keyboard-double-arrow-left" {...icon_opts} />
</button>
<button class="w-6 h-6" on:click={replay_moji_animation}>
    <iconify-icon icon="ic:twotone-replay" {...icon_opts} />
</button>
<div class="tooltip {!state.rare_moji ? tooltip_hover_none : ''}" data-tip="Rarely Used">
    <button class="w-6 h-6" on:click={play_moji_pronunciation}>
        <iconify-icon
            class:text-error={state.rare_moji}
            icon="ic:twotone-volume-up"
            {...icon_opts}
        />
    </button>
</div>
<button class="w-6 h-6" on:click={() => change_moji(+1)}>
    <iconify-icon icon="ic:twotone-keyboard-double-arrow-right" {...icon_opts} />
</button>
