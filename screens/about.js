import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';

//Data
const active = require('../data/active/active.json');

export default function About() {
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.description}>
          <Text style={styles.description_text}>
            Majhi Pargana Mahal is an platform for santhal community where
            people learn about santhal culture and environment.
          </Text>
          <Text style={styles.description_text}>
            The platform is under supervision of the santhal community and its
            leaders.
          </Text>
        </View>
        <View style={styles.operators}>
          <View>
            <Text style={styles.operator_heading}>Our Operators</Text>
          </View>
          <View style={styles.each}>
            <Image
              style={styles.dp}
              source={require('../assets/operators/payes.jpg')}
            />
            <View style={styles.each_description}>
              <Text style={styles.each_text1}>Payes Marshal Soren</Text>
              <Text style={styles.each_text2}>Cheif Operator</Text>
            </View>
          </View>
          <View style={styles.each}>
            <Image
              style={styles.dp}
              source={require('../assets/operators/karan.jpg')}
            />

            <View style={styles.each_description}>
              <Text style={styles.each_text1}>Karan Hansdah</Text>
              <Text style={styles.each_text2}>Cheif Operator</Text>
            </View>
          </View>
          <View style={styles.each}>
            <Image
              style={styles.dp}
              source={require('../assets/operators/rohan.jpg')}
            />
            <View style={styles.each_description}>
              <Text style={styles.each_text1}>Rohan Murmu</Text>
              <Text style={styles.each_text2}>Technical Operator</Text>
            </View>
          </View>
        </View>
        <View style={styles.operators}>
          <View>
            <Text style={styles.operator_heading}>Active Members</Text>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Vijayendra Banra</Text>
              <Text style={styles.each_text2}>Karandih</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Jagannath Hembrom</Text>
              <Text style={styles.each_text2}>Ghatshila</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Sunil Kumar Murmu</Text>
              <Text style={styles.each_text2}>Ghatshila</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Mahesh Murmu</Text>
              <Text style={styles.each_text2}>Karandih</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Chandan Kisku</Text>
              <Text style={styles.each_text2}>Karandih</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Manisha Murmu</Text>
              <Text style={styles.each_text2}>Karandih</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Durga Charan Majhi</Text>
              <Text style={styles.each_text2}>Karandih</Text>
            </View>
          </View>
          <View style={styles.each2}>
            <View style={styles.each_description2}>
              <Text style={styles.each_text1}>Dhananjay Boipai</Text>
              <Text style={styles.each_text2}>Chaibasa</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
  },
  description_text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#282c40',
    marginTop: 20,
  },
  operators: {
    marginTop: 50,
  },
  operator_heading: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    marginBottom: 20,
    color: '#282c40',
  },
  each: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  each2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dp: {
    marginBottom: 10,
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  each_description: {
    marginLeft: 20,
  },
  each_description2: {
    marginLeft: 5,
  },
  each_text1: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#282c40',
  },
  each_text2: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#4f4f4f',
  },
});
