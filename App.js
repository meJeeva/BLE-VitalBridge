import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
    </SafeAreaView>
  )
}

export default App

const styles = {}