import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, TextInput, View, Pressable, ScrollView, FlatList, RefreshControl, SafeAreaView } from 'react-native';




import { colors } from './Cons';

const IP = require('./Ipcim')


export default () => {
    const [isLoading, setLoading] = useState(true);
    const [bevitel1, setBevitel1] = useState('');
    const [bevitel2, setBevitel2] = useState('');
    const [bevitel3, setBevitel3] = useState('');
    const [blogData, setBlogData] = useState('');






  


    const felvitel = async () => {
        if (bevitel1 !== '' && bevitel2 !== '' && bevitel3 !== '' ) {
            try {
                const response = await fetch(IP.Ipcim + 'ujblog', {
                    method: 'POST',
                    body: JSON.stringify({ bevitel1, bevitel2, bevitel3 }),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' }
                });

                if (response.ok) {
                    console.log('Sikeres felvitel');
                    alert("Sikeres felvitel");
                    setBevitel1('');
                    setBevitel2('');
                    setBevitel3('');
                    blog();

                } else {
                    console.error('Hiba a felvitelnél');

                }
            } catch (error) {
                console.error(error);

            }
        }
        else {

            alert("Adj meg minden adatot!")
        }
    };





    const blog = async () => {

        try {
            const response = await fetch(IP.Ipcim + 'blog');
            const json = await response.json();
            setBlogData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        

    };

    useEffect(() => {
        blog()




    }, []);






    return (

        <SafeAreaView>
            <ScrollView>

                <View style={{ flex: 1, padding: 24 }}>
                    <Text style={{
                        fontSize: 30, textAlign: 'center', color: colors.feher, marginTop: 30, marginBottom: 5, padding: 30, paddingHorizontal: 60,
                        backgroundColor: colors.black, borderWidth: 2, borderColor: colors.sotetlime, alignSelf: 'center', borderRadius: 4,
                    }}>Új Blog</Text>
                    <View style={{ marginTop: 40 ,alignSelf:'center'}}>
                        <Text style={{ padding: 10, color: colors.feher }}>
                            Dátum:
                        </Text>
                        <TextInput
                            style={{ height: 90, margin: 5, backgroundColor: colors.feher, borderTopLeftRadius: 10, borderBottomEndRadius: 10,  color:'grey' , width:600, }}
                            placeholder="Add meg a dátumot!"
                            onChangeText={newText => setBevitel2(newText)}
                            defaultValue={bevitel2}
                        />


                        <Text style={{ padding: 10, color: colors.feher }}>
                            Blog:
                        </Text>
                        <TextInput
                            style={{ height: 90, margin: 5, backgroundColor: colors.feher, borderTopLeftRadius: 10, borderBottomEndRadius: 10 , color:'grey'}}
                            placeholder="Hagyj üzenetet!"
                            onChangeText={newText => setBevitel1(newText)}
                            defaultValue={bevitel1}
                        />

                        <Text style={{ padding: 10, color: colors.feher }}>
                            Nyelv:
                        </Text>
                        <TextInput
                            style={{ height: 90, margin: 5, backgroundColor: colors.feher, borderTopLeftRadius: 10, borderBottomEndRadius: 10, color:'grey' }}
                            placeholder="Add meg a nyelvet! 0-magyar 1-angol"
                            onChangeText={newText => setBevitel3(newText)}
                            defaultValue={bevitel3}
                        />


                        <Pressable onPress={() => felvitel()} style={({ pressed }) => ({
                            backgroundColor: pressed ? colors.black : colors.sotetlime,
                            elevation: pressed ? 2 : 0,
                            borderRadius: 10,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 3,
                            marginTop: 20
                        })}>
                            <Text style={{ fontSize: 25, color: colors.black, padding: 10, paddingHorizontal: 59, textAlign: 'center' }}>Felvitel</Text>
                        </Pressable>
                    </View>


                    <View>

                    </View>






                </View>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={blogData}
                        keyExtractor={({ blog_id }) => blog_id}
                        renderItem={({ item }) => (

                            <View style={{ justifyContent: 'center', marginBottom: 15, borderRadius: 3, alignItems: 'center', borderWidth: 2, borderColor: colors.sotetlime, }}>



                                <Text style={{ fontSize: 19, textAlign: 'center', paddingHorizontal: 8, padding: 30, color: colors.feher, }} >{item.blog_datum}</Text>
                                <Text style={{ fontSize: 19, textAlign: 'center', paddingHorizontal: 8, color: colors.feher }}>
                                    {item.blog_uzenet}
                                </Text>











                            </View>


                        )}
                    />
                )}


            </ScrollView>
        </SafeAreaView>

    );

};



