import React, { Component } from 'react'
import { Box, Button, Radio, RadioGroup, Boxer, useRadioState, Text, Separator } from '@smooth-ui/core-sc'
import styled, {style} from '@xstyled/styled-components';

const LeftMarginLabel = styled.label`
    margin-left: 16px;
`;


function DiffContainer() {
    const radio = useRadioState();
    return (
        <>
            <Box row>
                <Box col>
                    <RadioGroup {...radio}
                        aria-label="display options"
                        p={1}>
                            <label>
                                <Radio {...radio} value="inline-radio"/> Inline Comparison
                            </label>
                            <LeftMarginLabel>
                                <Radio {...radio} value="side-radio"/> Side Comparison
                            </LeftMarginLabel>
                    </RadioGroup>
                </Box>
            </Box>
            <Box row>
                
            </Box>
        </>
    );
}

export default DiffContainer;