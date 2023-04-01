<script lang="ts">
    import { KANA_BOUNDS, RARE_MOJI, type State } from '$lib/utils'
    import type { IconifyIconHTMLElement } from 'iconify-icon'

    export let idx: number
    export let state: State

    let audio_icon: IconifyIconHTMLElement
    let replay_icon: IconifyIconHTMLElement

    let moji_pronunciation: HTMLAudioElement

    const tooltip_hover_none = 'hover:before:opacity-0 hover:after:opacity-0'
    const total_moji = 152
    const icon_opts = {
        class: 'text-base-content',
        width: '24',
        height: '24'
    }
    async function change_moji(i: number, { currentTarget }: Event) {
        idx = ((idx - 1 + i + total_moji) % total_moji) + 1
        state.autoplay_audio = true
        let arrow = (currentTarget as HTMLButtonElement).firstElementChild as IconifyIconHTMLElement

        let factor = 0.5

        arrow.style.transition = `${factor}s ease-in-out`
        arrow.style.transform = `translateX(${i * factor}rem)`
        setTimeout(() => (arrow.style.transform = 'translateX(0rem)'), factor * 1000)
    }

    async function animate_audio_icon() {
        let duration = moji_pronunciation.duration + moji_pronunciation.duration * 0.1
        audio_icon.style.transition = `${duration}s ease-in-out`

        moji_pronunciation.onplaying = () => {
            audio_icon.icon = 'ic:twotone-volume-down'
        }
        moji_pronunciation.ontimeupdate = () => {
            audio_icon.icon = 'ic:twotone-volume-up'
        }

        moji_pronunciation.onended = () => {
            audio_icon.icon = 'ic:twotone-volume-mute'
        }
    }

    async function play_moji_pronunciation() {
        if (RARE_MOJI.includes(idx)) {
            state.rare_moji = true
            return
        }
        state.rare_moji = false
        state.play_audio = false
        const i = idx <= KANA_BOUNDS.katakana ? ((idx - 1) % KANA_BOUNDS.hiragana) + 1 : idx

        moji_pronunciation = new Audio(`/audio/${i}.mp3`)
        moji_pronunciation.volume = 0.75
        moji_pronunciation.play()

        await animate_audio_icon()
    }

    async function replay_moji_animation() {
        state.play_stroke = true
        replay_icon.style.transition = '0.5s ease-in-out'
        replay_icon.style.transform = 'rotate(-360deg)'

        setTimeout(() => {
            replay_icon.style.transition = '0s'
            replay_icon.style.transform = 'rotate(-0deg)'
        }, 500)

        setTimeout(() => (state.play_stroke = false))
    }

    async function trigger_audio() {
        state = { ...state, play_audio: true, autoplay_audio: false }
    }

    $: if (state.play_audio) {
        play_moji_pronunciation()
    }
</script>

<button class="w-6 h-6" on:click={(e) => change_moji(-1, e)}>
    <iconify-icon icon="ic:twotone-keyboard-double-arrow-left" {...icon_opts} />
</button>
<button class="w-6 h-6" on:click={replay_moji_animation}>
    <iconify-icon bind:this={replay_icon} icon="ic:twotone-replay" {...icon_opts} />
</button>
<div class="tooltip {!state.rare_moji ? tooltip_hover_none : ''}" data-tip="Rarely Used">
    <button class="w-6 h-6" on:click={trigger_audio}>
        <iconify-icon
            bind:this={audio_icon}
            class:text-error={state.rare_moji}
            icon="ic:twotone-volume-mute"
            {...icon_opts}
        />
    </button>
</div>
<button class="w-6 h-6" on:click={(e) => change_moji(+1, e)}>
    <iconify-icon icon="ic:twotone-keyboard-double-arrow-right" {...icon_opts} />
</button>
