import { View, Pressable } from 'react-native';
import tw from 'twrnc';
import Text from './Text'


const SignInPrompt = ({navigation}) => {

  return (
    <View style={tw`justify-center items-center h-screen m-auto`}>
        <Text fontWeight="bold" style={tw` text-lg`}>You're not signed in</Text>
        <Pressable onPress={() => navigation.navigate('Account', {screen: 'Login'})}  style={tw`justify-center items-center bg-blue-700 font-bold mt-4 py-2 px-4 rounded-lg border border-blue-700`}>
            <Text fontWeight="bold" style={tw`text-white`}>Sign In</Text>
        </Pressable>
    </View>
  );
};

export default SignInPrompt;