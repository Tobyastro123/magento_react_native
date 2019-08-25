import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../..';
import { ThemeContext } from '../../../config';

const INFO = 'info';
const SUCCESS = 'success';
const ERROR = 'error';

const MessageView = React.memo(({
  /**
   * @param {String} message text to be displayed
   */
  message,
  /**
   * @param {String} type determines styling of the text
   * type value can be
   * 1. 'info'
   * 2. 'success'
   * 3. 'error'
   */
  type
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Text type="body" style={styles.text(type, theme)}>{message}</Text>
    </View>
  );
});

const getTextColor = (type, theme) => {
  switch (type) {
    case SUCCESS:
      return theme.colors.success;
    case ERROR:
      return theme.colors.error;
    default:
      return theme.colors.bodyText;
  }
};

// TODO: Is there any benefit of using StyleSheet when styles are function?
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: (type, theme) => ({
    textAlign: 'center',
    padding: theme.spacing.eight,
    color: getTextColor(type, theme),
  }),
});

MessageView.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([INFO, SUCCESS, ERROR]),
};

MessageView.defaultProps = {
  type: INFO,
};

export default MessageView;
