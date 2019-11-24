/**
 * ------------------------------------------------------------------------------------------------
 * The component which builds two text areas in which the user can edit the input documents for the
 * algorithm.
 *
 * Author: Griffin Yacynuk
 * ------------------------------------------------------------------------------------------------
 */
import React, { Component } from 'react'
import { Box, Textarea, Text } from '@smooth-ui/core-sc'
import styled from '@xstyled/styled-components';

const CodeTextArea = styled(Textarea)` 
    font-family: 'Inconsolata', monospace;
    white-space: nowrap;
    overflow: auto;
`;

class TextInputs extends Component {

    render() {
        return (
            <>
                <Box row>
                    <Box 
                        col={{xs: 1, md: 1/2}}
                        p={2}>
                            <Text variant="h4">New Document</Text>
                            <CodeTextArea 
                                scale="base"
                                rows={10}
                                defaultValue={this.props.newDocument}
                                onChange={event => this.props.updateDocument(event.target, true)}/>
                    </Box>
                    <Box 
                        col={{xs: 1, md: 1/2}}
                        p={2}>
                            <Text variant="h4">Old Document</Text>
                            <CodeTextArea 
                                scale="base"
                                rows={10}
                                defaultValue={this.props.oldDocument}
                                onChange={event => this.props.updateDocument(event.target, false)}/>
                    </Box>
                </Box>
            </>
        )
    }
}

export default TextInputs;
