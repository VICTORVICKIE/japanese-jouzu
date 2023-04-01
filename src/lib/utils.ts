export const KANA = ['hiragana', 'katakana', 'kanji'] as const
export type Kana = (typeof KANA)[number]

export const KANA_BOUNDS = {
    hiragana: 74,
    katakana: 152,
    kanji: 3000
} as const

export const RARE_MOJI = [45, 46, 49, 119, 120, 123, 121, 149, 150, 151, 152]
export interface Example {
    word: string
    romanji: string
    meaning: string
}
export interface Moji {
    moji: string
    romanji: string
    example?: Example
}

export type Japanese = {
    [key in Kana]: {
        [index: number]: Moji
    }
}

export function get_kana(idx: number): Kana {
    const i = idx <= KANA_BOUNDS.hiragana ? 0 : idx <= KANA_BOUNDS.katakana ? 1 : 2
    return KANA[i]
}

export interface State {
    run: boolean
    replay: boolean
    auto_play: boolean
    rare_moji: boolean
}
