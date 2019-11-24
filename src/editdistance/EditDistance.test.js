import {EditDistance, EditOperation} from './EditDistance';

it('computes min edit distance on two empty inputs', () => {
    expect(new EditDistance('', '', false).minEditDistance).toBe(0);
})

it('computes min edit distance on one empty input', () => {
    expect(new EditDistance('a', '', false).minEditDistance).toBe(1);
})

it('computes min edit distance on identical inputs', () => {
    expect(new EditDistance('dog', 'dog', false).minEditDistance).toBe(0);
})

it('computes min edit distance on no-matching inputs', () => {
    expect(new EditDistance('dog', 'cat', false).minEditDistance).toBe(3);
})  

it('computes min edit distance on partial-matching inputs 2', () => {
    expect(new EditDistance('elephant', 'relevant', false).minEditDistance).toBe(3);
})

it('computes edits correctly', () => {
    let editDistance = new EditDistance('elephant', 'relevant', false);
    expect(editDistance.edits.length).toBe(3);
    expect(editDistance.edits[0].operation).toBe(EditOperation.DELETE);
    expect(editDistance.edits[1].operation).toBe(EditOperation.INSERT);
    expect(editDistance.edits[2].operation).toBe(EditOperation.REPLACE);
})
