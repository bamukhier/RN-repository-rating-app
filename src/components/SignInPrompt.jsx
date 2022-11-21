import { View, Pressable } from 'react-native';
import tw from 'twrnc';
import Text from './Text'


const SignInPrompt = ({navigation}) => {

  return (
    <View style={tw`justify-center items-center h-screen m-auto`}>
        <Text fontWeight="bold" style={tw` text-lg`}>You're not signed in</Text>
        <Pressable onPress={() => navigation.navigate('Account', {screen: 'Login'})}  style={tw`justify-center items-center bg-violet-800 font-bold mt-6 py-3 px-6 rounded-lg border border-violet-800`}>
            <Text fontWeight="bold" style={tw`text-white text-md`}>Sign In</Text>
        </Pressable>
    </View>
  );
};

export default SignInPrompt;