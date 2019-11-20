import React, { Component } from 'react'
import styled from 'styled-components'
import { EditOperation } from '../editdistance/EditDistance'

const Line = styled.div`
    width: 100%;
    height: auto;
    text-align: left;
    font-family: 'Inconsolata', monospace;
    font-size: 16px;

    ${props => {
        if (props.operation === EditOperation.INSERT) {
            return "background-color: #daffd9";
        } else if (props.operation === EditOperation.DELETE) {
            return "background-color: #ffd9df";
        }
    }};
`;

const LineEntity = styled.div`
    display: inline-block;
    padding: 2px 8px;
    white-space: pre;
`;

const LineNum = styled(LineEntity)`
    width: 32px;
    padding-right: 8px;
    padding-left: 0px;
    text-align: right;
    color: #AAA;
    background-color: rgba(0, 0, 0, .1);
`;

const LineReplace = styled.div`
    display: inline-block;
    ${props => {
        if (props.operation === EditOperation.INSERT) {
            return "background-color: #a8f7a6";
        } else if (props.operation === EditOperation.DELETE) {
            return "background-color: #f7a6a6";
        }
    }};
`;


class DiffLine extends Component {

    render() {
        const { operation, symbol, entityNumber, subEditEntities } = this.props.editEntity

        let operator = <div>&nbsp;</div>;
        if (operation === EditOperation.INSERT) {
            operator = '+';
        } else if (operation === EditOperation.DELETE) {
            operator = '-';
        }

        let line =
            <LineEntity operation={operation}>
                {symbol}
            </LineEntity>;
        if (subEditEntities) {
            line =
                <LineEntity operation={operation}>
                    {subEditEntities.map((subEdit, i) => {
                        return <LineReplace operation={subEdit.operation} key={i}>{subEdit.symbol}</LineReplace>
                    })}
                </LineEntity>;
        }
        
        return (
            <Line operation={operation}>
                <LineNum operation={operation}>
                    {entityNumber}
                </LineNum>
                <LineEntity operation={operation}>
                    {operator}
                </LineEntity>
                {line}
            </Line>
        )
    }

}

export default DiffLine;