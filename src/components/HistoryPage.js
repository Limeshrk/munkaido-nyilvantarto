import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/namespace
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';

import trashIcon from '../../assets/Trash_font_awesome.js';
import { getHistory, deleteHistoryById } from '../database';

export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);

  const handleDelete = async item => {
    Alert.alert(
      'Biztos töröljem?',
      'Biztos törlöd a bejegyzést?',
      [
        {
          text: 'Mégse',
          style: 'cancel',
        },
        {
          text: 'Törlés',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHistoryById(props.userData.email, item.id);
              console.log('Bejegyzés törölve, history frissitése');
              await refreshHistory();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const refreshHistory = async () => {
    try {
      const newhistory = await getHistory(props.userData.email);
      setHistory(newhistory);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        item.state === 'in' ? styles.containerIn : styles.containerOut,
      ]}>
      <View style={styles.historyTextContainer}>
        <Text style={styles.currentStateText}>{item.date.toDate().toLocaleString('hu-HU')}</Text>
        <Text
          style={[
            styles.currentStateText,
            item.state === 'in' ? styles.currentStateTextIn : styles.currentStateTextOut,
          ]}>
          {item.state === 'in' ? 'bejött' : 'távozott'}
        </Text>
      </View>
      {index === 0 && (
        <TouchableOpacity
          onPress={() => {
            handleDelete(item);
          }}>
          <View style={styles.deleteButtonContainer}>
            <SvgXml xml={trashIcon} style={styles.deleteIcon} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  useEffect(() => {
    // async IIFE
    (async () => {
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  deleteButtonContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
    alignItems: 'center',
  },
  deleteIcon: {
    color: 'red',
  },

  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
