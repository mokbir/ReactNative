//Components/Search.js

import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends Component {
   constructor(props){
     super(props)
     this.state = {
       films: [],
       searchedText: "",
       isLoading: false
     }
   }

   _searchTextInputChanged(text){
     this.setState({ searchedText: text })
   }

  _loadFilms(){
    if(this.state.searchedText.length > 0){
      this.setState({isLoading: true});
      getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
        this.setState({ films: data.results, isLoading: false });

      });
    }

  }
  _displayeLoading(){

      if(this.state.isLoading){
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large'/>
          </View>
        )
      }

  }
  render(){
    return (
      <View style={styles.main_container}>
        <TextInput placeholder='Titre du film' style={styles.textinput} onChangeText={(text)=> this._searchTextInputChanged(text)}
            onSubmitEditing={()=> this._loadFilms()}
        />
        <Button title='Rechercher' onPress={()=>this._loadFilms()} style={{ height: 50}}/>
        {/* Utilisation flatList component */}
        <FlatList
            data = {this.state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._displayeLoading()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Search
