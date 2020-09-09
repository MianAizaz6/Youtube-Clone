import React from 'react';
import {Grid} from '@material-ui/core';
import youtube from './api/youtube';
import {SearchBar, VideoDetail , VideoList} from './Components';



class App extends React.Component{
    state={
        videos:[],
        selectedVideo:null,
    }

    onVideoSelect= (video) => {
        this.setState({selectedVideo : video});
    } 
    componentDidMount(){
        this.handleSubmit('react js course');
    }

    handleSubmit = async (searchTerm) => {
        const responce = await youtube.get('search',{
            params:{
                part:'snippet',
                maxResults:5,
                key:'AIzaSyBkX_pLNfwITGOGsfWHY75oJI9Wt8QYOl0',
                q:searchTerm,
            }
            
        });
        
      //  console.log(responce.data.items);
      this.setState({videos:responce.data.items , selectedVideo:responce.data.items[0]});
    }
    render(){
        const {selectedVideo , videos } = this.state;
        return(
           <Grid justify="center" container spacing={10}>
               <Grid item xs={12}>
                  <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                           <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                  </Grid>
               </Grid>
           </Grid>
        )
    }
}

export default App;
