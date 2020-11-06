import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import styles from '../styles';

interface EmptyListProps {
  emptyItemMessage?: string;
}

const EmptyList: React.FC<EmptyListProps> = props => {
  const { emptyItemMessage } = props;
  return (
    <View style={styles.emptyItemView}>
      <Caption>{emptyItemMessage}</Caption>
    </View>
  );
};

EmptyList.defaultProps = {
  emptyItemMessage: 'No item found',
};

export default EmptyList;
