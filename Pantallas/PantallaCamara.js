import { useRef, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet, Linking } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";



export default function Camara() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState(null);
  const [camaraLista, setCamaraLista] = useState(false);
  const [tomando, setTomando] = useState(false);
  const [error, setError] = useState(null);

  {/* 
        const [permissionReal, requestPermissionReal] = useCameraPermissions();

        // SOLO PARA PRUEBAS
        const [simulado, setSimulado] = useState({
        status: "undetermined", 
        granted: false,
        canAskAgain: true,       // false para probar "Abrir ajustes"
        });

        const permission = permissionReal ? simulado : null;

        function requestPermission() {
        // simula que el usuario rechaza el diálogo
        setSimulado({ status: "denied", granted: false, canAskAgain: true });
        // para simular que acepta:
        // setSimulado({ status: "granted", granted: true, canAskAgain: true });
        }
    */}
    
  async function tomarFoto() {
    if (!camaraLista || tomando) return;
    try {
      setError(null);
      setTomando(true);
      const foto = await cameraRef.current.takePictureAsync();
      if (foto?.uri) setFotoUri(foto.uri);
    } catch (e) {
      setError("No se pudo tomar la foto. Intenta de nuevo.");
    } finally {
      setTomando(false);
    }
  }

  if (!permission) {
    return (
       <View style={styles.centro}>
        <Text style={styles.titulo}>Permiso pendiente</Text>
        <Text style={styles.texto}>
          Necesitamos la cámara para tomar fotografías dentro de la app.
        </Text>
        <Pressable style={styles.boton} onPress={requestPermission}>
          <Text style={styles.botonTexto}>Conceder permiso</Text>
        </Pressable>
      </View>
    );
  }

  if (permission.status === "denied") {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Permiso denegado</Text>
        <Text style={styles.texto}>
          Sin acceso a la cámara no puedes tomar fotos. Puedes volver a
          solicitarlo
          {permission.canAskAgain ? "." : " desde los ajustes del teléfono."}
        </Text>
        {permission.canAskAgain ? (
          <Pressable style={styles.boton} onPress={requestPermission}>
            <Text style={styles.botonTexto}>Solicitar de nuevo</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.boton} onPress={() => Linking.openSettings()}>
            <Text style={styles.botonTexto}>Abrir ajustes</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Cámara</Text>

      <CameraView
        ref={cameraRef}
        style={styles.camara}
        facing="back"
        onCameraReady={() => setCamaraLista(true)}
      />

      <Pressable
        style={[styles.boton, (!camaraLista || tomando) && styles.botonOff]}
        onPress={tomarFoto}
        disabled={!camaraLista || tomando}
      >
        <Text style={styles.botonTexto}>
          {tomando ? "Tomando..." : "Tomar foto"}
        </Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      {fotoUri && (
        <View style={styles.previa}>
          <Text style={styles.texto}>Última foto:</Text>
          <Image source={{ uri: fotoUri }} style={styles.imagen} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  texto: { fontSize: 14, textAlign: "center", marginBottom: 8 },
  camara: { flex: 1, borderRadius: 12, overflow: "hidden" },
  boton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  botonOff: { opacity: 0.5 },
  botonTexto: { color: "#fff", fontWeight: "bold" },
  error: { color: "#b91c1c", textAlign: "center" },
  previa: { alignItems: "center" },
  imagen: { width: 160, height: 160, borderRadius: 10 },
});