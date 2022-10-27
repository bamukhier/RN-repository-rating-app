import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    elegant: {
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4
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