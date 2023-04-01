import { describe, expect, it } from 'vitest'
import { KANA, get_kana } from '../lib/assets/data/kana'

describe('get_kana', () => {
    it('should return the kana type', () => {
        expect(get_kana(1)).toEqual(KANA[0])
        expect(get_kana(73)).toEqual(KANA[0])
        expect(get_kana(74)).toEqual(KANA[0])
        expect(get_kana(75)).toEqual(KANA[1])
        expect(get_kana(76)).toEqual(KANA[1])
        expect(get_kana(152)).toEqual(KANA[1])
        expect(get_kana(153)).toEqual(KANA[2])
        expect(get_kana(1053)).toEqual(KANA[2])
    })
})
