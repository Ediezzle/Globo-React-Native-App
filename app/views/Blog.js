import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import HTML from 'react-native-render-html';

export class Blog extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            blogLoaded: false
        };
    }

    componentDidMount(){
        return fetch('https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts').then((response)=>response.json()).then(responseJson=>{
            console.log(responseJson);
            this.setState({
                blogLoaded: true,
                blogList: Array.from(responseJson.posts)
            })
        }).catch(error=>{
            console.log(error);
        });
    }

    chooseBlog = (blogID) => {
        console.log(`Blog ID for chosen post is: ${blogID}`);
        this.props.navigation.navigate('BlogDetailRT', {blogId: blogID})
    }

    render () {
        
        return (
        <View>
            {this.state.blogLoaded && (
                <View style = {{paddingTop: 40}}>
                    <FlatList data = {this.state.blogList}
                    //FlatList expects ID keyExtractor to be a string
                    keyExtractor = {(item, index) => item.ID.toString()}
                    renderItem = {({item})=>
                    <BlogItem id = {item.ID}
                        title = {item.title}
                        imageSrc = {item.featured_image}
                        excerpt = {item.excerpt}
                        choosePost = {this.chooseBlog}
                    />    
                }
                />
                </View>
            )}

            {!this.state.blogLoaded && (
                <View style = {{paddingTop: 30}}>
                    <Text>LOADING...</Text>
                </View>
            )}
        </View>);
    }
}

export class BlogItem extends React.Component {

    blogChoice = () => {
        this.props.choosePost(this.props.id);
    }

    render () {
        //href here is taking dummy data
        const blogItems = `
            <a href = ${this.props.id}> 
            <img src = "${this.props.imageSrc}" />
            <h1>${this.props.title}</h1>
            ${this.props.excerpt}
            </a>`;

        return (
            <View style = {{borderBottomWidth: 2, borderBottomColor: '#000000', borderStyle: 'solid'}}>
                <HTML source = {{html: blogItems}} onLinkPress = {()=>this.blogChoice()} />
            </View>
        );
    }
}