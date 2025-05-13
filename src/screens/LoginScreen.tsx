import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, 	Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Image source={require('../assets/app-icon.png')} style={styles.app__icon} />
        <View style={styles.bottom}>
          <Text style={styles.title}>Welcome to the best YouTube-based learning application.</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Tabs')}>
          <Text style={styles.buttonText}>Log in as guest</Text>
          </TouchableOpacity>
          <Text style={styles.agreement}>
            By continuing you agree with{' '}
            <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/terms')}>
              Terms and Conditions
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/privacy')}>
            Privacy Policy
            </Text>
        </Text>
        </View>
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#8D99AE',
  },
  bottom: {
    display: 'flex',
  },
  logo: {
    width: 292,
    height: 116,
    resizeMode: 'contain',
  },
  app__icon: {
    width: 128,
    height: 128,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 22,
    textAlign: 'left',
    marginBottom: 32,
  },
  button: {
    width: 327,
    backgroundColor: '#2B2D42',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  agreement: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
  },
  link: {
    color: '#2B2D42',
    textDecorationLine: 'underline',
    marginTop: 20,
    fontSize: 14,
  },
});
