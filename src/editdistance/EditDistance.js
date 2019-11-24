/**
 * ------------------------------------------------------------------------------------------------
 * A set of classes and functions for computing edit distance between both strings and documents.
 *
 * Author: Griffin Yacynuk
 * ------------------------------------------------------------------------------------------------
 */

/**
 * An enum for identifying operation type.
 */
export const EditOperation = Object.freeze({"INSERT":1, "DELETE":2, "REPLACE":3, "NONE":4});

/**
 * Create an empty m x n matrix (m rows, n columns).
 *
 * @param {Number} m number of rows
 * @param {Number} n number of columns
 */
function createMatrix(m, n) {
    let matrix = new Array(n);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(m);
    }
    return matrix;
}

/**
 * Create and populate a matrix for computing the edit distance matrix between the given input
 * strings, using the Wagner-Fischer dynamic programming algorithm.
 *
 * @param {String} newWord a string in which discrepencies are considered as insertions
 * @param {String} oldWord a string in which discrepencies are considered as deletions
 * @returns {Number[][]}
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
            matrix[j][i] = Math.min(
                matrix[j-1][i],
                matrix[j][i-1],
                matrix[j-1][i-1]) + diffPenalty;
        }
    }

    return matrix;
}

/**
 * Create and populate a matrix for computing the edit distance matrix between the given input
 * documents, using my own adaptation of the Wagner-Fischer dynamic programming algorithm.
 *
 * Note: This matrix should be used for computing the optimal set of operations to make the two
 * documents equal, whilst matching up asmany identical lines as possible. However it cannot be
 * used to compute the actual edit distance measure between documents.
 *
 * @param {String[]} newDocument a document in which discrepencies are considered as insertions
 * @param {String[]} oldDocument a document in which discrepencies are considered as deletions
 * @returns {Number[][]}
 */
function computeDocumentEditDistanceMatrix(newDocument, oldDocument) {
    let m = newDocument.length + 1;
    let n = oldDocument.length + 1;
    let matrix = createMatrix(m, n);

    // Populate base-case values
    matrix[0][0] = 0;
    for (let i = 1; i < m; i ++) {
        matrix[0][i] = matrix[0][i-1] + newDocument[i-1].length + 1;
    }
    for (let j = 1; j < n; j++) {
        matrix[j][0] = matrix[j-1][0] + oldDocument[j-1].length + 1;
    }

    // Compute values across scanline
    for (let i = 1; i < m; i ++) {
        for (let j = 1; j < n; j ++) {
            let diffPenalty = 0;
            if (newDocument[i-1] !== oldDocument[j-1]) {
                // Penalty for replacement equal to the edit distance between the two lines
                diffPenalty = new EditDistance(newDocument[i-1], oldDocument[j-1], false).minEditDistance;
            } else {
                // Negative cost resulting in a 0-cost entry
                diffPenalty = -matrix[j-1][i-1] - 1;
            }
            matrix[j][i] = Math.min(
                matrix[j-1][i] + oldDocument[j-1].length,
                matrix[j][i-1] + newDocument[i-1].length,
                matrix[j-1][i-1] + diffPenalty) + 1;
        }
    }

    return matrix;
}

/**
 * Get the cost of an entry in an edit distance matrix. Returns negative infinity if the requested
 * element is outside the bounds of the matrix.
 *
 * @param {Number[][]} editMatrix the edit distance matrix
 * @param {Number} row the row of the element being queried
 * @param {Number} col the column of the element being queried
 * @returns {Number}
 */
function getEditCost(editMatrix, row, col) {
    if (col < 0 || col >= editMatrix.length) {
        return Number.POSITIVE_INFINITY;
    } else if (row < 0 || row >= editMatrix[0].length) {
        return Number.POSITIVE_INFINITY;
    } else {
        return editMatrix[col][row];
    }
}

/**
 * Given an edit distance matrix and the two strings/documents which were compared to make the
 * matrix, determine the optimal set of edits needed to make the inputs equal.
 *
 * @param {Number[][]} editMatrix the edit distance matrix
 * @param {String|String[]} newWord an input in which discrepencies are considered as insertions
 * @param {String|String[]} oldWord an input in which discrepencies are considered as deletions
 * @returns {Edit[]}
 */
function computeEdits(editMatrix, newWord, oldWord) {
    let edits = [];
    let j = newWord.length;
    let i = oldWord.length;

    while (i !== 0 || j !== 0) {
        if(getEditCost(editMatrix, j, i) === 0) {
            j--;
            i--;
            edits.push(new Edit(EditOperation.NONE, newWord[j]));
            continue;
        }
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

/**
 * A class which represents an edit operation, as well as the symbol(s) which it is performed on.
 */
export class Edit {
    /**
     * Create a new Edit.
     *
     * @param {EditOperation} operation the operation that this edit represents
     * @param {String} symbol the input in which this edit operates on
     * @param {String} secondarySymbol the secondary input in which this edit operates on (in the
     * case of a REPLACE operation, for instance).
     */
    constructor(operation, symbol, secondarySymbol = null) {
        this.operation = operation;
        this.symbol = symbol;
        this.secondarySymbol = secondarySymbol;
    }
}

/**
 * A class which represents the edit distance between two strings/documents, as well as the
 * associated edit operations.
 */
export class EditDistance {
    /**
     * Create a new EditDistance.
     *
     * @param {String|String[]} newWord an input which discrepencies are considered as insertions
     * @param {String|String[]} oldWord an input which discrepencies are considered as insertions
     * @param {Boolean} document true if this is a document comparison, false for string comparison
     */
    constructor(newWord, oldWord, document = true) {
        this.newWord = newWord;
        this.oldWord = oldWord;

        let editMatrix = document ? computeDocumentEditDistanceMatrix(newWord, oldWord) : computeEditDistanceMatrix(newWord, oldWord);
        this.minEditDistance = editMatrix[oldWord.length][newWord.length];
        this.fullEdits = computeEdits(editMatrix, newWord, oldWord);
        this.edits = this.fullEdits.filter(edit => edit.operation !== EditOperation.NONE);
    }
}
