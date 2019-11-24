/**
 * ------------------------------------------------------------------------------------------------
 * A component which houses a set of DiffLines, showing the complete set of differences between two
 * documents. Also provides radio buttons to change display type, and a switch to control
 * computation mode.
 *
 * Author: Griffin Yacynuk
 * ------------------------------------------------------------------------------------------------
 */
import React from 'react'
import styled from '@xstyled/styled-components';
import { toEditEntities, groupByContiguousOperation, splitByOperation } from '../editdistance/EditEntity'
import { Box, Radio, RadioGroup, Switch, useRadioState, Separator } from '@smooth-ui/core-sc'
import { RoundBoxer } from './Shared'
import DiffLine from './DiffLine'

const LeftMarginLabel = styled.label`
    margin-left: 16px;
`;

const Pill = styled.div`
    display: inline-block;
    border: 2px solid ${props => props.color};
    color: ${props => props.color};
    border-radius: 16px;
    padding: 4px 8px;
    margin-left: 16px;
    font-size: 12px;
`;

function getColor(text) {
    if (text === "Done") {
        return "#3bd12e";
    } else if (text === "Waiting") {
        return "#17A2B8";
    } else if (text === "Processing") {
        return "#AF1213";
    } else {
        return "#333";
    }
}

function DiffContainer(props) {
    const radioState = useRadioState({state: "viewInline"});

    let editEntities = toEditEntities(props.editDistance);

    let inlineView = <RoundBoxer row key={1}
        m={2}
        mb={5}>
        {
            groupByContiguousOperation(toEditEntities(props.editDistance))
                .map((editEntity, i) => <DiffLine editEntity={editEntity} key={i}/>)
        }
    </RoundBoxer>;

    let sideView = <RoundBoxer row key={2}
        m={2}
        mb={5}>
            <Box col={1/2}> 
            {
                splitByOperation(editEntities)[0]
                    .map((editEntity, i) => <DiffLine editEntity={editEntity} key={i}/>)
            }
            </Box>
            <Box col={1/2}>
            {
                splitByOperation(editEntities)[1]
                    .map((editEntity, i) => <DiffLine editEntity={editEntity} key={i}/>)
            }
            </Box>
        </RoundBoxer>;

    let view = [inlineView];
    if (radioState.state === "viewSide") {
        view = [sideView];
    }

    return (
        <>
            <Box row mt={2}>
                <Box col>
                    <LeftMarginLabel mx={1}>
                        <Switch
                            checked={props.delayedComputation}
                            onChange={props.toggleDelayedComputation}
                            scale="sm"
                            name="xs"
                            verticalAlign="middle"/> Delayed Computation
                    </LeftMarginLabel>
                    <Pill color={getColor(props.diffStateString)}>
                        <strong>{props.diffStateString}</strong>
                    </Pill>
                    <Separator/>
                    <RadioGroup {...radioState}
                        aria-label="display options"
                        py={1}>
                            <Box row justifyContent={{ md: 'left' }}>
                                <Box col={{xs:1, md: 'auto'}}>
                                    <LeftMarginLabel>
                                        <Radio {...radioState} value="viewInline"/> Inline
                                    </LeftMarginLabel>
                                    </Box>  
                                <Box col={{xs:1, md: 'auto'}}
                                    mt={{xs:2, md: 0}}>
                                    <LeftMarginLabel>
                                        <Radio {...radioState} value="viewSide"/> Side
                                    </LeftMarginLabel>
                                </Box>  
                            </Box>
                             
                    </RadioGroup>
                </Box>
            </Box>
            {
                view.map(i => i)
            }
        </>
    );
}

export default DiffContainer;
