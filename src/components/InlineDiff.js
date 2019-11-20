import React, { Component } from 'react'
import { Box } from '@smooth-ui/core-sc'

class InlineDiff extends Component {

    render() {
       return (
        <Box
                backgroundColor="primary"
                width={{ sm: 1, md: 0.5 }}
                height={100}
                mx="auto"
                p={2}
                />
        )
        
    }

}

export default InlineDiff;