//Para usar las funcionalidades de el sistema operativo se necesita descargar npx expo install expo-camera expo-location expo-sensors 
// Para intalar safeAreaWiew no deprecado : npx expo install react-native-safe-area-context
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Camara from './Pantallas/PantallaCamara';
import Ubicacion from './Pantallas/PantallaUbicacion';
import Brujula from "./Pantallas/PantallaBrujula";


export default function App() {
  const [pantalla, setPantalla] = useState("camara");

  return ( 
    <SafeAreaProvider> 
    <SafeAreaView style={{ flex: 1 , backgroundColor: "#fff" }}>
      <View style={styles.contenido}>
        {pantalla === "camara" && <Camara />}
        {pantalla === "ubicacion" && <Ubicacion />}
        {pantalla === "brujula" && <Brujula />}
      </View>

      <View style={styles.menu}>
        <Pressable
          style={[styles.tab, pantalla === "camara" && styles.tabActiva]}
          onPress={() => setPantalla("camara")}  >
          <Text style={styles.tabTexto}>Cámara</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, pantalla === "ubicacion" && styles.tabActiva]}
          onPress={() => setPantalla("ubicacion")} >
          <Text style={styles.tabTexto}>Ubicación</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, pantalla === "brujula" && styles.tabActiva]}
          onPress={() => setPantalla("brujula")} >
          <Text style={styles.tabTexto}>Brújula</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  contenido: { flex: 1 },
  menu: { flexDirection: "row", borderTopWidth: 1, borderColor: "#ddd" },
  tab: { flex: 1, padding: 14, alignItems: "center" },
  tabActiva: { backgroundColor: "#dbeafe" },
  tabTexto: { fontWeight: "bold" },
});