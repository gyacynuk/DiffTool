/**
 * ------------------------------------------------------------------------------------------------
 * A set of shared components to be used across the application.
 *
 * Author: Griffin Yacynuk
 * ------------------------------------------------------------------------------------------------
 */
import { Box } from '@smooth-ui/core-sc'
import styled from '@xstyled/styled-components';

/**
 * An extension of the Box, with rounded edges
 */
export const RoundBoxer = styled(Box)`
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 4px;
    overflow: hidden;
`;
