import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    elegant: {
        backgroundColor: 'white',
        padding: 12,
        marginTop: 8,
        marginHorizontal: 8,
        borderColor: 'white',
        borderRadius: 8
    },
    errorField: {
        borderColor: '#d73a4a'
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.elegant, error && styles.errorField];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;