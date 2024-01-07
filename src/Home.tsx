import {View, TextInput, Button, Text} from 'react-native';
import React from 'react';
import {useQuery, useRealm} from '../App';
import Realm from 'realm';

const Home = () => {
  const realm = useRealm();
  const [data, setData] = React.useState(null);
  const handleAddName = lol => {
    realm.write(() => {
      realm.create('Profile', {
        _id: new Realm.BSON.ObjectId(),
        name: lol,
      });
    });
  };

  const getData = useQuery('Profile');
  console.log(getData);

  return (
    <View>
      <TextInput placeholder="name" onChangeText={text => setData(text)} />
      <Button title="submit" onPress={() => handleAddName(data)} />

      <View>
        {getData.map(item => (
          <View key={item._id}>
            <Text>{item?.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Home;
