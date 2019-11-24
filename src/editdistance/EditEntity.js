/**
 * ------------------------------------------------------------------------------------------------
 * A set of classes and functions for processing edits and edit distance matrices into graphically
 * displayable components.
 *
 * Author: Griffin Yacynuk
 * ------------------------------------------------------------------------------------------------
 */
import { Edit, EditOperation, EditDistance } from './EditDistance'

/**
 * Converts an Edit into a displayable EditEntity. In the case of a REPLACE, convert it into two
 * seperate EditEntities (one representing an INSERT, the other a DELETE).
 *
 * @param {Edit} edit the edit to be converted to a displayable component.
 * @param {Number} number the line number given to this operation.
 * @returns {EditEntity[]}
 */
function convertToEditEntities(edit, number) {
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
 * Peek at the edit number of the last edit entity in the passed in list.
 *
 * @param {EditEntity[]} array the list of edit entities.
 * @returns {Number}
 */
function peekEntityNumber(array) {
    if (array.length > 0) {
        return array[array.length-1].entityNumber;
    }
    return Number.NEGATIVE_INFINITY;
}

/**
 * Given a map grouping EditEntities by their associated EditOperation, pop the entity from the
 * group with the maximum enity number, or in the case of contiguous operations, the next operation
 * in a contiguous sequence.
 * 
 * @param {Map<EditOperation, EditEntity>} editsByOperation a map grouping EditEntities by their
 * associated EditOperation
 * @param {Number} prevEntityNumber the entity number of the previously popped edit entity.
 * @returns {EditEntity}
 */
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

/**
 * Given a list of EditEntities, build a new list which groups together contiguous operations.
 *
 * @param {EditEntity[]} editEntities a list of EditEntities
 * @returns {EditEntity[]}
 */
export function groupByContiguousOperation(editEntities) {
    // Build accumulator as a map with an empty array present for all possible keys
    let accumulator = { 1: [], 2:[], 3:[], 4: [] }

    // Group edits using operation as key
    let editsByOperation = editEntities.reduce((acc, curr) => {
        let op = curr.operation;
        acc[op].push(curr);
        return acc;
    }, accumulator);

    let orderedEntities = []
    let prevEntityNumber = editEntities.length + 1;
    for (let count = 0; count < editEntities.length; count ++) {
        let currEntity = popMaxGroup(editsByOperation, prevEntityNumber);
        orderedEntities.push(currEntity);
        prevEntityNumber = currEntity.entityNumber;
    }
    return orderedEntities.reverse();
}

/**
 * Convert the edits derived from an EditDistance object into EditEntities.
 *
 * @param {EditDistance} editDistance an EditDistance object
 * @returns {EditEntity[]}
 */
export function toEditEntities(editDistance) {
    let entities = [];
    let entityNum = 1;
    editDistance.fullEdits.forEach(edit => {
        entities.push(...convertToEditEntities(edit, entityNum))
        entityNum ++;
    });
    return entities;
}

/**
 * Split a list of EditEntities into two seperate lists, with the first list showing insertions,
 * and the second showing deletions. Insert blank lines in the opposite list corresponding to
 * operations not included. NONE operations appear in both lists.
 *
 * @param {EditEntity[]} editEntities a list of EditEntities
 * @returns {EditEntity[][]}
 */
export function splitByOperation(editEntities) {
    let inserts = [];
    let deletes = [];

    editEntities.forEach(editEntity => {
        let { operation, subEditEntities } = editEntity;
        if (operation === EditOperation.INSERT) {
            inserts.push(editEntity);
            if (subEditEntities === null) {
                deletes.push(new EditEntity(EditOperation.NONE, "", "*",));
            }
        } else if (operation === EditOperation.DELETE) {
            deletes.push(editEntity);
            if (subEditEntities === null) {
                inserts.push(new EditEntity(EditOperation.NONE, "", "*",));
            }
        } else {
            inserts.push(editEntity);
            deletes.push(editEntity);
        }
    })

    return [inserts, deletes];
}

/**
 * A class representing a graphically displayable component, corresponding to an edit operation
 * (INSERT, DELETE, etc.) and the line/character it operates on.
 */
export class EditEntity {
    /**
     * Create an EditEntity.
     *
     * @param {EditOperation} operation the operation it represents
     * @param {String} symbol the line/character it operates on
     * @param {Number} entityNumber the line number of the operation
     * @param {Edit[]]?} subEditEntities if this operating on a line of text from a document, and
     * if this is a replacement, this represents the edits needed to be done on the line.
     */
    constructor(operation, symbol, entityNumber, subEditEntities = null) {
        this.operation = operation;
        this.symbol = symbol;
        this.entityNumber = entityNumber;
        this.subEditEntities = subEditEntities;
    }
}
