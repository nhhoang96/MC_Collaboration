import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
// * as action: give me everything from action file and 
// assign it as action

import * as action from '../actions';

class ListItem extends Component {
    //Before component is updated, all of animation will be updated for us
    // smoothly (go away, appear, etc.)
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const {library, expanded} = this.props;
        if (expanded) {
            return (
                <CardSection>
                    <Text style={{ flex: 1 }}>
                        {library.description}
                    </Text>
                </CardSection>
            );
        }
    }
    render() {
        const { titleStyle } = styles;
        const { id, title } = this.props.library;

        <TouchableWithoutFeedback
            onPress={() => this.props.selectLibrary(id) }
        >
            <View>
                <CardSection>
                    <Text style={titleStyle}>
                        {title}
                    </Text>
                </CardSection>
                {this.renderDescription()}
            </View>
        </TouchableWithoutFeedback>
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    // Already assigned!!!
    const expanded = this.selectedLibraryId === ownProps.library.id;
    return { expanded };
};

// Do not want to map state to object, use NULL
// Pass actions as props
export default connect(mapStateToProps, actions)(ListItem);
