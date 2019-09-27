import React, { Component } from 'react';
import { View, Dimensions, StatusBar, ActivityIndicator, Text, FlatList, TextInput } from 'react-native';
import { setData } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Color } from '../global/util';
import { List, ListItem } from 'native-base';
import Modal from "react-native-modal";
 
let { width, height } = Dimensions.get('window');
width = width;

class PickArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected1: "key1",
        };
      }

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }

    render() {
        return (
        <View>
            <Modal isVisible={false}>
                <View style={{ flex: 1, backgroundColor: Color.white, marginVertical : '25%', paddingHorizontal : 16, paddingTop : 16 }}>
                    <TextInput placeholder="eg. Boring Road"/>
                    <List>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                            <ListItem
                                roundAvatar
                                title={`${item.name.first} ${item.name.last}`}
                                subtitle={item.email}
                                avatar={{ uri: item.picture.thumbnail }}
                            />
                            )}
                        />
                    </List>
                </View>
            </Modal>
        </View>
        );
    }
  }

  function mapStateToProps(state, props) {
    return {}
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PickArea);
