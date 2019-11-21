import React, { Component } from 'react'
import { Box, Radio, RadioGroup, Switch, useCheckboxState, useRadioState } from '@smooth-ui/core-sc'
import styled, {style} from '@xstyled/styled-components';
import { toEditEntities } from '../editdistance/EditEntity'
import DiffLine from './DiffLine'

const LeftMarginLabel = styled.label`
    margin-left: 16px;
`;

const RoundBoxer = styled(Box)`
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 4px;
    overflow: scroll;
`;

function DiffContainer(props) {
    const radioState = useRadioState({state: "viewInline"});
    const checkbox = useCheckboxState({state: true})
    return (
        <>
            <Box row mt={2}>
                <Box col>
                    <LeftMarginLabel
                        mx={1}>
                        <Switch
                            checked={props.delayedComputation}
                            onChange={props.toggleDelayedComputation}
                            scale="sm"
                            name="xs"/> Delayed Computation
                    </LeftMarginLabel>
                    <RadioGroup {...radioState}
                        aria-label="display options"
                        py={1}>  
                            <LeftMarginLabel>
                                <Radio {...radioState} value="viewInline"/> Inline Comparison
                            </LeftMarginLabel>
                            <LeftMarginLabel>
                                <Radio {...radioState} value="viewSide"/> Side Comparison
                            </LeftMarginLabel>
                    </RadioGroup>
                </Box>
            </Box>
            <RoundBoxer row
                m={2}
                mb={5}>
                {
                    toEditEntities(props.editDistance)
                        .map((editEntity, i) => <DiffLine editEntity={editEntity} key={i}/>)
                }
            </RoundBoxer>
        </>
    );
}

export default DiffContainer;