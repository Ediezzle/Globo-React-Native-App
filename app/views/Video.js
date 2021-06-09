import React from 'react';
import {Text, View, FlatList, Image, TouchableWithoutFeedback} from 'react-native';

export class Video extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {listLoaded: false};
    }

    componentDidMount () {
        //console.log('Video');
        return fetch(
            'https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=AIzaSyD0GDXpKEX53z8osqespW4vxe4UZtQbegc'
        )
        .then(response=>response.json())
        .then(responseJson=>{
            console.log('json response', responseJson);
            console.log('array response', Array.from(responseJson.items));
            this.setState({
                listLoaded: true,
                videoList: Array.from(responseJson.items)
            });
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render () {
        const navigation = this.props.navigation;
        let list = (<View style = {{paddingTop: 30}}>
                        <Text>LOADING...</Text>
                    </View>);
        if(this.state.listLoaded){
            list = (<View style = {{paddingTop: 30}}>
                           <FlatList 
                                data = {this.state.videoList}
                                renderItem = {({item})=>
                                    <TubeItem 
                                        navigation = {navigation}
                                        id = {item.id.videoId}
                                        title = {item.snippet.title}
                                        imageSrc = {item.snippet.thumbnails.high.url}/>
                                }
                           />
                    </View>);
        }
        
        //return (
            // <View>
            //     {
            //         this.state.listLoaded && (
            //            <View style = {{paddingTop: 30}}>
            //                <FlatList 
            //                     data = {this.state.videoList}
            //                     renderItem = {({item})=>
            //                         <TubeItem 
            //                             id = {item.id.videoId}
            //                             title = {item.snippet.title}
            //                             imageSrc = {item.snippet.thumbnails.high.url}/>
            //                     }
            //                />
            //            </View> 
            //         )
            //     }

            //     {
            //         !this.state.listLoaded && (
            //             <View style = {{paddingTop: 30}}>
            //                 <Text>LOADING...</Text>
            //             </View>
            //         )
            //     }
            // </View>
        //);
        return list;
    }
}

export class TubeItem extends React.Component {

    onPress = () => {
        console.log(this.props.id);
        this.props.navigation.navigate('VideoDetailRT', {ytubeId: this.props.id});
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress = {this.onPress}>
                <View style = {{paddingTop: 20, alignItems: 'center'}}>
                    <Image 
                        style = {{width: '100%', height: 200}}
                        source = {{uri: this.props.imageSrc}}/>
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}