import React from 'react';
import {View, TextInput, Button, Text, ScrollView} from 'react-native';
import {useQuery, useRealm} from '../App';
import Realm from 'realm';

const Home = () => {
  const realm = useRealm();
  const [data, setData] = React.useState({
    name: '',
    description: '',
    number: 800,
  });
  const handleAddName = lol => {
    try {
      realm.write(() => {
        realm.create('Profile', {
          _id: new Realm.BSON.ObjectId(),
          ...lol,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useQuery('Profile');
  console.log(getData);

  return (
    <View
      style={{
        height: '100%',
      }}>
      <TextInput
        placeholder="name"
        onChangeText={text => setData({...data, name: text})}
        value={data.name}
      />
      <TextInput
        placeholder="desciption"
        onChangeText={text => setData({...data, description: text})}
        value={data.description}
      />
      <TextInput
        placeholder="number"
        onChangeText={text => setData({...data, number: Number(text)})}
        value={`${data.number}`}
        keyboardType="number-pad"
      />
      <Button title="submit" onPress={() => handleAddName(data)} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: '4%',
          paddingVertical: '2%',
          gap: 5,
        }}>
        {getData.map(item => (
          <View
            key={item._id}
            style={{
              paddingVertical: 10,
              backgroundColor: 'blue',
              gap: 2,
              borderRadius: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
              }}>
              {item?.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
              }}>
              {item?.description}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
              }}>
              {item?.number}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
