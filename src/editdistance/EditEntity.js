import { Edit, EditOperation, EditDistance } from './EditDistance'

/**
 * 
 * @param {Edit} edit 
 * @param {Number} number 
 * @returns {EditEntity[]}
 */
function mapToEditEntities(edit, number) {
    const { operation, symbol, secondarySymbol } = edit;
    if (operation === EditOperation.REPLACE) {
        let subEditDistance = new EditDistance(symbol, secondarySymbol, false);
        let insertSubEditEntities = subEditDistance.fullEdits
            .map(edit => edit.operation === EditOperation.REPLACE
                ? new Edit(EditOperation.INSERT, edit.symbol)
                : edit)
            .filter(subEdit => subEdit.operation !== EditOperation.DELETE);
        let deleteSubEditEntities = subEditDistance.fullEdits
            .map(edit => edit.operation === EditOperation.REPLACE
                ? new Edit(EditOperation.DELETE, edit.secondarySymbol)
                : edit)
            .filter(subEdit => subEdit.operation !== EditOperation.INSERT);
        return [
            new EditEntity(EditOperation.INSERT, symbol, number, insertSubEditEntities),
            new EditEntity(EditOperation.DELETE, secondarySymbol, number, deleteSubEditEntities)
        ]
    }
    else if (operation === EditOperation.INSERT) {
        return [new EditEntity(operation, symbol, number)]
    } 
    else {
        return [new EditEntity(operation, symbol, number)]
    }
}

/**
 * 
 * @param {EditEntity[]} array 
 */
function peekEntityNumber(array) {
    if (array.length > 0) {
        return array[array.length-1].entityNumber;
    }
    return Number.NEGATIVE_INFINITY;
}

function popMaxGroup(editsByOperation, prevEntityNumber) {
    let maxDelete = peekEntityNumber(editsByOperation[EditOperation.DELETE]);
    let maxInsert = peekEntityNumber(editsByOperation[EditOperation.INSERT]);
    let maxNone = peekEntityNumber(editsByOperation[EditOperation.NONE]);
    let maxEntityNumber = Math.max(maxDelete, maxInsert, maxNone);

    if (maxDelete === prevEntityNumber - 1) {
        return editsByOperation[EditOperation.DELETE].pop();
    } else if  (maxInsert === prevEntityNumber - 1) {
        return editsByOperation[EditOperation.INSERT].pop();
    }
    
    if (maxEntityNumber === maxDelete) {
        return editsByOperation[EditOperation.DELETE].pop();
    } else if (maxEntityNumber === maxInsert) {
        return editsByOperation[EditOperation.INSERT].pop();
    } else {
        return editsByOperation[EditOperation.NONE].pop();
    }
}

function groupByContiguousOperation(editEntities) {
    // Build accumulator as a map with an empty array present for all possible keys
    let accumulator = { 1: [], 2:[], 3:[], 4: [] }

    // Group edits using operation as key
    let editsByOperation = editEntities.reduce((acc, curr) => {
        let op = curr.operation;
        acc[op].push(curr);
        return acc;
    }, accumulator);

    let orderedEntities = []
    let prevEntityNumber = editEntities.length;
    for (let count = 0; count < editEntities.length; count ++) {
        let currEntity = popMaxGroup(editsByOperation, prevEntityNumber);
        orderedEntities.push(currEntity);
        prevEntityNumber = currEntity.entityNumber;
    }
    return orderedEntities.reverse();
}

/**
 * 
 * @param {EditDistance} editDistance 
 * @returns {EditEntity[]}
 */
export function toEditEntities(editDistance) {
    let entities = [];
    let entityNum = 1;
    editDistance.fullEdits.forEach(edit => {
        entities.push(...mapToEditEntities(edit, entityNum))
        entityNum ++;
    });
    return groupByContiguousOperation(entities);
}

export class EditEntity {

    constructor(operation, symbol, entityNumber, subEditEntities = null) {
        this.operation = operation;
        this.symbol = symbol;
        this.entityNumber = entityNumber;
        this.subEditEntities = subEditEntities;
    }

}
