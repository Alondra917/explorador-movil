import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Magnetometer } from "expo-sensors";

const DIRECCIONES = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

function calcularAngulo({ x, y }) {
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function direccionDe(angulo) {
  return DIRECCIONES[Math.round(angulo / 45) % 8];
}

export default function Brujula() {
  const [disponible, setDisponible] = useState(null); // null = verificando
  const [datos, setDatos] = useState(null);
  const [angulo, setAngulo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let sub = null;
    let activo = true;

    async function iniciar() {
      try {
        const ok = await Magnetometer.isAvailableAsync();
        if (!activo) return;
        setDisponible(ok);
        if (!ok) return;

        Magnetometer.setUpdateInterval(250);
        sub = Magnetometer.addListener(({ x, y, z }) => {
          setDatos({ x, y, z });
          setAngulo(calcularAngulo({ x, y }));
        });
      } catch (e) {
        if (!activo) return;
        setDisponible(false);
        setError("No se pudo leer el magnetómetro.");
      }
    }

    iniciar();


    return () => {
      activo = false;
      if (sub) sub.remove();
    };
  }, []);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Brújula</Text>

      {disponible === null && <Text style={styles.texto}>Verificando sensor...</Text>}

      {disponible === false && (
        <View style={styles.tarjeta}>
          <Text style={styles.noDisp}>Sensor no disponible</Text>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}

      {disponible === true && !datos && (
        <Text style={styles.texto}>Esperando lecturas...</Text>
      )}

      {disponible === true && datos && (
        <>
          <View style={styles.tarjeta}>
            <Text style={styles.grande}>
              {Math.round(angulo)}° {direccionDe(angulo)}
            </Text>
            <Text style={styles.texto}>Dirección horizontal aproximada</Text>
          </View>

          <View style={styles.tarjeta}>
            <Text style={styles.dato}>X: {datos.x.toFixed(2)} µT</Text>
            <Text style={styles.dato}>Y: {datos.y.toFixed(2)} µT</Text>
            <Text style={styles.dato}>Z: {datos.z.toFixed(2)} µT</Text>
          </View>

          <Text style={styles.nota}>
            Referencia aproximada: supone el teléfono horizontal. No es un rumbo
            geográfico calibrado ni corrige declinación magnética o inclinación.
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  texto: { fontSize: 14, marginBottom: 8 },
  tarjeta: {
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  grande: { fontSize: 36, fontWeight: "bold" },
  dato: { fontSize: 16, marginBottom: 4 },
  noDisp: { fontSize: 18, fontWeight: "bold", color: "#b91c1c" },
  error: { color: "#b91c1c", marginTop: 6 },
  nota: { fontSize: 12, color: "#555", marginTop: 8 },
});