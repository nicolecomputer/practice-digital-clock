import './App.css'
import Clock from './Clock'
function App() {
  return (
    <div style={{
      height: "100vh",
      alignItems: 'center',
      gap: 40,
      marginTop: 40
    }}>
      <Clock label="San Francisco" timezone='America/Los_Angeles' />
      <Clock label="Denver" timezone='America/Denver' />
      <Clock label="New York" timezone='America/New_York' />
    </div>
  )
}

export default App
