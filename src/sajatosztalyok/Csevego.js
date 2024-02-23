import React, {useState, useEffect} from 'react';
import {ActivityIndicator,Text, TextInput, View, Pressable, ScrollView, FlatList, RefreshControl, SafeAreaView} from 'react-native';
import { colors } from './Cons';
const IP=require('./Ipcim')


export default () => {
    const [isLoading, setLoading] = useState(true);
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel2, setBevitel2] = useState('');
  const [csevegodata, setCsevegodata] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const csillagoz = (email) => {
    const [name, domain] = email.split('@');
    const csillagozottNev = name.substring(1, name.length - 1).replace(/./g, '*');
    const elsoBetu = name.substring(0, 1);
    const utolsoBetu = name.substring(name.length - 1);
    return elsoBetu + csillagozottNev + utolsoBetu + '@' + domain;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const felvitel = async () => {
    if(bevitel1!=='' && bevitel2!==''){
    try {
      const response = await fetch(IP.Ipcim + 'uzenetfelvitel', {
        method: 'POST',
        body: JSON.stringify({bevitel1, bevitel2} ), 
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });
  
      if (response.ok) {
        console.log('Sikeres felvitel');
        alert("Sikeres felvitel");
        setBevitel1('');
        setBevitel2('');
        
      } else {
        console.error('Hiba a felvitelnél');
        
      }
    } catch (error) {
      console.error( error);
     
    }
  }
  else{

    alert("Adj meg minden adatot!")
  }
  };





    const csevego = async () => {
      
    try {
      const response = await fetch(IP.Ipcim+'csevegole');
      const json = await response.json();
      setCsevegodata(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    csevego();
    
  };

  useEffect(() => {
    csevego()



   
  }, []);






  return (
   
      <SafeAreaView>
<ScrollView   refreshControl={
<RefreshControl refreshing={refreshing} onRefresh={onRefresh}  tintColor="white"/>
}>

<View style={{flex: 1, padding: 24}}>
<Text  style={{ fontSize:30, textAlign:'center', color:colors.feher, marginTop:30, marginBottom:5, padding:30, paddingHorizontal:60, 
               backgroundColor: colors.black, borderWidth:2, borderColor:colors.sotetlime, alignSelf:'center', borderRadius:4,}}>Csevegő</Text>
            <View style={{marginTop:40}}>
      <Text style={{padding: 10, color:colors.feher}}>
      E-mail cím:
      </Text>
      <TextInput
        style={{height: 50, margin:5, backgroundColor:colors.feher, borderTopLeftRadius:10, borderBottomEndRadius:10}}
        placeholder="E-mail"
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
        onBlur={() => {
          if (!bevitel1.includes('@') || bevitel1.split('@')[1].length === 0  ) {
            alert('Hibás e-mail cím formátum');
            setBevitel1('');
          }
        }}
      />
   <Text style={{padding: 10, color:colors.feher}}>
        Üzenet: 
      </Text>
<TextInput
        style={{height: 90, margin:5, backgroundColor:colors.feher, borderTopLeftRadius:10, borderBottomEndRadius:10}}
        placeholder="Hagyj üzenetet!"
        onChangeText={newText => setBevitel2(newText)}
        defaultValue={bevitel2}
      />
        
       
        <Pressable onPress={()=>felvitel()}  style={({ pressed }) => ({
        backgroundColor: pressed ? colors.black : colors.sotetlime,
        elevation: pressed ? 2 : 0,
        borderRadius: 10, 
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        marginTop:20
         })}>
        <Text  style={{fontSize:25,  color:colors.black, padding:10, paddingHorizontal:59, textAlign:'center' }}>Felvitel</Text>
        </Pressable>
    </View>


<View>
  
</View>






  </View>
{isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={csevegodata}
          keyExtractor={({gyakorlat_id}) => gyakorlat_id}
          renderItem={({item}) => (

            <View style={{justifyContent:'center', marginBottom:15, borderRadius:3, alignItems:'center',   backgroundColor: colors.black, borderWidth:2, borderColor:colors.sotetlime,}}>
           

           
            <Text style={{ fontSize:19, textAlign:'center', paddingHorizontal:8, padding:30, color:colors.feher,}} >{csillagoz(item.csevego_email)}</Text>
            <Text style={{ fontSize:19, textAlign:'center', paddingHorizontal:8, color:colors.feher}}>
              {item.csevego_uzenet}
            </Text>



            


           
            

         
  
            </View>
           
           
          )}
          />
      )}

   
    </ScrollView>
    </SafeAreaView>
   
  );
        
};



