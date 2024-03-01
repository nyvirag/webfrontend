import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, ScrollView}  from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Ipcim from './Ipcim';
import { colors } from './Cons';


const KeresesSzoveg = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const [etrendData, setetrendData] = useState([]);
  const [kivalasztott, kivalasztottData] = useState();



  const izomcsopi = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'sulyok');
      const json = await response.json();
      setetrendData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    izomcsopi()
  }, []);


  const keresfuggveny = async () => {

    var adatok = {
      "bevitel1": kivalasztott
    }
    try {
      const response = await fetch(Ipcim.Ipcim + 'keresferfikaja', {
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


  return (
    
    <ScrollView>
      


      <View style={{ flex: 1, padding: 24, marginTop:50 }}>
        <Picker
          selectedValue={kivalasztott}
          mode='dropdown'
          dropdownIconColor={colors.sotetlime}
          onValueChange={(itemValue, itemIndex) =>
            kivalasztottData(itemValue)
            

          }
          style={{width:250, height:50, alignSelf:'center', marginBottom:30, borderRadius:10}}
        >



          {etrendData.map((item) => {
            return (

              <Picker.Item  style={{backgroundColor:colors.black}} label={item.suly_fajta} value={item.suly_id} color="white" />
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
        shadowRadius: 3
         })} >
          <Text style={{ fontSize: 25, color: colors.black, padding: 10, textAlign: 'center' }} > Keresés</Text>
        </Pressable>


        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>

            
          
          <FlatList
            data={data}
            keyExtractor={(id) => id}
            renderItem={({ item }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                
                <View style={{backgroundColor: colors.black, borderWidth:2, borderColor:colors.sotetlime, width:400, marginTop:30, marginBottom:40}}>
                  
                  <Text style={{ textAlign: 'center', paddingHorizontal: 8, fontSize: 25, color:colors.feher, fontWeight:'bold', }}>
                    {item.kategoria_nev}
                  </Text>
               

                <Text style={{ fontSize: 20, textAlign: 'center', color:colors.feher, padding:10 }}>
                  {item.mertek}kg-os Férfi számára 
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center', color:colors.feher }}>
                  {item.etel} 
                </Text>
                <Text style={{ fontSize: 20, textAlign: 'center', color:colors.feher, marginTop:20, marginBottom:20}}>
                 Fehérje: {item.feherje} ,
                 Szénhidrát: {item.szenhidrat} ,
                 Zsír: {item.zsir} 
                </Text>
                </View>

              </View>
            )}
          />

</View>
          
        )}

      </View>

    </ScrollView>
    
  );



  
};






export default KeresesSzoveg;