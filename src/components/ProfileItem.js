import React from 'react';
import styles from '../../assets/styles';

import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ProfileItem = ({
  age,
  info1,
  info2,
  info3,
  info4,
  location,
  matches,
  name,
  proffession,
  intrests,
  bio,
}) => {
  return (
    <View style={styles.containerProfileItem}>
      {/* <View style={styles.matchesProfileItem}>
        <Text style={styles.matchesTextProfileItem}>
          Manish Bohat
        </Text>
      </View> */}

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>
        {age} - {location}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="iconfontdesktop" />
        </Text>
        <Text style={styles.infoContent}>{proffession}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="profile" />
        </Text>
        <Text style={styles.infoContent}>{intrests}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="edit" />
        </Text>
        <Text style={styles.infoContent}>{bio}</Text>
      </View>

      {/* <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="calendar" />
        </Text>
        <Text style={styles.infoContent}>{info4}</Text>
      </View> */}
    </View>
  );
};

export default ProfileItem;
