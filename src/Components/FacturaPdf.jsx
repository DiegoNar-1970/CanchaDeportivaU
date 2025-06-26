import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({    
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #000',
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  canchaImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right'
  }
});

const FacturaPdf = ({ usuario, cancha, reserva }) => {
  console.log('Datos de la factura:', { usuario, cancha, reserva });
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Factura de Reserva</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>{usuario.nombre}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text>{usuario.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Cancha Reservada:</Text>
        <Text>{cancha.nombre_cancha}</Text>
        <Text style={styles.label}>Tipo:</Text>
        <Text>{cancha.tipo}</Text>
        <Text style={styles.label}>Precio por hora:</Text>
        <Text>${cancha.precio_hora}</Text>
      </View>

      <Image style={styles.canchaImage} src={cancha.img} />

      <View style={styles.section}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{reserva.fecha_reserva}</Text>
        <Text style={styles.label}>Hora inicio:</Text>
        <Text>{reserva.hora_inicio}</Text>
        <Text style={styles.label}>Hora fin:</Text>
        <Text>{reserva.hora_fin}</Text>
      </View>

      <Text style={styles.total}>Total: ${cancha.precio_hora}</Text>
    </Page>
  </Document>
);
}

export default FacturaPdf