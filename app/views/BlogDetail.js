import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import HTML from 'react-native-render-html';

export class BlogDetail extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {postLoaded: false}
    }

    componentDidMount() {
        
        let blogId = this.props.navigation.getParam('blogId', 'NO BLOG');
        return fetch(`https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts/${blogId}`).then((response)=>response.json()).then(responseJson=>{
            console.log(responseJson);
            this.setState({
                postLoaded: true,
                postTitle: responseJson.title,
                postImage: responseJson.featured_image,
                postContent: responseJson.content,
                postID: responseJson.ID
            })
        }).catch(error=>{
            console.log(error);
        });
    }

    goBack = ()=>{
        this.props.navigation.navigate('BlogRT');
    }

    render() {
        const blogTagStyles = {
            img: {display: 'none'}
        };

        const blogClassStyles = {
            blogTitle: {marginLeft: 'auto', marginRight: 'auto'},
            blogContent: {marginLeft: 10, marginRight: 10},
            blogBack: {marginLeft: 'auto', marginRight: 'auto', paddingBottom: 20}
        }

        let postDetails = `
            <div class = "blogTitle">
                <h1>${this.state.postTitle}</h1>
            </div>

            <div class = "blogContent">
                <h1>${this.state.postContent}</h1>
            </div>
            
            <div class = "blogBack">
                <a href = ${this.state.postID} style = "textDecorationLine: none; color: #000000">
                    <h2>GO BACK</h2>
                </a>
            </div>
            `;

        return (
            <View style = {{paddingTop: 30}}>
                {this.state.postLoaded && (
                    <ScrollView>
                        <Image 
                            style = {{width: '100%', height: 200}}
                            source = {{uri: this.state.postImage}}
                        />
                        <HTML
                            source = {{html: postDetails}}
                            tagsStyles = {blogTagStyles}
                            classesStyles = {blogClassStyles}
                            onLinkPress = {()=>this.goBack()}>
                        </HTML>
                    </ScrollView>
                )}
                {!this.state.postLoaded && (
                    <View style = {{paddingTop: 20, alignItems: 'center'}}>
                        <Text>LOADING...</Text>
                    </View>
                )}
            </View>
        );
    }

};