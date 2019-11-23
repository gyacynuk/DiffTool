import React, { Component } from 'react'
import { Text, Separator } from '@smooth-ui/core-sc'

class Description extends Component {


    render() {
        return (
            <>
                <Text variant="h2">Background</Text>
                <Separator/>
                <Text variant="p">
                    Reading <em>Algorithms</em> by DVP during my morning commute. Had been thinking about
                    the dynamic programming approach to solving the minimum edit distance between two strings.
                    Colleage was having trouble with a third-party diff tool where the tool was not smart enough
                    to line up mathcing lines. I thought I could solve it, and decided to take this oppourtinuty
                    to also make my first forray into React.
                </Text>

                <Text variant="h2" mt={5}>Algorithm Overview</Text>
                <Separator/>
                <Text variant="p">
                    What is edit distance, levenschtein distance.
                    <br/>
                    The DP algorithm outlined in the book does not work for document comparison, since it
                    has no way of measuring similarity between lines. This makes sense, as with single characters,
                    they either are equal or not. However when comparing entire strings, things are not so black and
                    white. We can have varying degrees of similarity, and I needed a way to concretely define this.
                    So I use compare levenshtein distance between strings as a measure of similarity, and then use
                    a modified edit distance algorithm to try and minimize cost across the whole document.
                </Text>

                <Text variant="h2" mt={5}>Try it Out!</Text>
                <Separator/>
            </>
        )
    }
}

export default Description;