import React, { Component } from 'react'
import { Box, Text, Separator } from '@smooth-ui/core-sc'
import { RoundBoxer } from './Shared'
import styled from '@xstyled/styled-components';
// Images
import edit_distance from '../assets/edit_distance.png'
import matrix from '../assets/matrix.png'

const Image = styled.img`
    max-width: 576px;
    width: 100%;
    height: auto;
    object-fit: contain; 
    margin-bottom: -3px;
`;

const CodeText = styled(Text)`
    font-family: 'Inconsolata', monospace;
`;

class Description extends Component {

    render() {
        return (
            <>
                <Text variant="h2">Background</Text>
                <Separator/>
                <Text variant="p">
                    This project was inspired by the difficulties a friend of mine was experiencing at
                    work while trying to build a webpage which compared two JSON files. He wanted to
                    highlight the differences between the two files and display this to the user, and
                    he was able to find a component on NPM to do so. However, the component would
                    naively compare each line from one file with the same line in the other. This was
                    not ideal, since if one file had additions or deletions, they wouldn't be displayed properly.
                    Since JSON files are highly structured, he was able to detect insertions or
                    deletions by comparing the set of keys in each JSON object - then for each
                    descripency he would insert a corresponding blank line in the other file. When
                    applied recusively to all nested sub-objects, this approach
                    fixed the issue, but it got me thinking that <em>there must be a better way to do
                    this.</em> 
                    <br/>
                    <br/>
                    I had a lot of ideas bouncing around in my head, many of which drawn from the book
                    <em>Algorithms</em> by Sanjoy Dasgupta et al. which I had been reading during my
                    morning commute. That day I had happened to be reading the chapter on dynamic
                    programming, and I had the Wagner–Fischer algorithm for solving edit distance
                    between two string still fresh in my mind. I figured that with some work, I could adapt
                    that algorithm to instead solve edit distance between two documents instead.
                    And from that, this project was born. 
                    <br/>
                    <br/>
                    If you're interested in how the original edit distance algorithm works, or the steps
                    I took to adapt it to work with entire documents, then keep reading into the next section.
                    If instead you want to play around with the algorithm youself, go ahead and scroll to the
                    bottom of the page for a demo.
                </Text>

                <Text variant="h2" mt={5}>Algorithm Overview</Text>
                <Separator/>
                <Text variant="p">
                    Edit distance is defined as the minimum number of operations needed to make two strings
                    equal, where an operation can be:
                    <ul>
                        <li>Inserting a new character</li>
                        <li>Deleting a charcter</li>
                        <li>Substituting a character for another</li>
                    </ul>
                    For instance, given the words <CodeText>Saturday</CodeText> and <CodeText>Sunday</CodeText>,
                    the edit distance between them is 3; we must insert the letters <CodeText>a</CodeText> and&nbsp;
                    <CodeText>t</CodeText> to <CodeText>Sunday</CodeText>, and then replace the letter&nbsp;
                    <CodeText>n</CodeText> with <CodeText>r</CodeText>. I have illistrated this in the 
                    figure below:
                </Text>
                <Box row justifyContent={'center'} p={3}>
                    <RoundBoxer col={{xs:1, sm:"auto"}}>
                        <Image src={edit_distance}/>
                    </RoundBoxer>
                </Box> 
                <Text variant="p">
                    Solving for the edit distance between two strings lends itself well to dynamic programming,
                    as we can break the problem down into small subproblems which can be reused multiple times.
                    For instance, let's return to our example above, using the words <CodeText>Saturday</CodeText>
                    &nbsp;and <CodeText>Sunday</CodeText>. Let's also assume we know that the edit distance for the
                    following pairs:
                    <ol type="a">
                        <li><CodeText>Saturday</CodeText>, <CodeText>Sunda</CodeText></li>
                        <li><CodeText>Saturda</CodeText>, <CodeText>Sunday</CodeText></li>
                        <li><CodeText>Saturda</CodeText>, <CodeText>Sunda</CodeText></li>
                    </ol>
                    Then we know that the edit distance between <CodeText>Saturday</CodeText> and&nbsp;
                    <CodeText>Sunday</CodeText> is the minimum of the following:
                    <ul>
                        <li>Edit distance a) + 1 to insert <CodeText>y</CodeText> into <CodeText>Sunda</CodeText>, or equivalently delete <CodeText>y</CodeText> from <CodeText>Saturday</CodeText></li>
                        <li>Edit distance b) + 1 to insert <CodeText>y</CodeText> into <CodeText>Saturda</CodeText>, or equivalently delete <CodeText>y</CodeText> from <CodeText>Sunday</CodeText> </li>
                        <li>Edit distance c) + 1 the following pair of characters (<CodeText>y, y</CodeText>) are not equal and hence we have to substitue one, or + 0 if they are equal</li>
                    </ul>
                    We can generalize this as follows: given two strings denoted as <CodeText>A, B</CodeText>, let <CodeText>d(i, j)</CodeText> denote
                    the edit distance between the substring of the first <CodeText>i</CodeText> character of <CodeText>A</CodeText> and the
                    first <CodeText>j</CodeText> characters of <CodeText>B</CodeText>. Then we have:
                    <br/>
                    <center><CodeText>d(i, j) = min( d(i-1, j)+1, d(i, j-1)+1, d(i-1, j-1) + diff(A[i], B[j])</CodeText></center>
                    <br/>
                    where <CodeText>CodeText(A[i], B[j])</CodeText> is equal to 1 if the characters <CodeText>A[i] = B[j]</CodeText>, otherwise 0.
 
                </Text>

                <Text variant="p" color={"#D8D8D8"}>
                <i className="fas fa-square" color={"#D8D8D8"}></i>
                </Text>
                <Text variant="p" color={"#A8F7A6"}>
                <i className="fas fa-square" color={"#A8F7A6"}></i>
                </Text>
                <Text variant="p" color={"#A088FF"}>
                <i className="fas fa-square" color={"#A088FF"}></i>
                </Text>
                <Box row justifyContent={'center'} p={3}>
                    <RoundBoxer col={{xs:1, sm:"auto"}}>
                        <Image src={matrix}/>
                    </RoundBoxer>
                </Box> 

                <Text variant="h2" mt={5}>Try it Out!</Text>
                <Separator/>
            </>
        )
    }
}

export default Description;