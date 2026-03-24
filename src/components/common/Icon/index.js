import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import Foundation from 'react-native-vector-icons/Foundation';

const ICON_TYPES = {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Feather,
  Entypo,
  EvilIcons,
  SimpleLineIcons,
  Octicons,
  Zocial,
  Foundation,
};

const Icon = ({
  type = 'MaterialIcons',
  name,
  size = 24,
  color = '#000',
}) => {
  const SelectedIcon = ICON_TYPES[type];

  if (!SelectedIcon) {
    console.warn(`Icon type "${type}" is not supported`);
    return null;
  }

  return <SelectedIcon name={name} size={size} color={color} />;
};

export default Icon;