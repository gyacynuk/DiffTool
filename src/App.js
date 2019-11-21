import React, { Component } from 'react';
import InlineDiff from './components/InlineDiff'
import Title from './components/Title'
import TextInputs from './components/TextInputs'
import Description from './components/Description'
import DiffContainer from './components/DiffContainer'
import { Box, Normalize } from '@smooth-ui/core-sc'
import { EditDistance } from './editdistance/EditDistance'
import { toEditEntities } from './editdistance/EditEntity'
import styled from '@xstyled/styled-components';

const newDocument = [
    "Hello World!",
    "Please enjoy playing around with my attempt at a text diff tool!",
    "It will try to display differences in an easy-to-read format,",
    "by doing things such as grouping blocks of contiguous edits together (as seen above),",
    "or by highlighting micro-differences between lines (as seen here).",
    "If a line requires more than 3 replacements, then it will not be highlighted, as things can get messy.  long line long long lone",
    "Instead, the two lines will be treated as disjoint insertions and deletions, as seen below:",
    "I have fixed typos here as an example ;)",
    "This heuristic seems to work well in most cases."
];

const oldDocument = [
    "Hello!",
    "Please enjoy trying out my attempt at a text diff tool!",
    "It will try to display differences in an easy-to-read format,",
    "by doing things such as grouping blocks of contiguous edits together (as seen above),",
    "or by highlighting small differences between lines (as seen here).",
    "If a line requires more than 3 replacements, then it will not be highlighted, as things can get messy.",
    "Instead, the two lines will be treated as disjoint insertions and deletions, as seen below:",
    "i ficed typos ans an excmple :)",
    "This hueristic seeems to wok well in most caces."
];


const HalfScreenView = styled.div`
    display: inline-block;
    width: 50%;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 180px;
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
    white-space: nowrap;
    overflow: auto;
`;

class App extends Component {
    state = {
        newDocument: newDocument,
        oldDocument: oldDocument,
        editDistance: new EditDistance(newDocument, oldDocument),
        delayedComputation: true 
    };

    constructor() {
        super();
        this.computeDiffTimer = null;

        this.toggleDelayedComputation = this.toggleDelayedComputation.bind(this);
        this.triggerDiffComputation = this.triggerDiffComputation.bind(this);
        this.recomputeDiff = this.recomputeDiff.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
    }

    triggerDiffComputation() {
        clearTimeout(this.computeDiffTimer);
        if (this.state.delayedComputation) {
            this.computeDiffTimer = setTimeout(() => {
                this.recomputeDiff();
            }, 1000);
        } else {
            this.recomputeDiff();
        }
    }

    recomputeDiff() {
        let { newDocument, oldDocument } = this.state;
        this.setState({
            editDistance: new EditDistance(newDocument, oldDocument)
        });
    }

    updateDocument(target, updateNewDocument = true) {
        let { newDocument, oldDocument, editDistance } = this.state;
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
                            p={5}>
                                <Description/>
                                <TextInputs
                                    newDocument={newDocument.join('\n')}
                                    oldDocument={oldDocument.join('\n')}
                                    updateDocument={this.updateDocument}/>
                                {/* <DisplayOptions
                                    viewInline={this.state.viewInline}
                                   /> */}
                                <DiffContainer
                                    editDistance={this.state.editDistance}
                                    delayedComputation={this.state.delayedComputation}
                                    toggleDelayedComputation={this.toggleDelayedComputation}/>
                        </Box>
                    </>
                }
            </>
        );
    }
}

export default App;