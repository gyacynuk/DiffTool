import React, { Component } from 'react';
import DiffLine from './components/DiffLine'
import { EditDistance } from './editdistance/EditDistance'
import { toEditEntities } from './editdistance/EditEntity'
import styled from "styled-components";
import './App.css';

const newDocument = [
    "Hello World!",
    "Please enjoy playing around with my attempt at a text diff tool!",
    "It will try to display differences in an easy-to-read format,",
    "by doing things such as grouping blocks of contiguous edits together (as seen above),",
    "or by highlighting micro-differences between lines (as seen here).",
    "If a line requires more than 3 replacements, then it will not be highlighted, as things can get messy.",
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
`;

class App extends Component {
    state = {
        newDocument: newDocument,
        oldDocument: oldDocument,
        editDistance: new EditDistance(newDocument, oldDocument)
    };

    updateDocument(target, updateNewDocument = true) {
        let { newDocument, oldDocument } = this.state;
        if (updateNewDocument) {
            newDocument = target.value.split('\n');
        } else {
            oldDocument =  target.value.split('\n');
        }
        this.setState({
            newDocument: newDocument,
            oldDocument: oldDocument,
            editDistance: new EditDistance(newDocument, oldDocument)
        });
    }

    updateOldDocument(text) {
        let oldDocument = text.split('\n')
        this.setState({
            newDocument: newDocument,
            oldDocument: oldDocument,
            editDistance: new EditDistance(newDocument, oldDocument)
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <span className="App-header-title">
                        Minimal Levenshtein Distance Difference Tool
                    </span>
                    <p>
                        Project by&nbsp;
                        <a className="App-link"
                        href="https://www.linkedin.com/in/griffin-yacynuk/"
                        target="_blank"
                        rel="noopener noreferrer">
                            Griffin Yacynuk
                        </a>
                    </p>
                </header>
                <div>

                <HalfScreenView>
                    <TextArea 
                        onChange={event => this.updateDocument(event.target, true)}
                        value={this.state.newDocument.join('\n')}
                    />
                </HalfScreenView>
                <HalfScreenView>
                    <TextArea 
                        onChange={event => this.updateDocument(event.target, false)}
                        value={this.state.oldDocument.join('\n')}
                    />
                </HalfScreenView>
                </div>
                <div>
                    {
                        toEditEntities(this.state.editDistance)
                            .map((editEntity, i) => <DiffLine editEntity={editEntity} key={i}/>)
                    }
                </div>
            </div>
        );
    }
}

export default App;