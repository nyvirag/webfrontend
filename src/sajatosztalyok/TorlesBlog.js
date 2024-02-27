import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from './Cons';
const IP = require('./Ipcim')


const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_valami = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'blog');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    letolt_valami();
  }, []);


  const torles = (szam) => {
   // alert(szam)
    const biztos = window.confirm("Biztos ki szeretnéd törölni?")
    if (biztos) {


      var bemenet = {
        bevitel1: szam
      }

      fetch(IP.Ipcim + "torlesblog", {
        method: "DELETE",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }

      )
        .then(x => x.text())
        .then(y => {
          alert(y)
          letolt_valami()
        });
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ blog_id }) => blog_id}
          renderItem={({ item }) => (

            <View >



              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.feher, }} />

                <Text style={{ textAlign: 'center', paddingHorizontal: 8, fontSize: 25, color: colors.feher, fontWeight: 'bold', }}>
                  {item.blog_datum}
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.feher }} />
              </View>

              <Text style={{ textAlign: 'center', marginBottom: 20, color:colors.feher}}>
                {item.blog_uzenet}
              </Text>

              <TouchableOpacity
                style={styles.torlesgomb}
                onPress={async () => torles(item.csevego_id)}
              >
                <Text style={{ color: colors.feher, fontWeight: "bold", fontSize: 15 }}  >Törlés</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({

  torlesgomb: {
    alignItems: "center",
    backgroundColor: 'darkred',
    borderRadius: 10,
    padding: 10,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
    borderBottomWidth:2
    
  }
});

export default App;