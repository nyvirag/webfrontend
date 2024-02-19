import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim +'gyakorlatok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({gyakorlat_id}) => gyakorlat_id}
          renderItem={({item}) => (
            <View>
            <Text style={{textAlign:'center', fontSize:25}}>
              {item.gyakorlat_nev}
            </Text>

             <Text>
             {item.gyakorlat_leiras}
           </Text>
           </View>
          )}
        />
      )}
    </View>
  );
};

export default App;