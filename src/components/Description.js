/**
 * ------------------------------------------------------------------------------------------------
 * A component used to build the text descriptions in the webpage, including the "Background" and
 * "Algorithm Overview" sections. This also creates the "Try it Out" header.
 *
 * Author: Griffin Yacynuk
 * ------------------------------------------------------------------------------------------------
 */
import React, { Component } from 'react'
import { Box, Text, Separator } from '@smooth-ui/core-sc'
import { RoundBoxer } from './Shared'
import styled from '@xstyled/styled-components';
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
                    work, while trying to build a webpage which compared two JSON files. He wanted to
                    highlight the differences between the two files and display this to the user, and
                    he was able to find a component on NPM to do so. However, the component would
                    naively compare each line from one file with the same line in the other. This was
                    not ideal, since if one file had additions or deletions, they wouldn't be displayed properly.
                    Since JSON files are highly structured, he was able to detect insertions or
                    deletions by comparing the set of keys in each JSON object - then for each
                    discrepancy he would insert a corresponding blank line in the other file. When
                    applied recursively to all nested sub-objects, this approach
                    fixed the issue, but it got me thinking that <em>there must be a better way to do
                    this.</em> 
                    <br/>
                    <br/>
                    I had a lot of ideas bouncing around in my head, many of which were drawn from the book
                    <em>Algorithms</em> by Sanjoy Dasgupta et al. which I had been reading during my
                    morning commute. That day I had happened to be reading the chapter on dynamic
                    programming, and I had the Wagner–Fischer algorithm for solving edit distance
                    between two string still fresh in my mind. I figured that with some work, I could adapt
                    that algorithm to solve for the edit distance between two documents instead.
                    And from that, this project was born. 
                    <br/>
                    <br/>
                    If you're interested in how the original edit distance algorithm works, or the steps
                    I took to adapt it to work with entire documents, then keep reading into the next section.
                    If instead you want to play around with my algorithm yourself, go ahead and scroll to the
                    bottom of the page for an interactive demo.
                </Text>

                <Text variant="h2" mt={5}>Algorithm Overview</Text>
                <Separator/>
                <Text variant="p">
                    Edit distance is defined as the minimum number of operations needed to make two strings
                    equal, where an operation can be:
                    <ul>
                        <li>Inserting a new character</li>
                        <li>Deleting a character</li>
                        <li>Substituting a character for another</li>
                    </ul>
                    For instance, given the words <CodeText>Saturday</CodeText> and <CodeText>Sunday</CodeText>,
                    the edit distance between them is 3; we must insert the letters <CodeText>a</CodeText> and&nbsp;
                    <CodeText>t</CodeText> to <CodeText>Sunday</CodeText>, and then replace the letter&nbsp;
                    <CodeText>n</CodeText> with <CodeText>r</CodeText>. I have illustrated this in the 
                    figure below. While there exists other combinations of operations which will make these strings equal,
                    the operations I have provided are minimal in quantity, and hence correspond to the edit distance.
                </Text>
                <Box row justifyContent={'center'} p={3}>
                    <RoundBoxer col={{xs:1, sm:"auto"}}>
                        <Image src={edit_distance}/>
                    </RoundBoxer>
                </Box> 
                <Text variant="p">
                    Solving for the edit distance between two strings lends itself well to dynamic programming,
                    as we can break the problem down into smaller subproblems which can be reused multiple times.
                    For instance, let's return to our example above, using the words <CodeText>Saturday</CodeText>
                    &nbsp;and <CodeText>Sunday</CodeText>. Let's also assume for argument's sake that we know the
                    edit distance for the following pairs:
                    <ol type="a">
                        <li><CodeText>Saturday</CodeText>, <CodeText>Sunda</CodeText></li>
                        <li><CodeText>Saturda</CodeText>, <CodeText>Sunday</CodeText></li>
                        <li><CodeText>Saturda</CodeText>, <CodeText>Sunda</CodeText></li>
                    </ol>
                    Then from this we can deduce that the edit distance between <CodeText>Saturday</CodeText> and&nbsp;
                    <CodeText>Sunday</CodeText> must be the minimum of the following:
                    <ul>
                        <li>Edit distance a. + 1 to insert <CodeText>y</CodeText> into <CodeText>Sunda</CodeText>, or equivalently delete <CodeText>y</CodeText> from <CodeText>Saturday</CodeText></li>
                        <li>Edit distance b. + 1 to insert <CodeText>y</CodeText> into <CodeText>Saturda</CodeText>, or equivalently delete <CodeText>y</CodeText> from <CodeText>Sunday</CodeText> </li>
                        <li>Edit distance c. + 1 if the following pair of characters (<CodeText>y, y</CodeText>) are not equal (meaning we have to substitute one), or + 0 if they are equal (which they are in this case)</li>
                    </ul>
                    We can generalize this into a recurrence relation as follows: given two strings denoted
                    as <CodeText>A, B</CodeText>, let <CodeText>d(i,j)</CodeText> be the edit distance between
                    the substring of the first <CodeText>i</CodeText> characters of <CodeText>A</CodeText> and the
                    first <CodeText>j</CodeText> characters of <CodeText>B</CodeText>. Then we have:
                    <br/>
                    <br/>
                    <center><CodeText>d(i, j) = min( d(i-1, j) + 1, d(i, j-1) + 1, d(i-1, j-1) + diff(A[i],B[j]) )</CodeText></center>
                    <br/>
                    where <CodeText>diff(A[i],B[j])</CodeText> is equal to 1 if the characters <CodeText>A[i] = B[j]</CodeText>, otherwise 0.
                    From this recurrence relationship, we can develop our dynamic programming algorithm. We can use
                    a matrix <CodeText>M</CodeText> to store the results of our subproblems so they can be reused
                    without recomputing their values.
                    Let <CodeText>M[i,j]</CodeText> store the edit distance <CodeText>d(i,j)</CodeText>, and let
                    zero-indices represent the edit distance between the empty string and the corresponding substring.
                    From this, we can infer that <CodeText>M[0,0] = 0</CodeText> (since the empty string compared
                    with itself has an edit distance of 0). Furthermore, any string <CodeText>S</CodeText> compared
                    to the empty string has an edit distance of <CodeText>length(S)</CodeText>, so knowing this we
                    can populate all the entries in the first row and column. Now, starting at <CodeText>M[1,1]</CodeText> we
                    can apply our recurrence relation defined above, since we have all needed values to
                    compute <CodeText>M[1,1] = diff(1,1)</CodeText> stored in the adjacent entries to the top, 
                    left, and top-left of this entry (<CodeText>M[0,1] = diff(0,1), M[1,0] = diff(1,0), M[0,0] = diff(0,0)</CodeText>).
                    By continuing to populate values in the matrix across the scan-line (left to right, top to bottom),
                    the entire matrix can be populated. Finally, the bottom-right-most entry will contain the
                    edit distance between the entirety of the strings, giving us our solution.
                    <br/>
                    <br/>
                    From this matrix, we can also determine the optimal sequence of operations needed to make
                    the two strings equal by walking backwards from the bottom-right-most square
                    to <CodeText>M[1,1]</CodeText>. At each step in the walk, we move up, left, or diagonally up and left
                    into the square with the least cost. In the case of a tie, we always opt for moving on a
                    diagonal, so we will reach <CodeText>M[1,1]</CodeText> with fewer steps. I have illustrated
                    this process below, with arrows marking the path walked, grey squares (
                    <Text variant="p" color={"#D8D8D8"}>
                        <i className="fas fa-square" color={"#D8D8D8"}></i>
                    </Text>
                    ) representing the case where characters are the same (cost of 0), green squares (
                    <Text variant="p" color={"#A8F7A6"}>
                        <i className="fas fa-square" color={"#A8F7A6"}></i>
                    </Text>
                    ) representing insertions (cost of 1), and purple squares (
                    <Text variant="p" color={"#A088FF"}>
                        <i className="fas fa-square" color={"#A088FF"}></i>
                    </Text>
                    ) representing substitutions (cost of 1).
                </Text>
                <Box row justifyContent={'center'} p={3}>
                    <RoundBoxer col={{xs:1, sm:"auto"}}>
                        <Image src={matrix}/>
                    </RoundBoxer>
                </Box> 
                <Text variant="p">
                    Initially I thought I could apply this algorithm directly to two documents, treating each
                    line as if it were a character. But this did not produce the results I was expecting. While
                    this approach did manage to match up identical lines with each other, it would pair inserted, 
                    modified or deleted lines with random lines in the other file. This is because it was treating
                    each line like a character, and when comparing two characters, they either are the same or they
                    are not. However when dealing with entire lines of text, this is not entirely true:
                    there is also a concept of <em>similarity</em> between lines, and to match lines with there most
                    similar pair, I somehow had to quantify this.
                    <br/>
                    <br/>
                    Luckily for me I had a great tool to do so, having just implemented the edit distance algorithm.
                    So for my second approach, I would modify my algorithm to compute the edit distance over the entire
                    document where the cost of an insertion or deletion is equal to the length of the inserted or deleted line,
                    and the cost of a substitution is the edit distance between the lines being substituted!
                    This algorithm yielded much better results, however it still wasn't perfect. Consider the following
                    example documents:
                </Text>
                <Box row justifyContent={'center'} p={3}>
                    <RoundBoxer col={3/7} p={{xs:1, md:3}} mx={{xs:1, md:3}}>
                        <CodeText>
                            Hello World!
                            <br/>
                            Hello
                        </CodeText>
                    </RoundBoxer>
                    <RoundBoxer col={3/7} p={{xs:1, md:3}} mx={{xs:1, md:3}}>
                        <CodeText>
                            Hello
                        </CodeText>
                    </RoundBoxer>
                </Box> 
                <Text variant="p">
                    My algorithm would opt to align <CodeText>"Hello World!"</CodeText> with <CodeText>"Hello"</CodeText> and
                    then consider the <CodeText>"Hello"</CodeText> in the
                    left-most document as an insertion (at a cost of 7 for substitution + 5 for insertion = 12), since
                    the substitution operation is a diagonal step on the walk described above. However
                    the desired behaviour would have been to consider <CodeText>"Hello World!"</CodeText> as an insertion,
                    and then match <CodeText>"Hello"</CodeText> with <CodeText>"Hello"</CodeText> (also at cost of 12), but
                    this does not result in a diagonal step. 
                    To overcome this, I initially tried removing the
                    prioritization on diagonal steps in the case of a tie, but this ended up producing strange
                    behaviour. I also tried re-weighting the cost of the operations, making insertions and
                    deletions cheaper, but when doing so I could always provide an adversarial example which would once again
                    produce strange behaviour.
                    <br/>
                    <br/>
                    I was finally able to overcome this when I had the realization that the algorithms core goal should be to match up
                    as many identical lines as possible, and then find the best pairing of similar lines afterwards.
                    With this in mind, I restructured the algorithm so that whenever it paired two identical lines
                    together, this operation would have a negative cost such that the resulting element in the matrix
                    becomes 0. Furthermore, I increased the cost of all other operations by 1, thus reserving the
                    0-cost element for perfect matches. By doing so the algorithm will always opt to pair up macthing
                    lines (as they have a cost strictly less than all other operations), whilst matching up the
                    non-matching lines with their most similar pairs. Unfortunately while this change does pair
                    up the lines of the two documents in the optimal fashion, it comes at the cost of losing
                    the measurement of total "edit distance" between the documents (which luckily is of no
                    interest to me).
                    <br/>
                    <br/>
                    And with that, we have my algorithm for document comparison. To test this algorithm out,
                    see the next interactive section below where you can see how this algorithm performs with
                    your own documents!
                </Text>

                <Text variant="h2" mt={5}>Try it Out!</Text>
                <Separator/>
            </>
        )
    }
}

export default Description;
