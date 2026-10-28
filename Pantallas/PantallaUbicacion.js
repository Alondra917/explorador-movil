import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator,  StyleSheet,Linking} from "react-native";
import * as Location from "expo-location";

export default function Ubicacion() {
  const [permission, requestPermission] = Location.useForegroundPermissions();
  const [coords, setCoords] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function obtenerUbicacion() {
    if (cargando) return;
    setError(null);
    setCargando(true);
    try {
      let estado = permission;
      if (!estado?.granted) {
        estado = await requestPermission();
      }
      if (!estado.granted) {
        setError("Permiso de ubicación denegado. No se puede obtener tu posición.");
        return;
      }

      const activos = await Location.hasServicesEnabledAsync();
      if (!activos) {
        setError("Los servicios de ubicación del teléfono están desactivados.");
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude,
        precision: pos.coords.accuracy,
      });
    } catch (e) {
      setError("No se pudo obtener la ubicación. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  function textoEstado() {
    if (!permission) return "Verificando...";
    if (permission.granted) return "Concedido";
    if (permission.status === "denied") return "Denegado";
    return "Pendiente";
  }

  const denegadoDefinitivo =
    permission && permission.status === "denied" && !permission.canAskAgain;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Ubicación</Text>
      <Text style={styles.texto}>Permiso: {textoEstado()}</Text>

      {denegadoDefinitivo ? (
        <>
          <Text style={styles.texto}>
            El permiso fue denegado. Actívalo desde los ajustes del teléfono.
          </Text>
          <Pressable style={styles.boton} onPress={() => Linking.openSettings()}>
            <Text style={styles.botonTexto}>Abrir ajustes</Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          style={[styles.boton, cargando && styles.botonOff]}
          onPress={obtenerUbicacion}
          disabled={cargando}
        >
          <Text style={styles.botonTexto}>Obtener mi ubicación</Text>
        </Pressable>
      )}

      {cargando && (
        <View style={styles.fila}>
          <ActivityIndicator />
          <Text style={styles.texto}> Obteniendo ubicación...</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {coords && !cargando && (
        <View style={styles.tarjeta}>
          <Text style={styles.dato}>Latitud: {coords.latitud.toFixed(6)}</Text>
          <Text style={styles.dato}>Longitud: {coords.longitud.toFixed(6)}</Text>
          <Text style={styles.dato}>
            Precisión reportada: {Math.round(coords.precision)} m
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  texto: { fontSize: 14, marginBottom: 8 },
  fila: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  boton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  botonOff: { opacity: 0.5 },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  error: { color: "#b91c1c", marginVertical: 8 },
  tarjeta: {
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  dato: { fontSize: 16, marginBottom: 4 },
});
