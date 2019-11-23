import React, { Component } from 'react'
import { Box, Text } from '@smooth-ui/core-sc'
import styled from '@xstyled/styled-components';

const TitleText = styled(Text)`
    color: #FFF;
    text-align: center;
`

const TitleLink = styled(Text)`
    color: #17A2B8;
    text-decoration: none;
`

class Title extends Component {

    render() {
        return (
            <Box
                backgroundColor="#333"
                width={1}
                p={5}>
                   <TitleText variant="h1">Text Comparison Tool</TitleText>
                   <TitleText variant="h4">Project by <TitleLink
                        forwardedAs="a"
                        href="https://www.linkedin.com/in/griffin-yacynuk/"
                        target="_blank"
                        rel="noopener noreferrer">Griffin Yacynuk</TitleLink>
                    </TitleText>
            </Box>
            
        )
    }
}

export default Title;