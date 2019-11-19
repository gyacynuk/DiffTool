export const EditOperation = Object.freeze({"INSERT":1, "DELETE":2, "REPLACE":3, "NONE":4});

/**
 * Create an empty m x n matrix (m rows, n columns).
 * @param {*} m number of rows.
 * @param {*} n number of columns.
 */
function createMatrix(m, n) {
    let matrix = new Array(n);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(m);
    }
    return matrix;
}

/**
 * 
 * @param {*} newWord 
 * @param {*} oldWord 
 * @returns {number[][]}
 */
function computeEditDistanceMatrix(newWord, oldWord) {
    let m = newWord.length + 1;
    let n = oldWord.length + 1;
    let matrix = createMatrix(m, n);

    // Populate base-case values
    matrix[0][0] = 0;
    for (let i = 1; i < m; i ++) {
        matrix[0][i] = matrix[0][i-1] + 1;
    }
    for (let i = 1; i < n; i ++) {
        matrix[i][0] = matrix[i-1][0] + 1;
    }

    // Compute values across scanline
    for (let i = 1; i < m; i ++) {
        for (let j = 1; j < n; j ++) {
            var diffPenalty = 0;
            if (newWord[i-1] !== oldWord[j-1]) {
                diffPenalty = 1;
            }
            matrix[j][i] = Math.min(matrix[j-1][i], matrix[j][i-1], matrix[j-1][i-1]) + diffPenalty;
        }
    }

    return matrix;
}

function getEditCost(editMatrix, row, col) {
    if (col < 0 || col >= editMatrix.length) {
        return Number.POSITIVE_INFINITY;
    } else if (row < 0 || row >= editMatrix[0].length) {
        return Number.POSITIVE_INFINITY;
    } else {
        return editMatrix[col][row];
    }
}

function computeEdits(editMatrix, newWord, oldWord) {
    let edits = [];
    let j = newWord.length;
    let i = oldWord.length;

    while (i !== 0 || j !== 0) {
        let insertCost = getEditCost(editMatrix, j - 1, i);
        let deleteCost = getEditCost(editMatrix, j, i - 1);
        let maybeReplaceCost = getEditCost(editMatrix, j - 1, i - 1);

        let minEditCost = Math.min(insertCost, deleteCost, maybeReplaceCost);
        if (minEditCost === maybeReplaceCost) {
            let currentIndexCost = getEditCost(editMatrix, j, i);
            j--;
            i--;
            if (maybeReplaceCost < currentIndexCost) {
                edits.push(new Edit(EditOperation.REPLACE, newWord[j], oldWord[i]));
            } else {
                edits.push(new Edit(EditOperation.NONE, newWord[j]))
            }
        } else if (minEditCost === insertCost) {
            j --;
            edits.push(new Edit(EditOperation.INSERT, newWord[j]));
            
        } else {
            i --;
            edits.push(new Edit(EditOperation.DELETE, oldWord[i]));
        }
    }

    return edits.reverse();
}

export class Edit {
    constructor(operation, symbol, secondarySymbol = null) {
        this.operation = operation;
        this.symbol = symbol;
        this.secondarySymbol = secondarySymbol;
    }
}

export class EditDistance {

    constructor(newWord, oldWord) {
        this.newWord = newWord;
        this.oldWord = oldWord;

        let editMatrix = computeEditDistanceMatrix(newWord, oldWord);
        this.minEditDistance = editMatrix[oldWord.length][newWord.length];
        this.fullEdits = computeEdits(editMatrix, newWord, oldWord);
        this.edits = this.fullEdits.filter(edit => edit.operation !== EditOperation.NONE);
    }

    getNumDisjointReplacements() {
        if (this.fullEdits.length === 0) {
            return 0;
        }

        let disjointReplacements = 0;
        let prevOperation = null;
        for (let i = 0; i < this.fullEdits.length; i++) {
            const { operation } = this.fullEdits[i];
            if (operation === EditOperation.REPLACE && prevOperation !== EditOperation.REPLACE) {
                disjointReplacements ++;
            }
            prevOperation = operation;
        }

        return disjointReplacements;
    }

}
