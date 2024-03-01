import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, RefreshControl, ScrollView} from 'react-native';


import {colors} from './Cons'
const IP=require('./Ipcim')


const KeresesSzoveg = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [blogData, setBlogData]= useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim+'blog');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const blog = async () => {
    try {
      const response = await fetch(IP.Ipcim+'blog');
      const json = await response.json();
      setBlogData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    getMovies();
  };

  useEffect(() => {
    blog()
  }, []);

 const formatum = (dateString)=> {
    const dateObject = new Date (dateString);
    const ev = dateObject.getFullYear();
    const honap = ('0'+ (dateObject.getMonth() + 1)).slice(-2)
    const nap = ('0'+dateObject.getDate()).slice(-2);
    return `${ev}-${honap}-${nap}`;
 }
 




  return (

<ScrollView  
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"white"}/>} >
 
    
    <View style={{flex: 1, padding: 24}}>
        
    <Text  style={{ fontSize:30, textAlign:'center', paddingHorizontal:8, color:colors.feher, marginTop:30, marginBottom:40, padding:30, paddingHorizontal:60, 
               backgroundColor: colors.black, borderWidth:2, borderColor:colors.sotetlime, alignSelf:'center', borderRadius:4,}}>Blog</Text>
               
    

      

        

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={blogData}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (

              
            <View style={{justifyContent:'center', alignItems:'center'}}>

              <View  style={{flexDirection: 'row', alignItems: 'center', color:colors.feher}}>

              <View style={{flex: 1, height: 1, backgroundColor:colors.feher,}} />


            <Text style={{ fontSize:30, textAlign:'center', paddingHorizontal:8, color:colors.feher}}>
          {formatum (item.blog_datum)}
            </Text>



            <View style={{flex: 1, height: 1, backgroundColor:colors.feher, color:colors.feher}} />

            </View>



            <Text style={{fontSize:20, textAlign:'center', color:colors.feher, marginBottom:30}}>
              {item.blog_uzenet}
            </Text>


           
            

         


      
      
            
            </View>
           
           
          )}
        />
      )}
    </View>
    </ScrollView>

  );
  
};



export default KeresesSzoveg;