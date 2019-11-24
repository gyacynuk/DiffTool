import { EditDistance, EditOperation } from './EditDistance';
import { EditEntity, toEditEntities, groupByContiguousOperation } from './EditEntity';

it('converts NONE Edits to EditEntities', () => {
    let editDistance = new EditDistance('abc', 'abc');
    let editEntities = toEditEntities(editDistance);

    expect(editEntities.length).toBe(3);

    expect(editEntities[0].symbol).toBe('a')
    expect(editEntities[1].symbol).toBe('b')
    expect(editEntities[2].symbol).toBe('c')

    expect(editEntities[0].operation).toBe(EditOperation.NONE);
    expect(editEntities[1].operation).toBe(EditOperation.NONE);
    expect(editEntities[2].operation).toBe(EditOperation.NONE);
})

it('converts INSERT Edits to EditEntities', () => {
    let editDistance = new EditDistance('abc', '');
    let editEntities = toEditEntities(editDistance);

    expect(editEntities.length).toBe(3);

    expect(editEntities[0].symbol).toBe('a')
    expect(editEntities[1].symbol).toBe('b')
    expect(editEntities[2].symbol).toBe('c')

    expect(editEntities[0].operation).toBe(EditOperation.INSERT);
    expect(editEntities[1].operation).toBe(EditOperation.INSERT);
    expect(editEntities[2].operation).toBe(EditOperation.INSERT);
})

it('converts DELETE Edits to EditEntities', () => {
    let editDistance = new EditDistance('', 'abc');
    let editEntities = toEditEntities(editDistance);

    expect(editEntities.length).toBe(3);

    expect(editEntities[0].symbol).toBe('a')
    expect(editEntities[1].symbol).toBe('b')
    expect(editEntities[2].symbol).toBe('c')

    expect(editEntities[0].operation).toBe(EditOperation.DELETE);
    expect(editEntities[1].operation).toBe(EditOperation.DELETE);
    expect(editEntities[2].operation).toBe(EditOperation.DELETE);
})

it('converts REPLACE Edits to pairs of EditEntities', () => {
    let editDistance = new EditDistance('a', 'b');
    let editEntities = toEditEntities(editDistance);

    expect(editEntities.length).toBe(2);

    expect(editEntities[0].symbol).toBe('a')
    expect(editEntities[1].symbol).toBe('b')

    expect(editEntities[0].operation).toBe(EditOperation.INSERT);
    expect(editEntities[1].operation).toBe(EditOperation.DELETE);
})

it('groups by EditOperation', () => {
    let editEntities = [
        new EditEntity(EditOperation.INSERT, '', 1, null),
        new EditEntity(EditOperation.DELETE, '', 1, null),
        new EditEntity(EditOperation.INSERT, '', 2, null),
        new EditEntity(EditOperation.DELETE, '', 2, null)
    ];

    let groupedEntities = groupByContiguousOperation(editEntities);

    expect(groupedEntities.length).toBe(4);

    expect(groupedEntities[0].operation).toBe(EditOperation.INSERT);
    expect(groupedEntities[1].operation).toBe(EditOperation.INSERT);
    expect(groupedEntities[2].operation).toBe(EditOperation.DELETE);
    expect(groupedEntities[3].operation).toBe(EditOperation.DELETE);
})