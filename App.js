import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import BLEScreen from './src/screens/Devices/BLEScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <BLEScreen />
    </SafeAreaView>
  )
}

export default App

const styles = {}