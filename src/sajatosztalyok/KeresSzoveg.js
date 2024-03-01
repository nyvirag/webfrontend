import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';


import { colors } from './Cons'

const IP=require('./Ipcim')


const KeresesSzoveg = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [izomcsoportdata, setizomcsoportData] = useState([]);
  const [kivalasztott, kivalasztottData] = useState();



  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'gyakorlatok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const izomcsopi = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'izomcsoportok');
      const json = await response.json();
      setizomcsoportData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    getMovies();
  };

  useEffect(() => {
    izomcsopi()
  }, []);


  const keresfuggveny = async () => {

    var adatok = {
      "bevitel1": kivalasztott
    }
    try {
      const response = await fetch(IP.Ipcim + 'keresszoveg', {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
      );
      const json = await response.json();

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



//   const kedveles = async (id) => {
//     alert("Sikeresen hozzáadva a kedvencekhez!")

    
//     setPressedItems(elozoallapot => ({
//      ...elozoallapot,
//      [id]: !elozoallapot[id] // Inverzálás: arra utal, hogy egy adott művelet hatását vagy eredményét megfordítjuk vagy visszavonjuk
//     }));
  

//     var adatok = {
//       "bevitel1": id
//     }
//     try {
//       const response = await fetch(Ipcim.Ipcim + 'kedveles_gyakorlat', {
//         method: "POST",
//         body: JSON.stringify(adatok),
//         headers: { "Content-type": "application/json; charset=UTF-8" }
//       }
//       );
//       const text = await response.text();

//       // alert(text)
//     } catch (error) {
//       alert("Valami hiba történt")
//     }

//   }

  return (
   
      <ScrollView >


        <View style={{ flex: 1, padding: 24, marginTop:50  ,backgroundColor:colors.black}}>
          <Picker
        
            selectedValue={kivalasztott}
            dropdownIconColor={colors.sotetlime}
            onValueChange={(itemValue, itemIndex) =>
              kivalasztottData(itemValue)
              

            } 
            style={{width:250, height:50, alignSelf:'center', marginBottom:30, borderRadius:10}}>



            {izomcsoportdata.map((item) => {
              return (

                <Picker.Item  style={{backgroundColor:colors.black}} label={item.izomcsoport_nev} value={item.izomcsoport_id} color="black" />
              )
            }
            )}
          </Picker>







          <Pressable onPress={() => keresfuggveny()} style={({ pressed }) => ({
            backgroundColor: pressed ? colors.black : colors.sotetlime,
            elevation: pressed ? 2 : 0,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,

          })} >

            <Text style={{ fontSize: 25, color: colors.black, padding: 10, textAlign: 'center' }} > Keresés</Text>
          </Pressable>




          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ gyakorlat_id }) => gyakorlat_id.toString()}
              renderItem={({ item }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center', height:600 }}>
                 
                    <View style={{justifyContent:'center', marginBottom:5, borderRadius:3, alignItems:'center',   backgroundColor: colors.black, borderWidth:2, borderColor:colors.sotetlime,}}>
                    <Text style={{ fontSize: 30, textAlign: 'center', paddingHorizontal: 8, color: colors.feher }}>
                      {item.gyakorlat_nev}
                    </Text>
                    
            
                  <Text style={{ fontSize: 20, textAlign: 'center', color: colors.feher }}>
                    {item.gyakorlat_leiras}
                  </Text>
                  <Image source={{ uri: IP.Ipcim + item.gyakorlat_img }} style={{ width:270, height: 270, marginBottom: 15, marginTop: 10, borderRadius: 10 }} />
             </View>



{/* 
                  <Pressable onPress={() => kedveles(item.gyakorlat_id)} >
                  
                      <Heart size={5} color={pressedItems[item.gyakorlat_id] ? colors.sotetlime : colors.feher} style={{ marginBottom: 20, }}>
                      </Heart>
                    



                  </Pressable> */}





                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
   
  );

};



export default KeresesSzoveg;