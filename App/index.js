// Filename: index.js
// Combined code from all files

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';

const tales = [
  { id: '1', title: 'Cinderella' },
  { id: '2', title: 'Snow White' },
  { id: '3', title: 'Sleeping Beauty' },
  { id: '4', title: 'Little Red Riding Hood' },
  { id: '5', title: 'Hansel and Gretel' },
];

const talesDetails = {
  '1': {
    title: 'Cinderella',
    content: 'Once upon a time...',
    image: 'https://picsum.photos/400/300?random=1',
  },
  '2': {
    title: 'Snow White',
    content: 'Once upon a time in a kingdom far away...',
    image: 'https://picsum.photos/400/300?random=2',
  },
  '3': {
    title: 'Sleeping Beauty',
    content: 'In a land far, far away...',
    image: 'https://picsum.photos/400/300?random=3',
  },
  '4': {
    title: 'Little Red Riding Hood',
    content: 'There was once a sweet little girl...',
    image: 'https://picsum.photos/400/300?random=4',
  },
  '5': {
    title: 'Hansel and Gretel',
    content: 'Near a great forest there lived...',
    image: 'https://picsum.photos/400/300?random=5',
  },
};

const HomeScreen = ({ navigation }) => {
  const renderTale = ({ item }) => (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('Tale', { tale: item })}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a Fairy Tale</Text>
      <FlatList
        data={tales}
        renderItem={renderTale}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const TaleScreen = ({ route }) => {
  const { tale } = route.params;
  const taleDetails = talesDetails[tale.id];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{taleDetails.title}</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: taleDetails.image }} style={styles.image} />
        <Text style={styles.text}>{taleDetails.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fairy Tales' }} />
        <Stack.Screen name="Tale" component={TaleScreen} options={{ title: 'Tale' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FAF3E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#CE8ABD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});