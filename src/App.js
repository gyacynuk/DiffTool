import React, { Component } from 'react';
import Title from './components/Title'
import TextInputs from './components/TextInputs'
import Description from './components/Description'
import DiffContainer from './components/DiffContainer'
import { Box, Normalize } from '@smooth-ui/core-sc'
import { EditDistance } from './editdistance/EditDistance'

const newDocument = [
    "Hello World!",
    "Have fun playing around with my implementation of a text comparison tool,",
    "based off of the Wagner–Fischer dynamic programming algorithm for calculating",
    "the Levenshtein distance between two strings.",
    "I have tried to display differences in an easy-to-read format, by grouping",
    "contiguous operations together, and by highlighting small differences between",
    "similar lines (as seen above).",
    "New lines appear like this",
    "(with no per-character highlighting)",
    "(again, with no per-character highlighting)",
    'Finally, if you\'re working with large documents, consider keeping',
    '"Delayed Computation" on, as it will wait until you stop typing before',
    'recomputing the differences, instead of after each keystroke.'
];

const oldDocument = [
    "Hello World!",
    "Have fun playing around with my implementation of a text diff tool,",
    "based off of the Wagner–Fischer DP algorithm for calculating",
    "the edit distance between two strings.",
    "I have tried to display differences in an easy-to-read format, by grouping",
    "contiguous operations together, and by highlighting small differences between",
    "similar lines (as seen above).",
    "(with no per-character highlighting)",
    "And deleted lines appear like this",
    "(again, with no per-character highlighting)",
    'Finally, if you\'re working with large documents, consider keeping',
    '"Delayed Computation" on, as it will wait until you stop typing before',
    'recomputing the differences, instead of after each keystroke.'
];

class App extends Component {
    state = {
        newDocument: newDocument,
        oldDocument: oldDocument,
        editDistance: new EditDistance(newDocument, oldDocument),
        delayedComputation: true,
        diffStateString: "Done"
    };

    constructor() {
        super();
        this.computeDiffTimer = null;
        this.processingTimer = null;

        this.toggleDelayedComputation = this.toggleDelayedComputation.bind(this);
        this.triggerDiffComputation = this.triggerDiffComputation.bind(this);
        this.recomputeDiff = this.recomputeDiff.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.updateDiffStateString = this.updateDiffStateString.bind(this);
    }

    triggerDiffComputation() {
        clearTimeout(this.computeDiffTimer);
        if (this.state.delayedComputation) {
            this.updateDiffStateString("Waiting");
            this.computeDiffTimer = setTimeout(() => {
                this.recomputeDiff();
            }, 1000);
        } else {
            this.recomputeDiff();
        }
    }

    recomputeDiff() {
        this.updateDiffStateString("Processing");
        clearTimeout(this.processingTimer);
        this.processingTimer = setTimeout(() => {
            let { newDocument, oldDocument } = this.state;
            let newEditDistance = new EditDistance(newDocument, oldDocument)
            this.setState({
                editDistance: newEditDistance
            });
            this.updateDiffStateString("Done");
        }, 100);
    }

    updateDocument(target, updateNewDocument = true) {
        let { newDocument, oldDocument } = this.state;
        this.setState({
            newDocument: updateNewDocument ? target.value.split('\n') : newDocument,
            oldDocument: updateNewDocument ? oldDocument : target.value.split('\n')
        });
        this.triggerDiffComputation();
    }

    toggleDelayedComputation() {
        this.setState({
            delayedComputation: !this.state.delayedComputation
        });
    }

    updateDiffStateString(newState) {
        this.setState({
            diffStateString: newState
        });
    }

    render() {
        return (
            <>
                <Normalize />
                {
                    <>
                        <Title/>
                        
                        <Box
                            width={1}
                            height={100}
                            px={{xs:3, md: 6}}
                            py={3}>
                                <Description/>
                                <TextInputs
                                    newDocument={newDocument.join('\n')}
                                    oldDocument={oldDocument.join('\n')}
                                    updateDocument={this.updateDocument}/>
                                <DiffContainer
                                    editDistance={this.state.editDistance}
                                    delayedComputation={this.state.delayedComputation}
                                    toggleDelayedComputation={this.toggleDelayedComputation}
                                    diffStateString={this.state.diffStateString}/>
                        </Box>
                    </>
                }
            </>
        );
    }
}

export default App;
