import { View, Pressable } from 'react-native';
import tw from 'twrnc';
import { useNavigate } from "react-router-native";
import Text from './Text'


const SignInPrompt = () => {
      const navigate = useNavigate()

  return (
    <View style={tw`justify-center items-center p-3 mt-56`}>
        <Text fontWeight="bold" style={tw` text-lg`}>You're not signed in</Text>
        <Pressable onPress={() => navigate('/login')}  style={tw`justify-center items-center bg-blue-700 font-bold mt-4 py-2 px-4 rounded-lg border border-blue-700`}>
            <Text fontWeight="bold" style={tw`text-white`}>Sign In</Text>
        </Pressable>
    </View>
  );
};

export default SignInPrompt;